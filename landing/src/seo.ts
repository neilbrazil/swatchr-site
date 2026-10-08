import { APP, FAQ, GUIDES, guideBySlug, type Guide } from "./data";
import { abs, APP_ID, APP_STORE_URL, SITE } from "./site";

export type PageMeta = {
  path: string;
  title: string;
  description: string;
  image: string;
  jsonld: unknown[];
};

const faqPage = (entries: { q: string; a: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: entries.map((e) => ({
    "@type": "Question",
    name: e.q,
    acceptedAnswer: { "@type": "Answer", text: e.a },
  })),
});

const breadcrumbs = (trail: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: trail.map((t, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: t.name,
    item: abs(t.path),
  })),
});

export const softwareApplication = () => ({
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: APP.fullName,
  alternateName: APP.name,
  applicationCategory: "GraphicsApplication",
  operatingSystem: APP.minOS + " or later",
  url: SITE + "/",
  installUrl: APP_STORE_URL,
  // aggregateRating is deliberately omitted: the app has too few ratings for
  // the number to be meaningful, and Google discounts thin rating markup.
  author: { "@type": "Person", name: APP.author },
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    description:
      "Free download. A single one-time in-app purchase unlocks the saved palette, Home Screen widget and export cards.",
  },
  screenshot: abs("assets/screens/camera-crosshair-hex.jpg"),
});

const website = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: APP.fullName,
  url: SITE + "/",
});

export const homeMeta = (): PageMeta => ({
  path: "/",
  title: "Swatchr — Color Picker for iPhone Camera and Photos",
  description:
    "Pick any color with your iPhone camera or from a photo and copy it as hex, RGB, HSL or CMYK in one tap. Free download, no account, works offline.",
  image: abs("assets/icon.png"),
  jsonld: [
    softwareApplication(),
    faqPage(FAQ.map(({ q, a }) => ({ q, a }))),
    website(),
  ],
});

export const guidesIndexMeta = (): PageMeta => ({
  path: "/guides/",
  title: "Color Picker Guides — Swatchr",
  description:
    "Practical guides to reading color off a photo or camera: hex codes, CMYK for print, complementary colors, palettes and the Home Screen widget.",
  image: abs("assets/icon.png"),
  jsonld: [
    breadcrumbs([
      { name: "Home", path: "/" },
      { name: "Guides", path: "/guides/" },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      itemListElement: GUIDES.map((g, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: abs(`guides/${g.slug}/`),
        name: g.title,
      })),
    },
  ],
});

export const guideMeta = (slugOrGuide: string | Guide): PageMeta => {
  const g =
    typeof slugOrGuide === "string" ? guideBySlug(slugOrGuide) : slugOrGuide;
  const path = `/guides/${g.slug}/`;
  const image = abs(g.feature.src);
  return {
    path,
    title: `${g.title} — Swatchr`,
    description: g.description,
    image,
    jsonld: [
      {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: g.title,
        description: g.description,
        image,
        mainEntityOfPage: { "@type": "WebPage", "@id": abs(path) },
        author: { "@type": "Person", name: APP.author },
        publisher: { "@type": "Person", name: APP.author },
      },
      breadcrumbs([
        { name: "Home", path: "/" },
        { name: "Guides", path: "/guides/" },
        { name: g.title, path },
      ]),
      faqPage(g.faq),
      ...(g.howto
        ? [
            {
              "@context": "https://schema.org",
              "@type": "HowTo",
              name: g.howto.name,
              step: g.howto.steps.map((s, i) => ({
                "@type": "HowToStep",
                position: i + 1,
                name: s.name,
                text: s.text,
              })),
            },
          ]
        : []),
    ],
  };
};

export const privacyMeta = (): PageMeta => ({
  path: "/privacy/",
  title: "Privacy Policy — Swatchr",
  description:
    "Swatchr has no account, no backend and no sync. Camera and photo access are used only to read color values on the device.",
  image: abs("assets/icon.png"),
  jsonld: [
    breadcrumbs([
      { name: "Home", path: "/" },
      { name: "Privacy Policy", path: "/privacy/" },
    ]),
  ],
});

export const termsMeta = (): PageMeta => ({
  path: "/terms/",
  title: "Terms of Use — Swatchr",
  description:
    "Swatchr is licensed under Apple's Standard EULA. Swatchr Pro is a one-time, non-consumable purchase that never renews.",
  image: abs("assets/icon.png"),
  jsonld: [
    breadcrumbs([
      { name: "Home", path: "/" },
      { name: "Terms of Use", path: "/terms/" },
    ]),
  ],
});

export { APP_ID };
