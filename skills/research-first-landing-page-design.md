---
name: Research-first landing page design
description: >-
  Use this when AI landing pages look generic — force a research report against
  real shipped references (Mobbin MCP or screenshots) before rebuild, then
  scoped fix passes.
---

# Research-first landing page design

You cannot prompt taste into a model. Show it what good looks like: research real shipped sites/apps first, approve a change report, then rebuild. Same model + same brief can look generic or premium depending only on what it studied before building.

Credit: workflow idea from Griffin Wooldridge (YouTube: https://www.youtube.com/watch?v=L_EXYLmyFSA). Agency run / prompts from Prajwal Tomar.

## Core principle

- Do **not** connect references and say "make it better."
- Always: **research → report → wait for approval → build → annotate → mobile check → one scoped fix pass**.
- Taste words ("premium", "editorial", "magazine feel") alone produce the average of every site that called itself premium — the "AI premium" look.

## Build sheet (run every landing page)

```
Brief → Draft 1 → connect real references → research report (wait for it) → Draft 2 → annotate every change → mobile check → one fix pass on the weak section
```

Save the change-list patterns into project notes so the next client in the same category starts from taste, not zero.

---

## Exact prompts

Replace placeholders: `[PRODUCT]`, `[PAGE]`, `[CATEGORY]`, `[section]`, `[The one change]`.

### 1) Brief (Draft 1)

Use this structure (TripGlide example generalized):

```
Build a polished, responsive marketing website for [PRODUCT], a [one-line product description that names the category and positioning]. Sections: hero with a product UI preview of the app, how it works, curated destinations, itinerary feature, social proof, pricing, FAQ, footer. It should feel like a premium consumer [CATEGORY] brand: editorial typography, generous whitespace, subtle interactions, fully responsive. Generate your own imagery where needed.
```

TripGlide template (keep as reference; swap product details for new work):

```
Build a polished, responsive marketing website for TripGlide, a travel booking app that feels like a high-end digital travel magazine that happens to let you book. Sections: hero with a product UI preview of the app, how it works, curated destinations, itinerary feature, social proof, pricing, FAQ, footer. It should feel like a premium consumer travel brand: editorial typography, generous whitespace, subtle interactions, fully responsive. Generate your own imagery where needed.
```

### 2) Research report (REQUIRED before any redesign)

Connect Mobbin MCP (or attach screenshots — see Free path). Then send **exactly**:

```
Use this MCP to research design patterns for the current [PAGE] before making any changes. Study real, shipped [CATEGORY] and premium consumer brand websites and apps. Then write a report that: 1) identifies exactly where the current page feels generic or AI-generated, 2) summarizes the recurring patterns in the strongest real examples you found, 3) proposes a clearer visual direction for [PRODUCT], 4) lists every change you would make and why. Do not build anything until I approve the report.
```

TripGlide-filled example:

```
Use this MCP to research design patterns for the current TripGlide landing page before making any changes. Study real, shipped travel and premium consumer brand websites and apps. Then write a report that: 1) identifies exactly where the current page feels generic or AI-generated, 2) summarizes the recurring patterns in the strongest real examples you found, 3) proposes a clearer visual direction for TripGlide, 4) lists every change you would make and why. Do not build anything until I approve the report.
```

**Stop here.** Do not build until the human approves the report.

### 3) Approve + implement

```
Approved. Implement the report on the existing site.
```

### 4) Annotate every change

After Draft 2, go back to the report and check items off. Confirm the model used its own research (one dominant idea, specific decision support, real product evidence, no invented social proof/pricing unless real, etc.).

### 5) One fix pass (fence every post-rebuild change)

Never say "make the headlines less poetic" and let the model loose on the whole page. Scope every pass:

```
One fix pass, scoped to [section]. [The one change]. Change nothing else.
```

Example:

```
One fix pass, scoped to headline copy only. Rewrite the three serif and italic headlines to say something specific about the product. Change nothing else.
```

---

## What "AI premium" usually looks like (catch these in research)

- Decorations competing with no single organizing idea (tilted phone, floating reassurance card, GPS coordinates on photos, sparkles, sun icons, postcard numbers)
- Same headline formula every section (upright serif + sage italic phrase)
- Poetic copy that sounds on-brand but says nothing about what the product does
- Same hero photo reused across sections
- Unreadable product mockup labels (e.g. 6px type)
- Invented pricing and illustrative testimonials labeled as sample copy

## Patterns strong real references share (pull these into the report)

1. **One dominant visual idea** — one named stay / one product demo leads; everything else supports it
2. **Specific things people want** — properties, activities, dates, named places (not broad promises)
3. **Clear actions** — Book / Search / Save, labelled and placed where they belong
4. **Information next to the image** — cards help you decide something
5. **Big and small on purpose** — big editorial photos, compact practical details
6. **Real product evidence** — useful screens that show what the app does

---

## Client / agency extras (hold up on real projects)

1. **Design system first** — colours, type scale, spacing, components in one short doc the model reads before research. Without this, research pulls patterns that fight the brand.
2. **Research pass on the page** — the four-part report prompt above. Never "make it better." Always research, report, wait.
3. **Build → check mobile → second research pass on the one weak section** — there is always one. Research that section only; do not reopen the whole page.
4. **Save the patterns** — put the change list in project notes. Next client in the same category starts from those patterns.

---

## Free path (no Mobbin)

If you do not want to pay for Mobbin, the workflow still works — slower, narrower:

1. Open 10–12 real websites in your category that you actually admire.
2. Screenshot the hero, one content section, and the footer of each.
3. Drop them into the chat and run the same research prompt, replacing **"Use this MCP"** with **"study the attached screenshots."**
4. Everything else stays the same.

You lose breadth (600,000+ screens vs 12). You keep the part that matters: research before build.

---

## Mobbin setup note

- In ChatGPT: Apps → search Mobbin → add → sign in to authorize.
- Needs **Mobbin Pro or above** (free plan cannot connect MCP).
- Not sponsored; MCP lets the model browse instead of you.
- MCP can fail on first connect — reconnect and run again.
- Every search spends Mobbin AI credits (no published rate) — budget for it.

---

## Limits

- Report quality tracks the research prompt. Vague "research design patterns" → summary. The four-part prompt → actionable multi-item plan.
- Models love to rebuild the whole page when you asked for one section — **name the section in every fix prompt**.
- Model can copy one reference too closely — if the report keeps pointing at one site, tell it to widen the set before build.
- Images still need a pass (layout improves faster than photos).
- This is a **marketing site** workflow. For in-app screens, still start from a design system (research-first can be tried later for those too).
- Do not over-claim: flag mobile as risk until a real browser check; treat "generic" as design judgment, not AI-authorship detection.

---

## Anti-patterns

- Connecting Mobbin / dropping screenshots and saying "make it better" with no report
- Rebuilding the whole page to fix one weak section
- Leaving invented testimonials or fake pricing on a live client site
- Relying on taste words ("premium", "editorial") with no shipped references
- Skipping mobile check and the scoped fix pass

---

## Source

- Article / post: https://x.com/PrajwalTomar_/status/2100211370897920136
- Author: Prajwal Tomar (@PrajwalTomar_), Sep 16, 2026
- Griffin Wooldridge credit (originating demo): https://www.youtube.com/watch?v=L_EXYLmyFSA
- Newsletter patterns: https://theaiheadstart.com/
