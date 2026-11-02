---
name: Treat verification as critical infrastructure
description: >-
  Use this when creating or maintaining an agent verification skill with pstack
  (/create-verification-skill, Build the Lever CLI, Feature Map,
  /maintain-verification-skill), preferring cloud agents over worktrees, or
  using verification in feature/perf/feedback loops.
---
# Steps
1. Treat a high-quality verification skill as critical infrastructure (not "just" a skill): an agent that can verify its own work closes the loop without you as the bottleneck. Done well, it can amplify whole-team output (including non-engineers).
2. Install pstack, then run `/create-verification-skill`. Optionally add Dr Eggbot (ships with pstack) and ask it to create an engineer bot that runs `/create-verification-skill` and sets up a daily routine for `/maintain-verification-skill`.
3. Prefer a tech stack / runtime that agents can interact with and debug (e.g. Electron/web via Chrome DevTools Protocol; iOS simulator). If the runtime is poor, ask the agent to create tools (e.g. lldb, or a custom sidecar package) or use what you have — [PLACEHOLDER: exact tool list for your stack]. Agentic verification is important enough that building rich debugging tools or choosing a different stack may be worth it.
4. Apply "Build the Lever": prefer giving agents tools rather than just markdown. For verification, create a small CLI that scripts interaction and debugging of your app in an agent-friendly utility (fewer tokens than throwaway click scripts; more reproducible and testable).
5. Design the agent-friendly CLI with these properties (from the extract):
   - API easy to compose (deep modules)
   - Potentially destructive commands have `--dry-run`
   - Subcommands for gradual disclosure
   - Descriptive error messages that say what to do instead
   - Rich `--help` text
   - Machine-readable output (e.g. JSON)
6. Also cover dev experience the CLI should support: seeding a dev database; auth / test users / API calls against test/staging; installing and bringing up the dev environment consistently. Keep the CLI well maintained and tested. Spend time making it good and error-free before advanced work. Hypothetical Electron CLI command examples: [PLACEHOLDER — media in source; not transcribed]. Other example commands: [PLACEHOLDER — media in source; not transcribed].
7. Prefer Cursor cloud agents over local git worktrees for parallelism after the verification skill can land a few PRs:
   - Worktrees: high storage/resources; limited parallel agents on one machine.
   - Cloud agents: real computer; install deps; run app; videos/screenshots; interact like a user. Set up cloud environment (first-build agent help; then snapshot for fast subsequent starts). [PLACEHOLDER: exact cloud environment setup commands for your repo].
8. Create a Feature Map (searchable map of features, what they do, how to get there from a user's perspective):
   - `/create-verification-skill` auto-creates `references/features` alongside a README.md (the map: high-level overview with links to details). Mention Feature Map files in the verification SKILL.md.
   - Agents catalog the app for you — don't write these yourself initially.
   - Treat as "materialized memory": compact form of codebase truth designed to save tokens; shared markdown inside the skill benefits all contributors.
   - Example feature entry shape: [PLACEHOLDER — media in source; not transcribed]. Example verification skill: https://github.com/poteto/verification-skill-example
9. Maintain continuously: run `/maintain-verification-skill` at least once a day so agents have latest control details. Agents may update Feature Map while working; `/maintain-verification-skill` catches what is missed. Keep improving the CLI; invest like critical infra (optional: oncall rotation on it).
10. Usage patterns (with `/poteto-mode`; in Cursor, Opt+Enter on autocomplete can pin `/poteto-mode` as a Custom Mode so the agent is reminded every turn):
    - New features: `/poteto-mode build <description of feature, any useful context>. use /control-app to verify your changes and show me a video and screenshots as proof` (`/control-app` = result of `/create-verification-skill`). In Grok @Bot: spawn a cloud agent to do the same (keeps bot context clean; bot as coordinator).
    - Perf: `spawn a cloud agent to use /poteto-mode to improve the initial loading time of our app. first use /control-app to take a trace of the status quo, and identify opportunities for improvement. then do a targeted fix and use /control-app + a /swarm to confirm the win` (`/swarm` fans out cloud agents to run verification for sample size / fuzz / no-regression).
    - User reports: put verification inside Grok @Bot routines or Cursor Automations (schedule or event). Pipe feedback (e.g. Slack); bots try to reproduce with a cloud agent; if Feature Map/verification is good enough, optionally auto-fix.

## Anti-patterns
- Treating verification as a one-off skill instead of maintained infrastructure.
- Giving agents only markdown instead of a Build-the-Lever CLI.
- Jumping to advanced verification before the CLI is good and error-free.
- Preferring local worktrees for multi-agent parallelism when cloud agents are available after a solid verification/dev setup.
- Letting the Feature Map go stale (skip daily `/maintain-verification-skill`).
- Choosing/keeping a tech stack that is hard to debug and control without investing in agent-usable tooling.

## Source
- https://x.com/poteto/status/2094457600259842065, @poteto, Mon Aug 31 16:09:39 +0000 2026 (2026-09-01 02:09 AEST)
