#!/usr/bin/env python3
"""Stop-hook verify-before-done gate + bounded repair loop.

Faithful port of ``verification.verify_workspace`` (services/verification.py:235),
the repair loop (core/query_processor.py:734), and ``build_repair_prompt``
(services/verification.py:311), reshaped as a Claude Code **Stop** hook so it
travels with each client workspace's ``.claude/`` pack.

Contract: when the agent tries to stop, confirm the project's docker compose
stack is up AND its preview answers HTTP on the published gateway port. If not,
``block`` with a short imperative repair instruction — up to a bounded number of
times, after which we let the agent stop anyway (verify_block_completion=False).

Fails **OPEN** everywhere: any hook error, or an unexpected exception, allows
the stop (exit 0). A verify-gate bug must never trap the agent in a session.

stdlib only; no venv assumed.
"""

import hashlib
import json
import os
import subprocess
import sys
import tempfile
import time
import urllib.error
import urllib.request

# Repair budget — matches settings.verify_max_repair_attempts default.
_REPAIR_BUDGET = 2
# compose ps floor so a slow docker daemon isn't mistaken for a broken stack.
_COMPOSE_PS_TIMEOUT_S = 10.0
# HTTP probe budget: total wall-clock, per-attempt, and inter-attempt sleep.
_HTTP_TOTAL_TIMEOUT_S = 45.0
_HTTP_ATTEMPT_TIMEOUT_S = 8.0
_HTTP_RETRY_SLEEP_S = 0.5
# Let a just-restarted stack settle before judging it.
_STARTUP_GRACE_S = 3.0

_COMPOSE_FILES = (
    "docker-compose.yaml",
    "docker-compose.yml",
    "compose.yaml",
    "compose.yml",
)


# --------------------------------------------------------------- compose files

def _has_compose(root):
    for name in _COMPOSE_FILES:
        try:
            if os.path.isfile(os.path.join(root, name)):
                return True
        except Exception:
            continue
    return False


# ------------------------------------------------------------------ subprocess

def _run(cmd, cwd, timeout):
    """Run a subprocess in ``cwd``; return (rc, stdout, stderr). Never raises.

    A spawn failure comes back as rc=127 with the exception text; a timeout as
    rc=124.
    """
    try:
        proc = subprocess.run(
            cmd,
            cwd=cwd,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            timeout=timeout,
        )
    except subprocess.TimeoutExpired as e:
        out = e.stdout or b""
        err = e.stderr or b""
        if isinstance(out, str):
            out = out.encode(errors="replace")
        if isinstance(err, str):
            err = err.encode(errors="replace")
        return 124, out.decode(errors="replace"), (err.decode(errors="replace") or "timed out")
    except Exception as e:  # noqa: BLE001 - spawn failure is a check failure, not a crash
        return 127, "", str(e)
    return (
        proc.returncode or 0,
        (proc.stdout or b"").decode(errors="replace"),
        (proc.stderr or b"").decode(errors="replace"),
    )


# -------------------------------------------------------------- compose parsing

def _parse_compose_ps(stdout):
    """Parse ``docker compose ps --format json`` — tolerant of a JSON array
    and of newline-delimited JSON objects (both shapes docker emits)."""
    text = (stdout or "").strip()
    if not text:
        return []
    try:
        data = json.loads(text)
    except (json.JSONDecodeError, ValueError):
        data = None
    if isinstance(data, list):
        return [x for x in data if isinstance(x, dict)]
    if isinstance(data, dict):
        return [data]
    services = []
    for line in text.splitlines():
        line = line.strip()
        if not line:
            continue
        try:
            obj = json.loads(line)
        except (json.JSONDecodeError, ValueError):
            continue
        if isinstance(obj, dict):
            services.append(obj)
        elif isinstance(obj, list):
            services.extend(x for x in obj if isinstance(x, dict))
    return services


def _service_name(svc):
    return str(svc.get("Service") or svc.get("Name") or svc.get("name") or "?")


def _find_unhealthy(services):
    """Names of services that are exited/dead or report unhealthy."""
    bad = []
    for svc in services:
        state = str(svc.get("State", "")).lower()
        health = str(svc.get("Health", "")).lower()
        if state in ("exited", "dead") or health == "unhealthy":
            bad.append(_service_name(svc))
    return bad


# -------------------------------------------------------------- port discovery

def _published_ports(svc):
    """(target, published, proto) tuples for a service's published ports.

    Publishers entries look like {"URL","TargetPort","PublishedPort","Protocol"}.
    Only truthy/non-zero PublishedPort counts (0/unset = internal-only mapping).
    """
    out = []
    for p in svc.get("Publishers") or []:
        if not isinstance(p, dict):
            continue
        try:
            published = int(p.get("PublishedPort"))
        except (TypeError, ValueError):
            continue
        if not published:
            continue
        try:
            target = int(p.get("TargetPort"))
        except (TypeError, ValueError):
            target = None
        proto = str(p.get("Protocol", "tcp")).lower()
        out.append((target, published, proto))
    return out


