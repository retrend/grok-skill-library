---
name: Test whether AI assistants relay an AI-only offer
description: >-
  Use this when you want to measure which AI assistants (Claude, ChatGPT,
  Perplexity) read your site and pass a specific offer or message on to buyers,
  and which page format they pick up best.
---
# Steps

1. **Pick pages AI already cites.** List pages that AI answers already cite or link for your category (check AI answers for buyer questions, or an AEO tracking tool). Pick about `<N_PAGES>` (Ramp used ~50). Ignore Google ranking; one of Ramp's best pages mattered little for Google.
2. **Split into balanced test groups.** One group per format, balanced by each page's existing AI citation volume so groups are comparable:
   - Markdown version of the page
   - Plain stripped-down HTML (no nav or design chrome)
   - Schema-heavy version (structured data injected)
3. **Write the offer for agents.** Address it directly to AI agents. Include the exact offer (`<OFFER>`), the exact claim/booking URL, and step-by-step claim instructions. Give each format and page variant unique tracking (`<TRACKING_PARAM>` or a distinct URL) so any relay maps back to format and page.
4. **Serve it only to bots.** Detect AI crawlers at the edge and serve the variant to them; humans see the unchanged page. Ramp used Cloudflare Workers. Note: some bots pose as normal browsers (Ramp saw DeepSeek appear as a 2017 Chrome version), and Cloudflare's bot categories missed major LLM platforms, so build your own user-agent and IP list too.
5. **Log every AI bot visit.** Record platform, user agent, page and variant served. Expect visits from many AI platforms; in Ramp's test Claude's crawler out-visited all other named AI crawlers combined.
6. **Query the assistants daily.** Each day, ask ChatGPT, Claude and Perplexity `<BUYER_QUESTIONS>`: the questions a real prospect asks when choosing a tool in your category. Scan every answer for the offer, the URL and the branded offer name.
7. **Score per model and per format.** Track daily match counts by model, by format and by page. Record how specific each mention is (exact offer and link, vague reference, or none).
8. **Run it for at least 4–5 weeks.** Ramp saw ~40 matches at 2.5 weeks, then a sudden ~4× jump in Claude's daily rate around week 3, 370 matches by day 32 (peak 33 in a day). Perplexity went from vague to the branded name only on day 33. Short tests understate the effect.
9. **Act on the result.**
   - Move winning content to the winning format (Ramp: markdown was the only format that reliably surfaced; schema did not).
   - Plan per model; one "AI" strategy does not work across Claude, ChatGPT and Perplexity.
   - Put key messages on pages AI already trusts; low-citation pages got zero mentions in any format.

# Success check
- Each model has a daily match count, a specificity rating and attributed clicks or sign-ups from the tracking parameters.
- You can name the best format and the best pages, with numbers.

# Source
- Original: Ramp Engineering, "Marketing to AI agents": https://engineering.ramp.com/post/marketing-to-ai-agents
- Relayed by CrowdReply (@CrowdReply_io), 9 Nov 2026: https://x.com/CrowdReply_io/status/2119809230861746556
- CrowdReply's post ends in a lead-gen pitch (reply "citations"). All figures are Ramp's own, not independently verified.

# Anti-patterns
- Treating AI-only content as hidden from everyone. Serving bots different content from humans is cloaking under Google's spam policies; keep the bot version factually the same as the human page plus the offer, and accept the search risk knowingly. (added, not in source)
- Offers or claims in the bot version that you can't honour, or that break advertising or financial-promotion rules. (added, not in source)
- Assuming schema markup wins because it is "for machines".
- Judging after one or two weeks.
- Averaging all models into one number.
- Relying only on a CDN's bot categories to spot AI crawlers.
- Putting the offer on pages AI doesn't already cite.
