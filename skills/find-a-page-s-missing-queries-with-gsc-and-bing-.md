---
name: Find a page's missing queries with GSC and Bing data
description: >-
  Use this when refreshing one existing page for SEO and you want to find the
  search queries it misses or covers weakly, using both Google Search Console
  and Bing Webmaster Tools query exports plus a live results-page check.
---

# Find a page's missing queries with GSC and Bing data

Use both Google Search Console (GSC) and Bing Webmaster Tools query data for one page, have Claude find the query clusters the page misses or covers weakly, then make the edits by hand. The author says Bing often shows queries, impressions and positions for pages where GSC shows nothing, and that Bing's AI Performance report shows when a page is cited in AI answers.

## Steps

1. Pick one page to refresh. Note its URL, its primary target keyword and a one-line description of the audience or what the site sells.
2. Export the page's queries from GSC: query, clicks, impressions, CTR and average position.
3. Export the same columns for the same page from Bing Webmaster Tools. If Bing Webmaster Tools isn't set up for the site, verify the site there first (added, not in source: it can import a site already verified in GSC).
4. Optional: check Bing's AI Performance report to see whether the page is cited in AI answers (per the author).
5. Give Claude the article (pasted, or the URL to fetch) and both query lists, using the prompt below word for word with the slots filled in. Use a model that can search the web, so step 3 of the prompt checks the live results pages.
6. Review the output yourself. Accept, reject or edit each recommendation. Don't apply it all automatically.
7. Make the edits on the page: new or expanded sections, tables, FAQs, and the title tag and meta description.
8. Resubmit the page for indexing in GSC and in Bing Webmaster Tools.
9. Add internal links to the page from related pages. (The author covers this in a separate thread that isn't included here.)
10. Send any "wrong intent" clusters to a new-page plan instead of forcing them into this page.
11. Success check (added, not in source): after the page is re-crawled, give it a few weeks, then pull both query exports again. The target clusters should show more impressions or better average positions, and CTR should rise where the title or meta description changed.

## The prompt (word for word; the author's square-bracket slots are shown here in angle brackets)

```
You are a senior SEO content strategist. I'm going to give you one page from my site plus the search queries it gets impressions for in Google Search Console and Bing Webmaster Tools. Your job is to find the queries I'm missing or covering poorly, and tell me exactly what to change on the page.

## Inputs

Page URL: <URL>
Primary target keyword: <KEYWORD>
Audience / what the site sells: <ONE_LINE>

Article content:
<PASTE THE FULL ARTICLE, OR SAY "fetch the URL above">

GSC queries (query, clicks, impressions, CTR, avg position):
<PASTE GSC EXPORT>

Bing Webmaster Tools queries (query, clicks, impressions, CTR, avg position):
<PASTE BING EXPORT>

## What to do

1. Merge and clean the queries
- Combine both lists into one table. Mark each query as GSC only, Bing only, or both.
- Group near-duplicates and close variants into clusters (e.g. "best X for Y", "X for Y 2026", "top X Y").
- Note where Bing shows data that GSC doesn't. Treat Bing queries as real demand signals, not noise.

2. Check every cluster against the article
For each cluster, classify coverage as:
- Covered well: the article answers it directly with a clear section
- Covered weakly: mentioned in passing, buried, or answered vaguely
- Not covered: the article doesn't address it at all
- Wrong intent: the query wants something this page shouldn't be (flag it for a separate page instead)
Quote the part of the article that covers it, or say "none."

3. Check the SERP and search intent
For the main clusters (and every "not covered" / "weak" cluster with meaningful impressions), search the query and look at the top results. Tell me:
- Dominant intent (informational, commercial, transactional, navigational)
- Dominant format (listicle, guide, comparison, tool, product page, etc.)
- What the top-ranking pages include that mine doesn't (sections, tables, FAQs, examples, data, pricing, visuals)
- Any SERP features worth targeting (featured snippet, People Also Ask, video)

4. Prioritize opportunities
Score each opportunity High / Medium / Low based on:
- Impressions across both engines
- Current position (positions 5 to 20 are the quickest wins)
- CTR gap (high impressions, low CTR = title/meta or snippet problem)
- Effort to fix (a new paragraph vs. a full new section vs. a new page)

## Output format

A. Summary: 3 to 5 sentences on the biggest gaps and the fastest wins.

B. Query coverage table:
| Cluster | Example queries | Source (GSC/Bing/both) | Impressions | Avg position | Coverage status | Priority |
C. Content recommendations, ordered by priority. For each one:
- Target queries
- What to add or change (new H2, expand a section, add a table, add an FAQ, rewrite the intro, etc.)
- Where in the article it goes
- A suggested heading and 2 to 3 sentences describing what the section should say
- Why: the intent or SERP evidence behind it

D. Title tag and meta description: 2 to 3 rewritten options that pull in the strongest query clusters while keeping the primary keyword near the front. Keep titles under 60 characters and meta descriptions under 155.
E. Pages to create instead: list any "wrong intent" clusters that deserve their own page, with a suggested title and target keyword for each.
```

## Related skills

- `follow-steven-s-seo-and-aeo-bible`: the house rules for any edits this produces.
- `pull-leads-from-seo-aeo-via-gsc-striking-distanc`: finding striking-distance queries across a whole site.
- `find-google-ai-feature-wins-with-tiered-search-c`: prompts for winning Google's AI features.

## Anti-patterns

- Using GSC data only, which misses Bing-only queries (the point of the method).
- Applying every recommendation without review. The author warns that fully hands-off SEO automation is how sites get wrecked.
- Stuffing "wrong intent" queries into the page instead of planning a separate page.
- Running the prompt without web access, so the results-page check in step 3 is guessed.
- Rewriting the title or meta when the real problem is missing content, or the reverse. Check the CTR gap compared with the coverage status first.

## Source

- Thread: https://x.com/asaio87/status/2122592064068104348 by @asaio87, 17 Nov 2026 (Sydney time)
- The prompt is copied word for word from post 4 of the thread, with its slots shown in angle brackets.
