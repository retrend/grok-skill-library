---
name: Set up agent governance as plumbing
description: >-
  Use this when a company already has a chatbot acceptable-use policy and now
  needs controls for background agents that write to real systems: provisioned
  accounts, read/propose/write permissions, named owners, a registry, logs that
  include denials, and shadow mode.
---
# Goal
Govern agents by identity, permissions, owners and logs, so you can answer "who changed this?" in minutes and turn any agent off.

# Inputs
- Model-provider API keys, service accounts whose names include AI, bot or GPT, and expenses from model providers
- The first workflow you will take to production
- Named people who can own action types (not a team name)
- Identity provider, audit storage, and a place to keep an agent registry

# Steps
1. Treat current chatbot policy (no confidential data in public tools, approved-app list, an AI council) as coverage for tools people prompt. It does not cover an agent that updates records at 2am.
2. Put five controls in place before any agent may write to a system:
   1. Agents act as a company-provisioned account. No personal API keys or admin accounts. Access starts read-only and grows only to an agreed production scope. The company can revoke it any time.
   2. Separate read, propose and update. Each needs permission from an admin who can revoke it. Check permission at the moment of the action, not only at the start of the run.
   3. Name an owner for each type of action. The workflow says where the agent decides and where a named person decides. Identify that human slice before you build. Example from the article: the AP manager approves vendor bank-detail changes or a new vendor above $25k. Don't assign this to a team.
   4. Register every agent: purpose, owner, users, systems it can access, and version.
   5. Log every action in an append-only, tamper-evident log, including actions the agent wanted to take but was denied. No log, no action: don't dispatch actions unless audit storage is up.
3. Route tool calls, system-of-record calls, model calls, secret reads and outbound messages through one place. On each call, check that agent's allowlist for that environment, read at runtime so a change applies to the next action. If allowed, grant scoped access and log it. If denied, block and log the attempt.
4. Roll out over about 60–90 days:
   - Weeks 1–2: Find all agents, including unapproved ones. Start with the model-provider admin console (API keys), service accounts named AI/bot/GPT, and model-provider expenses.
   - Weeks 2–3: Add every agent to the registry with an owner. If nobody will own it, turn it off.
   - Weeks 3–5: Create three access tiers: sandbox, shared workflow, production. Write down what each may access. Sandboxes get limited credentials, data and tools, plus a person who reviews actions.
   - Weeks 4–6: Pick the first production workflow. Name every action type and a person for each.
   - Weeks 6–10: Run the agent in shadow mode on a real queue, with no write access to systems of record. Record intended actions and have a person review them. The log shows where the agent chose differently from the person.
   - Weeks 10–12: After written sign-off from Risk and IT, allow writes for that workflow only, using the shadow log as evidence. New workflows start with no write access. Workflows that move money always keep a human approval.
   - Monthly after: owners review actions, denials, differences from employees, and token cost. Reserve a budget before each call and deny calls that would exceed it. Retire unused agents.
5. Worked example from the article: start an accounts-payable (AP) agent in a sandbox with temporary credentials and a copy of last quarter's exceptions. When three groups want the same agent, collapse to one agent, one maintained prompt, and the AP manager as process owner. Run it on real exceptions in shadow mode. Then grant write access only to vendor-master fields for bank details and payment terms, and send changes above $25k to the AP manager.
6. Don't let each team build its own agent infrastructure. People closest to the work can invent uses and build agents in a shared sandbox, but accounts, permissions, registry and logs stay shared. Point solutions with their own permission dashboards recreate sprawl.

# Success check
- Every running agent has a provisioned account, an owner, a registry row and a version.
- Writes are blocked unless audit storage is up and the allowlist permits the action.
- Searching the log for a change shows what the agent did, which version, which rule allowed it, who approved it, and any denied attempts.
- The first workflow finished shadow mode before gaining write access.

# Failure modes
- Policy PDFs and councils with no named owners.
- Personal API keys and cards, so nobody can explain token spend.
- Granting write access without a shadow-mode log.
- The 90/10 agent/human split and 60–90 day timeline are the author's guidance from his firm's work with large companies, not a benchmark for yours.

# Anti-patterns
- Governing only chatbot data leakage and ignoring background writes.
- Assigning action ownership to "the finance team" instead of a person.
- Treating a maturity-model slide deck as the controls.
- Skipping human approval on money movement.
- Treating Varick (the author's firm) as a required vendor.

# Source
Thomas (@thmslj), "AI Governance is plumbing", https://x.com/thmslj/status/2118838596816064629, 2026-11-06. The author works at Varick, which sells this implementation.
