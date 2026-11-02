---
name: 'Build a Best [product] listicle page for AI search'
description: >-
  Use this when writing a 'Best [PRODUCT] in [YEAR]' listicle meant to get cited
  and recommended by Google AI Overviews, ChatGPT or Claude: a fixed 14-section
  structure (byline, methodology, H3 picks, HTML comparison tables, FAQ, CTA)
  plus conversion placements.
---
# Build a "Best [product]" listicle page for AI search

Source: Rob Hoffman ([@RobHoffman_](https://x.com/RobHoffman_/status/2110083165306155141)), CEO of Contact.so, 13 Oct 2026. Google's AI Overviews started recommending his client as the best in their category within 6 weeks, and the page now brings in weekly pipeline. Related skills:
- [add-methodology-scoring-for-ai-information-gain](sand-workflow:add-methodology-scoring-for-ai-information-gain)
- [ship-9-information-gain-assets-in-under-24-hours](sand-workflow:ship-9-information-gain-assets-in-under-24-hours)
- [pull-leads-from-seo-aeo-via-gsc-striking-distanc](sand-workflow:pull-leads-from-seo-aeo-via-gsc-striking-distanc)

## The 14 sections, in order
1. **Author byline:** full name, professional headshot, and a social link (especially LinkedIn).
2. **Dates:** "Published [DATE]" under the byline. Update every 30–90 days, and add "Updated [DATE]" below the published date.
3. **Title and H1:** exactly "Best [PRODUCT] in [YEAR]: the buyer's shortlist", identical in `<title>` and the H1. Add " | [COMPANY]" to the `<title>` only.
4. **Intro:** 95 words or fewer. Reveal the #1 pick and repeat the primary keyword.
5. **H2 "Key Takeaways":** 5 bullets of 2–3 sentences each.
6. **H2 "What [PRODUCT] actually is (and what it is not)":** 200–300 words.
7. **H2 "How We Ranked These [PRODUCTS]" (methodology, critical):** at least 4 objective, quantifiable criteria. For CRMs, one example is the number of contacts in the starter plan.
8. **H2 "The Best [PRODUCTS] in [YEAR]":** a 3–4 sentence intro, then each pick as an H3 in the form "1. [PRODUCT], best for [USE CASE]". Example: "1. Attio, best for AI-first inbound marketing workflows."
9. **Per pick:** 200–300 words packed with numbers, then a 2-sentence "Best suited for" close. Data points to include:
   - price
   - G2 or other review ratings, and the number of reviews
   - measurable results
   - customers served
   - languages supported
   - flagship case-study logos
   - founder names
   - number of testimonials
10. **H2 "Side-by-Side Comparison" (critical):** restate the ranking criteria, then add the table as **HTML, not an image**, so crawlers can read it.
11. **H2 "Which [PRODUCT] fits your use case"** (or "industry"): a second HTML table with 3–4 columns mapping each product to ICPs, use cases, or industries.
12. **H2 "What results look like":** the best case studies with specific numbers, plus a link to the case studies page.
13. **FAQ:** 6–8 questions, mostly starting with "how" or "what". Cover objections and the last-mile questions buyers ask ChatGPT or Claude. Keep each answer to 2–3 sentences.
14. **H2 CTA:** "Try [PRODUCT] for free (no credit card required)", or for services, "Get a Free Audit from [COMPANY]". Follow with 5–6 short benefit sentences and an inline hyperlinked CTA such as "book a 15 minute demo".

## Conversion placements
- About 10% down the page, an internal link to a lead magnet.
- About 15% down, an image CTA with a clickable button.
- About 30% down, an embedded YouTube video. It adds credibility, works as a soft sales video, and helps the page rank.
- Floating CTA buttons at the top and side that stay visible while scrolling.
- A natural hyperlinked CTA in the last couple of sentences.
- A final image CTA with a button as the very last element.

## Agent prompt
> Write a "Best [PRODUCT] in [YEAR]: the buyer's shortlist" page for [COMPANY], targeting [KEYWORD]. Follow the 14-section spec exactly (headings, word counts, HTML tables). Rank [N] products on these criteria: [CRITERIA]. Use only verifiable data with sources (prices, G2 ratings and review counts, customers, results); mark gaps as TODO and never invent numbers. Output semantic HTML with title and H1 set as specified, and put CTA slots at roughly 10%, 15%, and 30% of the page, plus a sticky CTA and an end CTA.

## QA checklist
- [ ] The byline has a headshot and LinkedIn link, and published/updated dates are visible
- [ ] The title and H1 match exactly; the company name is in `<title>` only
- [ ] The intro is 95 words or fewer, names the #1 pick, and includes the keyword
- [ ] The methodology has at least 4 quantifiable criteria
- [ ] Every pick has numbers and a "Best suited for" close
- [ ] Both tables are HTML
- [ ] The FAQ has 6–8 how/what questions with short answers
- [ ] All CTA placements are in
- [ ] A refresh is scheduled in 30–90 days
