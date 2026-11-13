---
name: Edit documentary videos to match a reference with Claude Code
description: >-
  Use this when you have a reference YouTube video whose editing style you want
  to copy (pacing, maps, comparisons, typography, motion graphics) and your own
  script, narration and licensed footage, and want Claude Code to build a
  reusable FFmpeg/Python editing pipeline with approval checkpoints.
---
# Edit documentary videos to match a reference with Claude Code

What it is: one long Claude Code prompt that breaks a reference video down into an editing style guide, then assembles your own footage, narration and code-rendered motion graphics in that style. It edits real footage; it does not generate video.

## Inputs
- `<REFERENCE_VIDEO>`: an MP4 of the style to match (the source used a ~74 s, 1920x1080, 60 fps gaming documentary clip).
- `<SCRIPT>` or topic, and `<NARRATION_AUDIO>` if recorded.
- `<FOOTAGE_FOLDER>`: footage, screenshots, maps, research images you have rights to use.
- `<TARGET_LENGTH>`, plus licensed music and sound effects if you have them.
- Claude Code with Python, FFmpeg, OpenCV, Pillow, Playwright, faster-whisper (local, free).

## Steps
1. Put the reference MP4, script, narration and footage in one project folder.
2. Open Claude Code there and paste the prompt below. Swap the genre slot `<GENRE>` (source: gaming) and fill the slots.
3. Let it analyse the reference first: frames, cut detection, contact sheet, average shot length, a timed breakdown. Read its style guide and correct it.
4. Answer its input questions. If an asset is missing it should hand you a request list, not invent one.
5. Checkpoint 1: approve the script or transcript, factual claims to verify, footage inventory, sources and credits, scene-by-scene plan, motion graphics plan and missing-asset list.
6. Checkpoint 2: review the low-res rough cut, two 16-frame contact sheets, a 10 s opening preview and the map, typography and before/after previews. Send fixes.
7. Approve the final render. Check the deliverables list landed (video, timeline, code, manifest, credits, README).
8. Next video: swap script, narration and footage and reuse the engine.

## The prompt (from source, verbatim except slots in angle brackets)

