// Embed catalogue entries (library.json) for the Ask chat -> library-embeddings.json
// One chunk per entry, same model as build_embeddings.mjs. Skips work if inputs are unchanged.
import fs from "fs";
import crypto from "crypto";
import { pipeline, env } from "@xenova/transformers";
env.cacheDir = process.env.HOME + "/.cache/transformers-js";
const MODEL = "Xenova/all-MiniLM-L6-v2";
const OUT = new URL("./library-embeddings.json", import.meta.url);
let entries = [];
try { entries = JSON.parse(fs.readFileSync(new URL("./library.json", import.meta.url))).entries || []; } catch {}
const chunks = entries.map((e) => ({
  entry: e.id,
  section: "Library",
  text: [e.name, e.summary, e.use_when && `Use when: ${e.use_when}`, e.tags.length && `Tags: ${e.tags.join(", ")}`]
    .filter(Boolean).join(". "),
}));
const inputHash = crypto.createHash("sha256").update(MODEL + JSON.stringify(chunks)).digest("hex");
try {
  if (JSON.parse(fs.readFileSync(OUT)).inputHash === inputHash) {
    console.log(`Library embeddings up to date (${chunks.length} entries)`);
    process.exit(0);
  }
} catch {}
const out = [];
if (chunks.length) {
  const embed = await pipeline("feature-extraction", MODEL);
  for (const c of chunks) {
    const e = await embed(c.text.slice(0, 2000), { pooling: "mean", normalize: true });
    out.push({ ...c, v: Array.from(e.data, (x) => Math.round(x * 1e4) / 1e4) });
  }
}
fs.writeFileSync(OUT, JSON.stringify({ model: MODEL, dim: 384, inputHash, count: out.length, chunks: out }));
console.log(`Embedded ${out.length} library entries`);
