/* WebMCP tools for the Skill Library. Read-only, client-side, no network calls beyond this site's own files.
   Registers tools with navigator.modelContext (or document.modelContext) when the browser supports WebMCP;
   does nothing otherwise. Tool names and descriptions are mirrored in webmcp.json (written by build_skills.py). */
(() => {
  "use strict";
  const mc = (typeof navigator !== "undefined" && navigator.modelContext) ||
    (typeof document !== "undefined" && document.modelContext) || null;
  if (!mc || (typeof mc.registerTool !== "function" && typeof mc.provideContext !== "function")) return;

  const BASE = new URL(".", document.baseURI).href;
  const STOP = new Set("a an the and or of to in on for with how do i my me is are can what which when why should use using get from by it be at as this that your you does".split(" "));
  const tokens = (t) => (String(t || "").toLowerCase().match(/[a-z0-9]+/g) || []).filter((w) => w.length > 1 && !STOP.has(w));
  const ok = (data) => ({ content: [{ type: "text", text: JSON.stringify(data, null, 2) }] });
  const fail = (msg) => ({ content: [{ type: "text", text: JSON.stringify({ error: msg }) }], isError: true });
  const clampLimit = (n, def, max) => Math.max(1, Math.min(max, Number.isFinite(+n) && +n > 0 ? Math.floor(+n) : def));
  const ID_RE = /^[a-z0-9][a-z0-9._-]{0,200}$/i;

  const cache = new Map();
  function getJson(path) {
    if (!cache.has(path)) {
      cache.set(path, fetch(new URL(path, BASE)).then((r) => {
        if (!r.ok) throw new Error(`Could not load ${path} (${r.status})`);
        return r.json();
      }).catch((e) => { cache.delete(path); throw e; }));
    }
    return cache.get(path);
  }
  const skillsData = () => getJson("skills.json").then((d) => d.skills || []);
  const libraryData = () => getJson("library.json").then((d) => (d.entries || []).map((e) => ({
    ...e, type: String(e.type || "other").toLowerCase(),
    tags: (Array.isArray(e.tags) ? e.tags : String(e.tags || "").split(",")).map((t) => String(t).trim().toLowerCase()).filter(Boolean),
  })));

  // Keyword ranking: same fields the page's search box looks at, weighted so name and tag hits count most.
  function rank(list, query, fields) {
    const qt = [...new Set(tokens(query))];
    if (!qt.length) return [];
    const out = [];
    for (const item of list) {
      let score = 0, matched = 0;
      for (const t of qt) {
        let s = 0;
        for (const [get, w] of fields) {
          const v = String(get(item) || "").toLowerCase();
          if (v.includes(t)) s += w * (1 + Math.min(1, (v.split(t).length - 2) * 0.1));
        }
        if (s) { matched++; score += s; }
      }
      if (matched) out.push({ item, score: +(score * (matched / qt.length)).toFixed(3), matched });
    }
    return out.sort((a, b) => b.matched - a.matched || b.score - a.score);
  }

  const skillUrl = (id) => `${BASE}skills/${id}.md`;
  const skillCard = (s) => ({ id: s.id, name: s.name, description: s.description, tags: s.tags, url: skillUrl(s.id), page: `${BASE}#skill/${s.id}` });
  const libCard = (e) => ({
    id: e.id, name: e.name, type: e.type, need: e.tags[0] || null, licence: e.licence || null, author: e.author || null,
    summary: e.summary || "", use_when: e.use_when || "", tags: e.tags, source_url: e.source_url || e.link || null,
    already_own: !!e.alreadyOwn,
  });

  const SKILL_FIELDS = [[(s) => s.name, 4], [(s) => (s.tags || []).join(" "), 3], [(s) => s.description, 2], [(s) => s.id, 2], [(s) => s.body, 1]];
  const LIB_FIELDS = [[(e) => e.name, 4], [(e) => e.tags.join(" "), 3], [(e) => e.summary, 2], [(e) => e.use_when, 2], [(e) => e.author, 1]];
  const RO = { readOnlyHint: true };

  const tools = [
    {
      name: "search_skills",
      description: "Keyword search over the skills in this Skill Library (step-by-step playbooks for marketing, content, SEO, ads, outreach and agent work). Returns the best matches with id, name, description, tags and the raw Markdown URL. Call get_skill with an id to read the full skill.",
      inputSchema: { type: "object", properties: {
        query: { type: "string", description: "What you are trying to do, e.g. 'video editing' or 'get cited in AI search'." },
        limit: { type: "integer", minimum: 1, maximum: 50, default: 5, description: "Most results to return (default 5)." },
      }, required: ["query"] },
      annotations: RO,
      async execute({ query, limit } = {}) {
        if (!String(query || "").trim()) return fail("query is required");
        const skills = await skillsData();
        const hits = rank(skills, query, SKILL_FIELDS).slice(0, clampLimit(limit, 5, 50));
        return ok({ query, total_skills: skills.length, results: hits.map((h) => ({ ...skillCard(h.item), score: h.score })) });
      },
    },
    {
      name: "get_skill",
      description: "Get one skill from this Skill Library by id: its full SKILL.md text (front matter and steps) plus name, description, tags, sources and last update.",
      inputSchema: { type: "object", properties: {
        id: { type: "string", description: "Skill id, as returned by search_skills or list_skills." },
      }, required: ["id"] },
      annotations: RO,
      async execute({ id } = {}) {
        id = String(id || "").trim();
        if (!ID_RE.test(id)) return fail("id is required and may only contain letters, digits, '.', '_' and '-'");
        const s = (await skillsData()).find((x) => x.id === id);
        if (!s) return fail(`No skill with id '${id}'. Use search_skills or list_skills to find ids.`);
        const r = await fetch(skillUrl(id));
        const markdown = r.ok ? await r.text() : s.body;
        return ok({ ...skillCard(s), sources: s.sourceUrls || [], authors: s.authors || [], updated: (s.mtime || "").slice(0, 10), word_count: s.wordCount, markdown });
      },
    },
    {
      name: "list_skills",
      description: "List every skill in this Skill Library as a compact list (id, name, description, tags). Optionally keep only skills with a given tag, or skills whose source links contain a given text (e.g. an X handle or domain).",
      inputSchema: { type: "object", properties: {
        tag: { type: "string", description: "Only skills with this tag (case-insensitive)." },
        source: { type: "string", description: "Only skills whose source URLs or authors contain this text." },
      } },
      annotations: RO,
      async execute({ tag, source } = {}) {
        const t = String(tag || "").trim().toLowerCase(), src = String(source || "").trim().toLowerCase().replace(/^@/, "");
        const skills = (await skillsData()).filter((s) =>
          (!t || (s.tags || []).includes(t)) &&
          (!src || [...(s.sourceUrls || []), ...(s.authors || [])].some((u) => String(u).toLowerCase().includes(src))));
        const tags = {};
        for (const s of await skillsData()) for (const x of s.tags || []) tags[x] = (tags[x] || 0) + 1;
        return ok({ count: skills.length, skills: skills.map((s) => ({ id: s.id, name: s.name, description: s.description, tags: s.tags })),
          all_tags: Object.fromEntries(Object.entries(tags).sort((a, b) => b[1] - a[1])) });
      },
    },
    {
      name: "search_library",
      description: "Keyword search over the Library catalogue: outside skills, plugins, templates and agents (mostly GitHub projects) found by Library Scout. These are links to other people's work, not skills in this library. Filter by type, need (the entry's main topic, e.g. video or seo) or licence.",
      inputSchema: { type: "object", properties: {
        query: { type: "string", description: "Keywords, e.g. 'seo audit' or 'caption video'. Leave empty to list by filters only." },
        type: { type: "string", enum: ["skill", "plugin", "template", "agent", "other"], description: "Only this entry type." },
        need: { type: "string", description: "Only entries whose main topic (first tag) is this, e.g. video, seo, social, ads." },
        licence: { type: "string", description: "Only this licence, e.g. MIT or Apache-2.0." },
        limit: { type: "integer", minimum: 1, maximum: 50, default: 10, description: "Most results to return (default 10)." },
      } },
      annotations: RO,
      async execute({ query, type, need, licence, limit } = {}) {
        const ty = String(type || "").trim().toLowerCase(), nd = String(need || "").trim().toLowerCase(), li = String(licence || "").trim().toLowerCase();
        const all = await libraryData();
        const pool = all.filter((e) => e.status !== "skip" && (!ty || e.type === ty) && (!nd || e.tags[0] === nd) && (!li || String(e.licence || "").toLowerCase() === li));
        const n = clampLimit(limit, 10, 50);
        const q = String(query || "").trim();
        const hits = q ? rank(pool, q, LIB_FIELDS).map((h) => ({ ...libCard(h.item), score: h.score })) : pool.map(libCard);
        return ok({ query: q || null, filters: { type: ty || null, need: nd || null, licence: li || null }, matches: hits.length, total_entries: all.length, results: hits.slice(0, n) });
      },
    },
    {
      name: "get_library_entry",
      description: "Get one Library catalogue entry by id: name, type, need, author, licence, summary, when to use it, tags and the source link.",
      inputSchema: { type: "object", properties: {
        id: { type: "string", description: "Entry id, as returned by search_library." },
      }, required: ["id"] },
      annotations: RO,
      async execute({ id } = {}) {
        id = String(id || "").trim();
        if (!id) return fail("id is required");
        const e = (await libraryData()).find((x) => x.id === id);
        if (!e) return fail(`No catalogue entry with id '${id}'. Use search_library to find ids.`);
        return ok({ ...libCard(e), source_site: e.source_site || null, found_on: e.found_on || null, status: e.status || null, page: `${BASE}#library/${encodeURIComponent(e.id)}` });
      },
    },
  ];

  // Wrap so a thrown error comes back as a tool error, not an unhandled rejection.
  const wrapped = tools.map((t) => ({ ...t, execute: async (input, client) => {
    try { return await t.execute(input || {}, client); } catch (e) { return fail(String((e && e.message) || e)); }
  } }));

  try {
    if (typeof mc.registerTool === "function") for (const t of wrapped) mc.registerTool(t);
    else mc.provideContext({ tools: wrapped });
  } catch (e) { /* registration refused by the browser: stay silent, the page works without it */ }
})();
