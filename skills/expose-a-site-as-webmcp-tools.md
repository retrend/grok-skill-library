---
name: Expose a site as WebMCP tools
description: >-
  Use this when making a website agent-ready — scan or plan a small set of
  visitor-journey actions, expose them as typed WebMCP tools through the site’s
  own logic, approve before any code changes, then verify in a browser and ship
  only what passed.
---
# Steps

WebMCP lets a page hand a browser agent typed tools (search, book, add to cart) that run through the site’s own code, instead of the agent clicking the rendered UI. Aim for 3–10 tools that match what a visitor comes to do. Do not wrap every API route.

## 0. Pick a path

- **No repo in front of you, or you only want a suggestion list.** Open [webmcp.com](https://webmcp.com), use **Scan my site**, and review the suggested tools. Treat that as a candidate list, not shipped code. Listing in the directory happens only after real tools are on the live site and a scan finds them (nekuda reviews before publish).
- **You have the website repo.** Use WebMCP Kit (nekuda). Analysis stays in the agent session: no customer code, routes, or schemas are sent out. There is a hard approval gate before site code, branches, or dependencies change.

The rest of this skill is the repo path.

## 1. Prerequisites

- Claude Code 2.1.220+, Codex, or Cursor.
- The site repo cloned locally, with a dev server you can run (`npm run dev`, `bun dev`, or the repo’s own script).
- Node.js and npm (verification browser driver).
- Bun if you want the Explorer review UI and the optional AgentLane connect step.
- Chrome 150+ only if you inspect tools in your own browser. The kit starts its own test browser with WebMCP on. On Linux arm64, install native Chrome or Chromium 150+ and set `WEBMCP_BROWSER_PATH`.

## 2. Install the kit

Claude Code, inside the session or from a terminal:

```
/plugin marketplace add nekuda-ai/webmcp-kit
/plugin install webmcp-kit@nekuda
```

Terminal equivalent:

```sh
claude plugin marketplace add nekuda-ai/webmcp-kit
claude plugin install webmcp-kit@nekuda
claude plugin details webmcp-kit@nekuda
```

Expect skills: `implement`, `verify`, `connect-existing-tools`.

Codex:

```sh
codex plugin marketplace add nekuda-ai/webmcp-kit
codex plugin add webmcp-kit
```

Or `/plugins` → add marketplace `nekuda-ai/webmcp-kit` → install `webmcp-kit`.

Cursor, from the project terminal:

```sh
npx skills add nekuda-ai/webmcp-kit --skill '*' --agent cursor
```

Then run skills as `/implement`, `/verify`, and `/connect-existing-tools`.

Update later with `/plugin marketplace update`.

## 3. Start the site, then plan (read-only)

Run the dev server first so later verification hits a live local site.

From the repo root:

- Claude Code or Codex: `/webmcp-kit:implement`
- Cursor: `/implement`
- Narrow the ask if you want: `/webmcp-kit:implement add booking tools`
- Chat review instead of the Explorer: add `--no-interactive-loop`

The agent runs six phases. Stop and review at D. Do not treat silence as approval.

| Phase | What happens |
| --- | --- |
| A — Understand | Read-only. Manifests, routes, forms, data layer. Map what a visitor can see and do. Inventory any existing `@nekuda/webmcp-sdk` tools (legacy package names `@agentlane/webmcp` and `@nekuda/webmcp` are the same SDK) so a re-run keeps `stableKey` identity. |
| B — Select | Match a journey category and pick the tools worth having. No honest match → say so. Do not force a weak fit. Most sites land at 3–10 tools. Question is “what does a visitor come here to do?”, not “what routes exist?” A booking site gets `book_appointment`, not a wrapper per REST endpoint. |
| C — Wire | Safest path first: the app’s own client data layer, then same-origin routes, then client actions. Uncertainty becomes a question with a stated default, never a silent guess. |
| D — Review | Hard gate. Explicit approval or nothing proceeds. |
| E — Generate | After yes only. Tools against `@nekuda/webmcp-sdk`, in the repo’s language and conventions. |
| F — Verify | Type checks → site boots → each tool registers where declared → tools work when called. Failures are fixed or dropped. |

## 4. Review the plan before any write

Default review surface is the Explorer (local page; state in git-tracked `.webmcp/`). Approval is a click. Prefer chat: `--no-interactive-loop`.

For each tool, the plan must show:

- **Name and description, verbatim.** The description is what an agent reads to decide when to call it. It ships exactly as approved. Edit the wording.
- **Wiring.** The concrete function or same-origin route it will call.
- **Availability.** Which pages and auth states register it, and where it must be absent.

Confidence labels:

- **Decided** — must-have journey with a clearly safe path. Still editable.
- **Needs your input** — a specific question plus a stated default.
- **Needs developer wiring** — no safe client path. The kit names what is missing. It must not stub fake responses.

Edit freely: rename, drop, reword. If most journeys cannot be wired safely, a reviewed plan with no code is a valid result.

Hard rules (do not override):

- Code stays local.
- No invented data for a journey that has no safe path.
- Payments, cancellations, and deletes never complete in one agent call. Tools stop at a reversible point (pending order, prepared cancellation) and hand the last step to the site’s own confirmation.
- Only wrap mutations whose routes enforce auth on the server. An endpoint that trusts a hidden client button gets flagged, not wrapped.
- Nothing broken ships.

Headless only when someone explicitly asked (`--non-interactive` or “proceed without approval”). Then use the stated defaults, write the plan and each assumption into the PR, and skip Explorer and AgentLane. If nobody asked for that mode, wait.

## 5. Generate, then verify

After approval the kit writes:

- Tool modules of `defineTool` definitions. Importing them registers nothing.
- One entry module per scope that calls `registerTools` and owns lifetime.
- The SDK dependency (registry package or vendored copy; `transpilePackages` for Next.js when required).
- A `stableKey` per tool (for example `cart.add`) so later runs and renames keep identity.

Output: branch `webmcp/tools-v0` and a PR whose body is the approved plan plus a per-tool verification table.

Verification ladder (same as `/webmcp-kit:verify`). Each rung must hold before the next:

1. **Boot.** Site starts; baseline page renders with no new console errors.
2. **Discover.** On each declared page and auth state, list registered tools. Present where declared, absent where they should not be (logged-out account tools, wrong role), and unregistered on declared exits (empty cart, logout).
3. **Invoke read-only.** Sample inputs. Check returned data and the visible effect on the page.
4. **Invoke state-changing.** Only against local, dev, or seeded data, and only with an explicit go-ahead. Never production or third-party services. No safe way to invoke → `could-not-verify`, not a blind call.

| State | Meaning | Ship? |
| --- | --- | --- |
| verified | Registered and invoked as declared. | Yes. |
| failed | Didn’t register, or errored. | Fix or drop. Never ship broken. |
| could-not-verify | Plausible but unproven (no browser, or no safe invocation). | Yes, explicitly flagged. |

Standalone check later:

```
/webmcp-kit:verify http://localhost:3000
```

Own-browser spot check (Chrome 150+, WebMCP flag on in `chrome://flags`):

```js
typeof document.modelContext   // "object" when WebMCP is active
```

Older Chrome may expose `navigator.modelContext` instead. Unsupported browsers are unaffected; the SDK no-ops there. `undefined` means the flag or browser is not set up, not that the tools failed to generate.

## 6. Optional connect, then merge

After verification the skill offers AgentLane (see registered tools and activity). Skip is fine; tools work either way.

Already have tools and only want that connection: `/webmcp-kit:connect-existing-tools` (Cursor: `/connect-existing-tools`). Do not re-implement.

Merge the PR only after the verification table matches what you approved. Then, if you want the public directory, scan the live site on webmcp.com. A scan that finds tools submits the site; nekuda reviews before it is listed.

## 7. Re-run

After a redesign or a new feature, run implement again. Existing `stableKey`s must be preserved. Do not recreate tools as new strangers.

## Success check

- Plan reviewed tool-by-tool (name, description, wiring, availability) before any site code changed.
- Tool count is a small journey set, not an endpoint dump.
- Unsafe journeys are “needs developer wiring” or stopped at a reversible confirmation, not stubbed or one-shot destructive.
- PR body contains the approved plan and a per-tool state. No `failed` tool is in the diff as if it passed.
- `document.modelContext` is an object on a WebMCP-capable browser, or `/webmcp-kit:verify` reports the same.

## Anti-patterns

- Treating the tweet or the directory scan as the implementation. The scan suggests actions; the kit is what writes and verifies them.
- Wrapping every route, or shipping tools whose descriptions you did not read.
- Approving by going quiet, or using `--non-interactive` without being asked.
- Calling state-changing tools against production to “prove” them.
- Buying a listing. Directory inclusion follows a scan of real tools plus their review.

## Source

- Post: [nekuda on X, 19 Sep 2026](https://x.com/nekuda_ai/status/2100996938040848553) (3:14am AEST). Card points at the WebMCP Directory and “scan your site to find the actions you can expose as WebMCP tools.”
- Method detail from public kit docs: [docs.nekuda.ai](https://docs.nekuda.ai/), [how it works](https://docs.nekuda.ai/how-it-works), [quickstart](https://docs.nekuda.ai/quickstart), [install](https://docs.nekuda.ai/installation), [implement](https://docs.nekuda.ai/skills/implement), [verify](https://docs.nekuda.ai/skills/verify). Repo: [nekuda-ai/webmcp-kit](https://github.com/nekuda-ai/webmcp-kit).
