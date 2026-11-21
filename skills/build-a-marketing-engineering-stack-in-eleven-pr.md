---
name: Build a marketing-engineering stack in eleven projects
description: >-
  Use this when a marketer wants a learning path for running marketing with a
  coding agent (ads agents, programmatic SEO, AI video ads, AI citations, review
  mining, tracking, holdout tests, automated reports), or needs a concrete
  practice project and pass mark for one of those skills.
---

# Build a marketing-engineering stack in eleven projects

Ira Bukht's roadmap for marketers who want to build their own agents and tooling. You need Claude Code (or any coding agent) and a GitHub account. Each step has three parts: what to learn, a practice project that proves you've learned it, and why it matters. Do the steps in order. Step 8 (tracking) feeds every step before it, so if your conversion data is broken, do step 8 first. (Order note added, not in source.)

Each practice project below is quoted from the thread. Swap in your own numbers where you see angle brackets.

## Steps

1. Build an ads agent that outperforms other agents.
   - Learn: Claude Code, connecting it to your Meta and Google Ads accounts, running it on a schedule, spend limits, and a log of everything it does.
   - Practice: "an agent that checks the account every hour, pauses ads that cost over 3x your target price per customer after 50 conversions, raises budget 20% on ads that won three days in a row, writes three new versions of the best ad and posts every action to slack with the reason." Then give it inputs your competitors' agents don't have: your review data, a scrape of your competitors, and the true cost of a customer across all channels.
   - Why: competitors' accounts are already run by agents in the same auction. Two agents with the same rules and the same Meta data will tie, so the one with better inputs wins.
   - Thresholds: `<TARGET_CPA>`, 3x, 50 conversions, +20%, 3 days. These are her numbers. Start with spend limits and have it propose changes rather than make them, until the log looks right (added, not in source).
2. Programmatic SEO: hundreds of Google pages from one spreadsheet.
   - Learn: Claude Code, GitHub, Vercel, a spreadsheet as the data source, Google Search Console.
   - Practice: give the agent a `<500>`-row spreadsheet of cities, products or comparisons and have it build one page per row with real data (for example "crm for dentists" or "hubspot vs salesforce"). Publish, watch Search Console for 60 days, and fix the pages Google drops.
   - Why: Google indexes thin pages slowly and removes them later. The real work is the data and the checking. Building the pages takes an afternoon.
3. AI video ads at scale.
   - Learn: Veo, Seedance, Kling, ElevenLabs voices, auto-captions, and a script that runs them in batches.
   - Practice: turn one product photo and a 30-second script into 100 UGC-style video ads with different hooks, voices and openings, exported in 9:16 and 4:5.
   - Why: she puts a studio shoot at about $20k for ten videos, while the same budget in API calls makes a thousand. The account that tests more creatives usually wins on Meta.
4. Rebuild competitors' winning ads.
   - Learn: the Meta Ad Library, a scraper the agent writes for you, and image and video generation.
   - Practice: scrape every ad from `<30>` competitors, keep the ones that have run for more than 60 days, and have AI rebuild each one for your product using your own footage and claims. Upload them paused.
   - Why: how long an ad has been running is the only public sign of how it performs. Nobody keeps paying for an ad that loses money, so an ad that's been live for two months is paying for itself.
5. Get cited by AI assistants.
   - Learn: a script that asks ChatGPT, Claude and Perplexity questions and saves the answers, plus schema markup. She also lists llms.txt (see Anti-patterns).
   - Practice: every Monday, ask all three `<100>` real buyer questions and log which brands and URLs get cited. Then rewrite your ten most important pages to match the cited ones.
   - Why: buyers ask AI before they search. Cited pages share traits: a direct answer in the first paragraph, original numbers and a clear author. You can only copy those traits once you measure them.
6. Customer research from 5,000 reviews.
   - Learn: scraping reviews from Amazon, Trustpilot, Reddit and the App Store, and grouping them by topic with AI.
   - Practice: pull `<5,000>` reviews of your product and your competitors' products. Sort them into the ten most common complaints and the ten main reasons people buy, then write 50 ad hooks in the customers' exact words.
   - Why: copywriters guess why people buy. The reviews already say it, and most teams have never read more than 50 of them.
