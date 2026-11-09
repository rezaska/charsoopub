# Decisions

Answers from the client, and what each one settles. Updated 2026-11-08.

## Settled

**The quarterly is still publishing.** It did not stop after issue 8 — the
website simply stopped reporting it. The current issue number is still to be
confirmed, and any issue after 8 is missing from this repo entirely.

**No online sales.** The model stays as it was: show what is in print, and take
orders by phone, email or Instagram. Retailers remain کتاب‌فروشی پیشگاه،
ایران‌کتاب، پخش گسترش and نشر چشمه.

> No payment gateway, no cart, no stock sync. The `inStock` boolean and the
> `buyLinks` list cover everything required. A book with no `buyLinks` falls
> back to the contact paragraph, which is the normal case.

**Hosting: GitHub Pages.** Confirmed reachable from the client's network in
Tehran — 533 ms, images loading, no VPN. Deploying from `main` on every push.
Resolves the self-signed certificate problem too, since Pages issues HTTPS
automatically once the domain is pointed at it.

**GitHub is reachable**, so the client can sign in to the CMS at `/admin/`.
No fallback backend needed; PocketBase is off the table unless this changes.

**The repository is public.** Raised as a concern because `archive/` holds
112 MB of print-resolution cover artwork; the publisher was asked directly and
is fine with it. Free Pages requires it, so it stays public while hosted there.

## Still open

Published for the client as brief 02; keep the two in step.

| | Needed for |
|---|---|
| Current issue number | The homepage hero, and whether issues 9+ are missing |
| Is برای یک بار هم که شده، زن باش published? | A Booker winner sitting marked forthcoming |
| Titles of the three احمد آرام plays | Three missing books, newly topical after his death |
| Has رادیو چارسو launched? | The only answer that changes the sitemap |
| What was published 2021–2025 | The four-year gap neither source covers |
| **Confirmed contributor list** | `/people`, and filling out the About page |
| Who makes DNS changes | **The only thing blocking launch** |
| Is the ۰۲۱ landline still live? | It is on every page; tied to the old office |
| Which Instagram account is current | @payamcharsoo and @charsoopub both resolve |
| Back-issue PDFs | Real tables of contents instead of a cover and a paragraph |
| Cover originals ۳، ۴، ۵، ۸ + 4 book covers | Below usable resolution, or cropped from promo graphics |

On contributors: the names are recoverable from the archived page text, and
that is where the Peter Brook and Barba interviews were found. But a list
assembled by us from 2017 marketing copy is a poor substitute for one the
publisher confirms — so it is a question, not an inference. `/people` and the
About page both wait on it.
