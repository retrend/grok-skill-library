---
name: Build an AI hook bank from saved TikToks
description: >-
  Use this when you need a repeatable hook system for social/YouTube — save
  hooks while scrolling (especially TikTok), extract them into one DB with
  Louise’s Claude skill (github.com/louisedesadeleer/tiktok-hooks), then remap
  emotional structures onto product content without letting AI write the final
  line.
---
# Build an AI hook bank from saved TikToks (Tella / Louise method)

Build a swipe-file of high-performing hooks (especially from TikTok), auto-extract spoken + visual hooks into one database with a Claude skill, then remap the emotional structure onto content that sells your product — without letting AI write the final hook.

## Results cited

- Tella YouTube: ~300 views → ~30,000 views after Louise owned hooks + content
- Principle: the hook is ~80% of whether a piece of content works
- TikTok partner guidance (via Carmen Vicente): spend ≥50% of content effort on the hook
- Personal brand: occasional viral post can add ~2–3k followers at once

## Why TikTok (even for B2B)

- Hardest platform to hold attention → if a hook holds 5–10+ seconds there, the framework is strong
- Short-form reps: many hooks per scroll vs one YouTube cold open
- B2B buyers (CMOs, founders) are still humans on consumer apps; transfer TikTok/IG patterns to X, LinkedIn, YouTube
- Use fear/emotion carefully on brand accounts; founder accounts can be looser

## Inputs

- Claude subscription (Claude Code / terminal easiest)
- Hook collection folders on TikTok (recommended), plus X / LinkedIn / IG as available
- Destination DB: Obsidian Bases, Notion, or a local markdown file
- Free skill repo: https://github.com/louisedesadeleer/tiktok-hooks

## Steps

### 1. Build the swipe file while you scroll

1. Create a **Hooks** collection/folder on each platform you use (TikTok first).
2. When something *actually* stops you for 5–10+ seconds or creates a visceral reaction (spoken line, on-screen text, or visual open), save it immediately — don’t overthink.
3. Optional parallel folders: e.g. **video inspiration** for full structure, not just opens.
4. Prefer saves with a clear **spoken hook**; visual-only opens still help for pattern notes.

### 2. Install the Claude hook-extraction skill

1. Paste `https://github.com/louisedesadeleer/tiktok-hooks` into Claude Code (or Claude chat: “install this skill / what do I do with this?”).
2. Let it walk the install (may require terminal commands for local deps / browser cookies).
3. Prefer terminal / Claude Code for reliability.

### 3. Run extraction into one database

When prompted by the skill:

1. **Where hooks live** → Obsidian vault, Notion, or a local markdown file.
2. **Sync private TikTok collection?** → Yes → paste the **web URL of your Hooks collection**.
3. **How many** → start with 5–20 recent saves (first sync imports the configured initial count, not the full backlog).
4. **View** → spreadsheet / Bases-style DB with thumbnail when possible.

Target columns in the swipe file:

| Column | What goes here |
| --- | --- |
| Spoken hook | First spoken sentence / cold open |
| Visual hook | On-screen text / first-frame pattern |
| Concept | Underlying emotion or framework (fear, guilt-relief, X vs Y, etc.) |
| Source | Link to the original video |
| Your idea | Blank — your remapped angle for your product |

What the skill does under the hood:

- Reads TikTok login cookies from your browser locally
- Downloads + transcribes on your machine (scripted — not flaky pure browser-use)
- Pulls early spoken lines as the hook + first-frame / on-screen visual cue
- Dedupes and appends into your DB; optional daily sync / launchd scheduling
- Does not keep downloaded videos after processing

Optional: hand the same skill to an always-on agent to ingest **new** saves on a cron.

### 4. Turn banked hooks into content that sells (human final pass)

1. Start from **product / offer**, then wander as far from pure product spam as you can while staying relevant.
2. Open the hook DB; pick a row that still creates a **visceral** reaction.
3. Extract the **template**, not the topic:
   - Emotion (guilt, fear, relief, curiosity, status)
   - Structure (e.g. “If X makes you uncomfortable, it doesn’t mean you’re Y”)
   - Contrast / timeline patterns (“how we used to do X vs how we do it now”)
4. Remap onto your buyer’s pain and your product’s job-to-be-done.
5. **Do not ship AI’s final wording** — Louise calls AI-written final hooks “cooked” (cliché, flat). Claude is great at scraping, transcribing, structuring, and reminding you of frameworks from your local DB; the last line is yours.
6. Ship across channels; reuse the same hook skeleton for short video, LinkedIn, X, and YouTube opens.

### 5. Channel notes (from the same system)

- **YouTube**: mix keyword/SEO with fast trend rides (watch X for model drops → ship related tut within 1–2 weeks); add **series** for return visits
- **LinkedIn / X**: worldview and founder voice; video still an edge in B2B
- Attribution is messy (dark social); still treat hook craft as the main lever for reach

## Example hooks from the walkthrough (for pattern recognition)

- Fear / timely: “When all the AI companies are about to IPO, your economic bells should go off.”
- Guilt-relief structure: “If doing X makes you uncomfortable, that doesn’t mean you’re cold / ungrateful / a bad [role]…”
- Visual how-to: big on-screen text like “how to get better at being judged”
- Contrast / judgment: “Shopping is the lowest form of self-expression.”

## Success check

- Hooks folders exist and get regular saves
- Skill installed; DB filling with spoken + visual hooks + concept + blank “your idea”
- You’ve remapped banked hooks onto product content
- You’re no longer stuck for opens; AI suggestions are structure prompts, not final copy

## Anti-patterns

- Scrolling without saving
- Letting Claude write the final hook (“cooked” copy)
- Only talking about the product
- Overusing fear-based hooks on corporate brand accounts
- Relying on browser-use alone to download every TikTok
- Expecting clean form-fill attribution for organic content

## Source

- Tweet: https://x.com/RobHoffman_/status/2103593636445438110 (@RobHoffman_, 2026-09-25)
- Video: https://youtu.be/v2aeNOg_7nI — *The Hook-Saving System That 100x'd Tella's Youtube Views using AI* (Louise de Sadeleer / Tella, @loulouintech)
- Free Claude skill: https://github.com/louisedesadeleer/tiktok-hooks
- Skill directory: https://www.skillsdirectory.com/skills/louisedesadeleer-tiktok-hooks
- Tella skills hub: https://www.tella.com/skills
