// Chunk skills by section and embed with all-MiniLM-L6-v2 -> embeddings.json
import fs from "fs";
import { pipeline, env } from "@xenova/transformers";
env.cacheDir = process.env.HOME + "/.cache/transformers-js";
const MODEL = "Xenova/all-MiniLM-L6-v2";
const { skills } = JSON.parse(fs.readFileSync(new URL("./skills.json", import.meta.url)));
const chunks = [];
for (const s of skills) {
  chunks.push({ skill: s.id, section: "Overview", text: `${s.name}. ${s.description}` });
  const parts = s.body.split(/\n(?=#{1,4}\s)/);
  for (const p of parts) {
    const m = p.match(/^#{1,4}\s+(.+)/);
    const section = m ? m[1].trim() : "Intro";
    if (/^sources?$/i.test(section)) continue;
    let text = (m ? p.slice(m[0].length) : p).trim();
    if (text.length < 40) continue;
    // split long sections into ~900-char pieces on paragraph/list boundaries
    const paras = text.split(/\n(?=\s*(?:\d+\.|[-*])\s|\n)/);
    let buf = "";
    for (const para of paras) {
      if ((buf + para).length > 900 && buf) { chunks.push({ skill: s.id, section, text: buf.trim() }); buf = ""; }
      buf += "\n" + para;
    }
    if (buf.trim().length >= 40) chunks.push({ skill: s.id, section, text: buf.trim() });
  }
}
const embed = await pipeline("feature-extraction", MODEL);
const out = [];
for (const c of chunks) {
  const e = await embed(`${c.section}: ${c.text}`.slice(0, 2000), { pooling: "mean", normalize: true });
  out.push({ ...c, v: Array.from(e.data, (x) => Math.round(x * 1e4) / 1e4) });
}
fs.writeFileSync(new URL("./embeddings.json", import.meta.url), JSON.stringify({ model: MODEL, dim: 384, count: out.length, chunks: out }));
console.log(`Embedded ${out.length} chunks from ${skills.length} skills`);
