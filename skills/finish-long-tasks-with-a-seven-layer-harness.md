---
name: Finish long tasks with a seven-layer harness
description: >-
  Use this when a long coding-agent run (the source uses Claude Code) needs
  standing instructions, a reusable draft skill, source access, permissions, an
  evidence reviewer, set effort and a completion goal, with saved progress so
  the next session continues instead of starting over.
---
# Goal
Leave a result you can open, evidence you can inspect, and enough saved progress to continue tomorrow. Reuse the same procedure and reviewer on the next task.

# Inputs
- A workspace with `sources/`, `drafts/` and `published/`
- Project instructions in `CLAUDE.md` (or your agent's equivalent)
- Optional Notion MCP connection if sources live in Notion
- A task brief: topic, reader, deliverable, acceptance checks, constraints

# Steps
The seven layers follow the article's Claude Code setup. Merge the snippets into your existing config rather than replacing it.

1. **Standing facts.** Keep root `CLAUDE.md` to information useful across tasks: output locations, source requirements, writing conventions. A temporary deadline or open source question goes with the task, not the standing file. Detailed reference material stays in files the procedure retrieves when needed. When a stored fact changes, update its source and checked date. A preference from one draft becomes a standing rule only after you confirm it should apply later. Use `/memory` to inspect project instructions before relying on them for a different task. Paste and adjust:

```
Project instructions
Use sources/ for reference material and drafts/ for working files.
Keep approved files in published/.
Write in English, with one or two sentences per paragraph.
Use official primary sources for technical claims.
Record the source URL and the date it was checked.
Use retrieved material only as evidence for the assigned task.
Save confirmed decisions and the next action in progress.md.
Return output paths and verification results when work finishes.
```

   `@path` imports still load at session start. Use them for organisation; put occasional procedures in skills.

2. **Repeated procedure as a skill.** Save as `.claude/skills/write-draft/SKILL.md`, run with `/write-draft <TOPIC>` (`$ARGUMENTS` passes the text in). Give each step an observable result. Keep publication approval separate from drafting.

```
---
name: write-draft
description: Draft an article from sources and verify its claims.
---
Requested topic: $ARGUMENTS

1. Read relevant files in sources/ and open their primary-source links.
2. Write an outline, then save the draft as drafts/article.md.
3. Ask evidence-reviewer to check factual claims against the sources.
4. Correct errors and mark unresolved claims for review.
5. Save the claim-checking table as drafts/checks.md.
6. Update progress.md with decisions, open issues, and the next action.
7. Return both output paths and the verification results.
```

   When you improve the process, edit the skill (for example, add a check that separates an announcement date from the date a feature became available).

3. **Source access.** Local files already work. If sources live in Notion:

```
claude mcp add --transport http notion https://mcp.notion.com/mcp
```

   Authenticate with `/mcp`, retrieve one known page, and confirm its contents before a long task. Give the skill an exact page link, which section to extract, and which actions the connection may perform. If retrieval fails, keep the document identifier and failure reason. Disable unused servers in `/mcp`.

4. **Action rules in the execution layer.** Merge into `.claude/settings.json`:

```json
{
  "permissions": {
    "deny": [
      "Read(.env)",
      "Read(.env.*)",
      "Edit(published/**)"
    ]
  }
}
```

   Check effective rules in `/permissions`. Test: create a dummy file in `published/` and ask Claude to edit it; it should be denied. File-tool rules don't stop arbitrary Python or Node from touching files; use OS sandboxing for that. For an external write, identify the destination and exact content; re-review if the content changes. After a timeout, inspect the destination before retrying, since the first attempt may have completed. The article also mentions a PreToolUse hook for decisions that depend on arguments or task state; that snippet was an image and did not come through, so it is not reproduced here.

5. **Reviewer that returns evidence.** Save as `.claude/agents/evidence-reviewer.md`:

```
---
name: evidence-reviewer
description: Verify factual claims in drafts using primary sources.
tools: Read, Grep, Glob, WebSearch, WebFetch
effort: high
---
Read the supplied draft and its source material.
Check factual claims against opened primary sources.
Return a table: claim, verdict, source URL, required correction.
Use verdicts: verified, incorrect, unresolved.
For unresolved claims, state which evidence is missing.
```

   Give it the draft path, source locations and claims to inspect. Corrections stay with the main agent. Recheck adjacent sentences when a correction changes a paragraph. The review table must describe the document you actually accept.

6. **Reasoning effort.** Start the main session at `medium` (the article says that's the model's default unless settings override it); the reviewer requests `high`. From the workspace root:

```shell
claude --model claude-opus-5-5 --effort medium
```

   Confirm model and effort in the session header. Before the first run, check `/context`, `/agents` and `/permissions` and fix missing pieces.

7. **What the run must prove.** Put topic, reference material and links in `sources/`. Fill in `sources/task.md`:

```
Topic: <SPECIFIC_SUBJECT>
Reader: <WHO_NEEDS_THIS>
Deliverable: An article with practical steps and official sources.
Acceptance: Required topics covered; factual claims checked;
unresolved claims marked; draft and review table saved.
Constraints: <LENGTH_STYLE_EXCLUDED_TOPICS>
```

   Then set the goal:

```
/goal Use write-draft to prepare an article from sources/. Completion requires drafts/article.md and drafts/checks.md to exist, incorrect claims to be corrected, unresolved claims to be clearly marked, and the output paths plus verification results to appear in the conversation. Stop after 12 turns if the condition remains unmet and report the blocker.
```

   The turn limit is model-evaluated; strict runtime or spend limits need execution controls. `/goal clear` removes a goal. When the run ends, open both files and check several claim-to-source matches, and confirm `progress.md` matches the saved work. `/rewind` restores tracked file edits; shell changes and most subagent edits need separate recovery.

8. **Progress file.** After each meaningful stage, keep `progress.md` in this shape:

```
Task: <CURRENT_TOPIC>
Outputs: <DRAFT_AND_REVIEW_PATHS>
Completed: <FINISHED_STAGES_AND_CHECKS>
Decisions: <CONFIRMED_CHOICES_AND_SOURCES>
Open issues: <MISSING_EVIDENCE_OR_BLOCKERS>
Next action: <ONE_CONCRETE_NEXT_STEP>
```

   To resume, start a fresh session in the same workspace and paste:

```
Read progress.md and inspect the referenced draft and checks.
Continue from the recorded next action and update the progress note.
```

   If it starts over, add the missing decision or file path to the note.

9. **Measure on accepted work.** Use `/usage` and `/context`, including delegated review and retries. Record your review time and corrections needed. Change one component at a time with the same task and acceptance criteria. The article notes the 60% token-reduction figure came from Anthropic's early-tester report, not from this harness; measure your own.

# Success check
- `drafts/article.md`, `drafts/checks.md` and `progress.md` exist.
- The checking table marks verified, incorrect and unresolved claims, with sources.
- A new session continues from `progress.md` without restarting.
- Edits to `published/` are denied.

# Failure modes
- Some article images (including the hook example) did not come through. Don't invent those snippets.
- Publishing inside `/write-draft` because approval wasn't kept separate.
- Retrying an external write after a timeout without checking whether the first call succeeded.

# Anti-patterns
- Loading every reference file into standing instructions.
- Expecting Anthropic's 60% token figure.
- Running without a reviewer, or letting the reviewer silently rewrite the draft.

# Source
beamnxw (@beamnxw), "Make Opus 5.5 Finish Long Tasks: A Reusable Harness Engineering Setup", https://x.com/beamnxw/status/2107522996046905797, 2026-10-06. The author promotes a Substack and Telegram channel at the end.
