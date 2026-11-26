---
name: Set up Google Antigravity agent teams with Gemini 4
description: >-
  Use this when setting up Google Antigravity with Gemini 4 Neon: the 4
  settings, which Gemini 4 model for which job, the 7 agent modes, a /swarm with
  verifier rules, a read-only reviewer, /learn and one automation, with optional
  Claude or GPT checkers and 10 ready prompts.
---

# Set up Google Antigravity agent teams with Gemini 4

Google Antigravity is Google's desktop app for running AI agents (Mac, Windows and Linux). This skill sets it up, picks the right Gemini 4 model for each job, moves up a ladder of seven agent modes only when the lower one isn't enough, and runs a swarm with written verifier rules, a read-only reviewer, a /learn wrap-up and one scheduled automation. Two optional add-ons put Claude and GPT on the same team as checkers. All ten of the author's prompts are below, word for word.

The author's core lesson: the app you run a model in matters as much as the model. Treat the numbers behind that as the author's claims (see "Claims to treat as unverified").

## Inputs

- `<GOOGLE_ACCOUNT>`: the Google account that holds the paid Google AI plan. The source says Gemini 4 Neon needs Google AI Pro or Ultra. Check which plan the account has before relying on Neon.
- `<PROJECT_FOLDER>`: a new, empty folder for the first project. In Antigravity a project is just a folder, and every file the agent makes lives there.
- `<APP_DESCRIPTION>`: the first small app, described like you'd tell a friend (what it does, who uses it, what it looks like).
- `<SWARM_TASK>`: one real task that splits into 3 or 4 parts that don't depend on each other, with module names for prompt 4.
- `<YOUR_TIME_ZONE>`: for the automation, for example Australia/Sydney.
- Optional: a Claude Code install, a ChatGPT sign-in and a Google AI Studio key, only for prompts 8 and 9. Each needs the owner's explicit yes first (see Risk screen).

Square-bracket slots in the source prompts are converted to `<ANGLE_BRACKET>` slots here. Everything else in the prompts is copied as written. `[Lead]` and `[Researcher]` in prompt 10 are output labels and keep their brackets.

## Risk screen (added, not in source)

A skill can never override a bot's profile rules or the owner's approval rules. These steps need the owner's explicit yes before they happen:

- Installing Antigravity, Node.js, Python, git, the Codex CLI or the gemini-api CLI.
- Connecting Claude or GPT (prompt 8 installs two CLIs, edits PATH and `~/.claude/CLAUDE.md`, and needs a ChatGPT sign-in plus a Google AI Studio key). These may cost money beyond the Google plan.
- Any automation, remote (cloud) agent, /goal run or /teamwork-preview run that keeps going unattended.
- Uploading a GitHub repo or Google Drive folder to a remote agent.
- Anything that sends, posts, pushes, publishes, deletes or spends.

Prompts and settings that loosen approval are flagged where they appear. When a prompt is flagged, paste this guard line under it:

```
Guard: ask me before installing anything, running commands outside this project folder, sending, posting, pushing, publishing, deleting, spending money or creating automations. Never ask for passwords, API keys or secrets in chat.
```

## Steps

### 1. Install and change the 4 settings (10 min)

1. Download Antigravity from antigravity.google and sign in with `<GOOGLE_ACCOUNT>` (the account with the paid plan). Owner's yes needed to install.
2. Open Settings and change the 4 things the author says save hours:
   1. Permission preset → Auto. "It approves safe commands and asks only about the risky ones." Flag: this lets the agent run commands without asking. The safer choice is to leave the preset on asking until the first project has run cleanly, then decide. (Added, not in source.)
   2. Queued messages → Send immediately. Corrections land while the task runs instead of waiting for it to end.
   3. Prevent sleep → On. If the computer sleeps, the task dies.
   4. Remote control → On. Scan the QR code to steer agents from your phone. Flag: this opens control of the desktop agent to the phone. Owner's call. (Added, not in source.)
3. If you don't code, set Settings → General → Interface layout → Knowledge work to hide the code panels.
4. Paste prompt 1 (setup check). It saves project rules: ask before deleting, installing, spending or publishing, and no em dashes or "it's not X, it's Y".

