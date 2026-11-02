---
name: Design a Codex remote workflow
description: >-
  Use this when setting up Codex remote from your phone — pair ChatGPT desktop
  Control this Mac/PC, keep the machine awake, then run the remote-workflow
  design prompt before any tasks start.
---
# Steps

1. On the computer that will keep working while you are away, open the **ChatGPT desktop app**.
2. Go to **Settings → Connections → Control this Mac or PC**.
3. Scan the QR code with your phone to pair remote control.
4. Keep the computer **awake** (lid open / sleep disabled / power settings so the session does not sleep mid-run).
5. In Codex (source UI showed GPT-6 Astra Light / Full access), start from a real project folder (“Choose project”).
6. Paste this prompt (from the post image). Do **not** let it change settings or start tasks until you approve the plan:

```text
Read OpenAI's guide to Codex Remote: https://developers.openai.com/blog/mastering-codex-remote-for-engineering

Design a remote workflow around my projects and how I actually work. Ask me how long I'm usually away, how often I can check my phone, and whether my computer can stay awake. Pick tasks from my real work that can move forward remotely. Tell me what to prepare before I leave, what you can finish alone, what I can decide from my phone, and what waits until I'm back. If I don't reply, stop at anything that needs my approval. Propose the plan first. Don't change settings or start tasks yet.
```

7. Answer its questions (away duration, phone check frequency, machine can stay awake Y/N).
8. Review the proposed plan buckets:
   - Prepare before leaving
   - Safe to finish alone remotely
   - Decide from phone
   - Wait until back
9. Only after you approve: allow remote execution. If you go silent, it must **stop at anything needing approval** (per prompt).

## Success check

- Remote pair works from phone
- Plan exists before any settings/tasks change
- Approval gates are explicit; no unsupervised risky actions

## Anti-patterns

- Starting tasks before the plan
- Leaving the machine asleep so remote dies
- Broad “just keep coding” without phone/away constraints
- Not a general Codex tutorial — only this remote-workflow design loop

## Source

- https://x.com/godofprompt/status/2100887645497045196
- @godofprompt (God of Prompt), Sep 18, 2026
- Prompt text transcribed from the post image; guide URL as given in that prompt
