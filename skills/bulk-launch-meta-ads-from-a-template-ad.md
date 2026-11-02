---
name: Bulk launch Meta ads from a template ad
description: >-
  Use this when launching dozens to hundreds of Meta ad creatives a week across
  one or more brands — mirror a proven template ad’s settings, ingest a creative
  folder once, auto-pair aspect-ratio variants per placement, lock enhancement
  opt-outs, preview the build, then publish paused via the Marketing API or a
  bulk-import sheet, with an agent preparing and a human approving go-live.
---
# Steps

The slow part of creative testing on Meta is not strategy. It is redoing the same setup per ad: upload, route each aspect ratio to its placements, name it, untick the enhancements you don’t want, pick the page, paste the headline. Do that work once as a template plus a batch spec, then generate every ad from it.

Pair this with [Warehouse Meta ads; API for mutations only](sand-workflow:warehouse-meta-ads-api-for-mutations-only): analysis comes from a warehouse, and the Marketing API is used for these launches.

## 0. Access and guardrails

1. Use a system user or an app token with `ads_management` on each ad account and Page you’ll launch to. One token per Business Manager. Store it as a secret, never in the batch file.
2. Decide who presses go-live. The default is that everything gets created **PAUSED**, and a human reviews the preview and then activates. Only let an agent activate if you explicitly said so for that batch.
3. Set a per-batch cap (for example, 200 ads) and a per-day spend ceiling on each new ad set.

## 1. Pick the template ad (one per brand / campaign type)

1. Choose a live ad whose campaign and ad set setup you trust: objective, optimisation event, pixel or dataset, attribution, placements, audience, budget type, bid strategy, schedule, and URL parameters.
2. Read its IDs and settings once (campaign, ad set, creative, Page, Instagram account) and save them as a **preset** file, e.g. `presets/<brand>-<campaign-type>.json`.
3. Record which fields the batch is allowed to override: ad name, primary text, headline, description, CTA, destination URL, UTM parameters. Everything else is inherited.

Example preset fields:

```json
{
  "ad_account_id": "act_<ID>",
  "page_id": "<PAGE_ID>",
  "instagram_user_id": "<IG_ID>",
  "campaign_id": "<CAMPAIGN_ID>",
  "template_adset_id": "<ADSET_ID>",
  "adset_strategy": "one_adset_per_concept",
  "url_tags": "utm_source=meta&utm_medium=paid&utm_campaign={{campaign.name}}&utm_content={{ad.name}}",
  "default_cta": "SHOP_NOW",
  "enhancements": "opt_out_all"
}
```

## 2. Prepare the creative folder

1. Name files so variants of one concept group automatically, e.g. `<concept>_<hook>_<ratio>.<ext>` with ratios `1x1`, `4x5`, `9x16`, `16x9`.
2. Put a thumbnail next to each video if you want a custom one: `<concept>_<hook>_thumb.jpg`.
3. Add a launch sheet (CSV) with one row per concept or ad: `concept, hook, primary_text, headline, description, cta, url, adset_group`. Leave blanks to inherit preset defaults.
4. Validate before upload. Check every concept has the ratios your placements need, that there are no duplicate names, text lengths are sane, URLs resolve with a 200, and UTMs are present.

## 3. Upload media once

1. Images go to `POST /act_<ID>/adimages`. Keep the returned `hash` per file.
2. Videos go to `POST /act_<ID>/advideos`. Keep the returned video ID and wait until processing finishes before using it.
3. Write a media map (`file → hash/video_id`) so a re-run skips files already uploaded.

## 4. Pair aspect ratios to placements

For each concept, build one creative that serves the right ratio per placement rather than letting Meta crop:

- Use `asset_feed_spec` with `optimization_type: PLACEMENT`. Label each asset (`adlabels`, e.g. `square`, `vertical`) and map labels with `asset_customization_rules`, each rule a `customization_spec` (publisher platforms and positions) plus an `image_label` or `video_label`. Meta requires at least two rules per asset feed.
- Typical mapping: 9:16 goes to Stories, Reels, and Status placements, and 1:1 or 4:5 goes to Feed and everything else. Only include positions your template ad set actually runs.
- For a single-ratio creative, use a plain `object_story_spec` instead.

## 5. Lock creative enhancements