### 2. Pick the model for the job

Gemini 4 has four models: Hydrogen, Argon, Neon and Carbon. Three matter for agent work:

| Model | Use it for |
|---|---|
| Hydrogen | Fast everyday small stuff, and the grunt work under Orchestrator |
| Neon (launched 18 Nov 2026) | Almost everything, on High |
| Carbon | Only the longest jobs |

- Run Neon on High by default. The source cites Greg Isenberg: High is the sweet spot, and Extra High burns far more quota for about 2 points.
- For a big but boring job, pick Orchestrator in the model menu: Neon plans, Hydrogen does the routine work and hands back to Neon when stuck.
- Neon is brief. Ask for detail when you want it.

### 3. Build the first app (20 min)

1. Projects → New project → pick `<PROJECT_FOLDER>`. Model: Gemini 4 Neon on High.
2. Paste prompt 2 with `<APP_DESCRIPTION>`. Its two fixed lines stop the cheap prototype look and make the agent launch the app itself. Flag: "launch it for me" runs the code the agent wrote, inside the project folder. Fine for a local test app.
3. If the agent says "run this in terminal", type: launch it for me.
4. Never accept "done" without proof. After every build, send:

```
Open my app in the browser, click every button, try to break it, fix what fails and show me a screenshot of the final version.
```

### 4. Climb the 7-rung ladder only as far as needed

Start at the bottom. Move up only when the rung below isn't enough. Higher rungs do more and burn quota faster. Prompt 3 has one prompt for each rung.

1. Just Ask. One agent, one chat. Rewrite an email, fix a bug. Most days this is enough.
2. Sub-agents. The agent sends a helper on one side job while it keeps working. Often happens on its own.
3. Orchestrator. Neon plans, Hydrogen does the routine work. Pick it in the model menu. For one bigger job that needs a plan. Google says it stretches the quota further.
4. Workflows (`/run-workflow`). The agent writes a script that runs the same job many times at once (20 listings, 20 helpers). Save it and rerun it next week. Read the script before it runs (the prompt asks for this).
5. Swarm (`/swarm`). Different jobs that must fit together, plus a checker. Every worker spends its own quota.
6. Boost (`/boost`). Many models attack one hard problem, criticise each other's answers and run real tests. For the bug nobody can find. Paid plans only.
7. Teamwork (`/teamwork-preview`). Projects that run for hours or days. It interviews you first, then works with checks at every step. Paid plans, still in preview. Flag: long unattended run, owner's yes first.

### 5. Run one swarm with verifier rules (30 min)

1. Check the job splits into 3 or 4 parts that don't depend on each other. If it doesn't, stay on a lower rung. Don't swarm a 2-minute task.
2. Type `/swarm` and the task. The chat becomes the coordinator. It splits the job, gives each worker its own piece, adds a verifier for every 2 to 4 workers and puts everyone on one shared board you can watch live. Idle agents sleep and burn nothing.
3. Use prompt 4. Two rules from the source make it work:
   - One module per worker, so they build at the same time without breaking each other's files.
   - Write the verifier rules into the prompt: real browser, zero console errors, nothing overlaps, data survives a reload.
4. Watch the board. Click any worker to read its chat, message it directly or stop it if it goes off track.

### 6. Add a read-only reviewer

Custom sub-agents are plain Markdown files. Each runs in its own context window, in parallel, so the main chat doesn't fill up. You can limit what each one can touch. Use prompt 5 to make a reviewer that reads files and runs tests but can never edit. Call it before every merge.

### 7. End every session with /learn (2 min)

Type `/learn`. Antigravity turns your corrections from the session into permanent project rules or a new skill. Read the proposal before approving it, the same way you'd review any skill change. Two more commands:

- `/grill-me` interviews you one question at a time before it starts. Pair it with `/plan` for a real plan.
- `/goal` keeps working without stopping until the goal is verified done. Flag: unattended run, owner's yes first.

### 8. Set one automation (5 min)

