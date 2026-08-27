import { renderToStaticMarkup } from "react-dom/server";
import { ROUTES, type Route } from "./routes";
import { abs, APP_ID, GOOGLE_SITE_VERIFICATION, url } from "./site";

export { ROUTES };
export { ORIGIN, BASE, abs } from "./site";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
   .replace(/"/g, "&quot;");

export function renderRoute(route: Route): string {
  const { meta } = route;
  const canonical = abs(meta.path === "/" ? "/" : meta.path);
  const body = renderToStaticMarkup(route.element);
  const ld = meta.jsonld
    .map(
      (o) =>
        `<script type="application/ld+json">${JSON.stringify(o)}</script>`,
    )
    .join("");

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(meta.title)}</title>
<meta name="description" content="${esc(meta.description)}">
<link rel="canonical" href="${esc(canonical)}">
<meta name="google-site-verification" content="${GOOGLE_SITE_VERIFICATION}">
<meta name="apple-itunes-app" content="app-id=${APP_ID}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Swatchr">
<meta property="og:title" content="${esc(meta.title)}">
<meta property="og:description" content="${esc(meta.description)}">
<meta property="og:url" content="${esc(canonical)}">
<meta property="og:image" content="${esc(meta.image)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(meta.title)}">
<meta name="twitter:description" content="${esc(meta.description)}">
<meta name="twitter:image" content="${esc(meta.image)}">
<meta name="theme-color" content="#0F1E43">
<link rel="icon" type="image/png" href="${esc(url("assets/favicon.png"))}">
<link rel="apple-touch-icon" href="${esc(url("assets/icon.png"))}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="${esc(url("style.css"))}">
${ld}
</head>
<body>
${body}
</body>
</html>
`;
}
