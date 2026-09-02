/** Renders every route in ROUTES to dist/<path>/index.html, copies public/
 *  verbatim, and generates sitemap.xml + robots.txt from the same route list
 *  so a new guide never needs a second edit to appear in either. */
import {
  cpSync,
  existsSync,
  mkdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { createHash } from "node:crypto";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");

const { ROUTES, renderRoute, ORIGIN, BASE, abs } = await import(
  join(root, "dist-ssr", "entry-server.js")
);

rmSync(dist, { recursive: true, force: true });
mkdirSync(dist, { recursive: true });
cpSync(join(root, "public"), dist, { recursive: true });

const today = new Date().toISOString().slice(0, 10);

/* `lastmod` is only worth publishing if it is true. Google ignores the field
   when it looks unreliable, and stamping every page with the build date makes
   a CSS tweak claim that all eleven pages changed. So each page's rendered
   HTML is hashed and the date only moves when that hash does. The manifest
   lives beside the source, not in dist/, so it survives a clean build. */
const stampPath = join(root, "sitemap-lastmod.json");
const stamps = existsSync(stampPath)
  ? JSON.parse(readFileSync(stampPath, "utf8"))
  : {};

const locs = [];

for (const route of ROUTES) {
  const html = renderRoute(route);
  const rel = route.meta.path.replace(/^\//, "");
  const outDir = join(dist, rel);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "index.html"), html);

  const hash = createHash("sha256").update(html).digest("hex").slice(0, 16);
  const prev = stamps[route.meta.path];
  if (!prev || prev.hash !== hash) stamps[route.meta.path] = { hash, date: today };

  locs.push({ loc: abs(route.meta.path), lastmod: stamps[route.meta.path].date });
  console.log("rendered", route.meta.path);
}

// Drop stamps for routes that no longer exist.
for (const path of Object.keys(stamps)) {
  if (!ROUTES.some((r) => r.meta.path === path)) delete stamps[path];
}
writeFileSync(stampPath, JSON.stringify(stamps, null, 2) + "\n");

writeFileSync(
  join(dist, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    locs
      // <priority> and <changefreq> are omitted: Google ignores both.
      .map((u) => `  <url><loc>${u.loc}</loc><lastmod>${u.lastmod}</lastmod></url>`)
      .join("\n") +
    `\n</urlset>\n`,
);

writeFileSync(
  join(dist, "robots.txt"),
  `User-agent: *\nAllow: /\nDisallow: ${BASE}landing/\n\n` +
    `Sitemap: ${ORIGIN}${BASE}sitemap.xml\n`,
);

console.log(`\n${ROUTES.length} pages + sitemap.xml + robots.txt -> dist/`);
