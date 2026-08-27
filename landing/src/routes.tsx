import type { ReactElement } from "react";
import { GUIDES } from "./data";
import { guideMeta, guidesIndexMeta, homeMeta, privacyMeta, type PageMeta } from "./seo";
import Home from "./pages/Home";
import GuidesIndex from "./pages/GuidesIndex";
import GuidePage from "./pages/GuidePage";
import Privacy from "./pages/Privacy";

export type Route = { meta: PageMeta; element: ReactElement };

export const ROUTES: Route[] = [
  { meta: homeMeta(), element: <Home /> },
  { meta: guidesIndexMeta(), element: <GuidesIndex /> },
  ...GUIDES.map((g) => ({
    meta: guideMeta(g),
    element: <GuidePage slug={g.slug} />,
  })),
  { meta: privacyMeta(), element: <Privacy /> },
];
