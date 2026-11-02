---
name: Run a draft through a three-lens critique gauntlet
description: >-
  Use this when you've finished a draft of a landing page, sales page, or
  flagship post and want it stress-tested by three distinct critics (hook,
  proof, clarity) before any prospect sees it.
---
# Steps

## 1. Build 3 critic profiles from real material (once, then reuse)
Don't use made-up branding-workshop personas. Ground each one in evidence:

1. **Direct-response legend (packaging and hook).** Built on Eugene Schwartz and David Ogilvy's principles. Cares about one thing: does the first line earn the next 5 seconds of attention, and is the headline specific enough to stop a stranger cold?
2. **Hostile CFO (proof and unit economics).** Built on the hardest budget pushback from your last 20 stalled deals: [STALLED_DEAL_OBJECTIONS]. Hunts every vague claim, unbacked percentage and "save time" promise that would get laughed out of a boardroom.
3. **Busy practitioner (clarity and mechanism).** Built from verbatim customer transcripts, Slack rants and churn interviews: [CUSTOMER_TRANSCRIPTS]. Flags every sentence where you sound like a SaaS brochure instead of someone who does the job.

Save each profile as its own prompt or agent, with its source material attached.

## 2. Write the raw draft once
Finish a full draft first. Don't ask teammates "thoughts?" in Slack: that gets polite feedback and typo fixes.

## 3. Run the gauntlet in private
Feed the draft through the lenses, in order or side by side:
- **Lens 1** attacks the hook and headline until the curiosity gap is undeniable.
- **Lens 2** strips the fluff and forces hard receipts (numbers, proof, named results) into the body.
- **Lens 3** rewrites the mechanism in the exact words your buyers use on calls.

Starter critic prompt (added, not in source):
> You are [LENS_PROFILE]. Here is your source material: [EVIDENCE]. Read the draft below. List every line that fails your test, quote it, say why, and give a rewrite. Do not praise. Draft: [DRAFT]

## 4. Merge and publish
Apply the accepted rewrites into one draft. Re-run any lens whose section changed a lot. Publish only after the draft survives all three. (The merge-and-rerun step is added, not in source.)

## Success check
By the time it goes live, each lens has nothing left to flag: the first line is specific, every claim has proof, and the mechanism reads in buyer language.

# Not for
- Generic copy polish or typo checks.
- Replacing real customer research. If you have no transcripts or objections yet, collect them first, or the personas turn into the made-up ones this method warns against.
- Anything where you haven't got a finished draft.

# Source
- J.B. (@VibeMarketer_), X post, 26 Oct 2026: https://x.com/VibeMarketer_/status/2114725739513905621
- The "10x the conversion rate" claim is the author's, with no data in the post.
