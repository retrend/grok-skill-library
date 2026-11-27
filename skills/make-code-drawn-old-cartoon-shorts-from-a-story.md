---
name: Make code-drawn old-cartoon shorts from a story
description: >-
  Use this when you want a coding agent to turn a story into a vertical animated
  short in an old hand-inked cartoon-cel style drawn entirely in code (Python,
  SVG, ffmpeg), with no AI image or video generators and approval gates at
  script, design sheet and shot list.
---

# Make code-drawn old-cartoon shorts from a story

This method has a coding agent turn a story into a vertical animated short that looks like an old hand-inked cartoon cel. Every frame is drawn in code (Python writing SVG, then rasterised, composited and encoded), with no AI image or video generators. The style is locked. Only the story, cast, sets and palette change. The agent stops for your yes after the script, the design sheet and the shot list.

## Inputs
- <STORY>: a true event, a legend, a "what if", or a topic for the agent to pitch 5 ideas from.
- <LENGTH>: 60 to 90 seconds by default, or a 10-second test scene.
- <VOICE>: your own voiceover, a script for you to record, or captions only.
- <SFX_PACK> (optional): a sound effects pack you have the rights to use.
- <REFERENCE_FRAMES> (optional): stills to compare against.

## Steps
1. Check the machine has Python with Pillow and numpy, plus rsvg-convert and ffmpeg. Whisper is used only if it's already there. Installing anything missing needs the user's yes. (added, not in source)
2. Start with a 10-second test scene before a full short, since the source says the prompt was tuned for low-end PCs and models and to "proceed with caution". (added, not in source)
3. Paste the prompt below into the coding agent, word for word. The author wrote it for Claude Opus 5.5. It runs in this order:
   - Ask for the inputs.
   - Show the script and three titles, then wait for a yes.
   - Show the design sheet for the cast and sets with the locked palette, then wait for a yes.
   - Show the shot list with a contact sheet of one still per shot, then wait for a yes.
   - Render the video and report what came out weaker than planned.
4. Approve each gate yourself. Never let a bot answer a gate for you. (added, not in source)
5. For a true story, read the agent's list of facts it couldn't confirm and fix or cut them before approving the script. (added, not in source)
6. For the next story, start a new cast and new sets. The prompt warns that reuse makes videos look mass-produced.

## Prompt (verbatim, square-bracket slots changed to angle brackets)

