---
name: Find Google AI-feature wins with tiered Search Console prompts
description: >-
  Use this when you have a site's Google Search Console export and want ranked,
  data-only Claude prompts to grow Google AI Overview and AI Mode impressions:
  question headings, titles, positions 8 to 20, money pages, lost clicks, links,
  comparison pages, translations, hubs and missing pages.
---
# Find Google AI-feature wins with tiered Search Console prompts

Run ranked SEO moves against your own Google Search Console export. Every prompt works only on numbers from your data. Work through the S tier first, then the A tier.

Inputs: Search Console access for the site, Claude (Claude.ai or Claude Code), the site URL, the brand name, and 3 to 5 facts about what the site sells.

## Steps

1. Export the data.
   - In Search Console, open Performance > Search results, set the last 3 months and export.
   - Keep Queries.csv and Pages.csv.
   - For the translation prompt (step 14), also keep Countries.csv.
   - For the lost-clicks prompt (step 10), export with Compare: last 3 months vs the previous period.
2. Open a fresh Claude chat. Paste the base rules first, every time, and attach the files:
   ```
   You're an SEO analyst. Attached: Queries.csv and Pages.csv from my Search Console Performance export (last 3 months). Columns: Top queries, Clicks, Impressions, CTR, Position / Top pages, Clicks, Impressions, CTR, Position.
   My site: <SITE_URL>. My brand: <BRAND>. What I sell: <3_TO_5_FACTS>.
   Rules: use code for all math. Only use numbers from the files, no industry averages. Drop every query containing my brand and tell me how many. If brand is over 20% of impressions, stop and ask. Ignore queries under 100 impressions (20 if fewer than 20 queries remain). The export doesn't say which page ranks for which query, so any pairing is a "likely page" I must confirm in Search Console. Plain English, no filler.
   ```
3. Paste one tactic prompt from the tiers below after the base rules.
4. Pick one tier and work it for a week. Don't jump between tiers.
5. Before changing a page, confirm any "likely page" in Search Console (click the query, then the Pages tab). The export doesn't link queries to pages.

### S tier: do first (quick, and works on pages Google already shows)

6. Question headings with direct answers. Write headings as the questions people search, answer each in one direct line, and add an FAQ with matching schema.
   ```
   Task: find queries starting with how, what, why, when, can, is, does, should, which with CTR below my median CTR. Top 15 by impressions: query, likely page, impressions, position, the exact H2 to add, a 40 to 60 word answer from my facts only. Mark what needs my input.
   ```
7. Titles, H1s and descriptions. One H1 per page, the main search in the title, and no duplicate meta descriptions.
   ```
   Task: round each query's position to a whole number. For positions 1 to 5, take the median CTR per position (group 1 to 3 and 4 to 5 if under 5 queries). List queries with CTR under half the median: query, likely page, impressions, CTR vs median, 2 new titles under 60 characters, a description under 155. Extra clicks per month = impressions x (median minus current CTR) / 3.
   ```
8. Positions 8 to 20. Add a better section to the existing page instead of making a new page.
   ```
   Task: queries at average position 8 to 20, skip one-word queries. Top 15 by impressions: query, likely page, impressions, position, the heading plus 2 sentences to add. Extra clicks per month = impressions x (my median CTR at positions 3 to 5 minus current CTR) / 3. Say it's what it's worth if it reaches the top 5.
   ```
9. Money pages. Fix the page Google already shows for your best money search.
   ```
   Task: my 10 pages with the most impressions that could bring a sale or enquiry. For each, stop at the first real problem: 1) another page of mine looks aimed at the same search, 2) wrong page type for the search, 3) main query not in title or H1 or not answered near the top, 4) too thin for the topic. Table: page, main query, impressions, position, first problem, one-line fix. Say what you can't check without the live page.
   ```
10. Pages that lost 30% or more of their clicks. Refresh them, because Google already trusted them.
   ```
   Task: needs the compare columns (last 3 months vs previous 3). If missing, say so and stop. In Pages.csv, find pages with clicks down 30% or more (skip pages under 10 clicks before). If position got worse by 1 or more: refresh. If position held but impressions fell: demand, leave it. Table plus the first 3 refreshes in detail.
   ```
11. Internal links. Use real links, not JavaScript buttons, then link from pages that get traffic to pages that make money.
   ```
   Task: my top 10 pages by clicks, and my money pages: <MONEY_PAGE_URLS>. For each money page give 3 source pages from the top list, a sentence where the link fits and a descriptive anchor (no "click here").
   ```

### A tier: big effect, but weeks rather than days

