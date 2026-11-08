import { defineConfig } from "astro/config";

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
});
