---
name: Run a five-advisor council prompt before a decision
description: >-
  Use this when you face a judgment call (which idea to make, whether to build a
  product, a client's rush request, picking between two tools, an overloaded
  week) and want one chat model to argue it from five angles and hand back a
  single recommendation and first action.
---
"Council" is not an official Claude feature, despite the post's "BREAKING" hook. It's a role-play prompt you paste into any chat model. Community versions with sub-agents and peer review already exist, adapted from Andrej Karpathy's LLM Council idea. One model playing five roles gives you different prompts, not different models, so it can still share blind spots. (added, not in source)

Fill the <ANGLE_BRACKET> slots with real facts. Prompts 2 to 9 assume the council from prompt 1 is already set up in the same chat.

## Steps
1. **Set up the council** (paste first, in a fresh chat)
   ```
   Play five advisors: Strategist (goal), Skeptic (weak assumptions), Creative Advisor (overlooked options), Audience Advocate (who's affected), and Operator (what's doable). Give each one sentence. Show the biggest disagreement and have one advisor answer the strongest objection. End with one recommendation, the first action, and what could change your mind. Label assumptions and ask one question first if a missing detail could change the verdict.
   ```
2. **Pick a use-case prompt** from the list below and paste it in the same chat.
3. **Answer its one question** if it asks one before giving a verdict.
4. **Read the disagreement, not just the recommendation.** If the Skeptic's objection wasn't really answered, push back once. (added, not in source)
5. **Do the first action.** Check any labeled assumption or "verify" flag before acting on it.

### Use-case prompts
1. **Pick your next video idea**
   ```
   I create <CONTENT_TYPE> for <AUDIENCE> on <PLATFORM>. I want more <SAVES_SHARES_COMMENTS_OR_CLICKS>. My options are <A>, <B>, and <C>. I have <TIME_AND_EQUIPMENT>. Debate what serves my goal and fits my resources. Pick one and give me an opening line, three talking points, and a call to action.
   ```
2. **Fix a video that loses viewers**
   ```
   My <LENGTH> video is for <AUDIENCE> and promises <PAYOFF>. Viewers drop off at <TIMESTAMP_OR_UNKNOWN>. Script <PASTE_SCRIPT>. Debate whether the hook, setup, or timing of the payoff is the likeliest issue. Pick one change to test, rewrite the first five seconds, and cut one line. Label any unconfirmed cause as a hypothesis.
   ```
3. **Test a product idea before building it**
   ```
   I want to sell <PRODUCT> to <BUYER> for <PRICE>. Here's the demand I've seen <COMMENTS_DMS_OR_NONE>. I have <HOURS_AND_BUDGET>. Debate whether the evidence suggests people would pay. Give me one test, the exact message to post, and the result that would justify building a first version.
   ```
4. **Stress-test a workshop**
   ```
   My <LENGTH> workshop teaches <AUDIENCE> to <SPECIFIC_TASK>. Here's the agenda <PASTE_AGENDA>. I have <PREP_TIME>. Imagine attendees leave confused or fail to finish the exercise. Debate the likely causes, rank the top three, and give me a timed agenda with one activity to shorten or cut.
   ```
5. **Reply to a client's rush request**
   ```
   My client asked <PASTE_REQUEST>. We agreed on <SCOPE_AND_DEADLINE>. I can deliver <WHAT_AND_BY_WHEN>. Weigh client goodwill against workload and overpromising. Recommend one offer and draft a warm reply under 100 words with a clear deliverable and date. If the request adds work, ask the client what to prioritize.
   ```
6. **Choose between two tools**
   ```
   I need <TOOL_A> or <TOOL_B> for <RECURRING_TASK>. My budget is <MONTHLY_AMOUNT>, my must-haves are <FEATURES>, and my deal-breaker is <CONSTRAINT>. Here's what I know <PRICES_AND_FEATURES>. Debate cost, ease, and fit. Pick one provisionally, give me a 15-minute pass/fail test, and flag what I should verify.
   ```
7. **Turn a work story into an interview answer**
   ```
   I'm interviewing for <ROLE>, and the job emphasizes <SKILL>. My real example is <SITUATION_ACTION_AND_RESULT>. Debate what would convince a hiring manager and what sounds vague. Write a natural 60-second answer using only my facts. Ask one tough follow-up question and wait for my reply.
   ```
8. **Make an overloaded week fit your calendar**
   ```
   I need to finish <TASKS_AND_DEADLINES>. My free blocks are <TIMES>, my fixed commitments are <COMMITMENTS>, and the biggest risk is <CONSEQUENCE_OF_MISSING_A_DEADLINE>. Debate what to finish, shrink, or reschedule. Give me a plan that fits, one action for today, and a two-sentence message if a deadline needs to move.
   ```

## Success check
- Each of the five advisors got one sentence and a real disagreement is shown.
- The strongest objection got an answer.
- You end with one recommendation, one first action and what would change the verdict.
- Assumptions are labeled, and nothing in the output uses facts you didn't give it.

## Anti-patterns
- Believing "BREAKING: Claude has a new feature". It's a prompt.
- Leaving slots vague. The verdict is only as good as the facts you paste.
- Treating five roles from one model as independent opinions. For a high-stakes call, also ask a second model or a person. (added, not in source)
- Sending the drafted client reply or deadline message without reading it. (added, not in source)
- Using it for regulated advice (financial, legal, medical) in place of a qualified review. (added, not in source)

## Source
Jeffar_AI (@Jeffar_AI), https://x.com/Jeffar_AI/status/2121789769650958729, 15 Nov 2026 (Sydney time). Ten-post thread: hook, a setup prompt and eight use-case prompts. The "new feature" claim is false. Five-advisor councils predate the post as community Claude skills based on Andrej Karpathy's LLM Council.
