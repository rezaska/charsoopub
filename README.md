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
| `concept/` | Client-facing pages: visual direction, brief, CMS guide — see `concept/README.md` |
| `IA-and-direction.md` | Sitemap, design direction, open questions |

## Client-facing pages

Written for the client, not for us. The file in `concept/` is the source of
truth; the link is the published copy she gets sent. Edit the file, then
republish. Details and how to send them: `concept/README.md`.

| | source | live |
|---|---|---|
| راهنمای افزودن محتوا به سایت — the publisher's step-by-step CMS guide, in Persian | `concept/cms-guide.html` | [open](https://claude.ai/code/artifact/a284d4c4-5fe3-4273-902b-ac2b037ed736) |
| Rebuild brief — what is being built, what is settled, what is open | `concept/brief.html` | [open](https://claude.ai/code/artifact/8c9fd985-d6d4-4aa6-b5d4-0045b439af54) |
| Visual direction — typography, colour, the issue accent system | `concept/index.html` | [open](https://claude.ai/code/artifact/6d493161-40b0-4a6e-82af-ffc0e2a56ca7) |

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
