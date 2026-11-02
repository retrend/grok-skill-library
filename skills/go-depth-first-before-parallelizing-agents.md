---
name: Go depth-first before parallelizing agents
description: >-
  Use this when building agent workflows, teaching agents rigor with pstack
  /poteto-mode playbooks, or before parallelizing agents you do not yet trust.
---
# Steps
1. Treat agents like new hires in a constant state of amnesia: equip them with rules, skills, tools, and long-term memory rather than expecting them to remember or learn on their own.
2. Prefer depth-first agent orchestration over breadth-first parallelization. Naive parallelization makes agents write slop faster when there is no rigor.
3. Install and use pstack (personal skills and engineering principles). Prefix prompts with `/poteto-mode` whenever you need rigor; it is a higher-order skill that gives agents the right playbook for a given task. Goal: maximum impact with the least amount of code (not maximal LOC).
4. Apply experienced-engineer playbooks via `/poteto-mode` (examples from the extract):
   - Debugging: binary-search the problem space; form hypotheses; systematically rule them out; if hard to repro, synthetically force the bug or add instrumentation/console logging.
   - Playbook areas shipped with pstack: skill authoring and evals; working autonomously; bug fixes and runtime forensics; feature development; visual parity and prototyping; and more.
5. Optionally invoke on-demand skills as needed (names only as listed):
   - `/how` — walkthrough of how a subsystem actually works
   - `/why` — why something was built this way (queries evidence categories in parallel via available MCPs: source control, issue tracker, long-form docs, real-time chat, infra observability, error tracking, analytics warehouse)
   - `/architect` — settle types and data structures before code that crosses a function boundary
   - `/arena` — N parallel attempts, then grab the best parts of each
   - `/interrogate` — different models adversarially review something
   - `/tdd` — failing test first, then the fix
   - `/unslop` — clean up AI writing; speak plainly
   - `/reflect` — continually improve skills after long conversations
   - `/figure-it-out` — design a rigorous, auditable playbook for unusual tasks
   - `/show-me-your-work` — reviewable decision trail logged to a TSV you can commit
   - `/automate-me` — mine recent transcripts, draft a your-mode skill from how you've worked, route through pstack
6. Dial up trust before parallelizing: the bottleneck with agents is verification. Unless you can trust an agent to own a problem end-to-end (including verification), do not automate or parallelize processes. Trying to parallelize agents you don't trust yet wastes tokens and introduces more slop.
7. Use multi-model workflows where available (e.g. switch models on the fly; spawn subagents of different models) for depth-first orchestration, not for writing more code faster.
8. (Optional advanced — only after trust exists) Benny-style maintenance factory pattern as described:
   - Give cloud/automation bots the same pstack skills.
   - Triage: collect bug reports; understand images/video; explore codebase with pstack; chat for reproduction steps when unclear.
   - Create a ticket from code, git history, Slack, Notion (bug vs designed behavior).
   - Another bot picks up via `/orchestrate`: reproduce through computer use; fix if consistent repro; for perf, before/after CPU traces and heap snapshots; subplanners spawn workers to verify against the ticket; workers take before/after video; open PR with video in description.
   - Key: without clear reproduction steps, agents can only guess — do not skip triage.

## Anti-patterns
- Focusing agent workflows on running multiple CLIs in a GUI (you, the human, as orchestrator) instead of building trust in agents.
- Naive parallelization before rigor and verification trust exist.
- Letting agents sycophantically write large amounts of code without rigor.
- Automating a software factory (e.g. Benny) before agents can own problems end-to-end including verification.

## Source
- https://x.com/poteto/status/2058975157503570132, @poteto, Mon May 25 18:15:06 +0000 2026 (2026-05-26 04:15 AEST)
