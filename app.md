# app.md — Swatchr: Color Picker

Source of truth for the landing site at `landing/`. Written 2026-08-27.

> **Caveat on provenance.** The app was approved but not yet released when this
> was written, so `https://itunes.apple.com/lookup?id=6798627720` returned
> `resultCount: 0`. Everything below is drawn from the app source, the device
> screenshots and the RevenueCat product catalogue rather than from the live
> listing. Re-run the lookup after release and reconcile.

---

## Identity

| Field | Value |
|---|---|
| App Store name | Swatchr: Color Picker |
| App Store ID | 6798627720 |
| App Store URL | https://apps.apple.com/us/app/swatchr-color-picker/id6798627720 |
| Bundle ID | com.neilbrazil.colorpicker |
| Seller | Neil Brazil |
| Category | Graphics & Design (`GraphicsApplication`) |
| Minimum OS | iOS 18 |
| Price | Free download |
| IAP | `com.neilbrazil.colorpicker.unlock`, non-consumable, $2.99 indicative |
| Site | https://neilbrazil.github.io/swatchr-site/ |
| Prior names | Built as "Color Picker", submitted as "Huedrop", renamed 2026-08-13 |

## One-sentence pitch

Tap any color on screen or from your camera, then copy it in hex, RGB, HSL and
CMYK with one tap.

## Feature list (verified against source, not marketing copy)

**Free tier**
- Live camera picker. `AVFoundation` feed sampled at the crosshair; tap to
  freeze, button becomes "Tap to Resume".
- Photo library picker. Tap a point in any saved image.
- Four format codes on one card: hex, RGB, HSL, CMYK. Tap a row to copy it.
- Approximate color name from the bundled CSS3/SVG extended keyword table
  (~140 entries), matched by Euclidean distance in RGB. `NamedColor.swift`
  documents this as approximate, not perceptual.
- Harmony suggestions. `ColorHarmony.suggestions` returns three colors:
  analogous at −30°, complementary at 180°, analogous at +30°, with saturation
  and lightness held constant. **Site copy must not call all three
  "complementary" — only the middle one is.**

**Behind the one-time unlock** (`PurchaseManager.isPro`)
- Saving to the palette. Gated in `ColorReadoutView`, `HarmonySwatch` and
  `SavedSwatchDetailView`. There is no free allowance of saved swatches.
- Export / share color card.
- Home Screen widget showing the most recent saved color.

**Not in the app** (do not imply these anywhere)
- Pantone or paint-brand matching (licensed data, explicitly out of scope)
- Palette generation or color theory tooling
- Color-blindness simulation
- Any sync, account or backend
- Lock Screen widget (Home Screen small size only)

## Asset manifest

| Asset | Source | Site path |
|---|---|---|
| App icon | 512² PNG | `assets/icon.png`, `assets/logo.png` |
| Favicon | 64² PNG | `assets/favicon.png` |
| 6 device screenshots | `Screenshots/*IMG_*.PNG` (1206×2622) | `assets/screens/*.jpg` (552×1200) |
| 8 guide feature images | generated, `landing/scripts/genfeature.py` | `assets/guides/<slug>-feature.webp` (1536×1024) |

Full-resolution screenshot originals are deliberately not published. They live
in the app repo at `apps/color-picker/Screenshots/`; shipping 20 MB of PNGs
nothing links to would only slow the site down.

**Screenshots deliberately not used.** `Screenshots/final/huedrop/` holds the
store-submitted screenshots. Two of them (`03_save-your-palette`,
`05_pin-to-your-home-screen`) still show the pre-rename "Huedrop" title bar and
widget label. All six carry baked-in marketing headlines that fight the page's
own headings. The raw device captures in `Screenshots/` are post-rename, show
"Swatchr" correctly, and are clean — those are what the site uses.

**Guide feature images.** The skill's default is GPT Image; Neil has no OpenAI
subscription, so these are generated locally instead as deterministic
colour-field artwork (Pillow, seeded on the slug). Eight distinct compositions,
no text or glyphs, drawn from each guide's own hue. Regenerate with
`python3 landing/scripts/genfeature.py landing/public/assets/guides`.

