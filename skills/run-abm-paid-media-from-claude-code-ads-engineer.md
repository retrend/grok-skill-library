---
name: Run ABM paid media from Claude Code (Ads Engineering)
description: >-
  Use this when one person runs B2B paid media and ABM across LinkedIn, Meta and
  Google from Claude Code: a tiered account list, exclusions and identifiers, 3
  agents plus reporting skills, 1:1 LinkedIn ads with a value page per account,
  ads-plus-outbound gating, an approval gate, and a 30-day plan.
---
# Run ABM paid media from Claude Code (Ads Engineering)

Sources: Alex Vacca ([@itsalexvacca](https://x.com/itsalexvacca/status/2109995654949077324), 13 Oct 2026) on the 3-layer ABM stack, and his article [Ads Engineering: The Complete Guide to Running Paid Media From Claude Code](https://x.com/itsalexvacca/status/2107511355062546530) (6 Oct 2026), describing how Ivan Falco runs paid media at Frontal.

**Results they report:**
- $33K of ads produced $887K of pipeline, aimed at 61 accounts with 3 ads each.
- One person runs more than $200K a month in spend; it used to take a team of 6.
- Ads plus outbound returned $51 of pipeline per $1, measured across the combined system.

Ivan's free skill pack is at frontal.so/resources/12-claude-code-skills-for-ad-management. Some of the article's tables (the scoring weights and tier definitions) weren't readable, so tune those yourself.

**Core rule:** Claude Code does the work, and a person approves every dollar. A person also owns three calls: the offer, the positioning, and which accounts get the money.

## The 3-layer ABM stack (build in this order)
1. **Scope the total addressable market (TAM) and pick targets.**
   - Firmographic match: Clay. Lookalikes of paying customers: Ocean.io. Research and ranking: Clay and Claude.
   - Verified emails and mobiles: Prospeo. Ad audiences from contacts: ContactLevel or Primer.
   - Fit isn't timing. A perfect fit with no signals waits; an account with 8 signals at once goes first.
2. **Give every account its own campaign.**
   - Person-level ads: Influ2. Company-level ads: LinkedIn and Meta.
   - A landing page per account: Mutiny, or Claude plus Vercel/Railway. Personal video: Sendspark.
   - Email: Instantly. Email plus LinkedIn DMs: lemlist. Calls: Aircall or Orum.
   - Each account's page gives something useful: a GTM report, a content audit, or feedback on its ads.
3. **Watch attention and move the budget there.**
   - Ad engagement: Fibbler, ZenABM, Vector. Site visits: Vector, RB2B. Product use: PostHog, Amplitude.
   - LinkedIn engagement: Apify. Pipeline attribution: HockeyStack, Factors.ai.
   - Skip this layer and your ads keep hitting the day-one list.

The platforms now handle bidding, placement, and creative delivery. Two things stay with you: **who is in the target market** (your closed-won data) and **what happened after the click** (your CRM).

## Folder setup
Install Claude Code and make an `ads/` folder containing `data/`, `data/crm/`, `data/exports/raw/`, `.claude/agents/`, `.claude/skills/`, `scripts/`, `scripts/write/`, `pages/`, `creative/`, and `brand/`. Apply for API access on day one, because LinkedIn reviews every request and Google needs brand verification.

## Layer 1: the target account list
1. **Export from the CRM into `data/crm/`:**
   - `closed_lost.csv`, `stalled_deals.csv`, and `old_mqls.csv` become the list.
   - `closed_won.csv` (with a one-line `use_case` per customer) and `closed_won_contacts.csv` define fit and seed lookalikes.
   - `open_opps.csv` and `competitors.csv` go in the exclusion list.
   Cap the list at 500–3,000 accounts, and give every account a written reason to be there. If you're short, top up with Clay lookalikes marked source `net-new`.
2. **Score fit and timing as two separate numbers.**
   - Fit covers size, industry, geography, stack, revenue model, buying committee, and resemblance to closed-won.
   - Timing covers hiring, funding, a new leader, a stack change, or key-page visits.
   - Pull signals with Clay or PredictLeads into `data/signals.csv` (columns: domain, signal, date). Frontal keeps a library of 54 triggers.
   - Prompt: *"Score every row in data/tal.csv with the rules in data/scoring.md. Count only signals from the last 30 days. Add the columns fit, signals, signal_list, tier, and use_case (copy the use_case of the most similar closed-won customer). Show me the count per tier before saving."*
   - Signal count alone never makes Tier 1. Strong fit with no signal stays in an always-on audience.
3. **Tiers decide the effort.** Each tier must change the budget, the audience, the page, or the creative.
4. **Contacts:** pull the buying-committee titles at Tier 1–3 accounts into `data/contacts.csv` (name, title, company, domain, work email, LinkedIn URL). Do the same for the exclusions into `exclude_contacts.csv`.
5. **Keep target contacts and closed-won contacts in separate lists.** On Meta, build a separate 1% lookalike from each; Meta needs at least 100 people per seed. Meta's Advantage+ settings treat lookalikes as a suggestion, so put the exclusions under Audience Controls, where they're a hard limit.
6. **Buy identifiers before uploading to Meta.** Meta matches on personal emails and phone numbers, so run contacts through Prospeo or FullEnrich, and count that cost as part of the media budget. Check consent and lawful basis with privacy first. **Never send bought data to Google**, because Customer Match only allows data you collected. On LinkedIn, use its template with the headers unchanged; lists need 300+ rows, and 1,000+ companies is recommended.
7. **Build the exclusion audience first.** It covers customers, open opportunities, competitors, and disqualified accounts. Attach it to every prospecting campaign and keep it re-syncing.
8. **Sync automatically.** Clay Ads re-syncs to LinkedIn, Meta, and Google every 3 days. Build its table from the CRM integration, not a CSV, so it stays current. Check match rates after 48 hours. Google Customer Match needs 90 days of account history and more than $50K lifetime spend.
9. **Wire one live signal: site visits.**
   - Vector or RB2B (US-focused) identifies the company and sends it to Clay by webhook.
   - Clay qualifies it against the account list and CRM, then stages 6–8 buying-committee contacts.
   - You approve the staged accounts every Monday, and they go into one pooled LinkedIn retargeting audience at 12+ impressions per person. Seed that pool with the Tier 1–2 committees so it starts above LinkedIn's 300-member minimum.

LinkedIn limits to plan around: matching a list takes up to 48 hours, retargeting only counts visits made after the audience exists, and ad review takes under 24 hours. Keep the target list and retargeting audiences live at all times.

## Agents: 3 in `.claude/agents/`
- **ads-reporting:** audits, pacing, fatigue, and reports. It never changes anything. Every report answers, in order:
  1. Where did the money go?
  2. Who saw the ads?
  3. What changed in the auction?
  4. Which creative lost attention?
  5. What reached pipeline?
  It compares against the previous window of the same length and checks data freshness first.
- **ads-campaign-manager:** builds, targeting, bids, budgets, and optimization.
- **ads-creative:** research, concepts, copy, and designs, working from the brand rules in `brand/`.

The loop: reporting finds the issue, a person decides, campaign-manager makes the change, and creative hands new ads to campaign-manager. Restart Claude Code after adding agents or skills.

## Skills: 12, built boring-first
- **Build first:** spend-tracker (where the money moved) and performance-auditor (what changed around it), starting with 20% change lines and a 100 spend floor, tuned after 2 weeks.
- **Next:** creative-fatigue-analyzer plus `fatigue_rules.json` set to `{"ctr_drop":0.30,"max_weekly_frequency":2.0,"min_weekly_impressions":1000}`, run with `scripts/fatigue_check.py`. Drop the impression floor to 200 for 1:1 ad sets. A LinkedIn flag usually means the audience ran out of people; a Meta flag means the ad lost attention and needs a new angle.
- **The rest:**
  - Diagnose: search-terms, keyword-analyzer.
  - Monitor: fatigue-monitor.
  - Execute: bid-optimizer, bulk-editor, two audience-builders, creative-builder, negative-keywords.
- **Data feed:** export at least 4 complete weeks of ad-level data per platform into `data/exports/raw/` and merge it into one file that every skill reads.
- **Platform roles:**
  - LinkedIn suits known accounts.
  - Meta brings B2B volume from your own data and needs 10–20 new ads every 1–2 weeks.
  - Google captures existing demand, so review search terms weekly and add negatives.
- **Honesty checks on every alert:** data freshness (newest row date), missing fields or days, and recent campaign changes that could explain the movement.
- **Audience decay** looks good on the dashboard (CTR up, CPL down) while the leads get worse. Alert on it against qualified pipeline from the CRM.

## LinkedIn 1:1 ABM build
1. **Qualify accounts.** Only accounts with 300+ members after the cuts get their own ad set, which in practice means enterprise. Smaller accounts go into 1:few groups by shared problem or vertical: a company list if the group is 300+, otherwise added by name. LinkedIn's "campaign" is now the old campaign group, and its "ad set" is the old campaign; the API still uses the old names.
2. **Map company names to LinkedIn company page IDs** through the API, and fix subsidiaries by hand.
3. **Narrow to the buying committee** in `data/buying_committee.md`: locations, then either seniority (CXO, VP, Director) with functions (Sales, Marketing), or job titles. You can't use both functions and titles. Target 300–1,000 members. Turn off Audience Expansion and LinkedIn Audience Network, and use no interest targeting.
4. **Make a value page per account.** Research it with ads-creative into `pages/<acct>/research.md`, using only sourced facts. `pages/TEMPLATE.md` sets the structure: a headline naming the company, the useful thing you made for it, one proof point from a similar customer, and one CTA. Include the LinkedIn Insight Tag and deploy with `npm i -g vercel && vercel login`.
5. **Make 3 ads per account,** each naming the company and speaking to the use case of similar customers. Use one Figma template with a company-name text layer, exported as `creative/<acct>/ad1-3.png`.
6. **Budget.** The minimum is $10 a day per ad set. The monthly floor is ad sets × daily budget × 30, so 50 accounts cost about $15K a month. Set a campaign total budget, and **create everything paused** in one campaign. Review it in one pass, then launch with a single command after your yes.
7. **Send results back.** Post CRM stages through LinkedIn's Conversions API: MQL and SQL as qualified-lead conversions, won deals as PURCHASE, within 90 days.

**Pre-launch checklist:**
- [ ] Every account is still 300+ after the cuts
- [ ] Company IDs are verified, with subsidiaries checked
- [ ] Audiences are 300–1,000
- [ ] Audience Expansion and Audience Network are off, with no interest targeting
- [ ] Exclusions are attached
- [ ] Each account has 3 ads naming it
- [ ] Every page has been read, uses only sourced facts, is live with the Insight Tag, and is linked from the ads
- [ ] The budget floor fits, with a campaign total set
- [ ] Everything is paused

## Ads plus outbound on one list
1. Give every CRM account four fields: owner, tier, stage, and next action. Keep signals in the account history. A signal that changes nothing is just noise.
2. Write one rule per signal (what it triggers).
3. **Gate outbound until the account has seen your ads.** An account enters the ad audience the week its signal fires; outbound becomes eligible once impressions pass the threshold set in CLAUDE.md. Fibbler syncs company-level LinkedIn ad views into the CRM.
4. **Measure against a control.** Either hold out half of comparable accounts (half get ads before outbound, half get cold outbound) and compare reply, meeting, pipeline, and revenue; or flag accounts exposed to ads and split outbound results by that flag. Report the result as a lift on outbound, not on last touch.

## Connect, guardrail, run
- **LinkedIn:** a Developer Portal app with Advertising API access (scopes `r_ads`, `rw_ads`, `r_ads_reporting`; the Development tier allows edits on 5 accounts). Matched Audiences and the Conversions API need separate requests.
- **Meta:** the official ads MCP server (beta), which creates campaigns paused. Accounts you don't own need Advanced Access plus Business Verification.
- **Google:** the official MCP server is read-only; make changes through the Google Ads API under a Cloud project (no developer tokens since 9 Sep 2026). Apply for Explorer access or higher.
- **CRM:** the HubSpot MCP, or re-export every Monday.
- **CLAUDE.md:** the accounts, the naming rule, money rules, daily budgets, and the warm-up threshold.
- **Approval gate in `.claude/settings.json`:**
  ```json
  {"permissions":{"allow":["Bash(python3 scripts/fatigue_check.py *)","mcp__google-ads"],"ask":["mcp__meta-ads","Bash(python3 scripts/write/*)"]}}
  ```
  Every script that writes to an ad account lives in `scripts/write/`, so this one rule covers them. "Ask" rules survive "don't ask again".
- **Weekly rhythm:** 3 days changing where the money goes, 2 days reading what it did.

## First 30 days
1. **Week 1:** build spend-tracker and performance-auditor, sync the CRM, and set up the exclusion list on every platform, confirming it re-syncs. No new spend.
2. **Week 2:** build the two contact lists, buy identifiers, upload, and read the match rates. The match rate is your ceiling.
3. **Week 3:** launch one prospecting campaign, either lookalikes from closed-won, a named-list segment, or signal-based. Optimize for leads, run 10+ creatives, split the landing page 50/50, and write the daily budget into CLAUDE.md.
4. **Week 4:** wire buying-committee retargeting from site visits and the return path. Send MQL, SQL, and won stages back through the LinkedIn and Meta Conversions APIs. Meta's Conversion Leads optimization needs 200+ leads a month, daily uploads, and the stage reached within 28 days. Move the optimization goal from leads to MQL to SQL as volume allows.

Related: [bulk-launch-meta-ads-from-a-template-ad](sand-workflow:bulk-launch-meta-ads-from-a-template-ad), [warehouse-meta-ads-api-for-mutations-only](sand-workflow:warehouse-meta-ads-api-for-mutations-only), [run-a-daily-signal-based-prospecting-bot](sand-workflow:run-a-daily-signal-based-prospecting-bot).
