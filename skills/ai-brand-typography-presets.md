---
name: AI brand typography presets
description: >-
  Use this when you need consistent, pro-looking brand typography from an image
  model (Nano Banana / LTX) by locking a font as an Element and running a typed
  preset prompt.
---
# Steps

1. Open your image model workspace (source uses Google Nano Banana via LTX GenSpace).
2. Prepare the font Element for consistency:
   - Export or download the target font as reference image(s) / Elements.
   - Upload them into the project as Elements (do not rely on a “clean” model alone — weight, kerning, and glyph accuracy drop hard without them).
3. Pick a preset from the 10-font cheat sheet below that matches the brand tone.
4. Copy the matching prompt from [PROMPT_PACK] (LTX project / asset pack). Replace only `INSERT YOUR TEXT HERE` (or `[YOUR TEXT]`) with the live copy.
5. In the prompt, tag the uploaded Element with `@[ELEMENT NAME]`. Optionally set colors via HEX or the workspace color picker.
6. Generate. If weight drifts (e.g. Bold instead of Semibold), kerning looks off, or glyphs hallucinate, re-check that the Element is tagged and re-generate before rewriting the prompt.
7. Optional polish: overlay the type on a background image, then upscale for export.

## Font presets (pick by fit)

| # | Font | Tone | Good fit |
|---|------|------|----------|
| 1 | Manrope | Clarity & confidence | Tech, SaaS, digital products; SemiBold headlines + Regular body |
| 2 | Fraunces | Premium / “old money” serif | Heritage, food, warm editorial brands |
| 3 | Syne | Artsy geometric sans | Cultural orgs, creative studios, posters |
| 4 | Inter | Neutral UI workhorse | Apps, dashboards, docs |
| 5 | Albert Sans | Friendly modern grotesque | Startups, lifestyle, landing pages |
| 6 | Merriweather | Screen-optimized classic serif | Blogs, news, long-form |
| 7 | Tenor Sans | Refined editorial sans | Magazines, minimalist brands |
| 8 | Space Grotesk | Techy / retro-futurist | Dev tools, Web3, data UIs |
| 9 | Google Sans | Clean big-tech geometric | Product & marketing sites |
| 10 | IBM Plex Sans | Engineered corporate humanist | Enterprise, design systems, docs |

## Typography knobs (from source)

- **Tracking / kerning (headlines):** roughly −3% to −7% for tight, premium spacing
- **Leading (headlines):** about 0.8–0.9 for a solid, blocky headline mass
- Prefer battle-tested free/web fonts (Google Fonts family in the table)
- Prefer high-contrast colors; HEX is fine, eyedropper is faster when available

## Success check

- Same font weight and letterforms across generations
- No extra/missing glyphs; kerning feels intentional
- Only the text placeholder changed between runs

## Anti-patterns

- Not for writing brand strategy, picking a logo mark, or general “make it pretty” prompts with no font Element
- Do not invent or hardcode the full prompt strings here — copy them from [PROMPT_PACK]
- Do not skip Elements and expect consistent Semibold / kerning

## Source

- https://x.com/AmirMushich/status/2026693633794076892
- @AmirMushich (AmirMušić), Feb 25, 2026
- Asset / prompt pack: https://amirmushich.link/ai-fonts
- Note: article is sponsored by LTX Studio; workflow is still reusable in any Element-capable image workspace