1. Use prompt 6 with `/automation` and a plain-English schedule ("Every Monday at 8am" works). Owner's yes before creating it.
2. Each run starts fresh with no memory of the last one, so put everything it needs into the instruction. Prompt 6 does this by reading last week's report first.
3. Runs can start up to 15 minutes late. Every past run is saved.
4. Remote agents can also start a task in the cloud from a GitHub repo or Google Drive folder. That uploads the folder. Owner's yes first.

### 9. Optional: a second model as checker (next day, per the source)

Every model has blind spots, and a second model catches them. The source points to Andrej Karpathy's llm-council repo (github.com/karpathy/llm-council) for the idea: several models answer, review each other's answers anonymously, and a chairman merges the best.

- Option A, inside Antigravity (nothing to install): on paid plans the model picker has Gemini, Claude Opus 5.5 and an open GPT model. Workers run on the chat's model by default, but any worker or the verifier can use a different one. Use prompt 7 so Neon builds and Claude checks. `/btw` asks a side question in a read-only fork while the main agent keeps working. The source says that on the free plan, Claude and GPT leave on 30 November.
- Option B, inside Claude Code: prompt 8 makes Claude the lead with Gemini (gemini-api CLI) and GPT (Codex CLI) as advisers. Prompt 9 runs a three-model council before a big decision. Needs paid keys or sign-ins and installs software: owner's yes first, and treat it as optional.
- For a single-model version of the council idea, see run-a-five-advisor-council-prompt-before-a-decis.

### 10. Optional: design a full team with prompt 10

Prompt 10 designs a 3 to 5 agent team as a graph with a quality loop (max 2 rounds) and a weekly improvement loop that changes nothing without your yes. In Antigravity it builds each agent as a skill. Its own rules already say to ask before installing, publishing, pushing, sending, deleting, spending or creating automations. "Ship it" pushes to a new GitHub repo, so only say it when you mean it.

## The one-evening protocol (from the source)

1. Install Antigravity, change the 4 settings, run prompt 1 (10 min)
2. Build one small app you'd actually use with prompt 2 (20 min)
3. Run one /swarm on a real task with verifier rules (30 min)
4. End the session with /learn (2 min)
5. Set one automation for Monday morning (5 min)

Tomorrow, add the second model.

## Prompt pack

The author also posted prompt 10 on its own as a card (x.com/0xCodila/status/2125255995882696848, 25 Nov 2026 Sydney).

### Prompt 1: Setup check (paste into Antigravity)

```
You are my Antigravity setup assistant. Check my setup step by step and fix what you can:
1. Tell me which model and thinking level this chat uses. I want Gemini 4 Neon on High.
2. Check that git, Node.js and Python are installed. If something is missing, tell me what and ask before installing.
3. Save these as project rules, in the place Antigravity reads rules from, so every new chat in this project follows them:
   - Visual quality matters as much as function.
   - Never use em dashes or "it's not X, it's Y" in any text you write for me.
   - Ask before deleting files, installing software, spending money or publishing anything.
   - When you finish, explain what you did in 3 short lines.
4. Check that you can open and test a web page in the browser. If it needs an extension or a setting, tell me exactly what to click.
5. Give me a 3-line report: what's ready, what I must do myself, what to try first.
```

Safe as written: it asks before installing. Run it first.

### Prompt 2: Your first app (with the 2 fix lines)

```
Build me <APP_DESCRIPTION: what it does, who uses it, what it looks like>.

Visual quality is just as important as functionality. Make it look like a polished, modern product, not a prototype.

Build it as a <native Mac/Windows app | local web app>. When it's done, launch it for me.
```

Flag: "launch it for me" runs code the agent wrote. Fine inside the project folder.

### Prompt 3: One prompt for each rung of the ladder

