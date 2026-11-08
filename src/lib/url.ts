/**
 * Prefixes a root-absolute path with the site's base path.
 *
 * The site is built for the apex domain (base "/"), but also needs to work
 * when served from a sub-path such as rezaska.github.io/charsoopub/ while
 * the real domain is still being arranged. Astro knows the base at build
 * time; it does not rewrite string paths for us, so every root-absolute
 * src/href goes through here.
 *
 * url("/covers/x.jpg") → "/covers/x.jpg"            (base "/")
 *                      → "/charsoopub/covers/x.jpg" (base "/charsoopub")
 */
const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

export const url = (path: string): string =>
  path.startsWith("/") ? `${BASE}${path}` : path;
