---
name: 'Run tiered outbound across cold email, LinkedIn DMs and cold calls'
description: >-
  Use this when you're setting up B2B outbound that needs to book meetings
  across email, LinkedIn and phone, and want one rule (account tier) that
  decides which channels each account gets, plus a setup playbook per channel.
---
# Steps

## 0. Tier your accounts first
Put a tier in its own column next to every account. Every channel reads it.
- **Tier 1:** strong fit with an active signal (new hire, funding round, from the last few weeks).
- **Tier 2:** strong fit, no signal yet.
- **Tier 3:** adjacent fit.
"Strong fit" = matches your best customers on industry, company size and buyer title. "Adjacent" = matches on some.

| Tier | Gets | Message |
|---|---|---|
| 1 | Call + LinkedIn + email | 1 custom message per account |
| 2 | LinkedIn + email | Template with 1 variable swapped |
| 3 | Email only | High-volume sequences |

Never push a Tier 1 account into a high-volume email sequence.

## 1. Cold email (volume engine): 20 to 25 sends a day per warmed inbox
1. **List:** in [LIST_TOOL, e.g. Clay] use Find companies (best customers' industry and size), then Find people (buyer titles), then a work-email waterfall ([EMAIL_FINDER, e.g. Prospeo] first).
2. **Sending domains:** never send cold email from your main domain. Buy look-alike domains (e.g. get[yourcompany].com), add each to your mail provider, create 3 inboxes per domain.
3. **DNS on every domain:** one SPF, one DKIM, one DMARC record (merge duplicates). Example from the source (Google Workspace):
```
TXT @                  v=spf1 include:_spf.google.com ~all
TXT google._domainkey  v=DKIM1; k=rsa; p=...   (key generated in Google Admin: Apps > Google Workspace > Gmail > Authenticate email)
TXT _dmarc             v=DMARC1; p=none; rua=mailto:dmarc@get[yourcompany].com
```
4. **Warm up** 2 to 4 weeks before the first send in [SENDER_TOOL, e.g. Instantly or lemlist] (Instantly's minimum is 2 weeks). Leave warm-up on after launch.
5. **Signals:** add new-hire and news/funding signals to the account list. A strong-fit account with a fresh signal moves to Tier 1 that week, and email 1 opens on that signal.
6. **3-email sequence about the situation behind the signal** (email 1 under 80 words, one question at the end). Example for a company that just hired a head of sales:
> EMAIL 1 (day 1) Subject: [first name]'s first quarter
> [First name], a new sales leader's first quarter usually comes with a pipeline target. We help [company type] with [the problem you solve]. Want me to send the 1-page plan we'd run for [company]?
>
> EMAIL 2 (day 4) Subject: re: [first name]'s first quarter
> [First name], 1 thing we see at [company type] in the first 90 days: [1 specific pattern]. [Customer] had the same setup and [1 short result]. Worth a look?
>
> EMAIL 3 (day 9) Subject: re: [first name]'s first quarter
> Last note from me, [first name]. The 1-page plan for [company] is ready whenever you'd like it. Just reply "send it".
- Tier 1: rewrite email 1 by hand per account, in its own low-volume campaign. Tier 2: swap the 1 line about their company. Tier 3: swap the signal line for 1 line about the problem you solve, send at volume.
7. **Ramp** a few sends a day up to 20 to 25 per inbox (Instantly recommends max 30). Volume comes from more inboxes: about 20 inboxes on 7 domains for 500 a day.
8. **A yes** is a reply asking for times. Answer within the hour:
> Great, [first name]. Does [DAY_1 TIME] or [DAY_2 TIME] ([TIMEZONE]) work? Or grab any slot here: [CALENDAR_LINK]
- **What burns it:** bounces above 2%; mail failing SPF, DKIM or DMARC.

## 2. LinkedIn DMs (precision play), Tier 1 and 2 only
Judge it on meetings, not replies. (Source cites one platform's 257K sends where AI-personalized messages got more replies but slightly fewer meetings: 0.93 vs 1.02 per 100.)
1. Fix your profile first: headline says who you help and the result, in plain words.
2. Save the 2 or 3 buyers at each Tier 1 and Tier 2 account to a Sales Navigator lead list.
3. **Every morning check:** Sales Navigator "Viewed your profile recently", likes and comments on your posts, "Following your company".
4. **Send the request right after** they notice you, and say so in the note (under 200 characters; for Tier 1 rewrite per person):
> Hi [first name], saw you [viewed my profile / liked my post on [topic] / followed us]. We work with [company type] on [the problem]. Happy to connect.
5. **Message 1 the day after they accept** (lead with something useful):
> Thanks for connecting, [first name]. We just put together [a 1-page note / a teardown] on [the problem] for [company type]. Want me to send it over?
6. **Message 2, 5 days later if no reply:**
> [First name], 1 thing we keep seeing at [company type]: [1 specific pattern]. Happy to send the full note.
7. **When they say "send it":**
> Here it is: [LINK]. Worth 20 minutes to walk through it? [DAY_1 TIME] or [DAY_2 TIME]?
8. Run it as one sequence in [LINKEDIN_SEQUENCER, e.g. lemlist Multichannel] (visit, invite with note, 2 messages). Add profile viewers and new followers by hand each morning.
9. **Withdraw pending requests older than 3 weeks** each week. LinkedIn restricts invites when too many sit pending. Withdrawn people can't be re-invited for up to 3 weeks.
- Benchmarks cited (Reachium, 180,155 requests): 27.1% accepted, 27.6% of those replied, 2.0% booked. About 5 meetings per 1,000 requests.

## 3. Cold calling (Tier 1 closer)
Source numbers: Belkins, 175,000+ dials, about 1 meeting per 370. The author's own team ran about 1 per 37 and it only paid off on seven-figure deals, so he cut the phone for everything below Tier 1.
1. **Check do-not-call and consent rules** for every country on the list before buying mobiles. Get your own legal read.
2. Pull Tier 1 mobiles with [MOBILE_FINDER, e.g. Prospeo via Clay] from each person's LinkedIn URL. Scrub against the do-not-call registry.
3. Load into [DIALER, e.g. Nooks, a parallel dialer]; sync calls to your CRM.
4. **Call the day after email 1** and open on the same situation:
> [First name], it's [your name] at [your company]. I emailed you yesterday about [the situation behind the signal]. Worth 20 minutes next week to walk you through it?
> If "just send me an email": It's already in your inbox, subject line "[SUBJECT]". Can I put 20 minutes on [DAY] so we can go through it together?
5. **Voicemail (15 seconds)** pointing to the email. Stop at 2 voicemails (Gong data cited: email replies went 2.73% to 5.87% with a voicemail, and fell to 2.2% with 3 or more).
> [First name], [your name] from [your company]. I emailed you yesterday about [the situation behind the signal]. No need to call back. You can reply right there.
6. Keep your calendar open and send the invite before you hang up.
7. Log every dial: conversation, pickup without conversation, voicemail, no answer.
- Skip generic title lists: those people get dialed all day and stopped picking up.

## 4. Track and run it
- Friday numbers: email = meetings per 1,000 sent; LinkedIn = meetings per 100 accepted requests; calls = meetings per 100 conversations.
- Change 1 thing at a time, judge on meetings booked.
- 4-week rollout: **Wk 1** domains, DNS, warm-up, LinkedIn profile, do-not-call check. **Wk 2** build list and tiers, save Sales Navigator buyers, write call opener and voicemail. **Wk 3** turn on signals, write the 3 emails, build the sequencer flow, pull and scrub Tier 1 mobiles. **Wk 4** domains are warm, start email for every tier, add LinkedIn people daily, call Tier 1 the day after email 1.

## Guardrails (added, not in source)
- Check email law for each market before sending (CAN-SPAM, GDPR/PECR, the Spam Act in Australia), include opt-out, and honour it.
- LinkedIn's terms restrict automation tools. Review the risk before automating invites and messages, and keep volume modest.
- Send-day email verification and 2% bounce ceiling still apply.

# Not for
- Consumer or local-trade lists (use a Google Maps and license-records list for those).
- Replacing list quality. Fix the list and tiers first.
- Mass-calling without a do-not-call scrub and a legal check.

# Source
- Alex Vacca (@itsalexvacca), X article "How to book meetings with cold email, LinkedIn DMs and cold calling", 26 Oct 2026: https://x.com/itsalexvacca/status/2114749822704193558
- Summary post: https://x.com/itsalexvacca/status/2114856538498363698
- Author is CEO of Frontal (GTM agency) and a Clay Elite Studio Partner, so tool picks (Clay, Prospeo, Instantly, lemlist, Nooks, Sales Navigator) reflect that. Benchmarks and prices are as he quoted them in Oct 2026 from Instantly, Reachium, Belkins and Gong reports. Own-campaign numbers (5 to 18% reply on signal campaigns) are his claims.
