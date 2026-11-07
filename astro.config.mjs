import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://charsoo-mag.ir",
  // Static output: the build is a folder of files, uploaded to the host.
  // Nothing runs on the server, so there is nothing to patch.
  output: "static",
  build: { format: "directory" },
  image: { responsiveStyles: true },
});
