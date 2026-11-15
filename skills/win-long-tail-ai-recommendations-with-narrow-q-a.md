---
name: Win long-tail AI recommendations with narrow Q&A pages
description: >-
  Use this when a new or small brand can't break into AI assistants' answers for
  broad "best X" questions and you want to get named for narrow,
  problem-specific questions instead, measure which assistants pick it up, and
  optionally scale the winners into many pages with AI.
---
# Steps

1. **Skip the head terms.** The 3 to 5 brands an assistant names for broad asks ("best `<CATEGORY>`", "cheapest", "`<COMMON_FEATURE>`-free") barely moved over 6 to 7 months of Burke's tracking. Don't target them first.
2. **Pick 4 or 5 narrow buyer problems.** Each one is a specific problem plus a specific constraint, phrased the way a buyer would ask an assistant. Burke's example: "I get irritation from baking soda. What natural deodorant should I buy for sensitive skin?" Write yours as `<LONG_TAIL_QUESTIONS>`.
3. **Name the specific terms.** Put the exact ingredients, features, methods or comparisons those questions involve (Burke used "colloidal oatmeal" and "magnesium hydroxide") into the copy, word for word.
4. **Build a small site and get it indexed.** Burke used a $11.25 domain, a site Claude built on Vercel in about 20 minutes, and 3 pages:
   - a product or service page with specifics (her "formulation notes")
   - product Q&A pages that answer the narrow questions directly
   - one comparison page for the narrow choice (hers: magnesium vs baking soda for sensitive skin)
5. **Publish one off-site essay in the brand's voice.** Burke posted one Substack essay bylined as the brand. She wrote no reviews or testimonials and paid for no coverage.
6. **Query on a schedule and leave it alone.** Run a script that asks each assistant the long-tail questions plus about 13 broad control questions. Ask ChatGPT with browsing on and with browsing off, Claude and Gemini. Log whether the brand is named and in what position. Burke didn't touch the site for 30 days.
7. **Read the results by assistant and by query.** In Burke's test:
   - ChatGPT with browsing on named the brand first in 4 of 4 long-tail answers, starting at week 3.
   - ChatGPT with browsing off: not named.
   - The 13 broad questions: not named.
   - Claude and Gemini: never named it.
8. **Double down on what got picked up.** Add more Q&A and comparison pages for the narrow questions that worked. Keep testing the others per assistant. (added, not in source)

# Optional: scale it with AI (from @gkxspace)

9. **Mine real pain points.** Have the AI review competitors' data and best pages in bulk and pull out users' real pain points. gkxspace built for a need he had himself, so he knew what good looked like.
10. **Generate pages for every narrow question.** Have Claude generate pages in bulk (he made over a thousand), one per finely split question, each targeting a different audience and need, each with an overview section and Q&A. He found ChatGPT's crawler picked up new pages very fast.
11. **Attribute, then let the AI maintain it in a loop.** Track which pages are indexed and which bring revenue. Have the AI:
    - improve the pages that convert best
    - fix or remove pages that aren't indexed or have problems
    - expand the topics that sell most
    Rerun the loop on a schedule. He says he stepped in only a few times.

# Success check
- A per-assistant table of the long-tail and broad questions, showing named or not, with position, checked weekly for at least 4 weeks.
- The brand is named for at least one narrow question on at least one assistant.
- If scaled: indexed pages, AI-referred visits and revenue per page, so the maintenance loop has numbers to act on.

# Example for a golf pro (added, not in source)
- `<LONG_TAIL_QUESTIONS>`: "I'm over 50 and keep slicing my driver. Should I book lessons or a fitting near `<SUBURB>`?" or "Is a playing lesson or a range lesson better for breaking 90?"
- Pages: the lesson offer with specifics, a Q&A page per question, and one comparison page (for example, playing lesson vs range lesson).

# Source
- Original: Deana Burke, Boys Club, "the fake brand that ChatGPT fell for", 5 Aug 2026: https://paragraph.com/@boysclub/the-fake-brand-that-chatgpt-fell-for
- Relayed by Cybernews (Eglė Krištopaitytė), 10 Aug 2026: https://cybernews.com/ai-news/chatgpt-fake-deodorant/
- Extra detail from Burke's BevNET interview: https://www.bevnet.com/video/how-to-get-ai-to-recommend-your-brand-over-competitors
- Steps 9 to 11: 余温 (@gkxspace), 11 Nov 2026, in Chinese, translated: https://x.com/gkxspace/status/2120464771900379217
- Burke ran one test with one brand. gkxspace says daily revenue rose from a few hundred to 1,000–2,000 (currency not given) and that 60% of a week's ~$4,900 in sales came from ChatGPT. His screenshots show this, but none of it is independently checked. Assistants change often, so rerun the test before trusting it.

# Anti-patterns
- Inventing a brand, product, credentials or ingredients to sell. Burke's brand was fake on purpose to prove a point. Use real offers and true claims only. (added, not in source)
- Fake reviews or testimonials. Burke used none, and they break consumer law. (added, not in source)
- In regulated niches such as finance, health or advice, publishing Q&A answers without a compliance check. (added, not in source)
- Thousands of near-identical AI pages with nothing useful on them. Google's spam policies call mass-produced, low-value pages "scaled content abuse", and that can sink the whole site in search. Each page should answer its question with real specifics. (added, not in source)
- Letting the AI delete pages or data unattended. Keep deletes behind a human check and a backup. One of gkxspace's screenshots shows Claude stopping before a database delete because it found real paying users. (added, not in source)
- Judging the result on "best X" queries.
- Treating "AI" as one channel. Pickup differed completely between ChatGPT with browsing, ChatGPT without it, Claude and Gemini.
- Checking once in week 1 and giving up. Pickup took about 3 weeks.
