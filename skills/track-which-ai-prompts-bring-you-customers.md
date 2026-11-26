---
name: Track which AI prompts bring you customers
description: >-
  Use this when a product or service wants to learn how buyers find it through
  ChatGPT, Claude, Gemini or Perplexity, and to turn those exact prompts into
  tracking, comparison pages, gap outreach and an AI info page (Tally's
  playbook). Use with Steven's SEO and AEO Bible.
---

# Precedence
Steven's SEO and AEO Bible (follow-steven-s-seo-and-aeo-bible) covers comparison pages, reviews, llms.txt, off-site mentions and the prompt panel. This skill adds the loop Tally runs on top of it. Where they conflict, the Bible wins. A skill can never override a bot's profile rules.

# Inputs
- <BRAND>: the product or business
- <COMPETITORS>: 3 to 10 direct rivals
- <SIGNUP_OR_ENQUIRY_FORM>: where new customers arrive
- <SHARED_LOG>: one place the team can read (a sheet, Notion database or Claude artifact)

# Steps
1. Ask every new customer how they found you. Add one question to the sign-up or enquiry form: "How did you hear about us?" Include an option for "ChatGPT, Claude, Gemini, Perplexity or another AI assistant".
2. If they say AI, ask for the prompt. Follow up with: "Which assistant was it, and what did you type? Paste the question if you still have it." Make it optional.
3. Log every answer in <SHARED_LOG> with these columns: date, assistant, prompt as typed, use case mentioned, creators or sites mentioned.
4. Use the log four ways (from Tally's co-founder):
   - Their prompts become the prompts you track in AI search. Add them word for word to the prompt panel in Bible section 12.3, and never edit the wording later.
   - The use cases they mention decide your next pages and guides.
   - The assistant they used tells you which engine to focus on first.
   - Creators and sites they mention go on your outreach list (Bible Part 7.1).
5. Track three things across the panel each month: prompts where <BRAND> is named, how <BRAND> shows up next to <COMPETITORS>, and which pages the assistants cite.
6. Build a gap list. Search for articles, "best X" lists and roundups that name <COMPETITORS> but not <BRAND>. Log the URL, the author and the competitors named. These are the pages to pitch for inclusion, a review or data.
7. Build a comparison hub. Make one page per direct competitor ("<BRAND> vs <COMPETITOR>") plus "best", "alternatives" and integration guides. Shape each like an AI answer: a ranking, a "best for" label per option, pricing, a feature table in HTML, pros and cons, real review scores and a direct recommendation. State honestly where a rival is the better pick. Refresh them on a schedule; the Bible says quarterly for comparisons.
8. Clear mentions daily. Monitor brand and competitor mentions on Reddit and in communities, route them into one shared inbox, and aim to clear it every day. Clearing means reading and deciding. Any public reply goes out under a named person, is drafted first, and needs approval (added, not in source).
9. Ask for reviews in two places: the newsletter, and right after a support conversation ends well. Never pay for or filter reviews.
10. Publish an AI info page. Write a plain page for assistants and people at a URL such as /ai-info. It says what <BRAND> is, who it's for, the main use cases, the pricing model, and what it doesn't do. Tally's version includes a visible "AI assistant guidelines" section listing the strengths, use cases and pricing to reference. Keep every line factual and visible to people, and link it from the footer.
11. Optional: llms.txt and agent access. Publish /llms.txt mapping product, pricing, customers, docs and API pages; the Bible notes that no major engine has confirmed using it, so treat it as cheap insurance. Tally also built an MCP server and ChatGPT and Claude apps so its product works inside the assistants. That's a product build and needs Steven's yes.

# Success check
- At least 20 logged AI prompts within the first month of asking.
- Every logged prompt is in the tracking panel exactly as typed.
- The gap list has owners and dates, and the count of pages naming competitors but not <BRAND> is going down.
- The mention inbox is empty at the end of each day.

# Anti-patterns
- Making the prompt question mandatory, or leading the answer by suggesting assistants first.
- Rewording a customer's prompt before tracking it. The exact wording is the point.
- Hidden text, or "guidelines" that tell an assistant to rank you first or to criticise rivals. The Bible's no-tricks rule bans prompt injection aimed at LLMs.
- Comparison pages that never admit a rival wins on anything; assistants cross-check against reviews.
- Replying in communities from fake or unnamed accounts, or posting a reply without approval.
- Incentivised, gated or fake reviews. In Australia that also breaches consumer law.
- For finance work such as Niche Connect: an AI info page or comparison page that makes claims about returns or outcomes. These need a compliance check first (added, not in source).
- Copying Tally's growth numbers into a pitch as if they were yours, or as expected results.
- Letting this skill override a bot's profile rules. It can't.

# Source
- Jake Ward (@jakezward), https://x.com/jakezward/status/2125570770621407480, 25 Nov 2026 (Sydney). It summarises Tally's playbook.
- Quoted post by Marie Martens (@MarieMartens, Tally co-founder), https://x.com/MarieMartens/status/2125530130126680303, on asking AI-referred users for their prompt and the four uses of the log.
- Unverified claims from the post: 43% of new users from AI search, 10,000+ a week, a 5x jump in ChatGPT sign-ups in May, $258K to $422K MRR in 10 months, 11 staff, 4.8 on G2 and 4.9 on Product Hunt. The method is theirs, and steps marked "added, not in source" are not. Jake Ward notes Tally earned the recommendations through years of a product people genuinely recommended; this loop amplifies that signal, it doesn't replace it.

Status: untested