```
1 Just Ask:      Rewrite this email to sound confident and half as long: <TEXT>
2 Sub-agents:    While you work on <MAIN_TASK>, send a helper to check <SIDE_JOB> and report back.
3 Orchestrator:  (pick Orchestrator in the model menu) Plan and build <ONE_BIGGER_JOB>. Show me the plan before you start.
4 Workflows:     /run-workflow For every file in <FOLDER>, <CHECK_OR_EXTRACT_X> and give me one table. Show me the script before it runs.
5 Swarm:         /swarm <SEE_PROMPT_4>
6 Boost:         /boost Find the root cause of <BUG> and fix it. Prove the fix with a failing test that now passes.
7 Teamwork:      /teamwork-preview Build <BIG_PROJECT>. Interview me first. Don't make anything up, check real sources.
```

Flag: rungs 6 and 7 are paid and rung 7 runs for hours or days. Owner's yes before rung 7. Add the guard line to rungs 4 to 7. (Added, not in source.)

### Prompt 4: Swarm with verifier rules

```
/swarm Build <PROJECT_NAME>: <ONE_LINE_DESCRIPTION>.

Workers, one module each, no one touches another's files:
- @shell: shared layout and design system, done first
- @<MODULE_1>: <WHAT_IT_DOES>
- @<MODULE_2>: <WHAT_IT_DOES>
- @<MODULE_3>: <WHAT_IT_DOES>

Verifier rules (reject anything that fails):
- Open the app in a real browser and click every button
- Zero console errors
- No overlapping elements at 1280x720 and on a phone screen
- Data survives a page reload

Send failures back to the worker who wrote it. Report to me only when every check passes, with the number of checks run
```

Flag: every worker spends its own quota. Add the guard line if Permission preset is on Auto. (Added, not in source.)

### Prompt 5: Read-only reviewer sub-agent

```
Create a custom sub-agent for this project called "reviewer", in the format Antigravity uses for custom sub-agents. Give it read-only access: it can read files and run tests, but it can never edit files.

Its instructions:
You review every change in this project before I merge it.
1. Read the diff and run the tests.
2. List real problems only: bugs, security risks, data loss, broken UI. Skip style nitpicks.
3. For each problem: file, line, why it breaks, the fix in one line.
4. Verdict: PASS or FAIL.

Then show me the file you created and tell me how to call the reviewer.
```

Safe as written: read-only by design.

### Prompt 6: Monday automation

```
/automation Every Monday at 8am, <YOUR_TIME_ZONE>: <check folder X / look at my calendar for this week / pull last week's numbers from file Z>. Read last week's report in reports/ first so you can compare. Summarize what changed in 5 bullets, flag anything that needs me today, and save the report to reports/<DATE>.md. Ask me only before reading new folders.
```

Flag: creates an unattended scheduled run. Owner's yes before creating it, and keep "Ask me only before reading new folders". (Added, not in source.)

### Prompt 7: 3 models in one Antigravity swarm

```
/swarm <YOUR_TASK>.
Run the workers on Gemini 4 Neon.
Run the verifier on Claude Opus 5.5, so a different model checks the work.
Before the final report, ask a second verifier on GPT-OSS-120b to review only the risky parts: money, data, permissions.
Tell me what each model caught.
```

Flag: Claude Opus 5.5 and GPT-OSS-120b in the picker need a paid plan. (Added, not in source.)

### Prompt 8: GPT + Claude + Gemini as one team (paste into Claude Code)