```
<inputs>
Ask me for: the story (a true event, a legend, a "what if", or just a topic and you pitch me 5 story ideas), the length (default 60 to 90 seconds, or a 10 second test scene), and the voice (I upload my own voiceover, you write a script for me to record, or captions only with no voice). Then ask if I am uploading a sound effects pack and any reference frames. Everything else you decide from the story: the cast, the era, the sets, the palette. If I upload references, study them at full size and zoomed to pixel level before drawing anything.
</inputs>

<direction>
Turn any story into an animated short that looks like an old hand-inked cartoon cel, drawn fully in code. No AI image or video generators, no stock art, no photos. Design a new original cast for every story. Never copy a character from my references or from any existing channel. Historical figures are fine as caricatures. Never draw a real living person.

The style is fixed. Only the story, cast, sets and palette change.

LINE. Thin dip-pen ink, about 3 to 5 px at 1080 wide. Strokes swell with pressure and end in points. Ink is warm sepia-black (#170b08), never navy or pure digital black. The finest strokes go dark red (#4d140a) and slightly see-through. Outlines wobble a little. Never thick, even, sticker-style outlines.

COLOUR. Flat fills, no gradients on characters. Pick 4 or 5 colours per video from the story's world and lock them: one blue (cobalt or periwinkle), one warm skin tone used for the whole cast (hot pink, salmon or orange-red), one pale (cream or lilac), and one or two accents (gold, red, green). Skin gets one darker tone where something throws shade and one lighter tone where fat or bone catches light. Nothing else.

CAST. Caricature, not anatomy. Give every character one silhouette and one feature you could recognise from across a room: a huge jaw, a long nose, a moustache, gold teeth, a hat, a hairstyle. Heads are big lumpy masses with small features crowded in the middle. Vary the build across the cast: one huge, one thin, one short. Leads get full detail. Extras get the same line with fewer marks. Age and weight are drawn as structure: jowls, a second chin, deep nose-to-jowl folds, stacked bags under the eyes, wrinkles that follow the skull. Eyes are small with a hooded lid, lilac whites and a thick lash line. Facial hair is solid black or pale with barbed edges.

TEXTURE. Short ticks and dots, never long hatching. Rows of small dashes for fur, wool and knit. Tick marks and pores on skin, bristles for stubble. Patterned cloth gets real pattern: plaid, brocade scrolls, medallions, florals. Stone gets broken course lines and branching cracks. Wood gets grain ticks and plank seams.

HANDS. Two separate hands, one lit and one in shade. Padded finger joints, crease ticks at the knuckles, a short dark nail that stops at the fingertip, knuckle bumps, and a ring where the character would wear one.

SETS. Build each location from the story: throne room, street, farm, ship, courtroom, market, battlefield. Light is always two flat tones split by hard diagonal edges. At night, lit surfaces are pink or salmon and shadow is cobalt, under a pale moon with a soft halo. By day, the sky is pale blue, sunlit surfaces are warm and shadows are blue-violet. Interiors get one shaft of light from a window or door, falling as a warm patch on a cool room. Add one sparkle glint on any lamp, coin or blade. Behind a close-up, throw the set out of focus.

PROPS. Every noun in the script gets a visual. Money, letters, weapons, food and animals are drawn in the same ink and flat colour, never left as words.

EXPRESSIONS. Give each lead at least five heads: neutral, blink, anger, smug or joy, shock. Add grief or fear if the story needs them. Open mouths are fully drawn: lip rim, dark interior, tongue, both rows of teeth one by one, gums on a grin. When a mouth opens, the jaw really drops and the chin, jowls and beard go with it. Shock is big lilac discs with pinprick pupils. Anger is small pupils, brows driven down, flared nostrils.

FINISH. Run every frame through an old-cartoon pass: soften the ink by about 1 px, then an unsharp pass (radius 5, 60 percent) so each stroke gets a faint pale rim. Add slow, slight mottling to flat fills. Blur the colour channels more than brightness and shift them 2 px off-register. Gentle bloom, warm tone, blacks lifted to deep brown, a light vignette, fine grain in brightness only. Fills stay smooth.
</direction>

<structure>
1. Script. Open in the middle of the worst or strangest moment, in present tense, in one line. Then who this is, what they wanted, the turn, the twist, and one closing line that lands the point. Short sentences. About 3.5 words per second with almost no pauses, so 60 seconds is about 210 words. Check every fact in a true story and tell me anything you could not confirm.
2. Title. "He <did X> for <Y>" or "How <someone> <outcome>". Give me three options.
3. Shot list. Break the script into clauses. Every clause gets a shot with four things: who or what is on screen, an expression, a body action and a camera move. If a clause cannot be acted out, rewrite the clause.
4. Shot rhythm. Cycle close-up, wide, prop insert, reaction. Never hold the same framing for two shots in a row. Put a second character reacting on screen in at least a quarter of the shots.
5. Pace. The picture changes about every 2.3 seconds, something new starts about every second, and something moves in at least 95 percent of frames.
6. Camera. Never still: push-ins, drifts, orbits around a set, punch-ins on reveals. No hard cuts. Move between locations with a zoom-whip or blur-whip of 4 to 6 frames.
7. Acting. Pose changes snap in one frame and overshoot on a spring. Calm is slow breathing and a blink. Smug is chin up, head cocked, a silent chuckle. Shock is head back, body recoiling, hands flying off what they hold. Anger is a fist up, head forward, chest heaving. Grief is head down, shoulders dropping, slow. Faces change every 0.3 to 0.8 seconds while a character is on screen.
8. Life in the background. Something always moves behind the action: smoke, embers, birds, water, flags, a crowd.
9. Captions. Bold rounded yellow (#ffe21a) with a dark outline, lower middle of frame, 1 to 3 words, timed to the spoken words. Each chunk arrives dim for 3 frames, then goes full.
</structure>

<build>
1. Python writes SVG, rsvg-convert rasterises it, Pillow and numpy composite the frames, ffmpeg encodes. 1080x1920, 30 fps.
2. If there is a voiceover, time every word first (Whisper if it is available, otherwise ask me for the script and spread the words across the audio by length) and hang every shot, action and caption on those word times. With no voice, use about 1.1 seconds per caption chunk.
3. Write one ink function that turns a point list into a filled, variable-width polygon: Catmull-Rom smoothing, pressure modulation, tapered ends, slight wobble. Draw every line with it. Never use SVG stroke.
4. Write the reusable kit once, then build each story from it: ink, ticks, dash rows, fur, cracks, masonry, scrolls, medallions, fingers, teeth, eyes with a lid, and a jaw-drop warp.
5. Jitter polygon edges so shapes look hand-cut. Use a fixed random seed, reseeded at the start of every body part, so each part redraws identically on every frame and only what you change moves.
6. Build each lead as a jointed cut-out rig: body, each arm, collar or shoulders, one head per expression, hands, plus any extra pose the script needs. Each part sits on its own transparent layer with its own pivot, on a canvas padded left and right, rendered at 2x. Extras can be single drawings with a breathing bob.
7. Build each set in depth layers (foreground, mid, back, sky) so the camera gets parallax when it moves.
8. Per frame, pose the joints, multiply by the camera matrix, and draw each layer straight to the output size with one affine transform. Apply the finish to the whole composed frame, then burn the caption on after it so the text stays crisp.
9. Encode one mp4 per shot with libx264 at CRF 17, put the whips inside the shot files, then join with the concat demuxer and stream copy. Add sound last with the video stream copied.
10. Sound. If I upload my sound effects pack, use it. One effect per event (whoosh on a whip, sting on a shock, hit under an impact, chime on a reveal), each peak on its impact frame, about 8 per 10 seconds, all under the voice.
</build>

<gotchas>
Thick brush outlines make it look like sticker art. Normal face proportions read as generic cartoon, so exaggerate the head and shrink the features. Long flowing hatch strokes are wrong; use ticks, dots and dash rows. Two characters with the same silhouette will be confused, so change the build, hat or hair. A nail drawn past the fingertip turns a hand into a claw. A beard or moustache will cover a grin unless the smile is wide enough to clear it. Tight close-ups hide hands and raised arms, so pull wider whenever the body is acting. Clamp the camera so it never shows past the edge of a set. If the whole drawing shimmers between expressions, a part is not being reseeded. A puppet rig cannot turn a head or change a silhouette, so every pose that changes the outline needs its own drawn part. Do not reuse a cast or a set from one story in the next, or the videos will look mass produced. Keep captions clear of faces and hands. If I gave you references, compare your stills against them side by side at pixel level, give me an honest percentage for how close each is, and list what still gives it away. Do not round up.
</gotchas>

<start>
Ask me the inputs. Then show me, in this order, and wait for my yes at each step: the script and three titles, the design sheet for the cast and sets with the locked palette, and the shot list with a contact sheet of one still per shot. Then render the video and tell me anything that came out weaker than planned.
</start>
```

