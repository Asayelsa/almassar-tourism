#!/usr/bin/env python3
"""PostToolUse self-heal hook (harness pack, faithful port of self_heal.py).

After a file-mutating tool runs, cheaply detect whether the hot-reload preview
just crashed and, if so, feed the failing container's recent logs back to the
agent as ``additionalContext`` so it fixes the break immediately.

Advisory only: this hook NEVER denies/blocks a tool and NEVER raises. Every
failure path is fail-silent (prints nothing, exits 0) so a hook bug can never
wedge a session.

Matcher (configured in settings.json): Write|Edit|MultiEdit|NotebookEdit.
Stdlib only; no venv assumed.
"""

import hashlib
import json
import os
import subprocess
import sys
import tempfile
import time

# ENV-GATE: inert unless the executor explicitly opts in. Prevents double-running
# alongside the in-process hooks on the current local path.
if os.environ.get("TEDIUX_HARNESS_HOOKS") != "1":
    sys.exit(0)

PROJECT_DIR = os.environ.get("CLAUDE_PROJECT_DIR") or os.getcwd()

_MUTATING_TOOLS = {"Write", "Edit", "MultiEdit", "NotebookEdit"}

_PS_TIMEOUT_S = 3.0
_LOGS_TIMEOUT_S = 5.0
_LOG_TAIL_LINES = 40

_COMPOSE_WALK_UP = 6
_COMPOSE_FILENAMES = (
    "docker-compose.yaml",
    "docker-compose.yml",
    "compose.yaml",
    "compose.yml",
)

_DEBOUNCE_S = 2.0


def _service_name(svc):
    return str(svc.get("Service") or svc.get("Name") or svc.get("name") or "?")


def _parse_compose_ps(stdout):
    """Parse ``docker compose ps --format json`` output.

    Tolerates BOTH shapes docker compose emits across versions: a single JSON
    array of service objects, and newline-delimited JSON (one object per line).
    Returns a list of service dicts; unparseable lines are skipped.
    """
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


def _walk_up_for_compose(start):
    """Walk up from ``start`` (<= _COMPOSE_WALK_UP levels) to the nearest dir
    holding a compose file. Returns that directory, or None when none found."""
    try:
        cur = os.path.abspath(start)
    except Exception:
        return None
    for _ in range(_COMPOSE_WALK_UP + 1):
        try:
            for fname in _COMPOSE_FILENAMES:
                if os.path.isfile(os.path.join(cur, fname)):
                    return cur
        except Exception:
            return None
        parent = os.path.dirname(cur)
        if parent == cur:
            break
        cur = parent
    return None


def _resolve_compose_root(tool_input):
    """Best-effort compose root: try PROJECT_DIR, then the edited file's dir
    (when absolute). Returns the compose root dir, or None."""
    candidates = [PROJECT_DIR]

    path = (
        tool_input.get("file_path")
        or tool_input.get("notebook_path")
        or tool_input.get("path")
    )
    if isinstance(path, str) and path.strip():
        p = path.strip()
        if os.path.isabs(p):
            base = p if os.path.isdir(p) else os.path.dirname(p)
            if base:
                candidates.append(base)

    for start in candidates:
        if not isinstance(start, str) or not start.strip():
            continue
        root = _walk_up_for_compose(start)
        if root:
            return root
    return None


def _debounce_ok(root):
    """Per-compose-root debounce via a tempfile holding the last run time.
    Returns True (and records now) when >= _DEBOUNCE_S has elapsed; False to
    skip. Any state-file error errs toward proceeding (records now, returns
    True)."""
    state = os.path.join(
        tempfile.gettempdir(),
        "tediux_selfheal_" + hashlib.sha1(root.encode()).hexdigest()[:12],
    )
    now = time.time()
    try:
        with open(state, "r") as fh:
            last = float(fh.read().strip())
        if (now - last) < _DEBOUNCE_S:
            return False
    except Exception:
        pass
    try:
        with open(state, "w") as fh:
            fh.write(str(now))
    except Exception:
        pass
    return True


def _run(cmd, cwd, timeout):
    """Run a subprocess. Returns (rc, stdout, stderr); rc=-1 on any failure."""
    try:
        proc = subprocess.run(
            cmd,
            cwd=cwd,
            timeout=timeout,
            capture_output=True,
            text=True,
        )
        return proc.returncode, proc.stdout or "", proc.stderr or ""
    except Exception as exc:
        return -1, "", str(exc)


def _find_crashed(services):
    """(name, display-state) for each exited/dead/unhealthy service."""
    crashed = []
    for svc in services:
        state = str(svc.get("State", "")).lower()
        health = str(svc.get("Health", "")).lower()
        if health == "unhealthy":
            crashed.append((_service_name(svc), "unhealthy"))
        elif state in ("exited", "dead"):
            crashed.append((_service_name(svc), state))
    return crashed


def main():
    try:
        data = json.load(sys.stdin)
    except Exception:
        sys.exit(0)

    try:
        tool_name = data.get("tool_name", "")
        if tool_name not in _MUTATING_TOOLS:
            sys.exit(0)

        tool_input = data.get("tool_input", {}) or {}
        if not isinstance(tool_input, dict):
            tool_input = {}

        root = _resolve_compose_root(tool_input)
        if not root:
            sys.exit(0)

        if not _debounce_ok(root):
            sys.exit(0)

        rc, out, _err = _run(
            ["docker", "compose", "ps", "--format", "json"], root, _PS_TIMEOUT_S
        )
        if rc != 0:
            sys.exit(0)

        services = _parse_compose_ps(out)
        crashed = _find_crashed(services)
        if not crashed:
            sys.exit(0)

        service, state = crashed[0]
        _lrc, lout, lerr = _run(
            [
                "docker", "compose", "logs", "--no-color",
                "--tail", str(_LOG_TAIL_LINES), service,
            ],
            root,
            _LOGS_TIMEOUT_S,
        )
        logs = (lout or lerr or "").strip() or "(no logs available)"
        if len(logs) > 4000:
            logs = logs[-4000:]

        text = (
            "A service in your preview just failed after that edit: "
            "{service} is {state}. Recent logs:\n{logs}\n"
            "Fix the cause and make sure the preview is serving again."
        ).format(service=service, state=state, logs=logs)

        print(json.dumps({
            "hookSpecificOutput": {
                "hookEventName": "PostToolUse",
                "additionalContext": text,
            }
        }))
        sys.exit(0)
    except Exception:
        # Advisory hook: never break the turn.
        sys.exit(0)


if __name__ == "__main__":
    main()
