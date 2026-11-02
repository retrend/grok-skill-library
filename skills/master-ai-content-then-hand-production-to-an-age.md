---
name: Master AI content then hand production to an agent
description: >-
  Use this when building AI ad/content production from scratch into an agent-run
  pipeline — lock one image + one video model, ship daily, log prompts/steps,
  then teach Codex/Claude Code the workflow until a script becomes a finished
  upload-ready edit.
---
# Steps

1. **Pick one stack and learn it.** Choose exactly one image model and one video model. Run deliberate experiments on prompts, reference images, and settings until you can predict what each change does to the output. Do not hop tools until you can explain failures.

2. **Ship one finished piece every day.** Product shot, short clip, UGC ad, or animation — take it from idea to export. Log the winning prompt, references, settings, and the exact steps in a living doc (Google Doc or equivalent).

3. **Treat bad outputs as experiments.** On failure: change one variable, regenerate, note what moved. A bad render does not mean the look is impossible; trial-and-error is how the playbook gets written.

4. **Codify the repeatable workflow.** When the same path works more than once, give that doc to Codex or Claude Code. Have the agent connect to your browser (or your production tools), walk the process end-to-end, and patch the steps where it sticks.

5. **Close the loop to “script in → finished out.”** Keep refining until you can drop in a script (and required assets) and the agent runs the full production process without you babysitting each step.

6. **Add agent video-editing skills** so the agent can assemble the whole ad and hand you an edited file ready for upload. Start from these skill sources (verify they still match your stack before installing):
   - https://github.com/browser-use/video-use
   - https://github.com/remotion-dev/skills
   - https://github.com/EverythingAI-Pro/ai-video-editor

## Success check

- You can name what each major prompt/setting change does on your two chosen models.
- Daily finished pieces exist, and a doc holds the best prompts + exact steps.
- An agent can run the documented path with fewer human interventions over time.
- Final handoff is an edited, upload-ready video — not raw generations.

## Anti-patterns

- Not a “generate one cool clip” tip — this is a mastery → documentation → agentization ladder.
- Do not skip the daily ship + doc phase and jump straight to agent automation.
- Do not treat AI final edits as done without a human pass on brand/emotion when the ad matters.
- Do not invent tools beyond the three editing repos named above unless you replace them deliberately in your stack.

## Source

- https://x.com/maxxmalist/status/2103858184414781504
- @maxxmalist (MAX), Sep 26, 2026 (note tweet / playbook)
