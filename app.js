/* Skill Library SPA — Grok Bot */
(() => {
  "use strict";

  const $ = (sel, el = document) => el.querySelector(sel);
  const $$ = (sel, el = document) => [...el.querySelectorAll(sel)];

  let allSkills = [];
  let filtered = [];
  let activeTags = new Set();
  let focusIdx = 0;
  let detailOpen = false;
  let currentId = null;
  let toastTimer = null;

  const el = {
    search: $("#search"),
    sort: $("#sort"),
    chips: $("#chips"),
    grid: $("#grid"),
    empty: $("#empty"),
    status: $("#status"),
    overlay: $("#overlay"),
    detail: $("#detail"),
    detailBody: $("#detail-body"),
    btnClose: $("#btn-close"),
    btnPrev: $("#btn-prev"),
    btnNext: $("#btn-next"),
    btnCopy: $("#btn-copy"),
    btnRandom: $("#btn-random"),
    btnClear: $("#btn-clear"),
    toast: $("#toast"),
  };

  // —— Utils ——
  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function highlight(text, query) {
    if (!query || !text) return escapeHtml(text);
    const esc = escapeHtml(text);
    const terms = query
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
    if (!terms.length) return esc;
    const re = new RegExp("(" + terms.join("|") + ")", "gi");
    return esc.replace(re, '<mark class="hl">$1</mark>');
  }

  function snippet(desc, max = 160) {
    if (!desc) return "";
    return desc.length > max ? desc.slice(0, max).trim() + "…" : desc;
  }

  function formatDate(iso) {
    try {
      const d = new Date(iso);
      return d.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
        timeZone: "Australia/Sydney",
      });
    } catch {
      return "";
    }
  }

  function showToast(msg) {
    el.toast.textContent = msg;
    el.toast.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      el.toast.hidden = true;
    }, 2200);
  }

  // —— Search ——
  function matchesQuery(skill, q) {
    if (!q) return true;
    const terms = q.toLowerCase().trim().split(/\s+/).filter(Boolean);
    const hay = [
      skill.name,
      skill.description,
      skill.body,
      ...(skill.tags || []),
      ...(skill.authors || []),
      ...(skill.sourceUrls || []),
      skill.id,
    ]
      .join("\n")
      .toLowerCase();
    return terms.every((t) => hay.includes(t));
  }

  function matchesTags(skill) {
    if (!activeTags.size) return true;
    return [...activeTags].every((t) => skill.tags.includes(t));
  }

  function sortSkills(list) {
    const mode = el.sort.value;
    const copy = [...list];
    if (mode === "az") {
      copy.sort((a, b) => a.name.localeCompare(b.name, "en-GB"));
    } else if (mode === "longest") {
      copy.sort((a, b) => b.wordCount - a.wordCount);
    } else {
      // newest
      copy.sort((a, b) => (b.mtime || "").localeCompare(a.mtime || ""));
    }
    return copy;
  }

  function applyFilters() {
    const q = el.search.value;
    filtered = sortSkills(
      allSkills.filter((s) => matchesQuery(s, q) && matchesTags(s))
    );
    if (focusIdx >= filtered.length) focusIdx = Math.max(0, filtered.length - 1);
    render();
  }

  // —— Render ——
  function allTagsWithCounts() {
    const map = new Map();
    for (const s of allSkills) {
      for (const t of s.tags) {
        map.set(t, (map.get(t) || 0) + 1);
      }
    }
    return [...map.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  }

  function renderChips() {
    const tags = allTagsWithCounts();
    el.chips.innerHTML = tags
      .map(
        ([tag, count]) =>
          `<button type="button" class="chip${activeTags.has(tag) ? " active" : ""}" data-tag="${escapeHtml(tag)}" aria-pressed="${activeTags.has(tag)}">${escapeHtml(tag)}<span class="chip-count">${count}</span></button>`
      )
      .join("");
  }

  function renderGrid() {
    const q = el.search.value.trim();
    if (!filtered.length) {
      el.grid.innerHTML = "";
      el.empty.hidden = false;
    } else {
      el.empty.hidden = true;
      el.grid.innerHTML = filtered
        .map((s, i) => {
          const handle = (s.authors && s.authors[0]) || "";
          const tagsHtml = (s.tags || [])
            .slice(0, 4)
            .map((t) => `<span class="tag">${escapeHtml(t)}</span>`)
            .join("");
          return `<button type="button" class="card${i === focusIdx ? " focused" : ""}" data-id="${escapeHtml(s.id)}" data-idx="${i}">
            <h2 class="card-name">${highlight(s.name, q)}</h2>
            <p class="card-desc">${highlight(snippet(s.description), q)}</p>
            <div class="card-meta">${tagsHtml}${handle ? `<span class="handle">${escapeHtml(handle)}</span>` : ""}</div>
          </button>`;
        })
        .join("");
    }

    const total = allSkills.length;
    const n = filtered.length;
    const qActive = el.search.value.trim() || activeTags.size;
    el.status.textContent = qActive
      ? `Matching ${n} of ${total}`
      : `${total} skill${total === 1 ? "" : "s"}`;
  }

  function render() {
    renderChips();
    renderGrid();
  }

  // —— Detail ——
  function renderMarkdown(md) {
    if (typeof marked !== "undefined") {
      marked.setOptions({ breaks: true, gfm: true });
      return marked.parse(md || "");
    }
    // Fallback: escape + basic newlines
    return "<pre>" + escapeHtml(md) + "</pre>";
  }

  function openDetail(id) {
    const skill = allSkills.find((s) => s.id === id);
    if (!skill) return;
    currentId = id;
    detailOpen = true;

    // Sync focus in filtered list if present
    const fi = filtered.findIndex((s) => s.id === id);
    if (fi >= 0) focusIdx = fi;

    const q = el.search.value.trim();
    const tagsHtml = (skill.tags || [])
      .map((t) => `<span class="tag">${escapeHtml(t)}</span>`)
      .join("");
    const sourcesHtml =
      skill.sourceUrls && skill.sourceUrls.length
        ? `<div class="detail-sources">${skill.sourceUrls
            .map((u) => {
              const label = u.includes("x.com") || u.includes("twitter.com")
                ? "Open tweet"
                : u.includes("youtube")
                ? "Open YouTube"
                : u.includes("github")
                ? "Open GitHub"
                : "Open source";
              return `<a class="source-link" href="${escapeHtml(u)}" target="_blank" rel="noopener noreferrer">${label} ↗</a>`;
            })
            .join("")}</div>`
        : skill.hasSource === false
        ? `<p class="meta-item" style="color:var(--text-mute);font-size:0.8rem;margin:0 0 12px">No Source section in this skill.</p>`
        : "";

    const authors =
      skill.authors && skill.authors.length
        ? skill.authors.map((a) => escapeHtml(a)).join(" · ")
        : "";

    el.detailBody.innerHTML = `
      <div class="detail-header">
        <h2 id="detail-title">${highlight(skill.name, q)}</h2>
        <p class="detail-desc">${highlight(skill.description, q)}</p>
        <div class="detail-meta">
          ${tagsHtml}
          ${authors ? `<span class="meta-item">${authors}</span>` : ""}
          <span class="meta-item">${skill.wordCount.toLocaleString("en-GB")} words</span>
          <span class="meta-item">Updated ${formatDate(skill.mtime)}</span>
        </div>
        ${sourcesHtml}
      </div>
      <div class="md">${renderMarkdown(skill.body)}</div>
    `;

    el.overlay.hidden = false;
    el.detail.hidden = false;
    el.btnClose.focus();
    updateNavButtons();
    history.replaceState(null, "", `#skill/${encodeURIComponent(id)}`);
  }

  function closeDetail() {
    detailOpen = false;
    currentId = null;
    el.overlay.hidden = true;
    el.detail.hidden = true;
    if (location.hash.startsWith("#skill/")) {
      history.replaceState(null, "", location.pathname + location.search);
    }
    // Restore focus to card
    const card = $(`.card[data-idx="${focusIdx}"]`);
    if (card) card.focus();
    else el.grid.focus();
  }

  function updateNavButtons() {
    const idx = filtered.findIndex((s) => s.id === currentId);
    el.btnPrev.disabled = idx <= 0;
    el.btnNext.disabled = idx < 0 || idx >= filtered.length - 1;
  }

  function navigateDetail(delta) {
    const idx = filtered.findIndex((s) => s.id === currentId);
    if (idx < 0) return;
    const next = idx + delta;
    if (next < 0 || next >= filtered.length) return;
    focusIdx = next;
    openDetail(filtered[next].id);
    renderGrid();
  }

  function copyCurrentMarkdown() {
    const skill = allSkills.find((s) => s.id === currentId);
    if (!skill) return;
    const md = `---\nname: ${skill.name}\ndescription: >-\n  ${skill.description}\n---\n\n${skill.body}`;
    navigator.clipboard.writeText(md).then(
      () => showToast("Copied as Markdown"),
      () => showToast("Copy failed")
    );
  }

  function openRandom() {
    if (!filtered.length) return;
    const i = Math.floor(Math.random() * filtered.length);
    focusIdx = i;
    openDetail(filtered[i].id);
    renderGrid();
  }

  // —— Routing ——
  function applyHash() {
    const m = location.hash.match(/^#skill\/(.+)$/);
    if (m) {
      const id = decodeURIComponent(m[1]);
      if (allSkills.some((s) => s.id === id)) {
        openDetail(id);
        return;
      }
    }
    if (detailOpen) closeDetail();
  }

  // —— Keyboard ——
  function onKey(e) {
    const tag = (e.target && e.target.tagName) || "";
    const inInput = tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || e.target.isContentEditable;

    if (e.key === "/" && !inInput && !e.metaKey && !e.ctrlKey) {
      e.preventDefault();
      el.search.focus();
      el.search.select();
      return;
    }

    if (e.key === "Escape") {
      if (detailOpen) {
        e.preventDefault();
        closeDetail();
      } else if (document.activeElement === el.search) {
        el.search.blur();
        el.search.value = "";
        activeTags.clear();
        applyFilters();
      }
      return;
    }

    if (detailOpen) {
      if (e.key === "ArrowLeft" || e.key === "k") {
        e.preventDefault();
        navigateDetail(-1);
      } else if (e.key === "ArrowRight" || e.key === "j") {
        e.preventDefault();
        navigateDetail(1);
      } else if ((e.key === "c" || e.key === "C") && (e.metaKey || e.ctrlKey) === false && !inInput) {
        // plain c could conflict; use button. skip
      }
      return;
    }

    if (inInput) return;

    if (e.key === "j" || e.key === "ArrowDown") {
      e.preventDefault();
      if (!filtered.length) return;
      focusIdx = Math.min(filtered.length - 1, focusIdx + 1);
      renderGrid();
      const card = $(`.card[data-idx="${focusIdx}"]`);
      if (card) card.focus();
    } else if (e.key === "k" || e.key === "ArrowUp") {
      e.preventDefault();
      if (!filtered.length) return;
      focusIdx = Math.max(0, focusIdx - 1);
      renderGrid();
      const card = $(`.card[data-idx="${focusIdx}"]`);
      if (card) card.focus();
    } else if (e.key === "Enter" && filtered[focusIdx]) {
      e.preventDefault();
      openDetail(filtered[focusIdx].id);
    } else if (e.key === "r" || e.key === "R") {
      e.preventDefault();
      openRandom();
    }
  }

  // —— Events ——
  function bind() {
    el.search.addEventListener("input", () => {
      focusIdx = 0;
      applyFilters();
    });
    el.sort.addEventListener("change", () => {
      focusIdx = 0;
      applyFilters();
    });

    el.chips.addEventListener("click", (e) => {
      const btn = e.target.closest(".chip");
      if (!btn) return;
      const tag = btn.dataset.tag;
      if (activeTags.has(tag)) activeTags.delete(tag);
      else activeTags.add(tag);
      focusIdx = 0;
      applyFilters();
    });

    el.grid.addEventListener("click", (e) => {
      const card = e.target.closest(".card");
      if (!card) return;
      focusIdx = Number(card.dataset.idx) || 0;
      openDetail(card.dataset.id);
    });

    el.overlay.addEventListener("click", closeDetail);
    el.btnClose.addEventListener("click", closeDetail);
    el.btnPrev.addEventListener("click", () => navigateDetail(-1));
    el.btnNext.addEventListener("click", () => navigateDetail(1));
    el.btnCopy.addEventListener("click", copyCurrentMarkdown);
    el.btnRandom.addEventListener("click", openRandom);
    el.btnClear.addEventListener("click", () => {
      el.search.value = "";
      activeTags.clear();
      focusIdx = 0;
      applyFilters();
    });

    document.addEventListener("keydown", onKey);
    window.addEventListener("hashchange", applyHash);
  }

  // —— Init ——
  async function init() {
    bind();
    try {
      const res = await fetch("skills.json");
      if (!res.ok) throw new Error("Failed to load skills.json");
      const data = await res.json();
      allSkills = data.skills || [];
      applyFilters();
      applyHash();
    } catch (err) {
      el.status.textContent = "Failed to load skills";
      el.empty.hidden = false;
      $(".empty-title", el.empty).textContent = "Could not load skills.json";
      $(".empty-body", el.empty).textContent =
        "Serve this folder over HTTP (e.g. python3 -m http.server 8765).";
      console.error(err);
    }
  }

  init();
})();
