/**
 * Builds a standalone copy of the content panel for Iranian hosting.
 *
 * The CMS bundle is 822 KB gzipped. The publisher's connection serves the
 * site (5 KB a page) but stalls partway through a single file that size from
 * GitHub Pages, so /admin/ never renders for her. Served from her own host in
 * Tehran it is a local download.
 *
 * Only the panel moves. The public site stays on Pages, and the panel still
 * commits through api.github.com, which her connection handles — those calls
 * are small.
 *
 * Output is panel-dist/ plus panel.zip, both gitignored. Run after a build:
 *   npm run build && node scripts/make-panel.mjs
 */
import { cp, rm, mkdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";

const SRC = "dist/admin";
const OUT = "panel-dist";

if (!existsSync(SRC)) {
  console.error(`[make-panel] ${SRC} not found — run npm run build first.`);
  process.exit(1);
}

await rm(OUT, { recursive: true, force: true });
await mkdir(OUT, { recursive: true });

// Served from the subdomain root rather than /admin/, so the absolute paths
// the Astro build emits have to become relative to the page.
const html = (await readFile(`${SRC}/index.html`, "utf8"))
  .replace('src="/admin/cms/sveltia-cms.js"', 'src="cms/sveltia-cms.js"')
  .replace('href="/favicon.ico"', 'href="favicon.ico"');
await writeFile(`${OUT}/index.html`, html);

await cp(`${SRC}/config.yml`, `${OUT}/config.yml`);
await cp(`${SRC}/cms`, `${OUT}/cms`, { recursive: true });
await cp("public/favicon.ico", `${OUT}/favicon.ico`);

console.log(`[make-panel] wrote ${OUT}/`);
