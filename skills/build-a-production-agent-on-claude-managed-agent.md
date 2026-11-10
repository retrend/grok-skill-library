---
name: Build a production agent on Claude Managed Agents
description: >-
  Use this when you are designing or building a hosted, long-running Claude
  agent (Claude Managed Agents, the Agent SDK, or your own harness) and need the
  architecture, multi-agent setup, scheduling, memory, credential handling,
  evals and multi-customer layout right.
---
# Steps

## 1. Design: split session, brain and hands
1. Keep three separate parts, never one container:
   - **Session**: an append-only log of every event. The only durable piece; protect it.
   - **Brain**: the harness (tool loop, context management) plus the model. Replaceable.
   - **Hands**: sandboxes, MCP servers, tools. Provisioned on demand, discarded after.
2. Recovery rules:
   - Sandbox dies: return it to the model as a failed tool call; let it reprovision or continue.
   - Harness dies: start a new one, read the session log, resume from the last event.
3. Never rewrite the log for compaction. Compaction only picks what goes into context (summary, last N events), so you can change the strategy later.
4. Start inference before any sandbox exists; spawn a sandbox only when the model needs one. One container per task to limit blast radius.
5. Write down the harness's model-specific assumptions (for example a context reset for a model that rushes near its context limit). Re-check them, with evals, on every model change and delete what's no longer needed.

## 2. Credentials
6. Credentials never enter the sandbox. Put a placeholder there; a proxy or vault swaps in the real secret at egress, only for hosts allowed for that secret. In Claude Managed Agents: create a vault, add secrets (env vars, MCP OAuth), pass the vault ID on the session.
7. Restrict environment networking to the domains and MCP servers the agent needs. Unrestricted is for demos only.

## 3. Build the basic agent (Claude Managed Agents API)
8. Create an **environment**: sandbox template, networking rules, packages (installed once at creation, cached; must come from public registries, uploaded files, or attached GitHub repos).
9. Create an **agent**: name, model, system prompt, tools (start with the default agent toolset: read, write, grep and similar).
10. Create a **session** with `<AGENT_ID>` and `<ENVIRONMENT_ID>`. It idles until it gets an event.
11. Talk over the event stream: send `user.message`; handle custom tool use events and return custom tool results; watch for idle, errors and interrupt. For a UI, have your backend listen to the SSE stream and re-stream to the browser.
   - Shortcut: Console > Managed Agents > Quick Start, describe the agent in one sentence, review the proposed prompt, model and tools.

## 4. Upgrade it for real work
12. Add **skills** for domain procedures (for example how to call `<DATA_SOURCE>` and its required identity). Skills are live: new sessions pick up edits.
13. Add **sub-agents** with their own prompts, tools and permissions, plus a reference to the main agent itself so it can spawn a copy when no specialist fits. Sub-agents get the prompt, tools and schemas, not the parent transcript, so put all needed context in the delegation.
14. Attach a **memory store** shared across sessions (several can attach, e.g. user-level plus org-wide). Instruct the agent to check memory first and not redo known work.
15. For long async jobs use **Outcomes**: task, rubric, max iterations. A verifier sub-agent grades against the rubric and the agent retries until it passes. Rubrics apply at session level only. Ask for deliverables in a fixed file location and structured format (e.g. a JSON scorecard plus a memory note).
16. Fan out with a custom tool (e.g. `dispatch_<WORKERS>`) that your app server handles by starting one session per item, then aggregating. Each child session keeps its own sub-agents, outcome and memory.
17. Keep the coordinator chatty: put human-in-the-loop or other blocking custom tools on a sub-agent, not the main thread.
18. For a team chat (Slack-like): one session per thread, prefix each `user.message` with who said it, give the agent an explicit post tool instead of mirroring every reply.

## 5. Schedule and self-improve
19. Recurring work is a **deployment**: agent, schedule (`<CRON>`), initial messages, attached memory stores, repos or files. Each fire creates a session; you can also trigger a run on demand via API. Memory is shared only where you attach it.
20. **Dreaming** (research preview): pick a memory store, a model, optional instructions and a time window of past sessions (e.g. 30 days). It reviews those transcripts and updates the memory store (e.g. notes on gaps in a skill). Run your own evals before trusting the update; a majority of sessions can agree on a wrong lesson.

## 6. Evals, CI and many customers
21. Build an eval set from historical sessions and their results; data quality matters more than tooling. Rerun it after any model, prompt or harness change. Run datasets as many parallel sessions.
22. Code review in CI: on each PR, start one or more sessions with sub-agents to review the diff; optionally run the app in the sandbox and have the agent QA it with a browser.
23. Multi-tenant layout:
    - Don't use end users' own API keys; you lose observability.
    - Keep the agent definition as YAML in your repo and sync it to every workspace through CI.
    - Legal data separation: one workspace (or org) per customer. Otherwise one workspace with per-customer agents, or one shared agent with `customer_id` in session metadata.
    - Everything in a workspace is visible to all its members and keys; enforce finer access in your app.
24. Observability: consume the full event stream (console transcript and debug views, or the events API) and export it yourself. Add a status-update tool for long runs if humans need progress.

# Success check
- Killing the harness or sandbox mid-task loses no work.
- The model never sees a real token.
- A long job ends with the rubric passed, the deliverable in its set location and memory updated.
- Evals pass after each model or harness change.

# Source
- Anthropic workshop "Claude Managed Agents with Opus 5.5", AI Engineer World's Fair 2026, by Priyanka Phatak and Gabe Cemaj (Anthropic). Names from the event's talk pages.
- Workshop repo: https://github.com/anthropics/cwc-workshops/ (research-desk)
- Shared by adon (@F5Adon), 9 Nov 2026: https://x.com/F5Adon/status/2119829189683716489 (94-min captioned recording, transcribed locally)
- Product talk by the vendor. Unverified speaker claims: ~90% faster time to first token, "significant improvement" from dreaming, faster PR review internally.

# Anti-patterns
- One container holding log, harness and sandbox (a "pet" you can't lose or debug).
- Secrets inside the sandbox or in the prompt.
- Rewriting the event log when compacting.
- Expecting sub-agents to know the parent's conversation.
- Blocking the main coordinator on a custom tool.
- Trusting dreamed memory updates without evals.
- Mixing customers who need legal separation in one workspace.
- Hard-coding a fixed sub-agent topology when the model can choose; the speakers say letting it choose did better (no figures given).
- Assuming spend caps, session rewind or fork, sub-agent-level rubrics, fine-grained access control, non-Claude models, Bedrock or on-prem exist; none did at the time of the talk.
