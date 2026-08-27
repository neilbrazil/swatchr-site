/** Every guide must have its own landscape feature image, present in the built
 *  output, with matching intrinsic dimensions and social/schema wiring. */
import { existsSync, readFileSync } from "node:fs";
import { execFileSync } from "node:child_process";

const SITE = "https://neilbrazil.github.io/swatchr-site";
const src = readFileSync("src/data.ts", "utf8");
const slugs = [...src.matchAll(/slug: "([^"]+)"/g)].map((m) => m[1]);

let fail = 0;
const bad = (m) => { console.error("FAIL " + m); fail++; };
const digests = new Map();

for (const slug of slugs) {
  const file = `dist/assets/guides/${slug}-feature.webp`;
  if (!existsSync(file)) { bad(`missing ${file}`); continue; }

  const [w, h] = execFileSync("python3", [
    "-c",
    "import sys;from PIL import Image;im=Image.open(sys.argv[1]);print(im.size[0],im.size[1])",
    file,
  ]).toString().trim().split(" ").map(Number);

  if (w <= h) bad(`${slug}: not landscape (${w}x${h})`);
  if (w !== 1536 || h !== 1024)
    bad(`${slug}: ${w}x${h} does not match the declared 1536x1024`);

  // uniqueness: no two guides may share the same pixels
  const digest = execFileSync("shasum", ["-a", "256", file]).toString().split(" ")[0];
  if (digests.has(digest)) bad(`${slug}: identical image to ${digests.get(digest)}`);
  digests.set(digest, slug);

  const page = readFileSync(`dist/guides/${slug}/index.html`, "utf8");
  const abs = `${SITE}/assets/guides/${slug}-feature.webp`;

  for (const prop of ['property="og:image"', 'name="twitter:image"']) {
    const re = new RegExp(`<meta ${prop} content="([^"]+)"`);
    const got = page.match(re)?.[1];
    if (got !== abs) bad(`${slug}: ${prop} is ${got}`);
  }

  const article = [...page.matchAll(
    /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g,
  )].map((m) => JSON.parse(m[1])).find((o) => o["@type"] === "Article");
  if (article?.image !== abs) bad(`${slug}: Article.image is ${article?.image}`);

  if (!page.includes(`class="feature-img"`)) bad(`${slug}: no hero feature image`);
  if (!/class="feature-img"[^>]*width="1536"[^>]*height="1024"/.test(page))
    bad(`${slug}: hero image missing intrinsic width/height`);
  if (/class="feature-img"[^>]*loading="lazy"/.test(page))
    bad(`${slug}: above-the-fold feature image is lazy-loaded`);
}

console.log(`\n${slugs.length} guides, ${digests.size} distinct images`);
console.log(fail ? `${fail} IMAGE FAILURES` : "ALL IMAGE CHECKS PASSED");
process.exit(fail ? 1 : 0);
