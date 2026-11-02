---
name: Gate agents with a calibrated classifier
description: >-
  Use this when giving Grok Bots / agents a shared fast calibrated classifier
  (Jev-style) so expensive research, retries, and subagents only run after a
  routing gate.
---
# Idea

Before expensive agent work (research, browse, retries, subagents), run a **fast calibrated classifier** so every agent shares one routing sense: reuse cache, research, escalate to human, stop retrying, etc.

Source: Colin McDermott’s **Grok Bot × Jev** template — “Give all your agents a fast, calibrated classifier.”

# Steps

1. Open the template bot and try it: https://x.ai/bot/lS9XaHCr9QTTHhNtb0VQX
2. Treat classification as a **gate**, not the worker:
   - Classify the incoming task (intent / complexity / whether a fresh artifact can be reused / whether a subagent is needed / whether to stop retrying).
   - Map the result to a cheap action: reuse cache, continue, research (capped), ask human, abort, etc.
3. Wire the same classifier in front of **all** agents that spend tokens on tools, so routing is consistent.
4. Keep hard rules for irreversible actions (send, pay, delete, publish, permission changes): classifier may recommend, but **human approval** is required before those execute.
5. Calibrate over time: log (task → classification → action → outcome) and tighten thresholds when false “reuse” or missed “ask human” shows up.
6. Optional deeper pattern (related public Jev/Grok Bot router writeups): one classifier call answering a small fixed question set, then local thresholds → recommended action; the skill/bot makes the recommendation stick — the classifier itself should not silently pay/delete/publish.

## Success check

- Expensive paths only run after a classify step
- Shared classifier used across agents
- Irreversible actions still need a human path

## Anti-patterns

- Letting every agent free-form “decide” tooling with no shared gate
- Treating the classifier as permission to spend/pay/delete
- Skipping calibration logs
- Not a full clone of Colin’s private bot internals — use the live template + this gate pattern; don’t invent undocumented prompts

## Source

- https://x.com/ColinMcDermott/status/2102057530813735162
- @ColinMcDermott (Colin McDermott), Sep 21, 2026
- Template: https://x.ai/bot/lS9XaHCr9QTTHhNtb0VQX
