---
name: Build a competitor ad-spy catalog for the creative team
description: >-
  Use this when a marketing or creative team wants agents to collect competitor
  ads from public ad libraries, transcribe and describe them, store first-seen
  and last-seen dates, and expose the catalog through an API a coding agent can
  query for trends and gaps.
---
# Goal
Give the creative team a searchable catalog of what competitors are running, what is inside those ads, and which ones have been running a long time.

# Inputs
- <COMPETITOR_ACCOUNTS> or brand names to watch
- Access to Meta Ad Library, Google Ads Transparency Center, and LinkedIn Ad Library
- Object storage, a Postgres database, and an API the team can point Claude Code (or another coding agent) at
- A multimodal vision model to watch video and stills (the author mentions a small Google model)

# Steps
1. Collect ads from the Facebook, Google and LinkedIn ad libraries for your competitors. The author uses Apify for this. Follow each library's terms and Apify's terms; do not bypass access controls. (terms caveat added, not in source)
2. Store the raw creatives (video, images, copy) in object storage.
3. Run a multimodal vision model over each video and static. Have it describe everything it sees and transcribe spoken and on-screen text.
4. Save those descriptions, transcripts and metadata in Postgres.
5. Record first-seen and last-seen dates for every ad, and update last-seen on each refresh. A long-running ad is a useful signal (someone is still paying to keep it up). It does not prove the ad converts. (Steven Calvert's addition, not in the source post)
6. Put an API in front of the database so the creative team's coding agent can query the whole competitor catalog.
7. Use that agent to summarise category trends and look for gaps, so new creative differentiates instead of copying the average ad.
8. When briefing new creative, treat long-running ads as "still funded", not "the winner". Pair them with your own performance data before imitating anything. (added, not in source)

# Success check
- New competitor ads land in object storage and Postgres with a transcript or description.
- Each row has first-seen and last-seen dates that update on refresh.
- The team's agent can query the catalog and return trends plus gaps with links back to stored ads.

# Failure modes
- Library coverage is incomplete, so "nobody is saying X" may just mean you did not collect it.
- Vision descriptions can miss text, fine print or offers. Spot-check a sample against the raw file. (added, not in source)
- Long-running is not conversion. An ad can run because nobody looked at it, or because it is cheap to leave on.

# Anti-patterns
- Building this only inside a vendor tool with no export of your own data. The post pitches Graphed (the author's product) as the place to build it.
- Copying competitor claims or trademarks into your ads.
- Using personal data from ads or landing pages beyond what the libraries permit. (added, not in source)

# Source
Cody Schneider (@codyschneider), https://x.com/codyschneider/status/2119203266923794627, 2026-11-07. The post promotes Graphed. First-seen and last-seen tracking is Steven Calvert's addition and is marked above.
