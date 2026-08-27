import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // Bundle react into dist-ssr so scripts/prerender.mjs can import the server
  // entry as a standalone module.
  ssr: { noExternal: true },
});
