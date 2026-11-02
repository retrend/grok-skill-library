---
name: 'Orchestrate deep, not broad'
description: >-
  Use this when deciding how to parallelize agents — favor going deeper on one
  or a few problems (best-of-N, adversarial review, multi-repro,
  model-by-workload) over breadth across many unrelated tasks.
---
# Steps
1. Prefer depth over breadth when orchestrating many agents in parallel: go deeper on a single or a few problems to maximize chances of great results.
2. Use depth-oriented parallel patterns named in the extract:
   - Best-of-N style races to find the best solution
   - Adversarial review
   - Multiple agents trying to repro a reported issue
   - Different models for different types of workloads
3. Do not context-switch across many agents working on many different problems at once; the bottleneck remains the human trying to remember and keep in their own context window what each agent is doing. [PLACEHOLDER: UI/tooling that may later ease this — extract notes better UI may help, no concrete tool named].
4. Climb the trust / perspective ladder: with little trust, micromanage each agent; with more trust, delegate more (same as managing people). Quote grounding from extract: "code is not cheap" (@mattpocockuk).

## Anti-patterns
- Orchestrating many agents broadly across ~10 different problems while you are still the context bottleneck.
- Parallelizing widely before you have enough trust to stop micromanaging every agent.

## Source
- https://x.com/poteto/status/2048092593087721736, @poteto, Sat Apr 25 17:31:40 +0000 2026 (2026-04-26 03:31 AEST)
