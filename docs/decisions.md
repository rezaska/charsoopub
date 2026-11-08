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

| | Needed for |
|---|---|
| Current issue number | The homepage hero, and whether issues 9+ are missing |
| Back-issue PDFs | Real tables of contents instead of a cover and a paragraph |
| Cover originals for ۳، ۴، ۵، ۸ | Those four are below usable web resolution |
| Domain registrar access | Pointing charsoo-mag.ir at Pages |

PDFs are expected to exist. When they arrive, tables of contents and
contributor names can be extracted from them rather than typed by hand —
which is what makes `/people` worth building.
