---
name: Auto-edit talking-head videos with Claude Code and Hyperframes
description: >-
  Use this when turning raw talking-head footage into an edited video with
  Claude Code: WhisperX rough cut, Hyperframes HTML motion graphics, targeted
  second-pass fixes, word-by-word captions, ducked music, and an ffmpeg export,
  run as staged skills in a project folder.
---
# Auto-edit talking-head videos with Claude Code and Hyperframes

Source: a 22-minute tutorial uploaded by Marco ([@maarcoofdezz](https://x.com/maarcoofdezz)) and shared by [@deanwperkins](https://x.com/deanwperkins/status/2109357283327037930) on 11 Oct 2026. The on-screen paths and community profile suggest the creator is Jason Cooperman. His paid template includes the Python skill scripts; the steps below let you rebuild them yourself.

**Result in the demo:** a 4:10 raw clip became a polished 0:47 YouTube intro. It took about 2.5 hours of human time, compared with 4–5 hours in Premiere, and most of that was spent on graphics iteration.

## Stack
- **Claude Code** runs the pipeline.
- **[Hyperframes](https://github.com/heygen-com/hyperframes)**, open-sourced by HeyGen, renders the HTML/CSS/JS graphics to video.
- **WhisperX** gives word-level timestamps. **ffmpeg** handles cuts, the audio mix, and the export.
- Optional: an auto-post API for publishing.

## Project layout
```
assets/              # logos, mascot PNGs, brand files
background-music/
hyperframes-engine/
projects/<name>/     # one folder per raw clip
skills/
  rough-cut.py  graphics-plan.py  video-adjustments.py
  captions.py  background-music.py  export.py  auto-poster.py
output/final.mp4
```
To bootstrap it, make an empty folder, open Claude Code, paste the Hyperframes repo link, and say "install the hyperframes engine". Then have Claude write one script per stage, each with the job described below.

## Format presets (decide before the graphics stage)
| format | graphics | face | captions |
|---|---|---|---|
| Short, explainer | top half | bottom half | middle |
| Short, TikTok/raw | minimal, text hook on top | full | low center |
| Long-form, YouTube | full-width overlay | full screen | none or minimal |

## Pipeline
1. **Intake.** Copy the raw clip into `projects/<name>/`.
2. **Rough cut.** Prompt: `<path>/clip.MP4 start a new project for this raw clip and let's do the rough cut.` WhisperX transcribes the clip, then filler words, flubs and dead air are cut, the audio is polished, and a cut sheet lists the kept timestamps and the script. This takes about 10–15 minutes.
3. **Start a new chat** to clear the context and save tokens.
4. **First graphics pass.** Prompt: `run the graphics now`. Confirm the format preset. Claude writes a graphics plan tied to the transcript timestamps, then builds and renders each overlay as HTML with Hyperframes. This took about 22 minutes for 47 seconds of video.
5. **Second pass.** Review the render, then dictate specific fixes. For example: "for the first graphic, change it to the brand orange, add the mascot PNG from assets with a bouncing and glowing animation, make it smaller, and move it to the bottom because it covers my face." Re-render only the graphic you changed, never the whole video. Repeat until it's right.
6. **Captions (short-form only).** Prompt: `let's add in captions now`. They're word-by-word, reuse the WhisperX timings, and are burned in. The demo preset was Helvetica on black boxes.
7. **Music.** Prompt: `<path>/track.mp3 add in this background music`, then adjust by decibels until it sits under the voice. The demo went from -18 to -23 dB, with ducking under speech.
8. **Export.** Prompt: `we're done, export it`. ffmpeg writes `output/final.mp4` and a copy goes to Downloads. You can optionally auto-post it.

## Tips
- Keep each stage a separate skill or script so you can re-run just one of them.
- Store brand assets in `assets/` so prompts can refer to them by name.
- Use the highest-effort model mode for graphics; it's slower but the quality is better.
- Related: [agent-batch-product-demo-videos](sand-workflow:agent-batch-product-demo-videos). For motion quality, also check the work against animation principles (see the LottieFiles motion-design-skill and Lasseter tip in Notion).
