---
name: Run GTM research as a three-hour sparring session
description: >-
  Use this when you need a first go-to-market hypothesis from raw competitor,
  earnings, review and forum material, and you want an LLM as a sparring partner
  rather than a summariser.
---
# Goal
Turn a pile of primary material into a GTM hypothesis you can take to real buyers, in about three hours instead of weeks of unfocused research.

# Inputs
- 25–40 competitor websites, fully scraped: pricing pages, case studies and docs
- The last few earnings calls from the 3–5 biggest incumbents
- 100+ customer reviews (G2, Capterra, Trustpilot, app stores)
- Every Reddit or forum thread where people vent about the category
- An LLM you can iterate with (the post uses Claude)

# Steps
1. Do not start by typing "research the market for X". Feed the model the raw material above first.
2. Ask questions that force it to think, not summarise:

```
What do the winners in this market know that their customers would never admit?
```

```
List the beliefs this whole industry takes for granted. For each one, what would need to happen for it to be false?
```

3. In about 20 minutes you should see where everyone agrees, where everyone is blind, and which customer pains nobody is building for.
4. Pick your best angle and tell the model to tear it apart:

```
Steelman this thesis like a top-tier VC would. Then show me exactly where it fails.
```

5. Do a few rounds of that. After about three hours you want a first GTM hypothesis. Treat the model as a sparring partner that doesn't get tired or defensive when it's wrong.
6. It is still a hypothesis. The real work starts when you talk to actual buyers.
7. Follow scraping terms, copyright and site rate limits when collecting material. Don't feed scraped personal data into a public model. (added, not in source)

# Success check
- The raw corpus exists (sites, earnings, reviews, vent threads), not just a chat summary.
- You have a written hypothesis plus the strongest objections from the steelman rounds.
- You have a list of real buyers to test it with.

# Failure modes
- The "taught at Y Combinator" and "4 weeks into 3 hours" claims are the author's. Unverified.
- The model can invent pains that are not in the corpus. Every claim should point back to a page, call, review or thread you fed it. (added, not in source)
- Stopping at the hypothesis and never talking to buyers.

# Anti-patterns
- A one-shot "research this market" prompt with no source pile.
- Publishing or pitching the hypothesis as fact.
- Treating the closing Gojiberry mention (the author's product for finding people to test with) as a required step.

# Source
Guillaume Bardet (@GuillaumeBardet), https://x.com/GuillaumeBardet/status/2118657239217041552, 2026-11-06. The post promotes Gojiberry at the end.
