---
name: Add generative UI answers to an agent with OpenUI
description: >-
  Use this when an app or client agent should answer with live interface pieces
  (cards, charts, tables, forms, maps) instead of paragraphs, on any model.
---
# Add generative UI answers to an agent with OpenUI

## How it works
You define which components exist (card, chart, map, button, etc.). The model picks which ones each answer needs and how to arrange them, and OpenUI renders them while the answer streams in. The model never writes site code; it only picks from your components, so answers stay on-brand and can't break anything else.

## Steps
1. Install Node.js 24 and pnpm, and get an OpenRouter API key (one key for most models).
2. Optionally preview it first at openui.com/compare.
3. Scaffold the starter app: `pnpx @openuidev/cli@latest create --example open-intelligent-ui`. Leave off `--example` to pick from a list. The CLI installs dependencies and starts the app.
4. Stop the app (Ctrl+C) and set three values in `.env`: `LLM_BASE_URL` (the OpenRouter URL), `LLM_API_KEY` ([OPENROUTER_KEY]) and `LLM_MODEL` (e.g. `anthropic/claude-opus-5.5`).
5. Run `npm run dev`, open `localhost:3000` and ask it to plan a day in San Francisco. If a map renders, setup works.
6. Decide whether you want validation. Calling OpenRouter directly shows raw model output, mistakes included, which is good for comparing models. For production, run `pnpx @openuidev/cli@latest generate-api-key`; it writes an OpenUI key to `.env` so OpenUI's hosted service checks and fixes small output errors.
7. Optional test helpers to add with your coding agent: a model picker in the header, a compare page that sends one prompt to two models, saved prompt buttons, and seed data your prompts need.
8. Test with prompts your users actually send each week. Run each one several times per model without editing the output.
9. Swap in your own components and design system, using openui.com/cookbooks for recipes.

## Prompts worth testing
- An interactive trip or itinerary
- A marketing budget as a donut chart with sliders and a table (the most reliable prompt in the source's tests)
- Last month's orders as a dashboard with revenue by day, top products and refunds

## Results from the source (author's own runs)
Opus 5.5 was the most reliable. Gemini 4 Argon, Muse Wonder, Qwen3.8 Max, GLM 5.3 and Kimi K3 were also tested.

## Not for
Terminal-only or internal agent workflows where text output is fine, or cases where the model must generate arbitrary new UI code.

## Source
Machina (@EXM7777), "Generative UI 101: How to build live interfaces with Opus 5.5", https://x.com/EXM7777/status/2111457056452665697, 17 Oct 2026. Sponsored by OpenUI. Links: openui.com, github.com/thesysdev/openui, openui.com/benchmarks.
