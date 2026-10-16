// Ask panel: hybrid (keyword + semantic) retrieval over skill chunks, fully in-browser.
const TJS = "https://cdn.jsdelivr.net/npm/@xenova/transformers@2.17.2";
const $ = (s) => document.querySelector(s);
const esc = (s) => String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
const STOP = new Set("a an the and or of to in on for with how do i my me is are can what which when why should use using get from by it be at as this that your you does".split(" "));
let skills = [], chunks = [], embedder = null, modelState = "loading";
const history = [];

const tokens = (t) => t.toLowerCase().match(/[a-z0-9]+/g)?.filter((w) => w.length > 1 && !STOP.has(w)) || [];

function keywordScore(qt, text) {
  if (!qt.length) return 0;
  const hay = text.toLowerCase(); let hit = 0;
  for (const t of qt) if (hay.includes(t)) hit += 1 + Math.min(2, (hay.split(t).length - 2) * 0.2);
  return hit / (qt.length * 1.4);
}
const dot = (a, b) => { let s = 0; for (let i = 0; i < a.length; i++) s += a[i] * b[i]; return s; };

async function loadModel() {
  try {
    const { pipeline, env } = await import(`${TJS}`);
    env.allowLocalModels = false;
    embedder = await pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2");
    modelState = "ready";
  } catch (e) { console.warn("Semantic model unavailable, using keywords", e); modelState = "failed"; }
  setBadge();
}
function setBadge() {
  const b = $("#ask-mode");
  b.textContent = modelState === "ready" ? "Semantic + keyword" : modelState === "failed" ? "Keyword only" : "Loading model…";
  b.dataset.state = modelState;
}

async function retrieve(question) {
  const ctx = history.slice(-2).map((h) => h.q).join(" ");
  let qt = tokens(question);
  if (qt.length < 2 && ctx) qt = qt.concat(tokens(ctx)); // short follow-ups borrow context
  let qv = null;
  if (embedder && chunks.length && chunks[0].v) {
    try { const e = await embedder((qt.length < 3 && ctx ? ctx + " " : "") + question, { pooling: "mean", normalize: true }); qv = Array.from(e.data); } catch {}
  }
  const semW = qv ? 0.65 : 0;
  const scored = chunks.map((c) => {
    const s = skills.find((k) => k.id === c.skill);
    const kw = keywordScore(qt, `${s.name} ${s.tags.join(" ")} ${c.section} ${c.text}`);
    const sem = qv ? Math.max(0, dot(qv, c.v)) : 0;
    return { c, s, score: semW * sem + (1 - semW) * Math.min(1, kw) };
  }).sort((a, b) => b.score - a.score);
  // aggregate by skill: best chunk + small bonus for several good chunks
  const bySkill = new Map();
  for (const r of scored.slice(0, 40)) {
    const g = bySkill.get(r.s.id) || { s: r.s, score: 0, hits: [] };
    g.score += g.hits.length ? r.score * 0.15 : r.score; g.hits.push(r); bySkill.set(r.s.id, g);
  }
  const ranked = [...bySkill.values()].sort((a, b) => b.score - a.score);
  const top = ranked[0]?.score || 0;
  return { ranked: ranked.filter((g, i) => i === 0 || g.score >= top * 0.75).slice(0, 3), qt, semantic: !!qv, top };
}

