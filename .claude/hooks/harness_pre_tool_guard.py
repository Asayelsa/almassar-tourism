#!/usr/bin/env python3
"""Harness PreToolUse guard.

Reproduces three current PreToolUse behaviors from claude_agent_client.py in one
standalone hook script:
  1. Dangerous Bash command blocklist (substring match).
  2. System-directory write blocklist (path prefix match) for Write/Edit.
  3. Workspace confinement for file-touching tools (realpath boundary check).

Stdlib only; runs standalone (no shared imports). Inert unless the executor sets
TEDIUX_HARNESS_HOOKS=1, which prevents double-running with the in-process hooks.
"""
import json
import os
import sys


def _deny(reason):
    """Print a PreToolUse deny decision and exit 0."""
    print(json.dumps({
        "hookSpecificOutput": {
            "hookEventName": "PreToolUse",
            "permissionDecision": "deny",
            "permissionDecisionReason": reason,
        }
    }))
    sys.exit(0)


def main():
    # ENV-GATE: inert unless the harness executor opts this hook in.
    if os.environ.get("TEDIUX_HARNESS_HOOKS") != "1":
        sys.exit(0)

    PROJECT_DIR = os.environ.get("CLAUDE_PROJECT_DIR") or os.getcwd()

    try:
        data = json.load(sys.stdin)
    except Exception:
        # No parseable input → nothing to decide on.
        sys.exit(0)

    if not isinstance(data, dict):
        sys.exit(0)

    tool_name = data.get("tool_name", "")
    tool_input = data.get("tool_input", {}) or {}

    # 1. Dangerous Bash commands (block_dangerous_commands, :1059) — substring match.
    if tool_name == "Bash":
        command = tool_input.get("command", "")
        dangerous = ["rm -rf /", "sudo rm", "> /dev/sda", "mkfs.", "dd if="]
        for pattern in dangerous:
            if pattern in command:
                _deny(f"Dangerous command blocked: {pattern}")

    # 2. System file writes (block_system_file_writes, :1106) — path prefix match.
    if tool_name in ("Write", "Edit"):
        fp = tool_input.get("file_path", "")
        blocked_prefixes = ["/etc/", "/usr/", "/var/", "/root/", "/bin/", "/sbin/"]
        for blocked in blocked_prefixes:
            if fp.startswith(blocked):
                _deny(f"Cannot write to system directory: {blocked}")

    # 3. Workspace confinement (make_confine_to_workspace_hook, :1139).
    # This block FAILS CLOSED: any exception denies (deviation from the current
    # fail-open behavior, correct for the untrusted staging box).
    if tool_name in {"Write", "Edit", "MultiEdit", "NotebookEdit", "Read"}:
        try:
            path_key = "notebook_path" if tool_name == "NotebookEdit" else "file_path"
            path = tool_input.get(path_key, "")
            if not path:
                # No path to confine → allow.
                sys.exit(0)
            allowed_root = os.path.realpath(PROJECT_DIR)
            target = path if os.path.isabs(path) else os.path.join(PROJECT_DIR, path)
            resolved = os.path.realpath(target)
            if resolved == allowed_root or resolved.startswith(allowed_root + os.sep):
                sys.exit(0)
            _deny(f"Path is outside your workspace: {path}")
        except SystemExit:
            raise
        except Exception:
            _deny("workspace confinement check failed")

    # No decision to signal.
    sys.exit(0)


if __name__ == "__main__":
    main()
