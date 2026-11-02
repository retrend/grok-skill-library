---
name: Build motion-graphics videos with Claude Code
description: >-
  Use this when making launch promos, product updates, tweet-to-video or
  website-to-video motion graphics with a coding agent and an HTML or React
  video framework.
---
# Build motion-graphics videos with Claude Code

## Setup (about 10 minutes)
1. Use Claude Code (or a similar agent that writes code, runs it and reviews the output) with the strongest model and high reasoning. The source used Opus 5.5.
2. Pick a framework that renders code to MP4:
   - HyperFrames (HTML to MP4, open source from HeyGen): `npx skills add heygen-com/hyperframes`, then `npx hyperframes init my-video && cd my-video`. Slash commands: `/hyperframes`, `/hyperframes-cli`, `/gsap`.
   - Remotion (React): `npx skills add remotion-dev/skills`, then `npx create-video@latest`.
3. Smoke test: "Using /hyperframes, create a 5-second video where the words 'Hello World' animate in one at a time on a cream background." If you get an MP4 back, you're set.
4. Run the first few videos in Plan Mode so scenes are mapped out before any code, which saves wasted renders.

## Brand skill
Create `.claude/skills/brand-motion/SKILL.md`:
```
---
name: brand-motion
description: Brand rules for every motion video. Use for any video, animation, or motion graphic.
---
# [BRAND] Motion Guidelines
## Colours
Primary [#hex]; Secondary [#hex]; Accent [#hex], used sparingly for the one thing that matters most; Background [#hex]
## Typography
Headlines [font, weight]; Body [font, weight]. Never more than two fonts per video.
## Logo
File: assets/logo.svg. Always use the real file, never redraw it. Clear space [X]px. Never stretch, recolour, or animate it in pieces.
## Motion personality
We move like: [confident and precise / warm and playful / calm and premium]
Primary motion: damped springs, slight overshoot, quick settle
Transitions: [e.g. hard cuts on the beat]
Never: [bouncy cartoon motion / spinning / glitch effects]
## End card
Every video ends on [logo + tagline / CTA], held [X] seconds.
```

## Brief template (8 parts)
```
ROLE: You are a senior motion designer and creative developer at a world-class studio. Your work is meticulously art-directed, never template-looking.
FORMAT: Length [15]s, aspect [16:9 / 9:16 / 1:1], [30] fps, framework [/hyperframes or Remotion]
GOAL: [one sentence on what the viewer should feel or do]
SCENES: Scene 1 ([0:00-0:03]): [what's on screen, what moves, how] ... final scene: end card, CTA, logo
VISUAL STYLE: palette [#hex...], background [colour/texture], references [attached images and what to take from each]
TYPOGRAPHY: font [name]; headlines [weight, size, enter/exit]; body [weight, size]
MOTION LANGUAGE: feel [snappy / smooth / playful]; transitions [how scenes hand off]. Every element moves with intent.
AUDIO: music [file, BPM]; sync [which moments land on which beats]; SFX [where, sparingly]
DO NOT: generic fade-ins or default easing; stock gradients or glows; more than [X] words on screen; [other]
PROCESS: Plan the full sequence before writing code. Show me the scene plan first, then build.
```
Shortcut: describe the video in plain English, have Claude interview you one question at a time, then fill in this template.

## Craft rules
- **Pacing:** one idea per scene, vary the rhythm, give the track's BPM and say where to cut, and go easy on sound effects. Claude's default output runs slow.
- **Real assets only:** put logo SVGs, font files, screenshots and audio in `assets/` and reference them by name. Never let it redraw a logo, guess a font, or invent a screenshot.
- **Scene by scene:** give exact timestamps for every scene.

## Starter prompts (all use /hyperframes plus brand-motion)
- **Launch promo, 15s:** problem as kinetic type (0-4s), then product screenshots as floating UI cards with a zoom on [key feature] (4-11s), then logo and CTA end card held 2s. Transitions should feel connected, never like separate slides.
- **Talking-head intro:** transcribe `assets/clip.mp4`, add key-word captions only, [2-3] overlays at set moments with sparing sound effects, never cover the face, and a 2s animated title. Show the caption plan and overlay timings before building.
- **Tweet to video, 12s, 1:1:** avatar and handle slide in, text builds line by line with the key phrase in the accent colour, then settles into a readable card. Don't recreate the X interface or logo. Say which phrase gets emphasis before building.
- **Website to video, 20s, 16:9:** screenshot the hero, features and CTA, and pull the real colours, fonts, logo and copy with nothing invented. Headline as kinetic type, three feature cards, then logo and CTA. Show the captures and the plan first.

## Iteration loops
1. **Self-review after each render:** export a 20-frame contact sheet, review it as a harsh creative director, and score readability on a phone, continuity, audio sync and polish (does anything look templated?) out of 10. List the three biggest weaknesses, fix them, re-render, and repeat until every score is 8 or above. This can run on a schedule or with `/loop`.
2. **Human review:** give timestamped notes ("At 0:03 the headline enters too fast"), say what to keep, and save each render as v1, v2, v3.
3. Optionally, set up a dedicated motion-designer review agent. The source's prompt for it is an image: [PLACEHOLDER].

## Not for
Live-action footage editing (see the talking-head auto-edit skill), photoreal generative video, or one-off GIFs.

## Source
AI Edge (@aiedge_, by @milesdeutscher), "Opus 5.5: Motion Engineering (FULL GUIDE)", https://x.com/aiedge_/status/2112552093483671966, 21 Oct 2026 AEDT. Shared via https://x.com/aiedge_/status/2112725613056602509, which links the free asset library https://motionvideo.xyz/ (not reviewed). The "<15 minutes" and "killed motion designers" lines are the author's claims.
