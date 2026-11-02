---
name: Prime context with indirect prompts and compound skills
description: >-
  Use this when researching, planning, prototyping, or architecting with pstack
  — especially to draw intent out of the agent (/teach, /how, /why, /recall),
  compound context across skills, or run /architect before large changes.
---
# Steps
1. Prime the agent's context window with high-quality context. Two common failure modes: (1) under/poorly specified intent; (2) not enough context to do the work correctly. Outcomes are better when agents get everything they need for a high-quality job.
2. Use the indirect prompt: instead of telling the agent exactly what you want, draw it out in its own words. Example after a Slack report:
   - `/poteto-mode read this slack thread. restate in your own words and in plain english what you think the underlying issue is`
   - Effects: compresses noisy conversation into a structured problem statement; catches misunderstandings before code; avoids leading the agent with your own (possibly wrong) assumptions.
3. Build shared mental models with `/teach`, which under the hood calls `/how` and `/why`:
   - `/how` — traces runtime mechanics; assesses subsystem complexity; if multi-directory/service, spawns parallel explorer agents on fast efficient models (e.g. Grok). Example: `/how is virtualization implemented?`
   - `/why` — investigates motivation/intent; queries historical evidence in parallel across sources named in the extract: Git history and PR review comments, Linear tickets, Notion design docs, Slack conversations, Datadog monitors, Sentry errors, code lineage, analytics warehouse events. Example: `/why are we still stuck an old version of node.js?`
   - `/teach` example: `/teach me why you implemented it this way and not <other way>. what were the tradeoffs you made and why?` — restating for you also forces the agent to back claims with data/code.
4. Recover cross-conversation context with `/recall` (past transcripts as gold mine). Example: `/recall the work i did yesterday on virtualization and then read this bug report on slack`
5. Plan through code / working backwards (readme-driven for shared packages): craft the readme/tutorial first (developer-experience hat), then work backwards to implementation. Use `/technical-writing` (Diátaxis: Tutorial, How-to guide, Reference, Explanation) plus `/unslop` for readable docs. A written plan gives agents a concrete target to check work against.
6. Compound context in design-phase prompts. Example multi-step compound from the extract:
   - (1) `/recall my work fixing virtualization bugs and perf issues from the past 7 days. use /how and /why to understand how our current virtualization implementation works.`
   - (2) `then use /poteto-mode planning and /technical-writing to come up with a new virtualization engine that categorically eliminates flickering and jittering. let's start by writing a tutorial on how i would use this new package to virtualize a React app`
   - (3) `after you write the plan, /teach me and prove to me why this new approach is superior to our current engine` (proof relies on high-quality verification skills)
7. Prefer empirical prototyping over accepting the first design or overcooking abstract plans. `/poteto-mode` playbooks are reference files conditionally loaded by task type (not separate skills). Examples:
   - `/poteto-mode prototype a few options for the new dropdown menu`
   - `/poteto-mode fix this bug`
   - `/poteto-mode eval this skill change`
   - Visual/feature prototype: `/poteto-mode prototype a few options for <feature request>. use /control-app and take videos/screenshots for me to review and choose from` (`/control-app` = verification skill from Pt.1). Throwaway sketches or switcher variants; drive with `/control-app`; screenshots; measure timing/layout.
8. For bigger changes, use `/architect` phases as described:
   1. Ground the problem — `/how` and `/why` over affected systems
   2. Sketch — architecture arena; independent candidate runners in parallel (often different model families); each drafts usage sketch, core types, public signatures, concise rationale; evaluate interface depth, failure modes on weak models, design red flags catalog
   3. Cross-judge and synthesize — different model than main agent; strict rubric
   4. Implement against the sketch — replace placeholders; surface unexpected params/state discrepancies
   5. Scrap when the design is wrong — throw away and start over if empirical proof shows architecture wrong (e.g. same workaround across unrelated call sites; types need `any` or forced casts)
   - Prompt form: `/architect this new <feature request>`
9. If you need a tactical planning doc after a design you're happy with: `/poteto-mode turn this design into a plan` (multi-phase planning playbook; every task structured around proof and verification — tests alone are not sufficient; verify by actually running the code). Plans checked by an automated structure/formatting script; execute item by item with small self-contained PRs. For week-scale work, optionally commit plans temporarily then delete when done — [PLACEHOLDER: where plans live in your repo]. Do not keep plans permanently if that leaves confusion.
10. Example end-to-end prompts from the extract:
    - Ambiguous bug: `/poteto-mode investigate why background workers periodically fail with timeout errors. give me a breakdown of what we know, what data you used, and your best hypotheses.`
    - New service boundary: `/poteto-mode we need to add rate limiting for external webhooks. /architect this first, and answer any open questions with prototypes. let me review before proceeding.`
    - Multi-PR migration: `/poteto-mode create a plan to migrate our entire UI library to StyleX. break the migration into small, verifiable PRs. each PR must have its visual regression tests and live verification steps. i want the final result to be 100% identical compared to the original - bugs included`
    - Slack with enough context: `/poteto-mode do it` or `/poteto-mode repro this with /control-app. if it repros on main, fix it and show me a video as proof` (many skills already auto-used by `/poteto-mode`)

## Anti-patterns
- Micromanaging exact implementation when frontier models can solve better given goals and freedom.
- Stating your own assumptions/hypotheses first and leading the agent down a wrong path.
- Accepting the agent's first design without prototyping / measuring.
- Overcooking abstract plans without empirical evidence; reviewing abstract plans adversarially (agents hallucinate theoretical risks and invent edge cases for problems that will never happen).
- Using harness "plan modes" that over-specify implementation details and under-specify everything else.
- Treating lengthy abstract plans as progress (illusion of productivity without substance).

## Source
- https://x.com/poteto/status/2097732320606507506, @poteto, Wed Sep 09 17:02:13 +0000 2026 (2026-09-10 03:02 AEST)
