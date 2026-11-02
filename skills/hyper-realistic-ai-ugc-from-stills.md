---
name: Hyper-realistic AI UGC from stills
description: >-
  Use this when making hyper-realistic AI UGC talking-head clips from a
  Pinterest still — recreate with an image model, then animate with a locked UGC
  video prompt and CapCut/screen-record cleanup.
---
# Steps

1. Find a Pinterest video of a person in the target look; screenshot one clean frame.
2. Recreate that frame 1:1 with GPT Image 2.5 (or current equivalent image model named in your stack). Use this image prompt (from source):

```
recreate this image 1:1, ignore any text or buttons on screen. keep the same light makeup but a natural face, no objects in her hands, arms relaxed at her sides.
```

3. Pick a video model: Omni 1.1 Flash or Seedance 2.5 (names as listed in source — use whatever your tool calls them today if renamed).
4. Feed the recreated still as the reference image. Generate with this video prompt (replace `{your script}`):

```
persuasive UGC creator, expressive gestures, says exactly: {your script}. casual unpolished single-take phone video, full eye contact, start frame matches the reference exactly, no objects, no cuts, no music.
```

5. Export cleanup: screen-record the final clip and/or edit in CapCut to remove AI metadata.
6. Keep the same pipeline for batch UGC; only swap the Pinterest reference and script.

## Anti-patterns

- Not a general “make ads” skill — only this still→image→talking-head video chain
- Do not invent alternate prompts; change only `{your script}` and the reference frame unless testing deliberately
- Do not add props, cuts, or music in the generate step if you want the source look

## Source

- https://x.com/jasonugc/status/2099547856486989951
- @jasonugc (jason), Sep 14, 2026
