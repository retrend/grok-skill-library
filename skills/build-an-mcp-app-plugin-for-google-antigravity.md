---
name: Build an MCP App plugin for Google Antigravity
description: >-
  Use this when building an MCP tool or plugin that should show an interactive
  HTML view in Google Antigravity (inline in chat, side panel, full page or a
  custom file viewer) while still working as plain text in clients without UI
  support.
---

# Build an MCP App plugin for Google Antigravity

An MCP App is an MCP tool that sends back an interactive HTML view as well as plain text. Antigravity implements the open MCP Apps spec (`io.modelcontextprotocol/ui`) and adds its own extension (`com.google.antigravity/ui`) for three extra places a view can open: a side panel, a full page and a custom file viewer. This skill follows Google's Antigravity docs page.

Use an MCP App when you need a reusable interface backed by a live MCP server, a side-panel view or a custom file viewer. For a one-off chart, diagram or prototype in a single conversation, use Antigravity's `/generative_ui` command instead.

## Inputs

- `<PLUGIN_NAME>`: the plugin's name.
- `<SERVER_NAME>`: the MCP server's name.
- What each view should do.
- Local `stdio` server or remote Streamable HTTP server (`<SERVER_URL>`).
- For a file viewer, the file extensions it claims (`<.EXT>`).

## Steps

1. Pick where each view appears. A tool sets this in its `_meta`.
   - Inline in chat: `_meta.ui.resourceUri` only. The view replaces the collapsed tool-step card and grows to fit, up to 800 px tall (150 px if it never reports a size).
   - Side panel: add an `aux_pane` entrypoint. It opens beside the conversation when the agent calls the tool, or from the Plugins menus. There's one tab per server and tool pair, and later agent calls update the open tab in place.
   - Full page: add a `global` entrypoint. It opens full-width from Plugins in the left sidebar. Conversation-only actions (`message`, `updateModelContext`) aren't available here.
   - File viewer: add a `file` entrypoint with `extensions`. It replaces the built-in viewer for those file types.
   - A tool that has an `aux_pane` or `global` entrypoint doesn't render inline.
2. Scaffold. In the Antigravity App you can ask the built-in command to do it. The docs' example prompt:
   ```
   /mcp-app-development Build an MCP App plugin for Antigravity that tracks release checklist items inline in chat and in a side panel board using @modelcontextprotocol/ext-apps.
   ```
   To build it by hand instead, carry on to step 3.
3. Build the view as a single HTML file, served as a `ui://<SERVER_NAME>/<VIEW>.html` resource with MIME type `text/html;profile=mcp-app`. Link it from the tool's `_meta.ui.resourceUri`. Use the `@modelcontextprotocol/ext-apps` SDK for the iframe bridge.
4. Always return clear plain text in `content` as well as `structuredContent`. Antigravity's CLI, its IDE and other MCP clients without UI support run the same tools as plain-text tools and never mount the view.
5. Declare the entrypoints. A model-callable tool for the side panel and full page:
   ```json
   {
     "_meta": {
       "ui": { "resourceUri": "ui://<SERVER_NAME>/<VIEW>.html" },
       "com.google.antigravity/ui": {
         "entrypoints": [
           { "type": "aux_pane", "title": "<TITLE>" },
           { "type": "global", "title": "<TITLE>" }
         ]
       }
     }
   }
   ```
   Put a file viewer on its own separate tool. That tool is always hidden from the model and receives `{"file": {"name", "resourceUri"}}` instead of `{}`:
   ```json
   {
     "_meta": {
       "ui": { "resourceUri": "ui://<SERVER_NAME>/<VIEWER>.html" },
       "com.google.antigravity/ui": {
         "entrypoints": [
           { "type": "file", "title": "<TITLE>", "extensions": ["<.EXT>"] }
         ]
       }
     }
   }
   ```
   When more than one enabled server claims the same extension, the first one wins.
6. For file viewers, read and write through the host rather than the server.
   - Read: from the iframe, send `resources/read` for the exact `resourceUri` you were given. Antigravity answers directly with a base64 blob of up to 10 MiB.
   - Write (local files only): check `hostContext["com.google.antigravity/resources"]?.write` before showing save controls. If it's there, send `com.google.antigravity/resources/write` with `{ uri, text }` or `{ uri, blob }`, up to 10 MiB.
7. Optional host actions.
   - Open a file in the side panel: call `app.request()` with method `com.google.antigravity/toggle-aux-pane` and params `{ "tabType": "fileView", "uri": "file:///<PATH>" }`. Handle error `-32601` on hosts that don't support it.
   - Start a background conversation: pass `_meta: { "com.google.antigravity/message": { "target": "new" } }` in `app.sendMessage()`.
8. Package it as a plugin with `mcp_config.json` at the plugin root.
   - For a local `stdio` server, use `${PLUGIN_ROOT}` and `${PLUGIN_DATA}` in paths.
   - For a remote server, use `serverUrl`.
   - Antigravity falls back to its bundled Node.js only when `"command": "node"`.
9. Validate and install locally with `agy plugin validate --strict`, then `agy plugin install <PLUGIN_PATH>`.
10. Iterate.
    - HTML changes apply when you close and reopen the view, because `ui://` resources are fetched fresh each time the view mounts.
    - After changing local server code, restart the server: Customizations > Installed > the plugin > MCP > More actions > Restart.

## Host limits

- HTML and file reads or writes: 10 MiB.
- Stored tool result: 1 MiB. Load larger data through a tool only the app can call.
- Up to 4 tool calls at once per view, only to the server that owns the view. Calls still running when the view closes are cancelled.
- Up to 5 hidden side-panel or full-page frames stay loaded. After that, the least recently used one is dropped.
- No teardown notice is sent when a view closes.
- The iframe is isolated, with no persistent browser storage. Everything is blocked by default: allowlist bare origins only, in `_meta.ui.csp`.

## Success check

- `agy plugin validate --strict` passes.
- Each view opens on the surface it declared.
- A UI-less client (the `agy` CLI) gets useful plain text from every tool.

(Check added, not in source.)

## Anti-patterns

- Returning only `structuredContent`. Clients without UI support get nothing useful.
- Putting a `file` entrypoint on a model-callable tool. The whole tool is hidden from the model.
- Relying on teardown to save edits. Nothing is sent when a view closes, so save every edit as soon as it's made.
- Opening network access with `connectDomains` when a `tools/call` would do.
- Treating `visibility: ["app"]` as a security boundary. The `agy` CLI ignores it and shows every tool to the model. (Inference added, not in source.)
- Returning datasets over 1 MiB straight from a tool result.
- Letting a skill or plugin override a bot's own approval or send rules. It can't. (Added, not in source.)

## Source

- Google Antigravity Docs, "MCP Apps": https://antigravity.google/docs/mcp-apps/ (read 22 Nov 2026, Sydney time). This is Google's official documentation, not an X post. Steven sent the link.
- MCP Apps views need Antigravity App v2.34.0 or later.

Status: untested
