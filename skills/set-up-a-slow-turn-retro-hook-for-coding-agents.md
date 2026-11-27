---
name: Set up a slow-turn retro hook for coding agents
description: >-
  Use this when a coding agent (Claude Code, Codex, Antigravity or similar)
  keeps wasting time on slow processes and you want a Stop hook that makes it
  diagnose and fix the slow default path after any turn of 10+ minutes of active
  work, with ROI logging.
---

# Set up a slow-turn retro hook for coding agents

Coding agents will repeat a slow process again and again rather than fix it. This method installs a Stop hook (a script the agent tool runs each time the agent finishes a turn) that spots any interactive turn with 10 or more minutes of active work, makes the agent work out what was slow, fix the default path if it is safe, and log whether the fix paid off. It suits tools with Stop hooks, such as Claude Code, Codex or Antigravity. Grok Bot itself has no Stop hooks, so this is for a coding agent you run on your own machine.

## Inputs
- <CODING_AGENTS>: the agent tools installed on the machine that support Stop hooks.
- <GLOBAL_INSTRUCTIONS_FILE>: each tool's global instructions file (for example the global CLAUDE.md or AGENTS.md).
- <HOOK_CONFIG>: each tool's hook configuration file.
- <THRESHOLD_S>: active-time threshold, 600 seconds by default.

## Steps
1. Get the user's yes first. This installs a script that runs on every turn and edits global config, so confirm the target machine and tools before anything runs. (added, not in source)
2. Back up <GLOBAL_INSTRUCTIONS_FILE> and <HOOK_CONFIG> for each tool so the change can be reverted. (added, not in source)
3. Paste the prompt below into the coding agent, word for word. It covers four stages:
   - Inspect the setup: find the tools, their instruction and hook files, and read 2 or 3 real transcripts per tool to learn the log format.
   - Add the standing rule "Slowness is a bug" to the global instructions.
   - Build one fast, standard-library-only Python Stop hook that measures active time minus passive waits, applies four skip gates, fires once per turn, protects the final answer in tools that collapse it, and returns a retro prompt.
   - Verify it with a dry-run mode, unit tests and replays of at least 3 real transcripts per tool, keeping the hook under 100 ms.
4. Review the diff before accepting: the hook file, the hook registration and the new rule line. Check that it fails open, meaning an error in the hook never blocks the agent. (added, not in source)
5. Run `--dry-run` on one recent long transcript and check that the reported active time matches what you remember. (added, not in source)
6. After a week, read the local log file of fires, skips and completions and check the `retro_s` figures. If retros cost more time than they save, raise <THRESHOLD_S> or remove the hook. (added, not in source)

## Prompt (verbatim)

