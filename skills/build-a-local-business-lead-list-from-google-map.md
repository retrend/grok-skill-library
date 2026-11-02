---
name: Build a local-business lead list from Google Maps and license records
description: >-
  Use this when you sell to local trades (roofers, HVAC, electricians, plumbers,
  contractors) and need an outbound list no paid database has, built from Google
  Maps listings plus public license records and cleaned with Claude Code.
---
# Steps

Work in one folder (`local-list/`) where Claude Code runs. Every step saves a CSV there.

## 0. Set up
```bash
curl -fsSL https://claude.ai/install.sh | bash
mkdir local-list && cd local-list && claude
```
Start with 1 business type and 1 state (or region).

## 1. Pull the listings
- One search is 1 business type in 1 city.
- List every name your buyer goes by (e.g. roofer, roofing contractor, roof repair). Run each name in every city you sell in, because owners describe themselves in their own words. Example plan: 3 terms x 4 cities = 12 searches.
- **Clay** (Google Maps source): run Google's business type first, then keyword searches. A search returns up to 1,000 results, so split big cities into neighbourhoods. Use Clay to test 1 niche in 1 city.
- **Apify**, "Google Maps Scraper" actor by Compass: terms in Search term(s), 1 location per run (a whole state works). Clear "Number of places to extract" so it pulls everything. Use Apify for full-state coverage.
- Export every search as a CSV into the folder, then prompt:
> Combine the Google Maps CSVs in this folder into 1 file called listings.csv. Remove the duplicate businesses, matching on the place ID first, then on the phone number. Tell me how many you removed.

## 2. Size by review count (floor and ceiling)
- **Floor:** sort `listings.csv` by review count, lowest first. Open the 10 smallest on Maps (photos, website), then move up 10 at a time. The first review count with a team behind it (staff in photos, a team page, more than 1 truck) is your floor.
- **Ceiling:** find the chains.
> Read listings.csv. List every business name that shows up in 3 or more cities, with the cities and the review count for each.
- Cut the chains (they buy through head office) and set the ceiling below where they start. Set both numbers from your own rows.
> Keep the rows in listings.csv with between [FLOOR] and [CEILING] reviews, and drop the chains you found. Save the result over listings.csv and tell me how many rows are left.

## 3. Add the license records
- Download your trade's file from [STATE_LICENSE_SOURCE] into the folder as `licenses.csv`. Use the trade-specific file, not the combined one. US examples from the source: Texas TDLR daily CSVs (no status column, so filter on expiration date), California CSLB License Master and Personnel files (roofers are C-39), Florida DBPR weekly files.
- If the trade isn't licensed in that region, copy `listings.csv` to `matched.csv` and skip to step 5.
> Keep only the [LICENSE_TYPE] rows in licenses.csv, and drop the expired licenses ([by expiration date | by the status column]). Then match licenses.csv to listings.csv, on the phone number's digits first, then on the business name and city, ignoring Inc, LLC, punctuation and capital letters. Add the license number and every status, date and name column the license file has to each matched row, and save the result as matched.csv. Put the listings with no match in unmatched.csv, and tell me how many matched.
- If there's a personnel or officer file, save it as `personnel.csv` and have Claude Code add 1 name and title per license on the license number.
- Check 20 matches by hand before you trust the rest. Fix spelling misses in `unmatched.csv` by hand.

## 4. Scrape regions that only have a search page
- Read the site's terms first.
> This state only has a search page: [URL]. Write a Python script called scraper.py that pulls the business name, the person named on the license, phone number, city, license number, license status and issue date for [LICENSE_TYPE] in [COUNTY] into licenses.csv. Wait 2 seconds between pages, and save after every page so a stopped run picks up where it left off. Test it on 20 rows first and show me the results.
- Check the 20 rows against the page by eye. Blank rows usually mean the page renders in the browser, so ask for Playwright:
```bash
python3 -m pip install playwright
python3 -m playwright install chromium
```
- Re-test, then do the full run and go back to the step 3 match.
- Schedule it monthly. New licenses are your best reason to write.
> Run scraper.py from the first page at 7am on the 1st of every month, and keep a dated copy of each month's licenses.csv. Use [SCHEDULER, e.g. launchd on Mac], and tell me where you saved the job.

