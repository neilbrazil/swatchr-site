/** Structural checks over the built output. */
import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const BASE = "/swatchr-site/";
let fail = 0;
const bad = (m) => { console.error("FAIL " + m); fail++; };

const walk = (d) => readdirSync(d).flatMap((f) => {
  const p = join(d, f);
  return statSync(p).isDirectory() ? walk(p) : [p];
});
const pages = walk(dist).filter((p) => p.endsWith("index.html"));

// map a site-absolute URL to a file in dist
const toFile = (u) => {
  let p = u.startsWith(BASE) ? u.slice(BASE.length) : u.replace(/^\//, "");
  p = p.split("#")[0].split("?")[0];
  if (p === "" || p.endsWith("/")) p += "index.html";
  return join(dist, p);
};

for (const page of pages) {
  const rel = page.slice(dist.length);
  const html = readFileSync(page, "utf8");

  const h1 = html.match(/<h1[\s>]/g) || [];
  if (h1.length !== 1) bad(`${rel}: ${h1.length} h1 tags`);

  if (!/<link rel="canonical" href="https:\/\//.test(html))
    bad(`${rel}: missing canonical`);
  if (!/<meta name="description" content="[^"]{40,}"/.test(html))
    bad(`${rel}: missing/short meta description`);
  if (!/<meta property="og:image"/.test(html)) bad(`${rel}: no og:image`);

  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { JSON.parse(m[1]); } catch (e) { bad(`${rel}: bad JSON-LD (${e.message})`); }
  }

  for (const m of html.matchAll(/(?:href|src)="(\/[^"]*)"/g)) {
    const f = toFile(m[1]);
    if (!existsSync(f)) bad(`${rel}: dead link ${m[1]}`);
  }
}

// sitemap
const sm = readFileSync(join(dist, "sitemap.xml"), "utf8");
const locs = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
if (locs.length !== pages.length)
  bad(`sitemap has ${locs.length} locs, ${pages.length} pages built`);
for (const l of locs) {
  const f = toFile(new URL(l).pathname);
  if (!existsSync(f)) bad(`sitemap loc has no file: ${l}`);
}
if (!existsSync(join(dist, "robots.txt"))) bad("no robots.txt");

// homepage FAQ: visible questions must equal FAQPage JSON-LD names
const home = readFileSync(join(dist, "index.html"), "utf8");
const visible = [...home.matchAll(/<summary>([\s\S]*?)<\/summary>/g)].map((m) =>
  m[1].replace(/<[^>]+>/g, "").replace(/&#x27;/g, "'").replace(/&amp;/g, "&").trim());
const faqLd = [...home.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
  .map((m) => JSON.parse(m[1])).find((o) => o["@type"] === "FAQPage");
const names = faqLd.mainEntity.map((q) => q.name);
if (JSON.stringify(visible) !== JSON.stringify(names))
  bad(`homepage FAQ mismatch:\n  visible: ${JSON.stringify(visible)}\n  schema:  ${JSON.stringify(names)}`);

console.log(`\nchecked ${pages.length} pages, ${locs.length} sitemap urls, ${names.length} FAQ entries`);
console.log(fail ? `\n${fail} FAILURES` : "\nALL CHECKS PASSED");
process.exit(fail ? 1 : 0);
