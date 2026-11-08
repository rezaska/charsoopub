/**
 * Vendors the Sveltia CMS bundle into public/admin/cms/.
 *
 * The admin page could load this from a CDN, but unpkg and jsDelivr are not
 * dependably reachable from Iran — same reason the font is self-hosted.
 * Serving it from our own host removes the dependency entirely.
 *
 * Runs on postinstall; the output is gitignored.
 */
import { cp, rm, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";

const SRC = "node_modules/@sveltia/cms/dist";
const OUT = "public/admin/cms";

if (!existsSync(SRC)) {
  console.error(`[copy-cms] ${SRC} not found — run npm install first.`);
  process.exit(1);
}

await rm(OUT, { recursive: true, force: true });
await mkdir(OUT, { recursive: true });
await cp(SRC, OUT, {
  recursive: true,
  filter: (src) => !src.endsWith(".map"),
});
console.log(`[copy-cms] vendored Sveltia CMS → ${OUT}`);