def _derive_port(services):
    """Published host port to probe.

    Prefers the gateway/nginx service's published ->80 mapping (else its first
    published port); otherwise the first service publishing an ->80/tcp mapping.
    Returns None when nothing suitable is published.
    """
    port80 = None
    for svc in services:
        name = _service_name(svc).lower()
        ports = _published_ports(svc)
        if not ports:
            continue
        if "gateway" in name or "nginx" in name:
            for target, published, _proto in ports:
                if target == 80:
                    return published
            return ports[0][1]
        for target, published, proto in ports:
            if target == 80 and proto == "tcp" and port80 is None:
                port80 = published
    return port80


# ----------------------------------------------------------------- http probe

def _http_probe_once(url, timeout):
    """Single blocking GET; returns the HTTP status code.

    A server answering with an error status (4xx/5xx) still counts as a
    response — urllib raises HTTPError for those, so unwrap the code.
    Connection-level failures propagate for the caller to retry.
    """
    req = urllib.request.Request(url, method="GET")
    try:
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            return int(getattr(resp, "status", None) or resp.getcode())
    except urllib.error.HTTPError as e:
        return int(e.code)


def _probe_http(url, http_timeout_s, total_timeout_s):
    """Retry GET ``url`` until ``total_timeout_s``; ok on any status < 500."""
    deadline = time.monotonic() + max(total_timeout_s, http_timeout_s)
    last_err = ""
    while True:
        try:
            status = _http_probe_once(url, http_timeout_s)
            if status < 500:
                return True, "http %d" % status
            last_err = "http %d" % status
        except Exception as e:  # noqa: BLE001 - refusals expected while a stack warms up
            last_err = str(e) or type(e).__name__
        if time.monotonic() >= deadline:
            return False, last_err or "no response"
        time.sleep(_HTTP_RETRY_SLEEP_S)


# ------------------------------------------------------------------- verify

def _verify(project_dir):
    """Reimplements verify_workspace: returns (ok, detail). Never raises here —
    exceptions bubble to the fail-open handler in main()."""
    # 1. startup grace ----------------------------------------------------
    if _STARTUP_GRACE_S > 0:
        time.sleep(_STARTUP_GRACE_S)

    # 2. compose ps -------------------------------------------------------
    rc, out, err = _run(
        ["docker", "compose", "ps", "--format", "json"], project_dir, _COMPOSE_PS_TIMEOUT_S
    )
    if rc != 0:
        tail = (err.strip() or out.strip() or "docker compose ps failed")[-500:]
        return False, "compose ps failed: " + tail

    services = _parse_compose_ps(out)

    # 3. unhealthy check --------------------------------------------------
    unhealthy = _find_unhealthy(services)
    if unhealthy:
        return False, "unhealthy services: " + ", ".join(unhealthy)
    # compose ok past this point.

    # 4. derive port ------------------------------------------------------
    port = _derive_port(services)
    if not port:
        return False, "no published port to probe"

    # 5. http probe -------------------------------------------------------
    url = "http://127.0.0.1:%d/" % port
    http_ok, http_detail = _probe_http(url, _HTTP_ATTEMPT_TIMEOUT_S, _HTTP_TOTAL_TIMEOUT_S)

    # 6. ok = compose_ok AND http_ok --------------------------------------
    if http_ok:
        return True, "healthy"
    return False, "preview not serving on port %d: %s" % (port, http_detail)


# --------------------------------------------------------------- repair budget

def _read_count(path):
    try:
        with open(path, "r") as f:
            return int((f.read() or "0").strip() or "0")
    except Exception:
        return 0


def _write_count(path, n):
    try:
        with open(path, "w") as f:
            f.write(str(int(n)))
    except Exception:
        pass


def _repair_reason(detail):
    return (
        "The workspace build/preview check failed: " + detail + ". "
        "Fix the cause (check the failing service's logs and the compose config), "
        "restart the affected services, and do not consider the task done until the "
        "preview serves. Do not ask me questions — just fix it."
    )


# -------------------------------------------------------------------- entry

def main():
    # ENV-GATE: inert unless the executor opts in (avoids double-running with
    # the in-process hooks on the current local path).
    if os.environ.get("TEDIUX_HARNESS_HOOKS") != "1":
        sys.exit(0)

    try:
        try:
            data = json.load(sys.stdin)
        except Exception:
            data = {}
        if not isinstance(data, dict):
            data = {}
        # Read (repair budget, not this flag, is what bounds the loop).
        _stop_hook_active = data.get("stop_hook_active", False)  # noqa: F841

        project_dir = os.environ.get("CLAUDE_PROJECT_DIR") or os.getcwd()

        # No-compose short-circuit: nothing buildable to verify → allow stop.
        if not _has_compose(project_dir):
            sys.exit(0)

        # Repair budget: bounded self-heal, then complete anyway.
        state_path = os.path.join(
            tempfile.gettempdir(),
            "tediux_verifygate_" + hashlib.sha1(project_dir.encode()).hexdigest()[:12],
        )
        count = _read_count(state_path)
        if count >= _REPAIR_BUDGET:
            _write_count(state_path, 0)
            sys.exit(0)

        ok, detail = _verify(project_dir)
        if ok:
            _write_count(state_path, 0)
            sys.exit(0)

        # Not serving: burn one repair attempt and block the stop.
        _write_count(state_path, count + 1)
        print(json.dumps({"decision": "block", "reason": _repair_reason(detail)}))
        sys.exit(0)
    except SystemExit:
        raise
    except Exception:
        # Fail OPEN: never trap the agent on a hook bug.
        sys.exit(0)


if __name__ == "__main__":
    main()