---

## Keyword research

Sources: Astro `get_keyword_suggestions` against Coolors (appId 956480678) on
2026-08-27 for App Store demand, and Google SERP checks via WebSearch for the
long-tails, since the landing page competes on Google rather than in the store.

### App Store demand (Astro, US)

| Keyword | Popularity | Difficulty | Read |
|---|---|---|---|
| color finder | 19 | 23 | Best demand-to-difficulty ratio in the set |
| color palette generator | 17 | 21 | Adjacent; Swatchr does not generate palettes |
| free color identifier | 16 | 17 | Low difficulty, directly on-target |
| rgb color detector | 16 | 13 | Lowest difficulty found |
| colour palette | 16 | 17 | Non-US spelling, worth a keyword-field slot |
| color analyzer | 16 | 21 | On-target |
| color picker | 6 | 23 | Head term, low measured popularity |
| color identifier | 6 | 19 | Head term |
| color wheel | 7 | 43 | Difficulty too high for the traffic |
| color palette | 26 | 42 | Popular but contested |
| pantone | 27 | 44 | **Skip.** Swatchr cannot match Pantone |

### Primary keywords (title, H1, hero, meta description)

1. `color picker from photo`
2. `color picker iPhone camera`
3. `hex code from photo`
4. `color identifier`

### Secondary (section H2s, feature copy)

`rgb hsl cmyk color codes` · `camera eyedropper iPhone` · `save color palette
iPhone` · `complementary color finder` · `css color names` · `color picker
widget`

### Long-tail (one guide page each)

| Slug | Target query | Pain the app solves | Screenshot |
|---|---|---|---|
| `how-to-find-hex-code-from-photo-iphone` | how to find the hex code of a color from a photo on iPhone | Markup's eyedropper gives one value and saves nothing | photo picker |
| `pick-a-color-with-your-iphone-camera` | pick a color with iPhone camera | Reading a real-world color without photographing it first | camera crosshair |
| `hex-rgb-hsl-cmyk-color-codes-explained` | difference between hex rgb hsl cmyk | Converting between notations mid-task | complementary |
| `get-cmyk-values-from-a-photo` | get CMYK values from a color | Print spec from a sampled color | export card |
| `find-complementary-colors-for-any-color` | how to find complementary colors | Picking a second color that works | complementary |
| `save-a-color-palette-on-iphone` | save a color palette on iPhone | Screenshot folders and hex-code notes stop scaling | saved palette |
| `identify-a-color-you-cant-name` | how to identify a color you can't name | Naming a color for someone else | camera crosshair |
| `iphone-color-picker-widget` | iPhone color picker widget | Keeping the working color visible | Home Screen widget |

### SERPs checked and rejected

- **`match paint color from a photo`** — page one is Sherwin-Williams ColorSnap,
  Glidden and Benjamin Moore, all backed by proprietary paint databases.
  Swatchr returns a hex code, not a paint name, so a guide here would rank
  against tools that answer the question properly and convert badly if it did.
- **`convert RGB to CMYK`** — the SERP is about converting image *files* and
  ICC profiles, not single colors. Intent mismatch. The narrower
  "CMYK values from a color in a photo" is targeted instead.
- **`pantone`** — licensed data, explicitly out of scope for the app.

### Placement map

| Surface | Content |
|---|---|
| `<title>` (home) | Swatchr — Color Picker for iPhone Camera and Photos |
| H1 (home) | Color picker for your iPhone camera and photos |
| Meta description | Primary keywords + free/offline/no-account differentiators |
| H2s | What Swatchr does · How it works · A look at the app · Guides · Questions · Get Swatchr |
| FAQ | 10 questions, 8 of which link to their matching guide |
| JSON-LD (home) | SoftwareApplication + FAQPage + WebSite |
| JSON-LD (guide) | Article + BreadcrumbList + FAQPage, plus HowTo on 2 step-shaped guides |