```
<ROLE>
You are my professional YouTube documentary editor, motion graphics designer, cinematographer, and video production engineer.
Your task is to edit raw footage into polished <GENRE> documentary videos that closely match the editing style of my attached reference video: <REFERENCE_VIDEO>
I want the same pacing, cinematic presentation, footage selection, transitions, infographic animations, typography, map comparisons, and attention to detail.
Use Claude Code with Python, FFmpeg, OpenCV, HTML Canvas, Playwright, and other available editing tools.
This is an EDITING task, not an AI video-generation task.
Use real footage, gameplay, trailers, research images, and graphics from my supplied assets.
Do not generate unrelated footage.
The final result should look like a professionally edited <GENRE> documentary from an established YouTube channel.

<STEP 1 — ANALYZE REFERENCE>
Before editing anything, analyze the attached MP4.
REFERENCE:
Duration: <REFERENCE_DURATION>
Resolution: <REFERENCE_RESOLUTION>
Frame rate: <REFERENCE_FPS>
Format: 16:9
Style: <REFERENCE_STYLE>
Use FFmpeg and OpenCV to extract frames, identify cuts, and create a contact sheet.
Study:
Average shot duration
Cinematic footage selection
Camera zooms and pans
Transition timing
Infographic animations
Typography and text placement
Map comparisons
Before-and-after visuals
Research screenshots
Color grading
Audio and narration pacing
Sound effects
On-screen source credits
Visual storytelling
REFERENCE EDITING BREAKDOWN
<REFERENCE_BREAKDOWN — timed sections, e.g. source's: 0–6s cinematic opening with a highlighted quotation; 6–12s scale comparison; 12–20s hardware explanation with percentage counter; 20–27s cinematic gameplay; 27–40s map comparisons; 40–47s before/after with a diagonal dividing line; 47–60s additional comparisons; 60–74s gameplay and scale reveal with large typography>
Analyze the real frames to refine these observations.
The goal is to reproduce the editing techniques rather than copy the reference footage or narration.

<STEP 2 — ASK FOR INPUTS>
Before starting, ask me for:
My video topic or script.
My narration audio, if already recorded.
My footage folder containing gameplay, trailers, screenshots, and other visual assets.
My preferred video length.
Music and sound effects, if available.
If the script isn't ready, offer to create one.
If narration is missing, ask whether to use an available voice service.
Do not assume footage exists.
Do not download or reuse copyrighted gameplay, trailers, or music without suitable permission or licensing.
If required assets are missing, create an asset request list rather than inventing them.

<STEP 3 — SCRIPT AND FOOTAGE MATCHING>
This is the most important part.
Analyze the entire script sentence by sentence.
Determine what viewers should see during each line.
Never use random gameplay just to fill the screen.
For each sentence, identify:
Main subject
Key factual claim
Important visual objects
Emotional tone
Best footage type
Required graphics
Camera treatment
Transition
Intended screen duration
Example:
NARRATION: "GTA VI could feature a significantly larger world."
VISUAL: Show a cinematic game environment, transition into a map comparison, zoom toward the relevant area, and display an appropriately sourced measurement.
NARRATION: "The improvements go beyond graphics."
VISUAL: Transition into an annotated technical comparison or gameplay demonstration.
Use the reference's combination of footage and visual evidence.
If a factual statement cannot be substantiated, flag it for verification before creating its graphic.
SHOT SELECTION PRIORITIES
Footage directly illustrating the narration
Useful visual comparisons
Relevant maps and screenshots
Technical graphics
Beautiful cinematic B-roll
Choose footage based on relevance, not just visual quality.
Don't repeat the same shot unnecessarily.

<STEP 4 — EDITING STYLE>
Match the reference's cinematic documentary editing.
PACING
Use frequent cuts, but not random ones.
Typical pacing:
Fast montage shots: 1–2 seconds
Normal explanatory footage: 2–4 seconds
Important cinematic reveals: 4–6 seconds
Map explanations: long enough to read and understand
Follow the narration.
Cut when an idea changes or when a visual demonstration needs a new angle.
Avoid static compositions that add no information.
TRANSITIONS
Use primarily hard cuts.
Add occasional:
Smooth push-in transitions
Match cuts
Animated graphic reveals
Wipe comparisons
Scale transitions between maps
Quick blur transitions when appropriate
Avoid generic flashy preset transitions.
Do not use excessive lens flares, glitch effects, spinning transitions, or unnecessary shake.
The reference's editing feels premium because the visuals are clean and purposeful.

<STEP 5 — CINEMATIC FOOTAGE>
Use real gameplay and cinematic footage.
Preserve the source's visual quality.
CAMERA MOVEMENT
For still images and maps, create controlled virtual camera motion:
Slow zooms
Smooth horizontal pans
Push-ins toward important details
Pullbacks revealing larger areas
Small reframing movements
Use easing curves.
Never apply identical zoom effects to every image.
COLOR GRADING
Use subtle cinematic adjustments:
Natural contrast
Controlled highlights
Rich but believable colors
Balanced shadows
Consistent color temperature
Very subtle sharpening when necessary
Don't oversaturate.
Do not crush shadow details.
Do not make footage artificially dark.
Preserve the original game's visual identity.

<STEP 6 — MOTION GRAPHICS>
Create high-quality motion graphics programmatically.
Use HTML Canvas, SVG, CSS, JavaScript, or another suitable graphics renderer.
Graphics should be as clean as the reference.
A. MAP ANIMATIONS
Support:
Map zooms
Side-by-side map comparisons
Scaling one map against another
Animated boundaries
Moving location markers
Labels
Region highlights
Transparent map overlays
Maintain correct aspect ratios and scale relationships.
Don't claim two maps have the same geographical scale unless that comparison is verified.
B. BEFORE/AFTER COMPARISONS
Build a reusable comparison component.
The reference uses a diagonal comparison wipe.
Create:
Full-screen before image/video
Full-screen after image/video
Sharp diagonal dividing line
Smooth wipe animation
Small BEFORE/AFTER labels
The dividing line should animate across the screen while revealing the difference.
Allow comparison of two synchronized videos or images.
C. NUMBER ANIMATIONS
Create rolling numbers and percentage counters.
Support:
Percentages
Multipliers
File sizes
Map measurements
Building counts
Performance comparisons
Animate numbers smoothly.
Keep units accurate.
D. DOCUMENT HIGHLIGHTS
When the narration quotes an article or source:
Show the relevant excerpt
Dim surrounding content
Highlight the important sentence
Add a subtle zoom
Include a small readable source credit
Use yellow or another context-appropriate highlight color.
Never fabricate a quote or source.
E. TECHNICAL VISUALIZATIONS
Create clean graphics for:
CPU/GPU comparisons
Performance metrics
Maps and terrain
Hardware specifications
Technology evolution
Game-world scale
Avoid overly complicated dashboards.
Use one clear visual idea at a time.

<STEP 7 — TYPOGRAPHY>
The reference does NOT use constant karaoke-style subtitles.
Its editing uses selective, high-impact text.
Use:
Montserrat ExtraBold
Inter Bold
Another clean modern sans-serif
TEXT STYLE
White primary text
Bold typography
Minimal shadows
Pink accents for important numbers or words
Occasional yellow highlights for quotations
Clean alignment
Simple entrance animations
Reference-inspired example:
10x MORE BUILDINGS
Make "10x" bright pink.
Make "MORE BUILDINGS" white.
Animate the text with a quick scale or position reveal.
Avoid covering important subjects.
Keep important typography within safe margins.
TEXT ANIMATION
Use:
Fast scale-in
Slide-up
Mask reveals
Counter animations
Subtle tracking adjustments
Avoid excessive bouncing or spinning text.
Render all text in code to keep it crisp.

<STEP 8 — NARRATION AND AUDIO>
The narration determines the edit.
If narration audio is provided:
Analyze the full audio
Transcribe when an alignment tool is available
Obtain word-level timestamps
Detect pauses
Identify emphasis
Find natural edit points
Use faster-whisper or another suitable alignment tool.
If automatic transcription is unavailable, use the provided script and create manually reviewable timings.
SOUND DESIGN
Add restrained, licensed sound effects:
Soft whooshes
Cinematic impacts
Low bass accents
UI clicks
Map reveals
Number counter effects
Transition sounds
Keep effects synchronized with visual actions.
MUSIC
Use subtle cinematic documentary music.
Choose a track that supports the topic without distracting from narration.
Duck music during speech.
Raise its intensity during important reveals when appropriate.
Avoid abrupt audio cuts.
Target approximately -14 LUFS integrated loudness when suitable for YouTube.
Never imitate or reuse copyrighted music without permission.

<STEP 9 — AUTOMATED EDITING ENGINE>
Build an actual reusable video-editing pipeline.
Preferred tools:
Python
FFmpeg
OpenCV
Pillow
JavaScript
HTML Canvas
Playwright
faster-whisper when available
Use FFmpeg for final video assembly and audio mixing.
Use Canvas/SVG or HTML-based compositions for motion graphics.
FOOTAGE ANALYSIS
Scan my footage directory.
For each clip, extract:
Filename
Duration
Resolution
FPS
Scene boundaries
Representative thumbnails
Where visual analysis is available, identify relevant subjects and actions.
Build an asset manifest.
EDIT DECISION LIST
Create an editable timeline specification containing:
Timeline start and end
Source filename
Source in/out timestamps
Crop and scale settings
Camera animation
Transition
Text overlays
Graphics
Audio
Source attribution
Keep the timeline machine-readable.
Do not use arbitrary footage if no relevant clip exists.
RENDERING
Create the final timeline from the approved edit decision list.
Use reproducible animation timings.
Render HTML graphics with Playwright where appropriate.
Composite footage and graphics using FFmpeg.
Preserve audio synchronization.
Handle mixed frame rates without dropping or duplicating frames unnecessarily.

<STEP 10 — FIRST CHECKPOINT>
Before editing the complete video, show me:
Script or transcript
Factual claims requiring verification
Available footage inventory
Source links and credits
Scene-by-scene editing plan
Motion graphics plan
Missing asset list
Make sure the editing plan matches the narration.
Wait for approval before building the complete edit.

<STEP 11 — PRE-RENDER CHECKPOINT>
Create a low-resolution rough cut.
Also generate:
Two 16-frame contact sheets
Opening 10-second preview
Map animation preview
Typography preview
Before/after comparison preview, if used
Full low-resolution draft
Compare the result against my reference.
Check:
Editing pace
Relevant footage selection
Camera movement
Map readability
Graphic animations
Typography
Audio synchronization
Color consistency
Source attribution
Missing frames
Awkward transitions
Repeated footage
Fix problems before final rendering.
Wait for my approval.

<STEP 12 — FINAL EXPORT>
After approval, export:
Resolution: 1920×1080
Frame rate: 60 FPS
Video codec: H.264
Quality: CRF 16–18
Pixel format: yuv420p
Audio: AAC, 192–320 kbps
Container: MP4
Verify the actual finished video before delivery.
Inspect for black frames, text overflow, audio drift, corrupted frames, and unexpected cuts.

<DELIVERABLES>
Provide:
final_video.mp4
Editable timeline
Complete source code
Motion graphics components
Footage manifest
Script and transcript
Sources and credits
Preview contact sheets
README with setup and rendering instructions
Organize the project so I can reuse the editing workflow for future YouTube videos.
I should be able to replace the script, narration, and footage without rebuilding the motion graphics engine.

<START>
Analyze my attached reference video first.
Create a detailed editing style guide.
Then inspect my supplied video assets, narration, and script.
Build a shot-by-shot edit plan that matches the reference's cinematic <GENRE> documentary style.
Stop for script, sources, and timeline approval.
Then assemble the rough cut, create the motion graphics, synchronize the narration, and show me the preview.
Wait for final render approval.
After approval, export the completed 1920×1080 video and editable project.
PRIORITY: Match the reference's footage selection, editing rhythm, cinematic presentation, maps, comparisons, research highlights, and motion graphics as closely as possible.
Do not create generic AI edits with random B-roll, excessive zooms, or constant animated subtitles.
BEGIN BY ANALYZING THE REFERENCE VIDEO.
```

## Success check
- Contact sheets of your cut and the reference look like the same channel.
- Every shot ties to a narration line; no filler B-roll; no repeated shots.
- Every number, map scale and quote on screen has a source in the credits.
- Export passes the black-frame, overflow and audio-drift checks at about -14 LUFS.
- A second video renders by swapping only script, narration and footage.

## Source
- https://x.com/fuckscales/status/2121017995707445282
- @fuckscales, 13 Nov 2026 (AEDT)
- Unverified: the post's claims about the GTA 6 channel it copied (10M views in 3 days, a 500k-view first video, monetised). The headline "Fable 5.2" is never explained in the post.

## Anti-patterns
- Copying the reference's footage, narration or music. Match the technique, not the content.
- Using game trailers, gameplay or music you don't have rights to. Check the publisher's video policy; reused-content rules can block monetisation (added, not in source).
- Skipping either checkpoint and rendering the full video straight away.
- Making up stats, map scales or quotes to fill a graphic.
- Wall-to-wall karaoke subtitles, glitch or spin transitions, or the same zoom on every still.
- Treating view-count claims as the expected result.
