---
name: LinkedIn engagers to tiered outbound
description: >-
  Use this when building a LinkedIn outbound list from post engagers with Claude
  Code + Apify + Origami — scrape, tier, and launch Tier 1 sequences. Full
  runnable prompts are in this skill.
---
# Stack

- Claude Code (Claude Pro or Console)
- Apify — HarvestAPI actors for post reactions + comments
- Origami Starter (origami.chat) — list, research, verified email, sequencer
- LinkedIn sender account (+ cold-email domain/inboxes for Tier 3)

Budget ballpark in source (Sep 2026): ~$49/mo Claude Pro + Origami Starter, Apify free $5 then pay-per-result, plus email infra.

# Setup

1. Subscribe to Claude Pro and Origami Starter.
2. Install Claude Code; create `~/claude-outreach` and work only inside it.
3. Save keys in `.claude/settings.local.json` (never paste keys into chat):
   - Apify token → Console → Settings → API & Integrations
   - Origami API key → Settings → Developers → Create API key (`og_live_…`)
4. Add that file to `.gitignore`.
5. Install Origami skills into the project (installer yields: `origami`, `origami-leads`, `origami-send`, `origami-account`).
6. Start Claude Code, trust the folder, leave permission prompts on.
7. Run a setup check: both keys set, four skills listed, Origami credits visible (free Origami returns `402 SUBSCRIPTION_REQUIRED`).
8. Connect senders (1 LinkedIn + up to 5 email on Starter). Confirm with Claude: list Origami senders.

# Part 1 — Pick signal posts

1. Up to 3 recent LinkedIn posts about the buyer’s problem (campaign breakdown, category take, pain post).
2. Fill empty slots with a competitor’s posts on the same problem (bigger following = bigger pool).
3. Copy each link via ⋯ → Copy link to post.

# Part 3 — Prompt 1 (scrape)

LinkedIn keeps reactions and comments separate. Run **two** HarvestAPI Apify actors, merge, dedupe, count multi-post engagers.

**Actor settings (from source):**
- Comments actor family: HarvestAPI LinkedIn post comments (Claude will select the HarvestAPI comments actor; reactions: `harvestapi~linkedin-post-reactions`)
- `maxItems: 0` (paginate all reachable pages; reactions actor ~100 pages × 10 ≈ 1000/post)
- `profileScraperMode: "main"` (real `/in/…` URLs, not `ACoAA…` short ids)
- Comments only: `scrapeReplies: false`
- `maxTotalChargeUsd: 2.5` per run (keeps both runs near Apify free $5)
- Pricing cited in source: ~$2 / 1k results + ~$2 / 1k profiles in main mode ≈ $4 / 1k before dedupe

**Runnable Prompt 1** (reconstructed from article-stated behavior; original paste UI was an image):

```text
Scrape LinkedIn engagers for these post URLs:

[POST_URL_1]
[POST_URL_2]
[POST_URL_3]

Use Apify HarvestAPI actors:
1) linkedin post reactions — harvestapi~linkedin-post-reactions
2) linkedin post comments — the HarvestAPI comments actor for posts

For each post, run BOTH actors with:
- maxItems: 0
- profileScraperMode: "main"
- maxTotalChargeUsd: 2.5
- on comments actor only: scrapeReplies: false

Wait for both runs. Merge reactors + commenters across all posts.
Dedupe by profile URL.
Add posts_engaged = number of distinct posts in this set each person engaged with.
Write engagers.csv with at least: name, headline, profile_url, posts_engaged, engaged_post_urls, comment_text (if any).
Then open engagers.csv and list 5 rows for me to spot-check against LinkedIn.
Do not research emails yet.
```

Spot-check 5 profile links manually.

# Part 4 — Tier rules + Prompt 2

Save `tier-rules.md` (swap titles/floor for your ICP; keep Exclude first):

```markdown
# Tier rules (first match wins)

## Exclude
- Agency owners, freelancers, consultancies, solo coaches
- Creators / ghostwriters / LinkedIn-growth coaches farming engagement

## Tier 1
Head of Sales, VP Sales, CRO, Founder, or CEO at a B2B company with 20+ employees

## Tier 2
Any GTM role (sales, marketing, RevOps, growth) at a VC-backed B2B company

## Tier 3
Everyone else who passed Exclude
```

**Runnable Prompt 2** (25-row dry run first):