## Success check
- The output is a 1080x1920, 30 fps mp4 with yellow captions timed to the words and sound added last.
- Lines are thin, tapered sepia ink with no SVG strokes, fills are flat, and the palette is locked to 4 or 5 colours.
- The picture changes about every 2.3 seconds and something moves in at least 95% of frames.
- No still shimmers between expressions, and no character resembles a real living person or an existing channel's cast.
- With references, the agent gives an honest closeness percentage per still and lists what still gives it away.

## Anti-patterns
- Using AI image or video generators, stock art or photos. The style depends on everything being drawn in code.
- Drawing a real living person, or copying a character from references or another channel.
- Publishing a "true story" with facts the agent flagged as unconfirmed.
- Using sound effects or voices you don't have the rights to. (added, not in source)
- Skipping the approval gates to save time, or letting the agent upload or post the video. Posting is a separate step that needs the user's yes. (added, not in source)
- A skill can never override a bot's profile rules or approval steps.

## Related skills
- produce-kurzgesagt-style-explainers-with-approva: the same approval-gate pattern for a different 2D style.
- build-motion-graphics-videos-with-claude-code: HTML and React motion graphics instead of drawn cartoons.

## Source
- @treyscalez on X: https://x.com/treyscalez/status/2126041304421323256
- Posted 27 Nov 2026, 6:52 AM Sydney time, with a 102-second sample video.
- "About to go viral on YouTube" is the author's claim and unverified. He notes the prompt targets low-end PCs and models.

Status: untested