function trimSnippet(text, qt) {
  const lines = text.split("\n").map((l) => l.trim()).filter(Boolean);
  const rank = lines.map((l, i) => ({ l, i, k: keywordScore(qt, l) }));
  const pick = rank.sort((a, b) => b.k - a.k || a.i - b.i).slice(0, 4).sort((a, b) => a.i - b.i);
  return pick.map((p) => p.l.length > 260 ? p.l.slice(0, 260) + "…" : p.l);
}
function hl(s, qt) {
  let h = esc(s).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/`([^`]+)`/g, "<code>$1</code>");
  if (qt.length) h = h.replace(new RegExp(`\\b(${qt.map((t) => t.replace(/[^a-z0-9]/g, "")).join("|")})`, "gi"), '<mark class="hl">$1</mark>');
  return h;
}

function bubble(role, html) {
  const d = document.createElement("div"); d.className = `msg msg-${role}`; d.innerHTML = html;
  $("#ask-log").appendChild(d); d.scrollIntoView({ block: "end", behavior: "smooth" }); return d;
}

async function ask(q) {
  q = q.trim(); if (!q) return;
  bubble("user", esc(q));
  const thinking = bubble("bot", '<span class="typing">Searching your skills…</span>');
  const { ranked, qt, semantic, top } = await retrieve(q);
  history.push({ q, ids: ranked.map((g) => g.s.id) });
  if (!ranked.length || top < 0.12) {
    thinking.innerHTML = "I couldn't find a skill that covers that. Try different wording, or browse by tag.";
    return;
  }
  const lead = ranked.length === 1 ? "Your best match is" : `I'd look at these ${ranked.length} skills, best first:`;
  thinking.innerHTML = `<p>${ranked.length === 1 ? lead + ` <strong>${esc(ranked[0].s.name)}</strong>.` : lead}</p>` +
    ranked.map((g, i) => {
      const secs = []; const seen = new Set();
      for (const h of g.hits) { if (seen.has(h.c.section) || secs.length >= 2) continue; seen.add(h.c.section); secs.push(h); }
      return `<div class="ans-skill">
        <a class="ans-title" href="#skill/${encodeURIComponent(g.s.id)}">${i + 1}. ${esc(g.s.name)} →</a>
        <p class="ans-desc">${esc(g.s.description.slice(0, 200))}${g.s.description.length > 200 ? "…" : ""}</p>
        ${secs.map((h) => `<div class="ans-sec"><span class="ans-sec-name">${esc(h.c.section)}</span><ul>${trimSnippet(h.c.text, qt).map((l) => `<li>${hl(l.replace(/^(\d+\.|[-*])\s*/, ""), qt)}</li>`).join("")}</ul></div>`).join("")}
      </div>`;
    }).join("") +
    `<p class="ans-foot">${semantic ? "Ranked by meaning and keywords" : "Ranked by keywords (semantic model not loaded)"}. Ask a follow-up to dig deeper.</p>`;
  thinking.scrollIntoView({ block: "end", behavior: "smooth" });
}

function bindUI() {
  const panel = $("#ask-panel");
  const toggle = (open) => { panel.hidden = !open; $("#btn-ask").setAttribute("aria-expanded", open); if (open) $("#ask-input").focus(); };
  $("#btn-ask").addEventListener("click", () => toggle(panel.hidden));
  $("#ask-close").addEventListener("click", () => toggle(false));
  $("#ask-form").addEventListener("submit", (e) => { e.preventDefault(); const i = $("#ask-input"); ask(i.value); i.value = ""; });
  $("#ask-suggest").addEventListener("click", (e) => { const b = e.target.closest("button"); if (b) ask(b.textContent); });
  $("#ask-reset").addEventListener("click", () => { history.length = 0; $("#ask-log").innerHTML = ""; greet(); });
  document.addEventListener("keydown", (e) => {
    if (e.key === "a" && !e.metaKey && !e.ctrlKey && !/INPUT|TEXTAREA|SELECT/.test(e.target.tagName)) { e.preventDefault(); toggle(true); }
    if (e.key === "Escape" && !panel.hidden && document.getElementById("detail").hidden) toggle(false);
  });
}
function greet() { bubble("bot", `Ask me anything about your ${skills.length} skills. I'll point you to the best ones and pull out the relevant steps.`); }

(async function init() {
  bindUI(); setBadge();
  try {
    const [s, e] = await Promise.all([fetch("skills.json").then((r) => r.json()), fetch("embeddings.json").then((r) => r.ok ? r.json() : null).catch(() => null)]);
    skills = s.skills || [];
    if (e && e.chunks) chunks = e.chunks;
    else { // fallback: section chunks without vectors -> keyword only
      chunks = skills.flatMap((k) => [{ skill: k.id, section: "Overview", text: k.name + ". " + k.description },
        ...k.body.split(/\n(?=#{1,4}\s)/).map((p) => ({ skill: k.id, section: (p.match(/^#{1,4}\s+(.+)/) || [, "Intro"])[1], text: p.replace(/^#{1,4}\s+.+/, "").trim() }))]);
    }
    greet();
    if (e && e.chunks) loadModel(); else { modelState = "failed"; setBadge(); }
  } catch (err) { console.error(err); }
})();