```text
Using engagers.csv and tier-rules.md with the Origami skills:

1) Create or open an Origami list for this campaign.
2) Import the first 25 rows only.
3) For each row, research and fill columns:
   - employee_count
   - vc_backed (yes/no + short reason)
   - agency_or_freelancer (yes/no + short reason)
   - tier (apply tier-rules.md; Exclude beats all; first match wins)
   - verified work email (Origami enrichment)
4) Show credit burn so far and projected cost for the full file.
5) Summarize counts: excluded / T1 / T2 / T3.

Do not message anyone. Wait for my audit.
```

Audit: sort by tier; read 10 rows per tier + 10 excluded; read agent reasons.

**Re-tier helper:**

```text
Update tier-rules.md with these corrections: [NOTES].
Re-tier the current Origami list with the new rules.
Show before/after counts and every row whose tier changed.
```

**Add remaining rows:**

```text
Import the remaining engagers.csv rows into the same Origami list.
Skip anyone already on it.
Fill the same columns using tier-rules.md.
```

**Weekly append (from source):**

```text
Add the rows of engagers.csv to my existing Origami list, skip anyone
already on it, and fill the same columns for the new rows, using
tier-rules.md.
```

Credits cited: Starter ~2,000/mo; verified email ~3 credits each.

# Part 5 — Route tiers

- **Tier 1:** LinkedIn + email + calls; custom offer / free work for best fits
- **Tier 2:** AE-written, hand-sent (invite AEs into Origami; filter `tier=2`)
- **Tier 3:** automated cold email on Origami sequencer

**Tier 1 add email + call steps (before LinkedIn launch):**

```text
For all Tier 1 leads in the Origami list, draft email + call steps that match
the LinkedIn angle we approve in Part 6. Do not send. Queue for human review.
```

**Tier 3 email draft:**

```text
Draft a Tier 3 automated email sequence in Origami for tier=3 leads.
Keep it short, signal-aware (mention they engaged with [TOPIC]), no fake
personalization. Show copy for edit, then wait for me to launch.
```

# Part 6 — Prompts 3 and 4 (Tier 1 LinkedIn)

Limits cited (Sep 2026): connection request with no note on free accounts; Premium note ≤200 chars; Message 1 after accept; Message 2 six days later if no reply; Origami pauses on reply; aim ~20 invites/weekday (~100/week).

**Runnable Prompt 3:**

```text
From the Origami list, shortlist Tier 1 leads ranked by posts_engaged (desc).
Return up to 10 profiles with: name, title, company, profile_url, posts_engaged,
which posts they engaged with, and why they fit Tier 1.
Propose ONE campaign angle that fits the whole shortlist (what we offer them).
Do not write messages yet.
```

Open every shortlisted profile; drop misfits; confirm angle.

**Runnable Prompt 4 + template:**

```text
Using the approved Tier 1 shortlist and angle: [ANGLE]

For each lead, fill this 3-step LinkedIn sequence. Use their Origami row and the
specific post they engaged with. Fill every [bracket]. No fake claims.

Step A — Connection request:
- Free account: send with NO note
- If Premium note allowed: ≤200 chars, reference [post topic], no pitch

Step B — Message 1 (after accept):
- Thank them for engaging with [post topic]
- One-sentence observation about their role/company
- Soft offer aligned to [ANGLE] (optionally a small free work offer)
- One clear CTA

Step C — Message 2 (day 6 if no reply):
- Bump with a new concrete nugget or mini-asset
- Easy opt-out line
- Stop after this if no reply

Write the filled messages per lead, then create the Origami LinkedIn sequence
draft for my review. Do not launch until I say so.
Daily invite volume target: ~20/weekday.
```

Launch in Origami: confirm sender, send window, ~20 invites/day; add Tier 1 email/call steps after copy approval.

# Weekly loop

```bash
cd ~/claude-outreach && claude
```

New 3 post links → Prompt 1 → weekly Prompt 2 append → AEs take new Tier 2 → add Tier 3 to email campaign → Prompts 3–4 on new Tier 1 only.

# Anti-patterns

- Putting API keys in Claude chat
- Skipping the 25-row credit test
- Messaging excluded agency/freelancer rows
- High-volume automation (LinkedIn UA §8.2 bans scraping/automated messaging — source flags risk)
- Inventing different scrapers/APIs than Apify HarvestAPI + Origami as specified

# Source

- https://x.com/itsalexvacca/status/2100264723677917436
- Article: How to Build a LinkedIn Lead List From Your Post Engagers With Claude Code
- @itsalexvacca (Alex Vacca), Sep 16, 2026
- Note: original Prompt 1–4 UI cards were images in the article; runnable prompts above are reconstructed from the article’s stated actors, settings, rules, and sequence structure so this skill stands alone.
