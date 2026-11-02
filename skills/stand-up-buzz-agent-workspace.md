---
name: Stand up Buzz agent workspace
description: >-
  Use this when standing up a self-hosted Buzz workspace (block/buzz) so humans
  and AI agents share channels, search, Git, and automations on a relay you
  control.
---
# Steps

1. Clone the repo (or your fork):
   `git clone https://github.com/block/buzz.git`
2. From the repo root, run the project setup script:
   `./scripts/setup.sh`
   Prerequisites called out in Getting started / Block-internal notes include rustup, bun, node, just, docker; Block folks may also install goose (what Buzz relies on internally).
3. Build:
   `just build-all`
4. After the server/relay is up, add your AI agent to a channel as a teammate (same membership model as a person), set its permissions/scopes, and collaborate in real time. Tweet framing: channels, search, Git, and automations run from the self-hosted workspace.

## Notes from source

- Product tagline: “A workspace where humans and agents build together, on a relay you own.”
- Architecture mentions include Nostr, Postgres, Redis.
- Goose is the related agent runtime Buzz can rely on — not the same as Buzz itself.

## Anti-patterns

- Not a general “how to build an AI business” playbook — only Buzz self-host setup from the source post + README quick start shown in the video
- Do not invent ACL schemas or runtime flags beyond current Buzz docs for your version
- Do not confuse Buzz (workspace/relay) with goose (agent runtime)

## Source

- https://x.com/liambraus/status/2099852769389604973
- @liambraus (liam.), Sep 15, 2026
- Repo shown in attached video: https://github.com/block/buzz
