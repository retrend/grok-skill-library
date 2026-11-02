---
name: Arm Claude Code as your growth org
description: >-
  Use this when turning Claude Code (or a similar coding agent) into a growth
  org — wire UGC/video ads, waterfall email enrichment, SERP/keyword research,
  creator scraping, and SEO/link APIs (or one aggregator login) so the agent can
  run marketing jobs end to end.
---
# Steps

1. **Decide the goal.** Treat Claude Code (or an equivalent coding agent with terminal + MCP/browser access) as a growth org — not a chat buddy. List the jobs you want it to own: creative ads, email enrichment, keyword research for blog posts, creator scraping, link-building research.

2. **Wire the minimum marketing tool belt** (names as in source; swap to current equivalents if renamed):
   - **UGC / video ads:** Higgsfield with Seedance 2.5 (or your stack’s Seedance path) so the agent can generate short ads.
   - **Email enrichment (waterfall):** Findymail → LeadMagic → Apollo (or the same waterfall via one aggregator). Agent tries providers in order until it gets a deliverable email.
   - **SERP / keyword research for content:** Serper.dev so the agent can research what to write for a target keyword before drafting.
   - **Creator / social scrape:** Apify actors for creator profiles and related social data.
   - **Link / SEO research:** DataForSEO API for backlink and SEO intelligence the agent uses to pick link targets.

3. **Provision access two ways (pick one):**
   - **A — Own subscriptions:** Buy each provider, put API keys / MCP / CLI auth where the agent can use them, document which tool maps to which job.
   - **B — Aggregator:** Use a single agent tools catalog (source CTA: http://graphed.com/tools) so the agent discovers, runs, and pays-per-call across many providers with one login instead of N seats. Prefer this when you do not want to manage every vendor key.

4. **Give the agent a short ops brief**, not just keys. In the project/agent docs, spell out:
   - Allowed tools and which job each covers
   - Waterfall order for enrichment
   - Budget / rate limits / “ask before paid run over $X”
   - Output formats (CSV/JSON paths, Notion rows, draft copy location)

5. **Smoke-test one job per tool.** Example prompts the agent should complete without you mid-clicking:
   - “Generate a Seedance 2.5 UGC-style ad for [offer] via Higgsfield / video tool.”
   - “Waterfall-enrich these [N] leads for work email.”
   - “Research SERP + angles for keyword [X] via Serper, then outline the blog post.”
   - “Scrape creator profiles for [niche] via Apify.”
   - “Pull link / SEO candidates for [domain or keyword] via DataForSEO.”

6. **Only then scale.** Once each path works once, batch runs and let the agent chain jobs (research → enrich → creative → draft) under the budget rules in step 4.

## Success check

- Agent can run each named capability without you pasting keys mid-task.
- Enrichment uses a defined waterfall, not a single brittle provider.
- Content jobs start with SERP research, not cold drafting.
- You have either per-vendor auth documented or one aggregator login wired.

## Anti-patterns

- Not a “buy Graphed” pitch skill — Graphed is one optional access path; the method is arming the agent with growth tools.
- Do not dump every API key with no ops brief or budget caps.
- Do not skip smoke tests and jump to unsupervised paid batches.
- Do not treat this as Meta Ads API rate-limit advice (see warehouse-meta-ads skill for that).

## Source

- https://x.com/codyschneider/status/2103952782373830931
- @codyschneider (Cody Schneider), Sep 26, 2026
- Tools CTA referenced in post: http://graphed.com/tools
- Demo video attached to the post (short clip; method is in the note text)
