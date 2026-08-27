# Swatchr landing site

Vite + React, prerendered to static HTML at build time. No client JS ships.

```bash
cd landing
npm install
npm run dev      # http://localhost:5173 — HMR, client-rendered
npm run build    # -> landing/dist
npm run deploy   # build, then copy dist/ to the repo root for GitHub Pages
```

## Where things live

| Path | What |
|---|---|
| `src/data.ts` | All copy: features, FAQ, guides. Single source of truth. |
| `src/seo.ts` | Page meta + JSON-LD builders, generated from `data.ts`. |
| `src/site.ts` | `ORIGIN` / `BASE`. Change both to move to a custom domain. |
| `src/routes.tsx` | One entry per page. Guides are spread from `data.ts`. |
| `scripts/prerender.mjs` | Renders routes, writes sitemap.xml + robots.txt. |
| `scripts/deploy.mjs` | Copies `dist/` to the repo root, preserving `landing/`. |
| `scripts/verify.mjs` | H1 count, canonicals, JSON-LD, dead links, FAQ parity. |
| `scripts/verify-images.mjs` | Guide feature images: present, unique, wired up. |
| `scripts/genfeature.py` | Regenerates the eight guide feature images. |

## Adding a guide

Append a record to `GUIDES` in `src/data.ts`, add its slug and a hue to
`GUIDES` in `scripts/genfeature.py`, regenerate the image, then build. The
route, sitemap entry, guide cards and schema all follow automatically.

## Checks

```bash
npm run build && node scripts/verify.mjs && node scripts/verify-images.mjs
```

## Deployment

GitHub Pages serves the repo root. `npm run deploy` clears everything the build
owns and copies `dist/` over it, leaving `.git`, `.gitignore`, `.nojekyll`,
`landing/` and `CNAME` alone. `landing/` is excluded in `robots.txt`.

Moving to a custom domain: set `ORIGIN` and `BASE` in `src/site.ts`, add a
`CNAME` file at the repo root, rebuild.