12. First-party data. Publish a free tool, calculator or stats page fed by your own users' results.
   ```
   Task: from my queries, find topics asking for a number, a score, a price or an average. List 5 with impressions and what data I'd need. Then ask me what data I actually hold, one topic at a time. Don't invent any figure.
   ```
13. One-to-one comparison pages for every pair in your category, with a matrix on the hub and a verdict and next step on each page.
   ```
   Task: find queries with "vs", "or", "alternative", "compare" or "difference". Group by pair. List pairs with impressions, and the page to build: title, 5 sections, a verdict line. If I have no pair-style queries, say so.
   ```
14. Translations. Translate proven pages into the languages Search Console already shows impressions from, and add hreflang.
   ```
   Task: from Countries.csv (and Queries.csv), list countries with impressions but few clicks where English isn't the main language. Rank by impressions. For the top 5, name the language, the 10 pages from Pages.csv to translate first, and what to check after (hreflang, broken placeholders in the text).
   ```
15. Hub guide sections. Put a guide under each hub's grid covering what the parts mean, how to choose, an FAQ and breadcrumb schema.
   ```
   Task: from Pages.csv, find hub or category pages with high impressions and low clicks. For the top 5, outline a guide section: 4 H2s from queries in the file, a 5-question FAQ, and what to link to. No filler.
   ```
16. Missing pages.
   ```
   Task: cluster my queries by topic. List clusters over 200 total impressions where no page in Pages.csv has matching URL words. Table: topic, example queries, impressions, page to build, page type. Max 10.
   ```
17. Duplicate and long URLs. Consolidate them with redirects so there's one page per search.
   ```
   Task: group my queries by topic. Flag topics where 2 or more pages have matching URL words and both have impressions. Table: topic, pages, combined impressions, advice (keep one and redirect, or retarget). Remind me to confirm in Search Console (click the query, Pages tab).
   ```

### B tier: check the fit for your niche (no prompts in the source)

18. Get links to pages whose content is already right. This pays only after the content is fixed.
19. Answer real questions on Reddit and Quora as a real person, only where your buyers ask.
20. For a local business, match the name, address and phone number on every listing.
21. Publish on a schedule. It compounds slowly.
22. Build programmatic pages only if each one has its own unique data table. The same text with a new city name doesn't count.

### C tier: do once (hygiene)

23. Make pages static and fast. Nobody ranks for speed alone.
24. Add structured data that matches the visible text. Google says AI features need no special schema.
25. Submit a sitemap and check indexing.
26. Set hreflang correctly and scan translations for broken text.

### Track it

27. In Search Console, go to Performance > Search results > Generative AI features (Beta), with Search type set to Web (text). This shows Google only, not ChatGPT or Perplexity.

## Success check

- Each prompt's output uses only numbers from the files, lists how many brand queries were dropped, and marks every page pairing as "likely".
- One tier was worked for a week before the next was started.
- The Generative AI features report was compared with the starting point after each tier.

## Anti-patterns

- Parasite SEO. Google's site reputation abuse policy targets it.
- llms.txt as a priority. Google says AI Overviews and AI Mode need no AI text files.
- Mass AI pages that say nothing new. Google's scaled content abuse policy covers them.
- Running a tactic prompt without the base rules, which lets Claude use industry averages or invented numbers.
- Treating a "likely page" as confirmed without checking it in Search Console.
- Inventing figures for first-party data pages. Step 12's prompt asks what data you hold for a reason.

## Caveats

- The author's results (561K AI-feature impressions in 90 days, from about 700 a day to 17K) come from his own site, and his screenshot is in the repo. He says his timeline doesn't prove which change caused which jump, and it can't be checked from outside.
- He says to run the prompts with "Fable 5.2" but ran them himself with Fable 5.1 and Opus. They're plain prompts, so any capable model that can run code on a CSV should work.
- His tracking section promotes MentionFlow (mentionflow.ai), his own product. It isn't needed for this method.
- For broader rules on SEO and getting cited in AI answers, see [Follow Steven's SEO and AEO Bible](sand-workflow:follow-steven-s-seo-and-aeo-bible). It agrees on llms.txt and scaled content. For a leads-first take on positions 4 to 20, see [Pull leads from SEO/AEO via GSC striking-distance queries](sand-workflow:pull-leads-from-seo-aeo-via-gsc-striking-distanc). (Cross-references added, not in source.)

## Source

- Post and X article: https://x.com/noelcetaSEO/status/2122702185792237736 (@noelcetaSEO, 18 November 2026, Sydney time)
- Prompt repo: https://github.com/gc-digital-net/google-ai-features-tiers (commit bec35d2, 18 November 2026). The repo has no licence file. Prompts are copied word for word, with square-bracket slots changed to angle brackets.