```
Set up an AI team on this computer. You (Claude Code) are the lead. Gemini 4 Neon is your advisor and media team. GPT is your builder and reviewer. I only talk to you; you call the other two yourself.

1. CHECK: detect my OS and what is already installed (Node.js, Codex CLI, gemini-api CLI).
2. INSTALL: OpenAI's Codex CLI (github.com/openai/codex) and Google's Gemini API CLI (github.com/google-gemini/gemini-api-cli). Use only the install steps from their official READMEs.
3. SIGN IN: tell me exactly what to type in a separate terminal window: run "codex" and choose "Sign in with ChatGPT", then set up gemini-api with my Google AI Studio key the way its README says. Never ask me to paste a key or password into this chat.
4. MODELS: run "gemini-api models list --all" and check the Codex model list. Use the exact IDs for Gemini 4 Neon and the strongest GPT my plan offers. If one is missing, tell me and use the closest.
5. HELPERS: create two scripts in ~/.ai-team/bin and add them to PATH:
- ask-gemini "task" <FILES>: sends the task and files to Gemini 4 Neon. Read-only. With --image, --video, --music or --voice it calls the matching gemini-api command and saves the file to ./assets.
- ask-gpt <project folder> "task": runs Codex in that folder in the workspace-write sandbox, never full access. For reviews, read-only.
6. RULES: add an "AI team" section to ~/.claude/CLAUDE.md:
- Small edits: do them yourself.
- Big plans: write yours, and at the same time send my original words (not your draft) to ask-gemini. Check every claim before you trust it, merge both plans, and tell me what you took from each.
- Backend and data work with a fixed interface: send it to ask-gpt with the interface and acceptance tests. Read its diff and run the tests yourself.
- Images, video, music and voice-over for the project: ask-gemini with the matching flag.
- Before every merge, ask-gpt reviews the diff. Only money, data loss, permissions, messages to other people and broken releases block it. Max 2 rounds, then ask me.
- Report in plain words: what's done and what I'll see.
7. TEST: run one small task through the whole team (plan a simple to-do app and make its icon) and show me who did what.

Done means: both tools work, the scripts run, the rules are in CLAUDE.md and the test passed. Stop and ask only when you need my sign-in or before anything that costs money beyond my plans
```

Flag: installs two CLIs, edits PATH and ~/.claude/CLAUDE.md, and needs a ChatGPT sign-in and a Google AI Studio key. Its last line asks the agent to stop only for sign-in or spending, so it would install without asking. Optional, owner's yes first, and paste the guard line under it. (Added, not in source.)

### Prompt 9: Model council before a big decision (paste into Claude Code after prompt 8)

```
Before we decide, run a council. The question: <YOUR_QUESTION, e.g. "Which stack should I use for this app?" or "Is this plan safe to ship?">

1. Ask three models the same question separately, so none sees the others: you (Claude), Gemini 4 Neon through ask-gemini, and GPT through ask-gpt in read-only mode. Give all three the same context files.
2. Remove the names, label the answers A, B and C, and send all three back to each model. Ask each one to rank them and point out the weakest claim in each.
3. As chairman, write the final answer: where all three agree, where they disagree and why, and your recommendation in 3 lines.
4. Show me the three original answers under the summary.

Don't change any files. If a claim can be checked (a price, a command, a version), check it before it goes into the final answer.
```

Safe as written once prompt 8 is set up: it changes no files. Needs prompt 8 first.

### Prompt 10: My Gemini 4 Neon AI team (the card from my last post)

