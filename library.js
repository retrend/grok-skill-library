/* Library tab: Library Scout's catalogue (library.json). Independent of the Skills view. */
(() => {
  "use strict";
  const $ = (s) => document.querySelector(s);
  const esc = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  const TYPES = ["skill", "agent", "bot", "plugin", "template", "prompt", "other"];
  const OWN_RE = /already\s+(own|have|present|installed)|\bwe\s+own\b|have\s+a\s+matching\s+skill|duplicate\s+of/i;

  let entries = [];
  let loaded = false;
  let loadError = false;
  const types = new Set();
  const tags = new Set();
  let own = "any"; // any | only | hide

  const el = {
    skills: $("#view-skills"), library: $("#view-library"),
    tabSkills: $("#tab-skills"), tabLibrary: $("#tab-library"),
    search: $("#lib-search"), status: $("#lib-status"), sort: $("#lib-sort"),
    typeChips: $("#lib-type-chips"), ownChips: $("#lib-own-chips"), tagChips: $("#lib-tag-chips"),
    grid: $("#lib-grid"), empty: $("#lib-empty"), emptyTitle: $("#lib-empty-title"),
    emptyBody: $("#lib-empty-body"), clear: $("#lib-clear"), count: $("#lib-count"),
  };

  const safeLink = (u) => (/^https?:\/\/\S+$/i.test(String(u || "")) ? String(u) : "");
  const tagList = (v) => (Array.isArray(v) ? v : String(v || "").split(",")).map((t) => String(t).trim().toLowerCase()).filter(Boolean);
  function norm(e) {
    const type = TYPES.includes(String(e.type || "").toLowerCase()) ? String(e.type).toLowerCase() : "other";
    const status = ["new", "starred", "skip"].includes(String(e.status || "").toLowerCase()) ? String(e.status).toLowerCase() : "new";
    return {
      ...e, type, status, tags: tagList(e.tags), link: safeLink(e.link ?? e.source_url),
      alreadyOwn: e.alreadyOwn ?? OWN_RE.test(e.notes || ""),
    };
  }

  // —— View switching / routing ——
  function setView(view) {
    const lib = view === "library";
    document.body.dataset.view = lib ? "library" : "skills";
    el.skills.hidden = lib;
    el.library.hidden = !lib;
    el.tabSkills.classList.toggle("active", !lib);
    el.tabLibrary.classList.toggle("active", lib);
    el.tabSkills.setAttribute("aria-selected", String(!lib));
    el.tabLibrary.setAttribute("aria-selected", String(lib));
    if (lib && loaded) render();
  }
  function route() {
    const h = location.hash;
    if (h.startsWith("#library")) {
      setView("library");
      const m = h.match(/^#library\/(.+)$/);
      if (m) focusEntry(decodeURIComponent(m[1]));
    } else if (h === "#skills" || h.startsWith("#skill/") || h === "") {
      setView("skills");
    } // other hashes (e.g. #for-agents) keep the current view
  }
  function focusEntry(id) {
    if (!loaded) return;
    const e = entries.find((x) => x.id === id);
    if (!e) return;
    if (!visible(e)) { clearFilters(false); if (e.status === "skip") el.status.value = "all"; render(); }
    const card = document.getElementById("lib-" + id);
    if (card) {
      card.scrollIntoView({ block: "center", behavior: "smooth" });
      card.classList.add("focused");
      setTimeout(() => card.classList.remove("focused"), 2400);
    }
  }

  // —— Filtering ——
  function matchesQuery(e, q) {
    const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
    if (!terms.length) return true;
    const hay = [e.name, e.summary, e.use_when, e.author, ...e.tags].join("\n").toLowerCase();
    return terms.every((t) => hay.includes(t));
  }
  function statusOk(e) {
    const v = el.status.value;
    return v === "all" ? true : v === "active" ? e.status !== "skip" : e.status === v;
  }
  function visible(e, skip) {
    return (skip === "query" || matchesQuery(e, el.search.value)) && statusOk(e) &&
      (skip === "type" || !types.size || types.has(e.type)) &&
      (skip === "tag" || [...tags].every((t) => e.tags.includes(t))) &&
      (skip === "own" || own === "any" || (own === "only" ? e.alreadyOwn : !e.alreadyOwn));
  }
  function sorted(list) {
    const m = el.sort.value, c = [...list];
    if (m === "az") c.sort((a, b) => a.name.localeCompare(b.name, "en-GB"));
    else if (m === "type") c.sort((a, b) => TYPES.indexOf(a.type) - TYPES.indexOf(b.type) || a.name.localeCompare(b.name, "en-GB"));
    else c.sort((a, b) => String(b.found_on || "").localeCompare(String(a.found_on || "")) || a.name.localeCompare(b.name, "en-GB"));
    return c;
  }

  // —— Render ——
  function chip(label, count, active, data) {
    return `<button type="button" class="chip${active ? " active" : ""}" ${data} aria-pressed="${active}">${esc(label)}<span class="chip-count">${count}</span></button>`;
  }
  function highlight(text, q) {
    const h = esc(text);
    const terms = q.trim().split(/\s+/).filter(Boolean).map((t) => esc(t).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
    if (!terms.length) return h;
    // only mark text outside entities
    return h.replace(/(&[a-z#0-9]+;)|([^&]+)/gi, (m, ent, txt) => ent ? ent : txt.replace(new RegExp("(" + terms.join("|") + ")", "gi"), '<mark class="hl">$1</mark>'));
  }
  function card(e, q) {
    const label = e.type.charAt(0).toUpperCase() + e.type.slice(1);
    const meta = [e.author && `<span class="lib-meta-item">By ${esc(e.author)}</span>`,
      e.licence && `<span class="lib-meta-item">Licence: ${esc(e.licence)}</span>`,
      e.found_on && `<span class="lib-meta-item">Found ${esc(e.found_on)}</span>`].filter(Boolean).join("");
    const link = e.link
      ? `<a class="source-link" href="${esc(e.link)}" target="_blank" rel="noopener noreferrer">Open ${esc(e.source_site || "source")} ↗</a>`
      : e.source_url ? `<span class="lib-meta-item">Link not shown (not http/https)</span>` : "";
    return `<article class="card lib-card" id="lib-${esc(e.id)}">
      <div class="lib-badges">
        <span class="badge badge-type" data-type="${esc(e.type)}">${esc(label)}</span>
        ${e.status === "starred" ? '<span class="badge badge-star">★ Starred</span>' : ""}
        ${e.status === "skip" ? '<span class="badge badge-skip">Skipped</span>' : ""}
        ${e.alreadyOwn ? '<span class="badge badge-own" title="Notes say we already have a matching skill">Already own</span>' : ""}
      </div>
      <h2 class="card-name">${highlight(e.name, q)}</h2>
      ${e.summary ? `<p class="lib-summary">${highlight(e.summary, q)}</p>` : ""}
      ${e.use_when ? `<p class="lib-use"><span class="lib-label">Use when</span> ${highlight(e.use_when, q)}</p>` : ""}
      ${e.notes ? `<p class="lib-notes">${esc(e.notes)}</p>` : ""}
      ${e.tags.length ? `<div class="card-meta">${e.tags.map((t) => `<span class="tag">${highlight(t, q)}</span>`).join("")}</div>` : ""}
      ${meta || link ? `<div class="lib-foot">${meta ? `<div class="lib-foot-meta">${meta}</div>` : ""}${link}</div>` : ""}
    </article>`;
  }
  function render() {
    const q = el.search.value.trim();
    if (!loaded || loadError || !entries.length) {
      el.grid.innerHTML = el.typeChips.innerHTML = el.ownChips.innerHTML = el.tagChips.innerHTML = "";
      el.empty.hidden = false;
      el.clear.hidden = true;
      el.emptyTitle.textContent = !loaded ? "Loading…" : loadError ? "Could not load the catalogue" : "Catalogue is empty";
      el.emptyBody.textContent = !loaded ? "" : loadError ? "library.json did not load. The Skills tab still works." : "Library Scout hasn't added anything yet.";
      el.count.textContent = loaded && !loadError ? "0 entries" : "";
      return;
    }
    el.clear.hidden = false;
    const count = (skip, pred) => entries.filter((e) => visible(e, skip) && pred(e)).length;
    const typeList = TYPES.filter((t) => entries.some((e) => e.type === t));
    el.typeChips.innerHTML = `<span class="chips-label">Type</span>` + typeList.map((t) => chip(t, count("type", (e) => e.type === t), types.has(t), `data-type="${esc(t)}"`)).join("");
    const nOwn = count("own", (e) => e.alreadyOwn);
    el.ownChips.innerHTML = nOwn || own !== "any"
      ? `<span class="chips-label">Already own</span>` + chip("Only these", nOwn, own === "only", 'data-own="only"') + chip("Hide these", count("own", (e) => !e.alreadyOwn), own === "hide", 'data-own="hide"')
      : "";
    const tagCounts = new Map();
    for (const e of entries) if (visible(e, "tag")) for (const t of e.tags) tagCounts.set(t, (tagCounts.get(t) || 0) + 1);
    for (const t of tags) if (!tagCounts.has(t)) tagCounts.set(t, 0);
    el.tagChips.innerHTML = tagCounts.size ? `<span class="chips-label">Tags</span>` + [...tagCounts].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).map(([t, n]) => chip(t, n, tags.has(t), `data-tag="${esc(t)}"`)).join("") : "";
    const list = sorted(entries.filter((e) => visible(e)));
    el.grid.innerHTML = list.map((e) => card(e, q)).join("");
    el.empty.hidden = list.length > 0;
    el.emptyTitle.textContent = "No matching entries";
    el.emptyBody.textContent = "Try a different search, or clear the filters.";
    const hidden = entries.filter((e) => e.status === "skip").length;
    el.count.textContent = `Matching ${list.length} of ${entries.length}` + (el.status.value === "active" && hidden ? ` · ${hidden} skipped hidden` : "");
  }
  function clearFilters(doRender = true) {
    el.search.value = ""; types.clear(); tags.clear(); own = "any"; el.status.value = "active";
    if (doRender) render();
  }

  // —— Events ——
  function bind() {
    el.search.addEventListener("input", render);
    el.status.addEventListener("change", render);
    el.sort.addEventListener("change", render);
    el.clear.addEventListener("click", () => clearFilters());
    el.typeChips.addEventListener("click", (e) => { const b = e.target.closest(".chip"); if (!b) return; const t = b.dataset.type; types.has(t) ? types.delete(t) : types.add(t); render(); });
    el.tagChips.addEventListener("click", (e) => { const b = e.target.closest(".chip"); if (!b) return; const t = b.dataset.tag; tags.has(t) ? tags.delete(t) : tags.add(t); render(); });
    el.ownChips.addEventListener("click", (e) => { const b = e.target.closest(".chip"); if (!b) return; own = own === b.dataset.own ? "any" : b.dataset.own; render(); });
    // Switch on click straight away, not only after the hashchange event.
    el.tabSkills.addEventListener("click", () => setView("skills"));
    el.tabLibrary.addEventListener("click", () => setView("library"));
    window.addEventListener("hashchange", route);
    document.addEventListener("keydown", (e) => {
      if (document.body.dataset.view !== "library") return;
      const inInput = /INPUT|TEXTAREA|SELECT/.test(e.target.tagName || "");
      if (e.key === "/" && !inInput && !e.metaKey && !e.ctrlKey) { e.preventDefault(); el.search.focus(); el.search.select(); }
      else if (e.key === "Escape" && document.activeElement === el.search) { el.search.blur(); clearFilters(); }
    });
  }

  async function init() {
    bind();
    route();
    try {
      const r = await fetch("library.json", { cache: "no-cache" });
      if (!r.ok) throw new Error("HTTP " + r.status);
      const d = await r.json();
      entries = (Array.isArray(d.entries) ? d.entries : []).filter((e) => e && e.name).map(norm);
    } catch (err) {
      console.warn("library.json unavailable", err);
      loadError = true;
    }
    loaded = true;
    el.tabLibrary.textContent = loadError ? "Library" : `Library (${entries.length})`;
    route();
    render();
  }
  init();
})();
