# charsoopub

Website rebuild for **انتشارات پیام چارسو** — Charsoo Publishing, Tehran.
A literary and performing-arts press that also publishes the quarterly
**فصلنامه پیام چارسو** (Charsoo Quarterly, theatre & cinema).

- Existing site: `charsoo-mag.ir` — WordPress 5.6.23, content frozen since March 2021
- Instagram: [@charsoopub](https://www.instagram.com/charsoopub/) — the active channel

## Layout

| path | what |
|---|---|
| `archive/` | Full capture of the old site, taken 2026-11-07 — see `archive/ARCHIVE.md` |
| `archive/raw/` | WordPress REST dump + complete `wp-content/uploads` inventory |
| `archive/content/` | Every page and post as plain-text markdown |
| `archive/media/` | 49 original files, 112 MB — **irreplaceable**, 29 more were already lost |
| `archive/covers/` | Renamed, sRGB-converted, front-only covers (8 issues + 17 books) |
| `archive/web/` | Web-optimised covers used by the concept pages |
| `concept/` | Visual direction + client brief (published as artifacts) |
| `IA-and-direction.md` | Sitemap, design direction, open questions |

## Status

Archive complete. Visual direction drafted. Awaiting client answers on six
questions (see `IA-and-direction.md`) before build starts.

### Known blockers

- Cover originals needed for issues ۳، ۴، ۵، ۸ — server copies are too small to use
- Old site is served over a **self-signed certificate**; browsers block it until replaced

## Notes for whoever picks this up

- Everything is RTL Persian. Build `dir="rtl"` from the start, not retrofitted.
- 16 recovered files are **CMYK** print JPEGs. Convert to sRGB before display —
  Chrome renders CMYK with shifted colours.
- Persian numerals (۱۲۳) and Shamsi dates throughout. The old site mixed both systems.