7. Landing pages that match the ad.
   - Learn: A/B testing, how many visitors a test needs before you can trust it, PostHog, and AI-written page variants.
   - Practice: build a landing page that rewrites its headline and first section to match the ad the visitor clicked. Test it with a sample size you calculated in advance.
   - Why: when the ad promises one thing and the page says another, most paid traffic leaves at that gap. Fixing it is cheaper than spending more.
8. Conversion tracking.
   - Learn: Google Tag Manager, GA4, server-side tracking (Stape) and the Meta Conversions API.
   - Practice: send the purchase event from both the browser and the server with the same event ID. Then confirm in Events Manager that each order counts once and the match quality is above 7.
   - Why: everything in steps 1 to 7 is optimised on these events. Most accounts send duplicates or miss a quarter of orders, so the algorithm learns from wrong data.
9. Email and SMS that trigger on behaviour.
   - Learn: Klaviyo, product events (viewed, added to cart, bought, went quiet) and holdout groups.
   - Practice: build five flows that fire on what a customer did, with a 10% holdout group that gets nothing, so you can see how much revenue the flows add.
   - Why: selling again to someone who's already bought costs a fraction of finding a new customer, and most stores have one abandoned-cart email and nothing else.
10. Incrementality: how many sales your ads added.
    - Learn: geo holdout tests, marketing mix modelling (Meridian, Robyn), and the gap between what a platform claims and what it added.
    - Practice: turn Meta off in five matched regions for four weeks, then compare the drop in sales with what Meta said it was driving.
    - Why: platforms usually take credit for two to five times more sales than they drove. The CFO will ask for the real number, and whoever has it keeps the budget.
11. Automated reporting.
    - Learn: Looker Studio or Metabase, a Slack bot, and AI that writes the summary from the numbers.
    - Practice: a Monday report that compares last week with the week before, explains what changed and suggests the next test. It's posted to Slack before anyone logs in.
    - Why: about half a marketing team's hours go on pulling numbers into slides, and automating that is the fastest way to get noticed.

## Success check

Each step is done when its practice project runs on real data and its own test passes:
- Step 1: the agent's log explains every action it took.
- Step 2: pages are still indexed at day 60.
- Step 8: orders are deduplicated and match quality is above 7.
- Steps 9 and 10: the holdout groups show a measured lift.
- Step 11: the report arrives with no one touching it.

(Check added, not in source.)

## Related skills (added, not in source)

- Step 1: `give-every-meta-ad-a-daily-wait-kill-refresh-sca` and `warehouse-meta-ads-api-for-mutations-only`.
- Step 2: `follow-steven-s-seo-and-aeo-bible` and `grow-organic-traffic-through-a-core-update-with-`.
- Step 3: `hyper-realistic-ai-ugc-from-stills`.
- Step 4: `build-a-competitor-ad-spy-catalog-for-the-creati`.
- Step 5: `follow-steven-s-seo-and-aeo-bible`, which wins on any conflict.
- Steps 6 and 7: `run-a-marketing-job-with-the-boring-marketing-sk`.
- Ad copy from the research: `write-a-cold-traffic-ad-from-a-17-element-brief`.

## Anti-patterns

- Letting the agent from step 1 change budgets with no spend cap and no action log.
- Publishing programmatic pages without unique data for each row. Google drops them.
- Copying a competitor's ad and its claims. Rebuild the idea using your own footage and claims you can back up, and leave out their brand, characters and music. (Trademark and copyright caution added, not in source.)
- Publishing AI "UGC" with made-up customers or testimonials without disclosing it. Australian consumer law and platform ad policies treat fake testimonials as misleading. For financial or health products, stricter advertising rules apply. (Added, not in source.)
- Spending effort on llms.txt. Steven's Bible gives it zero priority because no major engine has confirmed using it. (Conflict note added, not in source.)
- Running an A/B test without a sample size worked out in advance, or calling it early.
- Trusting the conversions a platform reports without a holdout test.

## Source

- Thread: https://x.com/irabukht/status/2123881815450812881 by @irabukht, 21 Nov 2026 (Sydney time), 11 steps plus an intro.
- The thread links https://github.com/irinabuht12-oss/marketing-skills. It holds 49 template skills published by Ryze AI, which push Ryze's hosted ads connector. The repo has no licence file, so none of it is copied here.
- "You will never be unemployed again" and the cost and share figures ($20k shoot, a quarter of orders missed, two to five times over-credit, half of team hours) are her claims and unverified.
