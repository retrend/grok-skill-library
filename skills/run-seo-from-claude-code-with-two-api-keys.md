---
name: Run SEO from Claude Code with two API keys
description: >-
  Use this when a SaaS or service business wants keyword research, a content
  calendar, per-vertical landing pages and a competitor link-building list from
  Claude Code, using a Keywords Everywhere key and a DataForSEO key.
---
# Goal
Replace an agency SEO retainer with one agent session driven by two API keys: keyword universe, competitor gaps, content calendar, per-vertical pages, link targets.

# Inputs
- [KEYWORDS_EVERYWHERE_API_KEY] and [DATAFORSEO_API_KEY], stored in a `.env` file the agent reads (never pasted into chat or committed).
- [SEED_KEYWORDS] and [YOUR_DOMAIN]
- [COMPETITOR_DOMAINS]: three or more
- [VERTICALS]: the industries you serve (the demo used 20)

# Steps
1. Put both keys in `.env`. Add `.env` to `.gitignore`. (added, not in source)
2. Keyword universe. Use Keywords Everywhere to pull related keywords and "people also search for" for each seed. Dedupe and save to a file with volume. The demo shows about 4,800 keywords.
3. Gap analysis. Send the keywords to the DataForSEO SERP API. For each one record who ranks (your domain plus [COMPETITOR_DOMAINS]) and flag keywords where no competitor ranks well. Those are the gaps. [Check DataForSEO docs for exact endpoints and per-call cost first.]
4. Content calendar. Cluster the gap keywords by intent or page type (pricing, "best for", vs, alternatives, integrations, templates, how-to, FAQ and so on). Lay them out as a week-by-week plan, one page per working day.
5. Vertical pages. For each of [VERTICALS], find long-tail keywords, then draft one unique page per vertical with structured data (schema) included. Each page needs real vertical-specific content, not a swapped industry name. (added, not in source)
6. Link building. Use DataForSEO's domain intersection to list every domain linking to two or more competitors but not to you. Rank by how many competitors each links to (the demo shows 3/3 and 2/3).
7. Review gate. Show the keyword file, calendar, page drafts and link list for human review before publishing anything or contacting any site. (added, not in source)

# Success check
- A saved keyword file, gap list, calendar, page drafts and ranked link list exist.
- Gap keywords really show no strong competitor in the SERP data.

# Failure modes
- API costs: DataForSEO charges per call. Check pricing and cap the batch size before step 3. (added, not in source)
- Thin templated vertical pages risk being treated as low-quality or duplicate content. (added, not in source)
- Search volume and SERP data are snapshots. Re-pull on a schedule.

# Not for
- Publishing pages or sending link-building outreach without review.
- Sites with no competitors to compare, or work that needs a GSC-first approach (see the striking-distance skill).
- Treating the post's "agency retainer in 2 API keys" as a verified result. It's the author's claim.

# Source
Cody Schneider (@codyschneider), https://x.com/codyschneider/status/2116274004684136742, 2026-10-30. Post promotes Graphed (the author's product); the method itself uses Keywords Everywhere and DataForSEO. The attached video is a motion-graphic, not a screen recording.
