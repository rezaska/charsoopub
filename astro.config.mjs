import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// Served from the apex domain in production. BASE_PATH lets CI publish the
// same build under a sub-path (rezaska.github.io/charsoopub/) for preview,
// until the real domain is pointed here.
const base = process.env.BASE_PATH || "/";
const site = process.env.SITE_URL || "https://charsoo-mag.ir";

export default defineConfig({
  site,
  base,
  // Static output: the build is a folder of files, uploaded to the host.
  // Nothing runs on the server, so there is nothing to patch.
  output: "static",
  build: { format: "directory" },
  image: { responsiveStyles: true },
  // robots.txt already points at the sitemap; this is what generates it.
  // The admin panel is excluded — it is noindex and of no use to a crawler.
  integrations: [sitemap({ filter: (page) => !page.includes("/admin") })],
});