`aggregateRating` is deliberately absent from the schema: the app has no
meaningful rating count yet, and thin rating markup is discounted rather than
rewarded.

---

## ASO recommendations (separate from the website)

1. **Subtitle.** Use the 30 characters on demand terms the title does not
   already carry. `Hex, RGB & CMYK from Camera` covers three keyword-field
   terms and describes the actual free-tier value.
2. **Keyword field.** Superseded by the revised priority list in the Astro
   tracking baseline below — the `colour` spelling turned out to matter far more
   than this first pass assumed. Read that section instead.
3. **Do not chase `pantone` or `color wheel`.** The first is a licensed system
   the app cannot serve, the second is difficulty 43 for popularity 7.
4. **The conversion blocker is rating count, not keywords.** Nothing ranks
   without social proof. Fire the in-app review prompt at a success milestone
   (third color copied, or first palette save) rather than during onboarding.
   iOS allows roughly three prompts a year, so spending one before the user has
   had any value is the expensive mistake.
5. **Re-run this research after release.** Astro `search_app_store` with
   `appId: 6798627720` will show actual ranking positions, which the
   pre-release data cannot.

---

## Astro tracking baseline (2026-08-27)

111 keywords added to Astro against appId 6798627720: **58 on `us`, 53 on `gb`**.
The GB set uses "colour" spellings; the US set carries both.

**Every keyword currently ranks 1000 (unranked).** That is not a problem, it is
the baseline: the app is approved but unreleased, so it is not in the index yet.
The first meaningful read comes a few days after release.

### The "colour" spelling finding — this changes the keyword-field advice

In the **US** store, `colour picker` scores popularity **17** against
`color picker`'s **6**. `colour palette` scores 16 at difficulty 17, where
`color palette` scores 26 at difficulty 42. The British spelling is searched
more, and is easier, in the American store.

The likely cause is non-US English speakers searching a US-region account, but
the cause matters less than the effect: **`colour` earns a slot in the keyword
field even though the listing is US-facing.** My earlier recommendation listed
it as an afterthought. It should be near the front.

### Best demand-to-difficulty, US

| Keyword | Popularity | Difficulty |
|---|---|---|
| color detector | 17 | 13 |
| rgb color detector | 16 | 13 |
| free color identifier | 16 | 17 |
| colour picker | 17 | 17 |
| colour palette | 16 | 17 |
| color analyzer | 16 | 21 |
| color scanner | 24 | 21 |
| color finder | 19 | 23 |

### Avoid, US (difficulty out of proportion to demand)

`color widget` 69 · `pixel color` 67 · `color match` 62 · `swatch` 55 ·
`color matcher` 46 · `color wheel` 43 · `color swatches` 43 · `color palette` 42 ·
`hex color` 41 · `color code` 40

`color match` is the one to be most careful about: popularity 42 is the highest
in the whole set, but difficulty is 62 and the SERP intent is paint matching,
which Swatchr cannot do. High traffic the app cannot serve is worse than no
traffic.

### GB is materially softer

Difficulty runs lower across the board: `colour picker` 11, `colour identifier`
9, `colour finder` 9, `colour analyzer` 5, `colour wheel` 21. If the first
rankings after release are discouraging in the US, GB is the easier place to
establish a position first.

### Revised keyword-field priority

`colour`, `detector`, `identifier`, `finder`, `analyzer`, `scanner`, `eyedropper`,
`hex`, `rgb`, `cmyk`, `hsl`, `swatch`, `palette`, `pixel`, `code`.
Skip anything already in the app name or subtitle; Apple indexes those already.

---

## Known gaps

- **The domain is a GitHub Pages project subpath.** `neilbrazil.github.io/swatchr-site/`
  inherits none of a root domain's authority and cannot be given any. A custom
  domain would be the single biggest ranking improvement available; the build
  handles it via `landing/src/site.ts` (`ORIGIN` and `BASE`) plus a `CNAME`
  file at the repo root.
- Store screenshots need regenerating for the two Huedrop-branded frames before
  any future submission.
- The sitemap must be submitted in Google Search Console after deploy; nothing
  in the build does that.
