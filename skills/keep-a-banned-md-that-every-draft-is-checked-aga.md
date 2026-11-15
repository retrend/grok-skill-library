---
name: Keep a banned.md that every draft is checked against
description: >-
  Use this when an agent keeps writing in AI style (em dashes, "it's not x, it's
  y", delve, closing summaries) and you want one standing file of banned
  structures, words, formatting and tone that it reads before every draft and
  checks the draft against.
---
The hook's "90% your slop problem is gone" is the author's claim, not a measured result. The useful part is the file and the prompt.

This works before and during drafting. To fix a draft that's already written, use the seven rewrite passes in rewrite-ai-drafts-so-they-read-like-a-person. (added, not in source)

## Steps
1. Create `banned.md` in the agent's project or skills folder, where every writing task can read it. Start from the author's file below, word for word.
2. Add every phrase you'd fire a writer for, plus your own repeat offenders. Keep sections 1 to 4 as the rules the agent checks against.
3. Tell the agent to read the file before every draft by putting the prompt below in its standing instructions or at the top of each writing task.
4. When a draft still slips through, add the pattern to the right section instead of fixing that one draft by hand. (added, not in source)

### The file
```
# banned.md
rules for writing like a person, not a model

## 1. banned structures (these matter more than words)

- negative parallelism: "it's not x, it's y" / "not just x, but y" / "this isn't about x"
  -> say y. delete the x

- fake build-up: "no x. no y. just z."
  -> say z

- self-answered questions: "the result?" "why does this matter?" "the catch?"
  -> state the answer

- colon reveals: "here's the thing:" "the truth is:" "the kicker:"
  -> cut the setup, keep the point

- -ing tails: "..., highlighting the importance of x" / "..., ensuring y" / "..., reflecting z"
  -> end the sentence. if the point matters, give it its own sentence

- fake ranges: "from startups to enterprises" "from beginners to experts"
  -> name who it's actually for

- inflated significance: "stands as", "serves as a testament", "plays a vital role", "marks a turning point"
  -> use "is". say what it does

- vague authority: "experts say", "studies show", "many believe"
  -> name the source or cut the claim

- the closing moral: "in conclusion", "overall", "ultimately", "the lesson here is"
  -> stop at the last useful line

- symmetry: every paragraph the same length, every sentence the same rhythm
  -> mix one-line paragraphs with longer ones

## 2. banned words

ai overuse: delve, underscore, showcase, intricate, tapestry, pivotal, crucial, vital, foster, enhance, landscape, realm, testament, notably, comprehensive, insights, additionally, moreover, furthermore
hype: unlock, unleash, elevate, supercharge, empower, leverage, harness, seamless, robust, cutting-edge, game-changer, revolutionary, transformative
filler: truly, incredibly, really, very, quite, actually, simply, essentially
phrases: in today's world, in the ever-evolving, let's dive in, let that sink in, at the end of the day, it's important to note, it's worth noting, when it comes to

## 3. banned formatting

- em dashes (—). use a period, a comma or a new line
- exclamation marks
- emojis as bullets or in headers
- bold on random phrases
- "**term:** explanation" bullets where the term is repeated in the explanation
- a list where one sentence would do

## 4. banned tone

- opening with praise ("great question", "absolutely")
- hedging (arguably, may potentially, it could be said)
- announcing what you're about to say ("in this post i'll explain")
- sounding like a press release, a linkedin post or a travel brochure

## 5. how a person writes

- the point goes in the first line
- one idea per sentence. short sentences, with a longer one when it earns it
- specific beats general: a number, a name, a tool, a date, a price
- simple words. if you wouldn't say it out loud, rewrite it
- opinions stated plainly, no hedging
- it reads like texting a smart friend

## 6. self-check before you hand it over

1. read every sentence against sections 1-4
2. if a sentence breaks a rule, rewrite the whole sentence. a synonym keeps the same pattern
3. count em dashes and exclamation marks. both must be zero
4. check the last line. if it summarizes, delete it
5. read it out loud in your head. anything that sounds like a model, rewrite
```

### The prompt
```
before you write anything, read banned.md in full.

write the draft. then check it line by line against sections 1 to 4 of the file.
if a line breaks a rule, rewrite the whole sentence. a synonym keeps the same pattern.

before you send it:
- count em dashes and exclamation marks. both must be zero
- check the last line. if it summarizes, delete it
- read it like a person texting a friend. anything that sounds like a model, rewrite

send only the final text. no notes, no list of what you changed.
```

## Success check
- Zero em dashes and zero exclamation marks.
- No section 1 structure and no section 2 word in the output. A quick search for the banned words confirms it. (added, not in source)
- The point is in the first line, and the last line isn't a summary.
- The output has only the final text, with no change notes.

## Anti-patterns
- Swapping a banned word for a synonym and keeping the same sentence shape.
- Treating the word list as the whole fix. The author ranks structures above words.
- Banning words a brand or a regulator requires, such as a required disclaimer in financial-adviser copy. Make an exception there. (added, not in source)
- Letting the file grow into a list nobody reads. Cut rules that never fire. (added, not in source)
- Treating "90% gone" as a measured result.

## Source
J.B. (@VibeMarketer_), https://x.com/VibeMarketer_/status/2121625654949187602, 15 Nov 2026 (Sydney time). Three-post thread: hook, the file (https://x.com/VibeMarketer_/status/2121625668048060485) and the prompt (https://x.com/VibeMarketer_/status/2121625680027013441).
