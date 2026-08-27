/** Deployment constants. The site is a GitHub Pages project page, so every
 *  site-absolute path carries the `/swatchr-site/` prefix. */
export const ORIGIN = "https://neilbrazil.github.io";
export const BASE = "/swatchr-site/";
export const SITE = ORIGIN + BASE.replace(/\/$/, "");

export const APP_ID = "6798627720";
export const APP_STORE_URL =
  "https://apps.apple.com/us/app/swatchr-color-picker/id6798627720";
export const SUPPORT_EMAIL = "neilbrazil83+apps@gmail.com";

/** Google Search Console site-verification token. Google only reads this on
 *  the verified URL, but it is emitted on every page so a re-verification
 *  against any path still succeeds. Removing it un-verifies the property. */
export const GOOGLE_SITE_VERIFICATION =
  "c2ceYkYa7YYI_VhHImzYbsitVUbdn5hZkYl3jHs13rk";

/** Join a site-relative path onto the Pages base path. */
export const url = (path: string) =>
  BASE + path.replace(/^\//, "");

/** Absolute form of the same, for canonicals, OG tags and JSON-LD. */
export const abs = (path: string) => ORIGIN + url(path);
