---
name: Pull leads from SEO/AEO via GSC striking-distance queries
description: >-
  Use this when turning Google Search Console into SEO/AEO leads: export
  Queries, pull bottom-of-funnel terms in positions 4–20, pick pages to push
  into the top 3–5, then use Claude + an AI Search checklist to prioritize and
  ship ranking-factor updates.
---
# Pull leads from SEO/AEO via GSC striking-distance queries

Turn Google Search Console into a lead pipeline: export query rankings, pull bottom-of-funnel queries in positions **4–20**, pick pages to push into positions **1–5** (ideally top 3), then use Claude + an AI Search checklist to prioritize on-page work and ship changes.

## Inputs

- Access to the site’s **Google Search Console**
- Claude (or equivalent) that can read a Google Sheet
- AI Search checklist: `[AI_SEARCH_CHECKLIST_URL]` (download from the source post’s first comment when available)
- Optional: known competitor and product names to bias matching

## Steps (follow exactly)

1. Open **Google Search Console**.

2. Go to **Performance** (upper-left).

3. Click the **Average position** box (top-middle) so it turns orange.

4. Select **28 days** (last month of rankings).

5. Click **Export** (upper-right) → **Google Sheets**.

6. Open the **Queries** tab of the Sheet:
   - Freeze row 1
   - Right-click the **Position** column → **Sort sheet A → Z**

7. Give the Sheet to Claude and run this prompt:

```text
Find all the bottom of funnel queries in the Queries tab of this sheet that are in positions 4 - 20. Specifically look for these types of queries:

[Competitor] Alternatives
[Competitor] vs [Competitor]
[Competitor] Review
Best [product] for X
How to export data from [Competitor]
[Software] for [role]
[Software] with an MCP connection
Home page
Services/Product pages

give me them here in a simple list
```

8. Choose the top keywords you’d want to rank higher for from that list. You will likely get **zero leads** unless you’re in positions **1–5** (ideally top 3). Then run:

```text
I'd like to improve my rankings for these pages:

- [PAGE 1]
- [PAGE 2]
- [PAGE 3]
- Etc.

Tell me which of these are going to be the easiest to improve My rankings on by analyzing who are the competitors currently above me in the SERP, the strength of their pages, and how easily I can update my page to have more ranking factors.

Use this AI Search checklist as a guide for what the perfectly optimized page would look like in an ideal world: [AI_SEARCH_CHECKLIST_URL]
```

Replace `[PAGE N]` with real URLs (or query→URL pairs). Attach/paste the checklist at `[AI_SEARCH_CHECKLIST_URL]` (original post: download link in the first comment).

9. Follow up with:

```text
give me the checklist items I would need to execute for the '[KEYWORD]' page in order to most likely increase my rankings, ordered by priority
```

10. Implement as many of those changes as possible.

11. Check **Google Search Console every day** for how rankings improved on that specific page.

## Success check

- Sheet exported with Average position on, last 28 days
- BOFU list filtered to positions 4–20
- Pages chosen for a top-3/5 push
- Prioritized checklist items shipped
- Daily GSC position checks running

## Anti-patterns

- Chasing top-of-funnel / non-converting queries
- Ignoring that leads cluster in positions 1–5
- Skipping SERP competitor analysis
- Shipping none of the checklist items
- Checking rankings rarely after changes
- Leaving the checklist link empty so Claude has no target model

## Source

- Method pasted by Steven (2026-09-25), from a practitioner who runs AI Search for 7–9 figure tech companies (e.g. beehiiv); claimed ~800k pipeline/quarter for their smallest client.
- Checklist download lives in the original post’s first comment → store as `[AI_SEARCH_CHECKLIST_URL]`.
- Related: [Add methodology scoring for AI information gain](sand-workflow:add-methodology-scoring-for-ai-information-gain)
