---
name: Run a marketing job with the Boring Marketing skills library
description: >-
  Use this when a marketing job (brand setup, positioning, local SEO, AI search
  visibility, landing pages, copy, paid ads, ad creative, email, reviews,
  social, prospecting local clients) should run on @boringmarketer's 32-skill
  library, which is kept on the box at
  /workspace/shared/boring-marketing-skills.
---

# Run a marketing job with the Boring Marketing skills library

A library of 32 MIT-licensed marketing skills by @boringmarketer. They all read and write one shared set of brand files. The whole library, including its scripts and reference files, is copied to the box at `/workspace/shared/boring-marketing-skills` (pinned at commit bd5aaed). This skill picks the right one and runs it from there. It's too big to embed: about 680 KB of skill text plus Python scripts.

## Steps

1. Set up a working folder for each business: `/workspace/marketing/<CLIENT_SLUG>/`. Run every skill from inside it, because the skills write brand files to `./brand/` in the current folder. Never mix two businesses in one folder.
2. If `./brand/brand.yaml` doesn't exist yet, run `start-here` first. It reads the site and reviews and writes the brand files that every other skill reads.
3. Pick the skill from the table below. If the request is vague, use `start-here`, which routes it for you.
4. Read `/workspace/shared/boring-marketing-skills/skills/<SKILL>/SKILL.md` in full, then any `references/` files it names.
5. Wherever a skill says `${CLAUDE_SKILL_DIR}`, use `/workspace/shared/boring-marketing-skills/skills/<SKILL>`. Shared scripts are in `skills/start-here/scripts/` and `_system/scripts/`. Run them with `python3`.
6. Optional API keys (Firecrawl, ScrapeCreators, the ad platforms) are named in each skill's frontmatter. Leave them out and the skill falls back to free tools. Never paste a key into a brand file.
7. Follow the skill's own output format and checks, then apply the house rules below before handing anything over.
8. Success check: the deliverable is saved in the client folder, there's a row for it in `./brand/assets.md`, and every claim and quote has a source.

## House rules on top of the library (added, not in source)

- SEO and AI-search work: Steven's SEO and AEO Bible (skill `follow-steven-s-seo-and-aeo-bible`, copy at `/workspace/shared/seo-aeo-bible.md`) takes priority over `ai-search`, `seo-content`, `site-audit` and `keyword-research` wherever they disagree. For example, the Bible gives llms.txt zero priority, while `ai-search` offers to build one.
- Writing: Steven's `/workspace/shared/humanise-writing.md` takes priority over the library's own `seo-content/references/humanize.md`.
- Meta ads: the `meta-ads` skill can launch campaigns through the API. Don't spend money or publish without Steven's yes. Also see `give-every-meta-ad-a-daily-wait-kill-refresh-sca`.
- Outreach skills (`pitch-the-fix`, `email-sequences`, `speed-to-lead`) produce drafts only. Steven sends.
- Financial-adviser clients (Niche Connect): check copy, reviews and testimonials against financial-advice promotion rules before use.
- Ignore `automations/hooks/hooks.json`. It's set up for a different coding tool, and it isn't needed here.

## Which skill

| Job | Skill |
|---|---|
| First run, vague request, onboarding a client, routing | `start-here` |
| Voice profile built from real quotes | `brand-voice` |
| Angle, offer, first screen, answers to objections | `positioning-angles` |
| Customers' own words from reviews, Reddit and comments | `audience-research` |
| Rivals' messaging, pricing, ads and gaps | `competitive-intel` |
| Google Business Profile compared with the top 3 in the map pack, plus a month of posts | `google-business-profile` |
| 90-day local SEO plan | `local-seo-plan` |
| Town pages that aren't the same page with the city name swapped | `service-area-pages` |
| Whether ChatGPT, Perplexity, Gemini and Google's AI answers name you | `ai-search` |
| Topic map instead of a long keyword spreadsheet | `keyword-research` |
| Articles that rank and get cited | `seo-content` |
| Many pages from one template and real data | `programmatic-seo` |
| Crawl as Google and the AI crawlers do, then rank the fixes | `site-audit` |
| Owner replies to reviews and the review request | `reviews` |
| The site on a phone, as a customer sees it | `first-screen-check` |
| One-offer landing page | `landing-page` |
| Copy in the customer's words, with every claim checked | `direct-response-copy` |
| Quiz, calculator or guide, built and working | `lead-magnet` |
| Meta, Google, LinkedIn and TikTok campaigns with a test plan | `paid-ads` |
| Make Google Ads count real calls and forms | `google-ads-tracking` |
| Pause test: do the ads add calls or just take credit? | `ads-incrementality-check` |
| Launch and check Meta campaigns through the API | `meta-ads` |
| Text-back for missed calls and lead follow-up | `speed-to-lead` |
| Ad creative in 21 formats, product images and video | `creative` |
| Welcome, follow-up, win-back and cold email sequences | `email-sequences` |
| Newsletter in the brand's voice, using click data | `newsletter` |
| Read the numbers and feed back what worked | `performance-review` |
| Rank local businesses losing the most customers (prospecting) | `find-local-clients` |
| Short email pitching one broken thing and its fix | `pitch-the-fix` |
| Posts built from your own best posts | `social-content` |
| Long guide with named sources | `long-form-article` |
| One piece turned into native posts for each platform | `content-atomizer` |

There are also two multi-skill playbooks in `automations/workflows/` (`full-funnel-build.md`, `campaign-fanout.md`) and five recurring-job write-ups in `automations/routines/` (competitor watch, AI-citation monitor, monthly performance review, brand health check, weekly content). Turn one into a Grok Bot routine only if Steven asks.

## Refreshing the copy

The author says the repo may not stay public, so the box copy is the one to rely on. To update it: clone `https://github.com/boringmarketer/boring-marketing-skills` to a temp folder, compare it with `CHANGELOG.md`, then replace `/workspace/shared/boring-marketing-skills` and update `PINNED.txt`.

## Anti-patterns

- Running a skill without brand files in place, which gives generic output.
- Running a skill from `/workspace` itself, which mixes up clients' brand files.
- Importing all 32 as separate global skills. They depend on shared scripts and brand files, so they break when split up.
- Letting the library's SEO advice override the Bible.
- Using the `meta-ads` or outreach skills to spend money or send messages without Steven's yes.

## Source

- Post: https://x.com/boringmarketer/status/2122395509293989985 by @boringmarketer, 17 Nov 2026 (Sydney time)
- Repo: https://github.com/boringmarketer/boring-marketing-skills, MIT licence, © 2026 Boring Marketing, LLC, commit bd5aaed
