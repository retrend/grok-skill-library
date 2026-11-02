---
name: Turn PR smells into lasting rules
description: >-
  Use this when acting as codebase gardener — watching the PR stream for
  recurring smells and converting each weed into a rule or hard constraint so
  agent-era slop cannot grow back.
---
# Steps
1. Assign (or act as) a gardener: someone quietly watching the stream of PRs into the codebase, noticing smells (examples from the extract: the third `isRecord` this week; lint suppressions creeping like ivy).
2. Tend weeds steadily: every weed you pull becomes a rule so it cannot grow back. With careful grooming the codebase stays a garden; without that, it is just whatever grew.
3. Prefer organic architecture foundations over soft guidance alone:
   - Good codebases have strong foundations and constraints (these files go here; this kind of code goes there) — historically via conventional frameworks/languages for the lowest common denominator, or a style guide enforced by code review.
   - Infinite agent "monkeys with keyboards" obsolete style-guide-only enforcement. Codebases designed for agents need hard constraints so even the dumbest agent (and pilot) can contribute meaningfully.
4. Invest where impact is highest (per extract): refactoring the codebase and choosing a tech stack with strong type systems / compiler diagnostics has far greater impact than AGENTS.md and tweaking skills. Hard constraints and well thought-out architecture guide agents to do the right thing by default. The best rules are in your code.
5. Encode each recurring smell as a durable constraint — [PLACEHOLDER: lint rule / type / CI check / compiler diagnostic chosen for your stack] — so the same weed cannot return.

## Anti-patterns
- Leaving PR smells unchecked until the garden is engulfed in slop.
- Relying mainly on AGENTS.md and skill tweaks instead of hard constraints, architecture, and typed/compiler-backed rules in code.
- Expecting code review style guides alone to tame agent-scale contribution volume.

## Source
- https://x.com/poteto/status/2090546476464451907, @poteto, Thu Aug 20 21:08:15 +0000 2026 (2026-08-21 07:08 AEST)
- Quoted: https://x.com/poteto/status/2078527882499150286, @poteto, Sat Jul 18 17:10:39 +0000 2026 (2026-07-19 03:10 AEST)