Set `degrees_of_freedom_spec.creative_features_spec` explicitly on every creative so Meta doesn’t switch features back on. For example, opt out of `adapt_to_placement` (image touch-ups), `image_touchups`, and `pac_relaxation` (flexible media), plus any other enhancement your brand doesn’t want. For music, an empty `asset_feed_spec.audios` opts out. Keep the list in the preset so every batch is identical.

Field names change between Graph API versions. Check them against Meta’s current Advantage+ creative and asset customization docs before the first batch on a new API version.

## 6. Build the structure and preview it

1. Group ads into ad sets using the preset strategy: one ad set per concept, one per N ads, or a custom column from the launch sheet.
2. Create new ad sets by copying the template ad set (`POST /<ADSET_ID>/copies`, with deep copy off), then override only name, budget, schedule, or destination where the sheet says to.
3. Split destinations: if a row lists several URLs (up to about five), build parallel ad set flows, one per destination.
4. Name everything with a pattern, e.g. `{brand}_{concept}_{hook}_{ratio-set}_{date}`, so reporting groups cleanly.
5. **Print a preview before any write.** List campaign, ad sets, ad names, media per placement, copy, URL, and the total count. A human checks it. Stop here if anything is off.

## 7. Publish

**API path (default)**
1. Create the creative with `POST /act_<ID>/adcreatives` (`asset_feed_spec` or `object_story_spec`, plus `degrees_of_freedom_spec`, Page, and Instagram identity).
2. Create the ad with `POST /act_<ID>/ads`, passing `adset_id`, `creative: {creative_id}`, `status: PAUSED`, and `url_tags` if you use them.
3. Send in Graph batch requests (up to 50 calls per batch). Back off on throttling errors. Never retry-loop a create without first checking whether it succeeded.
4. Log every created ID against its launch-sheet row.

**Sheet path (when you want Ads Manager review)**
- Export the same build as an Ads Manager bulk-import spreadsheet, with media already uploaded and referenced by hash or ID. Import it in Ads Manager, review there, and publish.

**Scale a winner without losing social proof**
- Reuse the existing post by creating the new ad’s creative with `object_story_id: "<PAGE_ID>_<POST_ID>"` and placing it in new ad sets or campaigns. Likes and comments stay on one post.

## 8. Verify and hand off

1. Read back each created ad: status PAUSED, correct ad set, creative ID, effective preview links for Feed and Story/Reels.
2. Spot-check previews for at least one ad per concept, looking for the right ratio per placement, no unwanted enhancements, correct text, and a working URL.
3. A human activates (ad set or ad level). Record the activation time.
4. Save the batch folder, media map, preset version, and created-ID log for the next run.

## Agent split

- An agent can validate the folder, upload media, build the preview, create PAUSED objects, and write the log, through a script or CLI, or through an Ads MCP limited to these writes.
- It cannot activate, raise budgets, or launch to a new ad account or Page without an explicit yes for that batch.
- One batch spec per run keeps it reviewable and repeatable.

## Success check

- Every ad inherits the template’s campaign and ad set settings, and only the allowed fields differ.
- Each placement shows its intended ratio, and enhancements match the preset.
- Preview was reviewed before the first write. Every ad was created PAUSED unless go-live was approved.
- A re-run skips already-uploaded media and doesn’t duplicate ads.
- The created-ID log maps 1:1 to launch-sheet rows.

## Anti-patterns

- Clicking through Ads Manager per ad and re-ticking boxes every time.
- Letting Meta auto-crop one 1:1 file into Stories and Reels when you have a 9:16.
- Leaving enhancement defaults implicit, which lets them drift on.
- Using the live API for reporting scans (use the warehouse skill).
- Agents activating spend or retry-storming creates on throttle errors.

## Source

- Generic version of the workflow pitched by Chris (@chr1stwits) for AdsUploader ([post, 6 Oct 2026](https://x.com/chr1stwits/status/2107372255919653288), [adsuploader.com](https://adsuploader.com)): template ad settings mirrored, creatives dropped once, ratio and thumbnail auto-match, API or XLSX launch, CLI/MCP for agents. Product not required.
- API field references: Meta Marketing API docs for [asset customization rules](https://developers.facebook.com/docs/marketing-api/ad-creative/asset-feed-spec/asset-customization-rules/), [placement asset customization](https://developers.facebook.com/docs/marketing-api/dynamic-creative/placement-asset-customization/), [Advantage+ creative](https://developers.facebook.com/docs/marketing-api/creative/advantage-creative/get-started/), and [ad creative](https://developers.facebook.com/docs/marketing-api/reference/adcreative/).
