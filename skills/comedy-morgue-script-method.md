---
name: Comedy Morgue script method
description: >-
  Use this when Pod Satire Studio writes or rewrites a Comedy Morgue or Comedy
  Ombudsman script, for an episode or a Short, or reviews one before it is
  narrated.
---
# Comedy Morgue script method

A script is an argument with jokes in it, read by a flat synthetic voice. Get the argument right first, then the jokes, then the sound. The full method is /workspace/youtube-research/comedy-morgue/METHOD.md.

## 0. Read the voice file

Read /workspace/youtube-research/comedy-morgue/VOICE.md before writing, if it exists. It holds passages Steven likes, passages he rejected and why, and his standing notes. Match the liked passages for rhythm and attitude; never reuse their wording. If it is missing, note that in the run report.

## 1. The argument (before any prose)

Write these five lines. If you can't, the episode isn't ready.

1. Thesis: one sentence a fan of the target would disagree with.
2. Why now: the moment from the past two weeks that makes it worth saying.
3. Exhibits: 3 to 5 clips or facts, in order, each one worse or stranger than the last.
4. The turn: the point where the story changes meaning (who benefits, what they said before, what it cost).
5. The last line: it pays off the opening. Write it now.

Then write the beat sheet from METHOD.md section 6, with exact transcript quotes for every clip.

## 2. Structure for a 16 to 22 minute episode

- Cold open: one clip under 20 seconds, then one dry line.
- Thesis spoken by 0:45.
- Three or four acts. Each act is one exhibit, has one job, and ends on a short button line.
- The turn lands around the midpoint.
- Close on the last line from step 1. No recap, no lesson, no sign-off.

A Short is one exhibit and one button line. Nothing else.

## 3. Clips and narration

- Before a clip: one line telling the viewer what to listen for.
- After a clip: add what the clip doesn't show. Context, a contradiction, a consequence, or the receipt.
- Never describe what the viewer just watched.
- The target's own words do the damage. Quote exactly, with the source.
- Each clip 20 seconds or less.
- Write the script as a segment file (VO, CLIP, HOLD, FREEZE), one Kokoro render per VO segment.
- Narration carries more runtime than clips; clips are roughly a quarter to a third.

## 4. Jokes

- Specific beats general: the name, the number, the product, the exact quote.
- Understate. The voice is a coroner reading a report, not a comic doing a bit.
- One joke per paragraph. If two are fighting, keep the more specific one.
- Aim at power, money and hypocrisy. Not looks, family or illness.
- Set up a callback in act one and use it once more near the end.
- Cut any joke that needs a second sentence to explain it.
- A fact that is funny on its own doesn't need a joke on top.

## 5. Writing for the Kokoro voice

The narrator can't do sarcasm, emphasis or a knowing pause. The words have to do it.

- Short sentences. One idea each. Vary length so three in a row don't match.
- The funny word goes last in the sentence.
- No brackets, no asides inside a sentence, no italics for stress.
- Avoid questions that only work with a raised voice.
- Spell out numbers, symbols and abbreviations the way they should be said.
- Check names and odd words by generating them once; respell any that come out wrong.
- A paragraph break is the only pause you have. Use one before a button line.

Kokoro settings: am_onyx, speed 1.05, no processing, about 0.08s sentence gaps and 0.25s paragraph gaps. HOLD segments are the only extra pauses.

## 6. Let the edit time the joke

- The cut is the punchline. End a narration line on the setup and cut straight to the clip that answers it.
- The planned silence. Write `[HOLD 1.0s]` after a line that needs to land, over a still or slow zoom on the target's face. A few times an episode, not every paragraph.
- The freeze. `[FREEZE]` holds the clip's last frame for a beat after a damning line in the clip.
- The understatement after. One flat line of a few words after a wild clip.

## 7. Lines to cut on sight

- Openers: "Let's dive in", "In the world of", "Picture this", "Buckle up".
- Hinges: "But here's the thing", "Here's where it gets interesting", "And that's the point".
- "It's not X, it's Y" and "This isn't just X, it's Y".
- Lists of three adjectives or three examples in a row.
- A rhetorical question followed by its own answer.
- Morals: "And maybe that says something about all of us."
- Hedges: "arguably", "it could be said", "in many ways".
- Anything that sounds like a summary of the episode.

## 8. Passes

1. Draft one act at a time with the drafting prompt in METHOD.md section 8.3, from the five lines.
2. Cut 15 percent. Lose the weakest joke in each act.
3. Fact pass: every claim about a real person has a source link. Label opinion as opinion.
4. Ear pass: narrate the first 60 seconds with Kokoro and listen back for stumbles, wrong names and flat spots. Fix the text, not the voice settings.
5. Length: size from the measured words-a-minute rate in /workspace/comedy-morgue/DAILY-RECIPE.md (about 209 wpm), never 150.

## 9. Final check

Score each line yes or no, and fix every no:

- A fan of the target would disagree with the thesis.
- Each act has one job and ends on a button line.
- No narration line repeats a clip.
- Every joke names something specific.
- Nothing from the cut-on-sight list is left.
- The last line pays off the opening.
- It matches VOICE.md and breaks no standing note.

Approval: when the weekly routine runs under Steven's standing yes, there is no script lock; carry on to narration. Otherwise send Steven the five lines, the script and the three lines you're least sure of, and ask for a yes or all notes in one reply.

## 10. Learning from his notes

- Each line Steven rewrites goes into VOICE.md as a before and after pair, with his reason.
- Each passage he praises goes in under "Liked".
- A note that applies to every script becomes a standing note in memory, with its reason and source.
- Use the shared-file rule on VOICE.md.

## Anti-patterns

- Writing prose before the five lines exist.
- A script that retells the week with jokes attached and no thesis.
- Fixing a weak joke by adding another one.
- Copying the phrasing of a reference channel.
