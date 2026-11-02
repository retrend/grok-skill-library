---
name: Turn launch-post replies into personalized product demos
description: >-
  Use this when launching a product on X whose output can be personalized
  (video, image, copy, audit) and you want the reply section to become a live
  demo that drives signups.
---
# Turn launch-post replies into personalized product demos

## Why it works
X ranks posts that keep people on the platform. Long reply threads and time spent in the comments push a post further. Every personalized result posted in the replies is a public demo, which makes the next person ask for one too.

## Steps
1. **Pick the personalization.** Choose one thing your product can make for a single person in about a minute: [OUTPUT, e.g. a video of them in a movie scene].
2. **Write the hook reply.** Answer "congrats"-type comments with a question that collects the input. Example: "Thanks! What's your favorite movie? I'll make you something cool."
3. **Wire the pipeline:**
   - The X API reads new replies on the launch post.
   - Claude turns each reply (plus profile context) into a generation prompt: [PROMPT_TEMPLATE].
   - [PRODUCT_API] generates the result.
   - The X API posts a reply with a preview and a link.
4. **Gate the full result.** Reply "Your [OUTPUT]'s ready, go check it out" with a preview and a link to [RESULT_PAGE]. The full result is waiting on your site, and editing or keeping it requires signing up.
5. **Personalize onboarding.** After signup, tailor the experience to their name, company and what they asked for.
6. **Let it compound.** Every public preview invites more requests. Watch the comment-to-like ratio and time in the replies as signs it's working.

## Guardrails (added, not in source)
- Only use someone's photo or likeness if they explicitly asked, and say upfront what you'll make.
- Automated replies should go only to people who replied to you. Rate-limit them, avoid duplicate text, and follow X's automation rules and API tier limits.
- Have a human review outputs before they post, and plan capacity, since the source says launches have broken products under load.

## Gaps
The source's 10-page setup guide is gated. Exact X API endpoints, prompt templates and queue design are [PLACEHOLDER].

## Not for
Products with no fast, personalizable output, or cold auto-replies to people who didn't engage.

## Source
Matt Epstein (@mattepstein, Shown Media), "I drove $7M by abusing X's API and connecting it to Claude", https://x.com/mattepstein/status/2112573983707247036, 21 Oct 2026 AEDT. The $7M figure is the author's claim, and the article ends with a pitch for his agency.
