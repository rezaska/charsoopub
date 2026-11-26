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
| `concept/` | The publisher's CMS guide, served at `/admin/guide/` — plus two retired pages |
| `docs/domain.md` | Pointing charsoo-mag.ir at the new site — the two-step DNS change |
| `IA-and-direction.md` | Sitemap, design direction, open questions |

## The publisher's guide

راهنمای افزودن محتوا به سایت — the Persian walkthrough of the content panel,
written for the publisher and readable by anyone who needs it.

- **Live:** <https://charsoo-mag.ir/admin/guide/>
- **Locally:** `npm run dev`, then <http://localhost:4321/admin/guide/>
- **To change it:** edit `concept/cms-guide.html`; `src/pages/admin/guide.astro` renders it
- Also published as an artifact: [راهنمای مدیریت محتوا](https://claude.ai/code/artifact/a284d4c4-5fe3-4273-902b-ac2b037ed736)

Keep it in step with the fields in `public/admin/config.yml`. The other two
pages in `concept/` — the brief and the visual direction — are retired;
`concept/README.md` says what they were.

## Status

Archive complete. Visual direction drafted. Awaiting client answers on six
questions (see `IA-and-direction.md`) before build starts.

**Live at <https://charsoo-mag.ir>** since 2026-11-26. See `docs/domain.md`.

### Known blockers

- Cover originals needed for issues ۳، ۴، ۵، ۸ — server copies are too small to use

## Notes for whoever picks this up

- Everything is RTL Persian. Build `dir="rtl"` from the start, not retrofitted.
- 16 recovered files are **CMYK** print JPEGs. Convert to sRGB before display —
  Chrome renders CMYK with shifted colours.
- Persian numerals (۱۲۳) and Shamsi dates throughout. The old site mixed both systems.
