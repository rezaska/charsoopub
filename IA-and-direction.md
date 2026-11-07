# چارسو — information architecture & design direction

Working draft, 2026-11-07. Based on the archived 2017–2022 site plus the @charsoopub Instagram.

## Brand hierarchy

**انتشارات پیام چارسو** — the publishing house — is the parent brand.
**فصلنامه پیام چارسو** — the seasonal quarterly — is one product line under it.

This matches the Instagram handle (`charsoopub`) and fixes the old site, which led with the
magazine and buried the press on a single page. Everything below follows from it.

Naming to settle with the client: the site links to `@payamcharsoo`, the active account is
`@charsoopub`. One should redirect to the other.

## Sitemap

```
/                       خانه
├── /books              کتاب‌ها          ← primary section
│   └── /books/:slug    one title
├── /magazine           فصلنامه
│   ├── /magazine/issues            همه‌ی شماره‌ها
│   ├── /magazine/issues/:n         one issue — cover, season, TOC, contributors
│   └── /magazine/subscribe         اشتراک
├── /people             نویسندگان و مترجمان   ← contributor index
│   └── /people/:slug   one person: their books + their articles
├── /news               اخبار و رویدادها
├── /about              درباره‌ی ما
├── /contact            تماس با ما
└── /en                 English landing page (not a full mirror)
```

### Books taxonomy

- **Form:** نمایشنامه · مجموعه داستان · رمان · نظریه و پژوهش
- **Origin:** تألیف / ترجمه
- **Person:** نویسنده · مترجم

Every book record needs: title, author, translator, form, year, ISBN, page count, cover,
description, price, and *where to buy*. Price must be a client-editable field — the prices on
the old site are from ~2020 and are now meaningless.

### Issue records

Each of the 8 issues gets a real page: cover, issue number in Persian numerals, season + Shamsi
year, the play it covers, full table of contents, and contributor links. This is the single
biggest content gain over the old site, where issues existed only as marketing blurbs.

## Why the contributor index matters

Buried in the old copy: interviews with **Peter Brook**, **Eugenio Barba and Julia Varley**,
Samuel Nunes, Rafael Oroweider. Writing from محمد چرمشیر، ناهید طباطبایی، نسیم مرعشی،
رضا آشفته، رامتین شهبازی، هلن اولیایی‌نیا، and David Crystal and Kiernan Ryan in translation.

A Peter Brook interview is a reason for a theatre scholar anywhere to visit this site. Right now
those names are unlabelled text inside page-builder blocks. `/people` turns the back catalogue
into something findable, and it is cheap to build because the data already exists.

## Design direction

The brand already has a strong system. The site should extend it, not replace it.

**The wordmark.** The hand-drawn calligraphic چارسو (white on black, 4500×4500) is excellent and
should anchor the identity. It carries across every magazine cover and sits as a colophon tab on
every book cover. Keep it; don't redraw it.

**Per-issue accent colour.** Each magazine cover uses a full-width colour band across the lower
third carrying the wordmark, a bulleted contents list, and a metadata line
(`فصلنامه‌ی پیام‌چارسو | بهار ۱۳۹۶ | ۱۵۰۰۰ تومان`). The band colour changes per issue:

| ۱ | ۲ | ۳ | ۴ | ۵ | ۶ | ۷ | ۸ |
|---|---|---|---|---|---|---|---|
| mint green | red | orange | orange | slate blue | orange | olive | red |

**This is the design system.** Each issue page themes itself from its own cover colour. It is
authentic to the print object, it costs nothing, and it makes the archive feel designed rather
than templated.

**Book series system.** White field, small colour tab top-right holding the چارسو colophon,
title and author centred above a single illustration. Already consistent across ~17 titles —
the catalogue grid should preserve that rhythm rather than crop it into uniform thumbnails.

### Typography

- **RTL-first.** `dir="rtl"` on the document, CSS logical properties throughout. Not retrofitted.
- Body: **Vazirmatn** — variable, well-built, the strongest open-source Persian family.
- Headings: a display face with more character. The covers set a literary tone that a single
  UI font will flatten.
- **Persian numerals (۱۲۳) everywhere.** The old site mixed ۱۲۳ and 123 inside single sentences.
- **Shamsi dates.** The old site shipped a Gregorian calendar widget labelled in Farsi.

### Bilingual scope

The publishing licence (permit #78875, وزارت فرهنگ و ارشاد اسلامی, winter 1395) is Farsi +
English. Recommend an English *landing* page — who they are, what the quarterly is, how to
subscribe or stock it — rather than a full mirror. A full mirror doubles all content work
forever and will go stale the way the old site did.

## Open questions for the client

1. Is the quarterly still publishing? Issue 8 was printed in late 2021 — is there a 9?
2. Selling online, or keep "contact us" + retailer links (ایران‌کتاب، پیشگاه، گسترش، چشمه)?
3. Do they have the back-issue content digitally — PDFs, InDesign files, article text?
   This decides whether `/magazine/issues/:n` holds a real TOC or just a cover.
4. High-resolution covers for issues 3, 4, 5 and 8 — the server copies are too small to use.
5. Where will it be hosted? A `.ir` domain on an Iranian IP rules out Vercel/Netlify/Cloudflare.
6. Who updates the site after launch, and how technical are they?

## Stack note

Pending Q5 and Q6, a clean modern WordPress with a custom RTL theme and no page builder is
probably right: the client can add books and issues themselves, and it hosts anywhere including
inside Iran. The objection to the current site is how it was built, not WordPress itself.
