/** Deployment constants. The site is a GitHub Pages project page, so every
 *  site-absolute path carries the `/swatchr-site/` prefix. */
export const ORIGIN = "https://neilbrazil.github.io";
export const BASE = "/swatchr-site/";
export const SITE = ORIGIN + BASE.replace(/\/$/, "");

export const APP_ID = "6798627720";
export const APP_STORE_URL =
  "https://apps.apple.com/us/app/swatchr-color-picker/id6798627720";
export const SUPPORT_EMAIL = "neilbrazil83+apps@gmail.com";

/** Join a site-relative path onto the Pages base path. */
export const url = (path: string) =>
  BASE + path.replace(/^\//, "");

/** Absolute form of the same, for canonicals, OG tags and JSON-LD. */
export const abs = (path: string) => ORIGIN + url(path);
