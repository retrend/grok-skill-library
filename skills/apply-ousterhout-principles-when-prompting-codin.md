---
name: Apply Ousterhout principles when prompting coding agents
description: >-
  Use this when a coding agent is producing shallow modules, leaky interfaces,
  or extra error-handling branches, and you want to steer it with named
  principles from John Ousterhout's A Philosophy of Software Design.
---
# Goal
Get cleaner agent-written code by naming a few design principles the model already knows, instead of writing a long style guide.

# Inputs
- The change the agent should make
- Which principle fits the current mess (pick one or two, not all four at once)

# Steps
1. When the agent is splitting work across many shallow helpers, tell it to deepen modules and simplify interfaces. A deep module has a small interface and hides a lot of work inside. The author says this is chapter 4 of John Ousterhout's *A Philosophy of Software Design* (2018), and that the line going around as "deepen modules and simplify interfaces" comes from that chapter.
2. When callers are drowning in setup or special cases, say: pull complexity downwards. The function absorbs the mess so callers stay simple.
3. When the agent keeps adding try/catch or extra branches for an edge case, say: define errors out of existence. Change the API so the edge case cannot happen, instead of adding another try/catch.
4. Before it writes a line on a design that could go more than one way, say: design it twice. Make the agent sketch two radically different approaches first, then pick one.
5. Name the principle in the prompt. The author says models already know these terms; you just have to name them.

# Success check
- The chosen principle is visible in the prompt or review comment.
- The resulting interface is smaller, or an error path disappeared because the API changed, or two designs were compared before code was written.

# Failure modes
- Naming all four principles at once turns into vague advice. Use the one that matches the current defect. (added, not in source)
- "Define errors out of existence" can hide real failures if the agent swallows errors instead of changing the API. Check that the edge case truly cannot occur. (added, not in source)

# Anti-patterns
- Treating this post as a substitute for reading the book.
- Using the principles as a reason to rewrite unrelated code.
- Asking the agent to "write deep modules" with no example of the shallow interface you want replaced.

# Source
veliorix (@veliorix), https://x.com/veliorix/status/2119152590625861873, 2026-11-07. The method is four named prompts drawn from *A Philosophy of Software Design* (2018). Treat the chapter attributions as the author's reading, not a verified page citation.
