/* Dev-server only. The production build ships prerendered HTML with no client
   bundle, so nothing here is ever served to a visitor. */
import { createRoot } from "react-dom/client";
import { ROUTES } from "./routes";
import { BASE } from "./site";

const strip = (p: string) => {
  const b = BASE.replace(/\/$/, "");
  const s = p.startsWith(b) ? p.slice(b.length) : p;
  return s.endsWith("/") ? s : s + "/";
};

const path = strip(window.location.pathname);
const route =
  ROUTES.find((r) => r.meta.path === path) ??
  ROUTES.find((r) => r.meta.path === "/")!;

document.title = route.meta.title;
createRoot(document.getElementById("root")!).render(route.element);
