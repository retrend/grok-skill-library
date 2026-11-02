---
name: Agentize SaaS directory launch submissions
description: >-
  Use this when launching a SaaS/product via AI-agent directory submissions —
  one product brief, plan ~10 evidenced free/conditional routes, run browser
  submissions with human gates for login/CAPTCHA/paywalls, and track
  confirmation state locally for resume.
---
# Steps

1. **Write one product brief.** Gather facts, approved claims, taglines, descriptions, logo, gallery images, URLs, and category fit in a single local brief your agent can reread. Set hard permissions: what the agent may register, what it may publish, and what always needs you (paid upgrades, vote solicitation, anything with a card).

2. **Prefer evidenced zero-cost routes.** Build or use a catalog of directories/launch boards. For each candidate, record: likely audience fit, format (catalog / launch / community / reviews), whether a free path exists, conditional requirements (badge, backlink, B2B-only, account type), and the date those rules were last checked. Skip unknown, paid-only, or unfit routes rather than inventing submissions.

3. **Plan a small truthful run.** Target about 10 relevant free (or conditional-free) submissions for one browser worker. If fewer suitable routes exist, keep the smaller real target — do not pad with paid or unverified platforms.

4. **Use a platform playbook per submission.** For each platform, follow preparation → workflow → watch-fors → what counts as confirmation (example structure from public Product Hunt sample: maker profile + assets first; search for duplicates; fill honestly; never treat a draft as scheduled; record scheduled only after the account confirms date/timezone; on launch day verify the public page before marking live).

5. **Run the agent in a real signed-in browser.** Agent drives Chrome (or equivalent) from the brief + playbook. You handle logins, CAPTCHAs (~5% of directories in the source’s experience), email verification, and any spend decision. Agent must stop before paid fast-tracks, PPC, featured launches, or upvote buying.

6. **Track outcomes locally.** For every platform, store state (e.g. drafted / submitted / scheduled / live / blocked), confirmation evidence (URL, date), and next action. Resume later sessions from remaining work instead of restarting.

7. **Reuse for the next product.** Keep playbooks and tracker; swap only the product brief and re-check platform rules past their recheck dates.

## Success check

- One brief covers all submissions for a product.
- Every planned route has a free or explicitly accepted conditional path and a dated rules check.
- Tracker distinguishes attempts from public live listings.
- No paid upgrade or vote-buying happened without an explicit human yes.

## Optional toolkit

Source product LaunchRepo packages ~299 platform guides + local dashboard as a paid repo (`https://launchrepo.dev/`). You can run this skill with your own playbooks; do not invent platform-specific field limits the source did not publish.

## Anti-patterns

- Not “buy LaunchRepo” as the skill — the skill is the brief → plan → playbook → browser → tracker loop.
- Do not count Domain Rating or traffic claims as guaranteed outcomes.
- Do not let the agent post Show HN / similar community posts if the platform bans AI-written text (source: Hacker News rule in their public table).
- Do not solicit upvotes or invent testimonials.

## Source

- https://launchrepo.dev/
- Public process + sample Product Hunt guide structure (observed on site Sep 2026)
- Builder: Aleksandar Vuk Jovanovic (@AleksDoesCode)