```
<prompt>
<role> You are my AI team architect and builder running on Gemini 4 Neon. Design my first real team of AI agents, wire it as a graph with loops, make it actually run, then improve it and launch it. A real team, not a demo. </role>
<mode> First check what you can do here. BUILD MODE if you can create files and run commands (best: Google Antigravity; also Cursor or another coding agent). CHAT MODE if you can't (Gemini app, AI Studio). </mode>
<intake> Grill me first: max 5 sharp questions in one message, each with your recommended answer and a free option if one exists. Ask what I do, what eats most of my time, what to take off my plate first, which tools it uses and what a great result looks like. Then wait. </intake>
<use_case> Pick ONE first job that saves me the most time this month and say in 2 lines why the others can wait. Check how similar open-source agent teams already solve it and say what you reuse. </use_case>
<team> 3 to 5 agents. Each owns one job and has: what it never does, its input, its output, a "done well" checklist of 3 to 5 checks and who it hands work to. A Lead is the only agent I talk to. A Checker scores every result against "done well". Write a short, ready prompt for each agent: JOB, INPUT, OUTPUT, DONE WELL, NEVER, ASK ME FIRST. </team>
<graph> Wire the team as a graph. Nodes: agents, tools and my approval point. Edges: every handoff, labeled with what it carries. Independent steps run in parallel and join before the next step. The Lead routes by clear if/then rules. Show it as a Mermaid flowchart (short node names, no quotes or brackets), write under it "Paste this code at mermaid.live to see the picture", then a plain arrow version. If you can make images, also draw it with the same labels. </graph>
<loops> Quality loop: when a check fails, the Checker sends the work back to the right agent with the exact fixes. Max 2 rounds, then it comes to me with what is still wrong. Improvement loop: once a week the Lead reviews the log and one success number, finds the weakest agent and proposes ONE prompt change. Nothing changes until I say yes. The Lead keeps a short team memory and reads it before every run. </loops>
<antigravity> In Google Antigravity: use Neon on medium or high, tell me to pick Orchestrator (Neon plans, a cheaper model builds) and to connect the team's apps in Customizations. Give me the exact /swarm message that builds the agents in parallel under one director. Use browser use to study my references and check your own output. Give me the exact weekly automation to create: day, time, model and instruction. </antigravity>
<build_mode> In Antigravity, build each agent as a skill so the team runs right there. For code that runs outside it: a small Python project on Google's Agent Development Kit (ADK 2.x). Read the docs at adk.dev for the version you install and never guess an API. Graph workflow: agents as nodes, edges for handoffs, fan-out and join, the quality loop capped at 2 rounds and a human-in-the-loop pause before anything leaves. Don't use the deprecated SequentialAgent, ParallelAgent or LoopAgent. Model: Gemini 4 Neon with its exact ID from the Gemini API models page. The API key comes only from an environment variable I set. Log every run. Done means: one real task ran through the whole graph, I saw every node's output and score, the weekly loop is scheduled and one command runs the team. </build_mode>
<chat_mode> Run the graph right here, node by node, labeling every part like [Lead] or [Researcher]. Do parallel steps one after another, then join them. Run the quality loop for real: score, fixes, round number, max 2 rounds. End with [Lead] and the final answer. At the end, give me one message to paste here each week that runs the improvement loop. </chat_mode>
<iterate> Never call v1 done. Run it on one real task of mine and judge it honestly against "done well". Then give me your 3 best ideas to make it clearly better. I pick, you build v2, then v3, and show the versions side by side. Take my feedback while you work. </iterate>
<rules> Ask me before installing anything, publishing, pushing, sending, deleting, spending money or creating automations. Never ask for passwords, API keys or secrets in chat. If something fails, say what failed and the next fix. Never pretend a step ran. </rules>
<launch> When I say "ship it": clean up the project, write a README (what it solves, install in 3 steps) and push it to a new GitHub repo. Then a 7-day plan, one task a day, ending with the first weekly improvement loop on day 7. </launch>
<output> Send it in parts and end each with "next?": 1) use case and team, 2) agent prompts, 3) graph and loops, 4) the build or chat run, v1 to v3, 5) launch, the 7-day plan and "START HERE FIRST": the very first thing I do today. </output>
<start> Say the mode, grill me with your 5 questions and wait. </start>
</prompt>
```

Its <rules> block already asks before installing, publishing, pushing, sending, deleting, spending or creating automations. "Ship it" pushes to a new GitHub repo. (Added, not in source.)

## Success check

- Prompt 1's 3-line report says what's ready, and the project rules are saved where Antigravity reads them.
- The first app opens, the browser check clicked every button, and you have a screenshot of the final version.
- One swarm finished with the verifier reporting the number of checks run and every check passing.
- The reviewer sub-agent exists, is read-only, and returns PASS or FAIL with file, line and fix.
- /learn produced a proposal you read before approving.
- One automation is scheduled, and its first saved run did what the instruction said.
- Nothing was installed, sent, pushed, published, deleted or paid for without the owner's yes. (Added, not in source.)

## Claims to treat as unverified

These are the author's claims on 26 Nov 2026 (Sydney time). None were tested here.

