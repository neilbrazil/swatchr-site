/** Copies dist/ into the repo root, which is what GitHub Pages serves.
 *  Everything the build owns is removed first so deleted pages actually
 *  disappear; landing/ and the git metadata are left alone. */
import { cpSync, existsSync, readdirSync, rmSync, statSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const repo = resolve(root, "..");

if (!existsSync(dist)) {
  console.error("No dist/ — run `npm run build` first.");
  process.exit(1);
}

const KEEP = new Set([
  ".git",
  ".gitignore",
  ".nojekyll",
  "landing",
  "CNAME",
  "app.md", // research + placement notes, not published content
]);

for (const name of readdirSync(repo)) {
  if (KEEP.has(name)) continue;
  rmSync(join(repo, name), { recursive: true, force: true });
}

for (const name of readdirSync(dist)) {
  const src = join(dist, name);
  cpSync(src, join(repo, name), {
    recursive: statSync(src).isDirectory(),
  });
}

console.log("deployed dist/ -> " + repo);