## 5. Clean, then tag what each business sells
- Read the first 20 rows of `matched.csv` yourself, then:
> Read matched.csv. Group the businesses by what they are, with a count and 3 example names for each group. Flag the schools, coaches, consultants, suppliers and any listing marked permanently closed.
- Keep the cut pile under half the file. If it's bigger, use a narrower search term next pull.
> Remove the schools, coaches, consultants, suppliers and permanently closed listings you flagged in matched.csv. Move the rows with no website, or a Facebook, Instagram or Yelp page as their website, to call-only.csv. Save the rest as clean.csv, with a domain column (the website address minus https:// and www.) and a full name column from the license name, so SMITH, JOHN A becomes John Smith. Leave the full name blank for any license name that's a company.
- Import `clean.csv` into Clay. Add a Use AI column (Web research) with this prompt:
> Visit [Website] and say in 5 words or fewer what this business mainly sells, in the words its own site uses, like "residential re-roofs" or "commercial flat roofs". Write "unclear" for a site that doesn't say.
- Note the 3 to 5 most common answers. Add a second AI column that puts each row into one of those niches or "other". Write 1 message per niche.
- Opener for new licenses:
> [First name], saw [Business] got its [license type] license in [month]. We help [niche] companies [your main result]. Worth a 15-minute call next week?
- For older licenses or rows with no date, open on what the website says the business sells.

## 6. Find the person, verify, send
- In Clay, run "Find Work Email with Prospeo" on the full name and domain columns. For rows with no name, run "Find people at company with Prospeo" on the domain first. Leave catch-all off.
- On send day, export the list, re-verify with [EMAIL_VERIFIER, e.g. MillionVerifier], and hold anything it can't confirm. Keep bounces under 2%.
- Upload 1 list per niche to [SENDER]: Instantly for volume email, lemlist when you want call steps (Maps listings come with phone numbers).
- Check outreach rules for your market before sending, e.g. CAN-SPAM in the US or the Spam Act in Australia. Honour opt-outs. (Added, not in source.)

## Success check
A finished row has: business, category, reviews between floor and ceiling, license number/status/date, a niche tag, a named person, a verified email and the listing phone.

## Rules
- 1 business type and 1 region to start. The first region is the slowest because every license file has its own columns.
- Read the terms before you scrape anything, including Google Maps and Apify usage terms. (Added: scraping Maps through third-party tools may be against Google's terms, so check before running at scale.)
- Test 20 rows before every full run.
- Re-run the license pull monthly.
- Bounce under 2% on every list.

# Not for
- Selling to B2B companies that already show up in lead databases (Apollo, ZoomInfo). This is for local trades found on a map.
- Regions with no public license data (you can still do steps 1, 2, 5 and 6).
- Writing the outreach copy itself. This skill builds the list.
- Any auto-sending without verification and opt-out handling.

# Source
- Alex Vacca (@itsalexvacca), "Google Maps + Claude Code = your next lead list", X article, 15 Oct 2026: https://x.com/itsalexvacca/status/2110732018367795261
- Summary post, 21 Oct 2026: https://x.com/itsalexvacca/status/2112805599549460770
- Author is CEO of Frontal (GTM agency) and a Clay Elite Studio Partner. Tool choices (Clay, Prospeo, Instantly, lemlist) reflect that. Pricing as quoted in Oct 2026: Apify $4/1,000 places on the free plan ($5 free usage a month), Instantly Growth $47/mo, lemlist Multichannel $109/mo per user. The "9 in 10 failed campaigns failed on data" figure is the author's claim.
