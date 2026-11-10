---
name: Find implicit state machines in a codebase
description: >-
  Use this when you want an agent to hunt down implicit state machines in an app
  or game codebase, define each one, and return a short list plus a longer doc.
---
# Goal
Surface every implicit state machine in the code so you can decide which ones need a clearer design, a diagram, or a later conversation.

# Inputs
- The repository (or part of it) to search
- How many parallel subagents your coding tool allows, <MAX_SUBAGENTS>
- Optional focus: app, game, or a named package

# Steps
1. For a first pass, use Steve Ruiz's short prompt:

```
find all of the implicit state machines in my app
```

2. For a thorough pass, use Jamon Holmgren's prompt (transcribed from the screenshot on his reply). Swap "game code base" for "app" or a package name, and "SWE-2 max subagents" for your tool's maximum parallel subagents:

```
Find all of the implicit state machines in my game code base. Define it, use SWE-2 max subagents to spider through all the scripts massively in parallel, and then evaluate their findings and decide what requires further thought, and come back with a list summary (title + brief description + most important code files) + a doc with more details if I want to read more, or we want to talk more about them.
```

3. Before the agent starts, have it define what counts as an implicit state machine in this repo: flags, status enums, boolean combos, scattered transitions, ad-hoc phase variables. (added, not in source: Jamon says "Define it" but gives no definition)
4. Launch parallel subagents to spider the scripts. The parent agent evaluates their findings and keeps only the machines that need further thought.
5. Ask for two artefacts:
   - A list summary: title, brief description, and the most important code files for each machine.
   - A longer doc with more detail, for reading or a follow-up discussion.
6. Review the list yourself before refactoring anything. Finding a machine is not deciding to rewrite it. (added, not in source)

# Success check
- Each listed machine has a title, a short description and file paths.
- A longer doc exists for the ones that need more thought.
- You can open the cited files and recognise the states and transitions described.

# Failure modes
- The agent labels ordinary branching as a state machine.
- Parallel subagents report the same machine under different names. Merge them in the parent pass. (added, not in source)
- "SWE-2" is the model or subagent mode named in Jamon's screenshot. If your tool lacks it, use your own maximum parallel subagents.

# Anti-patterns
- Asking only for a diagram with no file paths.
- Refactoring every machine the search returns in one pass.
- Treating the one-line prompt as a full architecture review.

# Source
Steve Ruiz (@steveruizok), https://x.com/steveruizok/status/2116552016218710389, 2026-10-31.
Jamon Holmgren (@jamonholmgren), https://x.com/jamonholmgren/status/2116592788263571772, 2026-10-31. The longer prompt was read from the screenshot on Jamon's reply.
