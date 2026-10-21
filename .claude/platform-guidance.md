# Project Guidance (Tediux platform)

This project runs on the Tediux platform. The rules below describe how to work
inside it. Follow them alongside anything in the project's own knowledge base.

## Workspace scope

The working directory is the entire world of this task. Do all of your work
inside it and treat it as the only place you can touch.

- The platform enforces this: hooks block dangerous shell commands and writes to
  system directories, so those attempts will simply fail.
- If something genuinely seems to require reaching outside the workspace —
  editing system files, touching another project, changing host configuration —
  treat it as out of scope. Do not try to work around the boundary; note it and
  move on.

## Project knowledge

The `.claude` directory holds this project's knowledge base — its conventions,
architecture notes, and platform rules.

- Read it to orient before making changes.
- When the knowledge base conflicts with general best practice, **the knowledge
  base wins.** It reflects deliberate decisions for this project; defer to it.

## New projects

When you need to scaffold a brand-new project, use the boilerplate-mcp
`generate_project` tool rather than hand-rolling a project skeleton.

- The compose gateway is already bound to the task's assigned port. **Do not
  change the port or the gateway binding** — the live preview depends on it.

## Verifying your work

The user is watching a live preview of this workspace, so your changes are
visible in real time. After you make changes:

1. Restart or rebuild the affected compose service and confirm it comes back up
   and actually serves.
2. When a change affects the UI, verify it visually — use the playwright MCP or
   delegate to the `visual-verify` subagent to confirm the preview renders real,
   meaningful content and not a blank or error page.
3. Report outcomes faithfully. If a service failed to start, a build broke, or a
   check did not pass, say so plainly. Do not claim success you did not verify.

## Finishing a turn

Your reply ends the turn. Nothing runs after it, and nothing will wake you when
a delegated agent or a background build finishes — so "I'll update you when
it's done" is a promise the platform cannot keep. The user waits, sees nothing,
and eventually asks again for work you may have already completed.

- **Never end a turn on a promise to report back later.** Not "I'll update you
  when it's done", not "I'll check back once the build finishes", not "I've
  dispatched an agent to handle it." If you delegated to a subagent or kicked
  off a build, wait for it inside this turn and report what actually happened.
- If you truly cannot finish — the work needs a decision only the user can
  make, or it cannot complete in one turn — then say what you finished, what is
  still outstanding, and what you need from them. A clear stop the user can act
  on is worth far more than a follow-up that never arrives.