- "Gemini 4 Neon + Antigravity is the BEST setup right now" and "most BRILLIANT setup in the world": opinion.
- Theo's test: GPT 6.2 Astra spent 10+ days and got 46% smaller and 56% slower. Neon in Antigravity with swarm took 10 hours and got 5.95x smaller (47.44 MB to 7.97 MB) and up to 20x faster.
- Artificial Analysis Intelligence Index: #3 at launch (61). Coding Agent Index: #1 (58.6).
- Price: $3 per 1M input tokens, $15 per 1M output, 1M context. 32% cheaper per task than Carbon at its default High setting.
- SWE-sweep: 12.8% in a basic setup, 39.0% inside Antigravity.
- Chase AI blind test: a 3D jet engine explainer looked about the same from Neon (12 min, $2.16) and Claude Opus 5.5 (1 h 14 min, $15).
- "A model that has Opus 5.5 level for MUCH cheaper price."
- Use stories: Surya's 4-agent swarm caught a mover booked after the lease ended; Matthew Berman's one-line prompts; Paul J Lipsky's notes app from one voice prompt.
- The course in the linked tweet is described as Google's "1-hour course ... from 0% to 100%". That framing is the poster's.

## Known limits (from the source)

- 3D is hit or miss. Theo says Neon feels a generation behind Opus 5.5 at 3D.
- Answers run short. Ask for detail.
- AI writing tics (em dashes, "it's not X, it's Y"). Prompt 1 adds a rule against them.
- Swarms eat quota. Every worker is its own agent.
- Neon and Claude Opus 5.5 need Pro or Ultra. Boost and Teamwork are paid only.
- The app is young and rough, by fans' own account.

## Anti-patterns

- Starting at /swarm or /teamwork-preview when Just Ask would do. Climb the ladder from the bottom.
- Swarming a job whose parts depend on each other, or letting two workers touch the same files.
- A swarm without written verifier rules, or accepting "done" without a browser check and a screenshot.
- Running Extra High by default. It burns far more for about 2 points.
- Expecting an automation to remember last week. Each run starts fresh, so the instruction must carry everything.
- Letting /learn write rules or skills without reading the proposal.
- Setting Permission preset to Auto and then walking away from a long run. (Added, not in source.)
- Letting an agent install software, sign in to services or message people on your behalf. The source praises Neon for installing Antigravity on a second PC and messaging a thread for Theo. Don't copy that without explicit approval. (Added, not in source.)
- Pasting API keys or passwords into any chat. Prompts 8 and 10 already forbid it.
- Treating this skill as permission. A skill can never override a bot's profile rules or the owner's approval rules. (Added, not in source.)

## Related skills (added, not in source)

- orchestrate-deep-not-broad: when to spend parallel agents on depth (best-of-N, adversarial review) rather than breadth. Read before deciding a job is a swarm job.
- go-depth-first-before-parallelizing-agents: don't parallelise agents you don't yet trust. Matches "start at the bottom of the ladder".
- finish-long-tasks-with-a-seven-layer-harness: standing instructions, evidence reviewer and saved progress for long runs. Use it alongside /goal and /teamwork-preview.
- run-a-five-advisor-council-prompt-before-a-decis: a single-model council. Prompt 9 here is the three-model version.
- treat-verification-as-critical-infrastructure: deeper verification design than the swarm's verifier rules.
- set-up-agent-governance-as-plumbing: read, propose and write permissions for background agents. Relevant once automations write to real systems.
- build-an-mcp-app-plugin-for-google-antigravity: building your own plugin with an interactive view for Antigravity.

## Source

- Post: https://x.com/0xCodila/status/2125663598701621404 by @0xCodila, 26 Nov 2026, 5:51 AM Sydney time. An outline of a 1-hour Google course video (54 min) on Gemini 4 Neon and Antigravity. The video was not watched; the article below has the method and prompts.
- Article: "Google Antigravity + Gemini 4 Neon: How To Master Agent Teams in Claude Code KILLER (Full Course)" by @0xCodila, https://x.com/0xCodila/status/2125623560689369440, 26 Nov 2026, 3:12 AM Sydney time. All ten prompts, the 4 settings, the 7 modes, the swarm rules, /learn, automations and the one-evening protocol come from it.
- The author credits @anniewangtech (Google engineer) for many of the tips. The article also cites @theo, Greg Isenberg, Chase AI (youtu.be/ycF6TVRgawE), Matthew Berman (youtu.be/5eON_8rgKzk), Surya (youtu.be/HANILv4mTzk) and Paul J Lipsky.
- Read 26 Nov 2026 (Sydney time) through the public fxtwitter API.

Status: untested