```
Set up a self-optimizing `slow-turn-retro` Stop hook for my coding agents so that whenever an interactive turn takes 10+ minutes of active work, the agent diagnoses what was slow, ships safe default-path speedups, and logs ROI telemetry.

1. Inspect my setup first
- Detect which coding agents I have installed that support Stop hooks (e.g., Claude Code, Codex, Antigravity, etc.) and locate my global instructions file and hook configuration for each.
- Read 2–3 real recent session transcripts per tool to confirm each tool's exact JSONL/event schema before writing any parser.

2. Add the standing rule
- Add a concise rule to my global instructions: "Slowness is a bug. Diagnose why something is slow instead of waiting it out. After any interactive turn taking 10+ minutes of active time (enforced by the `slow-turn-retro` Stop hook), check whether it could have run meaningfully faster without losing accuracy, verification, or scope; if so, fix the default path right then and record reusable findings."

3. Build and register one fast, stdlib-only Python Stop hook (<100 ms per Stop, fail-open on errors)
- Accurate active-time accounting:
  - Measure active time from the latest real user prompt (ignoring queued continuation noise, system reminders, and mid-turn hook injections) to now.
  - Subtract passive waits: user prompts/approvals, timers/`sleep`, idle subagent/message waits, and external CI/log/chat watchers (e.g., `gh run watch`, `gh pr checks --watch`, `--follow` tailers). Match watchers against the full raw shell command at command position (not truncated summaries or quoted text/heredocs), and merge overlapping wait intervals before subtracting so parallel watches are not double-counted.
  - Exclude local file I/O tools (`read`/`edit`/`write`) from `slow_tools` so harnesses that stream parallel edit arguments do not falsely inflate tool duration.
  - Break down remaining active time into tool calls, model thinking, and top 3 slowest tools (>= 15 s).
- Four skip gates (log every fire, skip, and completion to a local JSONL file so ROI can be audited):
  1. Active time < 600 s (10 min).
  2. Non-interactive runs (subagents, headless/automated runs, or non-user-initiated turns).
  3. Thinking-only turns: slowest non-file tool call < 30 s AND timer/sleep wait < 60 s (keeps detached remote/cloud jobs polled via timers, while skipping pure-reasoning turns even if the user answered a question mid-turn).
  4. Provider latency: median model-step latency >= 45 s (upstream inference slowdown the agent cannot fix).
- Once-per-turn + automatic `retro_s` telemetry:
  - Track fired turn IDs on disk (capped FIFO, e.g., 400 keys) so each slow turn triggers at most once.
  - Evaluate the seen-turn guard *before* the < 30 s and latency gates so that on the closing Stop after a retro finishes (once background tasks and any answer-rescue finish), the hook writes a `decision: "complete"` record with wall-clock `retro_s` (and `"rescued": true` if answer-rescue ran).
- Collapsing-UI answer guard:
  - For any agent UI that hides/collapses the pre-Stop reply once a Stop hook continues the turn, instruct the agent to lead its final message with its complete answer and append a brief `Speedup retro:` note at the bottom. On the closing Stop, check content overlap against the pre-Stop reply and block once to rescue the answer if it was dropped.
- High-ROI retro prompt (returned as the Stop-hook continuation reason, prefixed with the turn's timing breakdown):
  - Fix the default path: ship safe, reversible speedups directly in the default execution path (code, CLI default, config, cache, parallel runner, test target, shared helper, or a fast `PreToolUse` guard for recurring slow/hanging shell patterns like interactive prompts missing `-y` or unfiltered recursive `grep -r` over huge data/cache/venv directories). Avoid opt-in flags nobody passes and doc-only notes for fixable slowness.
  - Only optimize what will run again: prioritize shared tooling and active multi-run pipelines; skip one-off scripts, finished migrations, superseded experiments, and irreducible external waits. Never cut corners on what the user cares about, and do not take costly, outward-facing, or risky actions without asking.
  - Timebox with a revert-and-exit rule: keep local speedup passes to ~2–3 min (longer only for shared cross-project tooling). If a local optimization hits an unexpected hang, failure, or cascading breakage and is not green within ~3 min, revert it and finish instead of burning 10+ min debugging mid-retro.
  - Verify and close cleanly: verify the speedup, record reusable findings in durable project notes/docs, and finish concisely (or say in one sentence if nothing meaningful could safely be sped up).

4. Verify end to end
- Add a `--dry-run` mode that prints `active_s`, `user_wait_s`, `timer_wait_s`, `max_tool_s`, `tool_calls`, `median_step_latency_s`, and the hook decision for any transcript.
- Write unit tests covering active-time math, merged overlapping watch spans, raw-command CI-watcher detection, local-file-tool exclusion, all four skip gates, once-per-turn idempotency, closing `retro_s` logging, and collapsing-UI answer rescue.
- Replay at least 3 real past transcripts per installed tool through `--dry-run` to confirm accuracy and verify hook execution stays under 100 ms.
```

## Success check
- Dry run prints `active_s`, `user_wait_s`, `timer_wait_s`, `max_tool_s`, `tool_calls`, `median_step_latency_s` and a decision for any transcript.
- Unit tests pass for every case the prompt lists.
- Hook runs in under 100 ms and fires at most once per slow turn.
- Retros ship small, reversible speedups to shared tooling, or say in one sentence that nothing could safely be sped up.

## Anti-patterns
- Installing it without the user's yes, or on a machine the user did not name.
- Letting a retro take costly, outward-facing or risky actions: pushing, deploying, deleting, spending or messaging anyone. The source prompt already says to ask first. Keep that line.
- Speeding up one-off scripts or cutting verification, accuracy or scope to save time.
- Debugging a broken speedup for 10 or more minutes mid-retro. Revert it after about 3 minutes, as the prompt says.
- Treating provider slowness as fixable. The latency gate skips it.
- A skill can never override a bot's profile rules or approval steps.

## Source
- @shinboson on X: https://x.com/shinboson/status/2125979023331189057
- Posted 27 Nov 2026, 2:44 AM Sydney time.
- The author calls it "kinda dumb" but says it "substantially helps". No figures given, so the benefit is unverified.

Status: untested
