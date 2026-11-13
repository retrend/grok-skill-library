---
name: Apply eleven on-page fixes for answer engines
description: >-
  Use this when you want a site or key pages to be read, cited or recommended by
  answer engines and AI agents (Meta Muse, ChatGPT, Claude, Perplexity, Google
  AI answers) and need the site-wide on-page checklist: accessibility, raw HTML
  facts, question headings, honest answers, definitions, dated facts,
  robots.txt, broken links, semantic HTML and freshness.
---
AEO = answer engine optimisation. The source is an 11-point checklist aimed at Meta Muse. The Muse client win, the "future of AEO" framing and the claim that broken links lower a "trust score" are the author's and unverified.

Related skills: optimize-about-us-for-ai-search (About page), build-a-best-product-listicle-page-for-ai-search ("Best <PRODUCT> in <YEAR>" page, same author), test-whether-ai-assistants-relay-an-ai-only-offe (measuring mentions). (added, not in source)

Use only facts you can source. No invented rankings, user counts, ratings or results. (added, not in source)

## Inputs
- The pages to fix (editable HTML and live URL)
- The main questions a buyer actually types
- Current, sourceable facts: pricing, features, ratings, user counts, text testimonials
- Today's date for "as of" and published/updated lines

## Steps
1. **Fix the accessibility tree** (the author says this is how Muse reads a site).
   1. Name every icon button, e.g. hamburger menu `aria-label="Open menu"`.
   2. Give every form field a `<label>` ("phone", "first name", "email").
   3. Write descriptive alt text as if explaining the image to a blind person, e.g. "overhead view of a white horse running".
   4. Never put important context only in images.
2. **Put key facts in raw HTML, not injected by script.**
   Good:
   ```html
   <p>light and pro plans on beehiiv take 0% of paid subscription revenue</p>
   ```
   Bad:
   ```html
   <div id="price"></div>
   <script>
     document.getElementById("price").innerText = "light and pro plans on beehiiv take 0% of paid subscription revenue";
   </script>
   ```
   If pricing, proof or specs load via `<script>`, AI crawlers can't read them.
3. **Make the reader's main question the first H2**, right under the H1, worded as they'd type it. On a "<COMPETITOR_A> vs <COMPETITOR_B>" page: `Which is better, <COMPETITOR_A> or <COMPETITOR_B>?`
4. **Answer "it depends" in 100 words or less.** Don't claim you're best for everything; the author says AI favours use-case-specific recommendations. Source example: "if you care about keeping all your subscription revenue, beehiiv is the better choice: beehiiv takes 0% of paid subscriptions, and substack takes 10%. Substack works if you want a built-in network to get more readers, and monetizing isn't a concern." Use only checked comparison figures. (added, not in source)
5. **Replace slogans with definitions.** Flagged slogans: "Your inbox, reimagined.", "Supercharge your CRM", "The all-in-one social growth platform". Write what it is, who it's for, what it does: "AgencyMax is a CRM for SEO agencies that tracks leads, proposals, and existing clients on a single dashboard."
6. **Testimonials as plain text**, not images or JavaScript. Test: if you can't highlight it with the mouse, AI likely can't read it. Only with permission. (added, not in source)
7. **Date key facts with "as of".** Pricing, features, G2 ratings, user counts, e.g. "<COMPETITOR> has <NUMBER> active subscribers, as of <YEAR>." No source, no fact. (added, not in source)
8. **Allow Meta's crawler in robots.txt:**
   ```
   User-agent: meta-webindexer
   Allow: /
   ```
   Check at `<DOMAIN>/robots.txt`. This covers Meta only; it doesn't make ChatGPT, Claude, Perplexity or Google cite you. Don't invent other user-agent names. (added, not in source)
9. **Fix broken links.** The author suggests a Screaming Frog technical audit to export broken links; update, redirect or remove them.
10. **Use semantic HTML:** `<nav>` not `<div class="nav">`; `<header>` not `<div class="header">`; `<button>Book now</button>` not `<div>Book now</div>`. If a functional element is a div, assume agents struggle with it.
11. **Keep it fresh.** Update every 30–90 days. Show "published <DATE>" and "updated <DATE>" under the byline. Only change the updated date when you actually revise. (added, not in source)

## Success check
- Buttons, fields and images are named; no key fact lives only in an image or post-load script.
- First H2 is a real buyer question with an honest answer of 100 words or less.
- Opening definition says what, who for, what it does.
- Testimonials and figures are highlightable text with sourced "as of" dates.
- robots.txt allows meta-webindexer if you want Muse; broken links fixed; semantic HTML; dates visible.
- Optional: ask the assistants your buyer questions before and after and log mentions. (added, not in source)

## Anti-patterns
- Claiming you're best for every use case.
- Prices, proof or testimonials only in images or client-side JavaScript.
- Invented counts, ratings or "as of" dates.
- Treating any model's recommendation as a promised ranking.
- Bumping the updated date without changes.
- Serving AI bots a different page from humans (cloaking). (added, not in source)
- In regulated niches (e.g. financial advice): unsubstantiated performance claims or guarantees; get copy compliance-checked. (added, not in source)

## Source
Rob Hoffman (@RobHoffman_), https://x.com/RobHoffman_/status/2112212215583658420, 20 Oct 2026 (Sydney time). Post ends with a DM offer for a live Meta Muse demo; that pitch is not part of the method.
