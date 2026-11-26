# Content editing

The client adds books and issues themselves, roughly three or four times a year.
This is the setup, and the fallback if GitHub turns out to be unreachable from Tehran.

## Testing it

Two ways, and it is worth doing both in this order.

### 1. Locally — nothing leaves your machine

```
npm run dev
open http://localhost:4321/admin/
```

Click **Work with Local Repository** and pick the repo root. Chrome or Edge only
(it needs the File System Access API). No account, no network.

Saving writes straight into `src/content/` as real markdown, so `git status`
shows exactly what the CMS produced — the clearest way to see whether a field
maps the way you expect. `git checkout .` throws the test away.

To see a change rendered, leave `npm run dev` running in a second terminal: the
dev server rebuilds on save, so the page updates in a couple of seconds.

### 2. On the live site — the path the publisher will take

Open `/admin/` on the deployed site, choose **Sign In Using Access Token**,
follow the link to GitHub (scopes are pre-selected), and paste the token back.
From then on the browser remembers it.

A save here is a real commit to `main` and triggers a deploy, so test with
something disposable — a news item called "تست" — then delete it from the panel
afterwards. Both the creation and the deletion are ordinary commits, so nothing
is unrecoverable.

The admin UI language follows the browser. Sveltia ships a complete Persian
translation (409 strings), so a Persian browser gets a fully Persian RTL panel.

## Primary: Sveltia CMS (no server)

`/admin/` is a **static page**. There is no PHP, no database, no login system of
ours, and nothing running on the server — so there is nothing here to keep patched.

```
client opens  charsoo-mag.ir/admin/
   ↓ signs in with GitHub
   ↓ fills fields, drops in a cover image
   ↓ commits markdown + image to rezaska/charsoopub
   ↓ build runs → static files deploy
```

Fields are defined once in `public/admin/config.yml`. Every label is Persian.
Adding a field later is one line there plus one line in `src/content.config.ts`.

The CMS bundle is vendored into `public/admin/cms/` by `scripts/copy-cms.mjs`
on postinstall rather than loaded from a CDN — unpkg and jsDelivr are not
dependable from Iran, same reason the font is self-hosted.

### Signing in

Sveltia offers two methods. **Use the access token**, not OAuth:

- **Access token (in use).** The publisher clicks "ورود با استفاده از توکن دسترسی",
  follows the link to GitHub with the right scopes pre-selected, and pastes the
  token once. Stored in that browser. Talks only to github.com, which we have
  confirmed is reachable from her office.
- **OAuth (not used).** Friendlier, and what Sveltia recommends for non-technical
  users — but it needs an OAuth client hosted on Cloudflare Workers, which adds a
  second foreign host to the chain. `workers.dev` reachability from Iran is
  untested, and if it is blocked, sign-in breaks with no fallback. The token
  method has no such dependency, so it is the more robust choice here despite
  being slightly less friendly.

A publisher-facing walkthrough in Persian covering sign-in and all three
collections lives in `concept/cms-guide.html` and is served from the site at
`/admin/guide/`, next to the panel it describes — a plain URL she can be given,
and one anyone else can read. **Keep it updated when fields change here**, or it
describes a form that no longer exists. `concept/README.md` has the detail.

### Giving the publisher access

She needs a GitHub account of her own and write access to this repo. In order:

1. **She** signs up at `github.com/signup` with her own email — her account,
   not one made for her. GitHub will likely require two-factor authentication;
   an authenticator app on her phone is the least fragile option, and she
   should save the recovery codes somewhere that is not her phone.
2. **We** invite her: repo → Settings → Collaborators → Add people → her
   username → role **Write**. Write is enough to commit content. Admin would
   also let her change settings and delete the repo.
3. **She** accepts the emailed invitation. Until she does, the panel loads and
   then fails on save, which looks like a bug rather than a permission.
4. **She** signs in at `/admin/` and creates the token, as the guide describes.

`auth_scope: public_repo` in `public/admin/config.yml` keeps that token narrow.
Sveltia's default is `repo`, which asks for every repository on her account
including private ones she might create later. This repo is public, so the
narrower scope is all the CMS needs — worth keeping if the repo ever goes
private, in which case it has to become `repo` and the trade-off returns.

Tokens expire. Classic tokens can be set to no expiry, which is the right
choice here: a token that dies in ninety days means a confused publisher and a
support call, for a token that only reaches public repositories anyway.

### The dependency to test first

The client's browser must reach **github.com**. Generally fine from Iran since
2021, but disrupted during national internet restrictions.

**Ask them to open github.com from the office and report whether it loads
normally.** If it does not, use the fallback.

## Fallback: PocketBase (one binary)

If GitHub is not reliably reachable:

- A single Go binary with SQLite and a built-in admin UI that already does
  image upload and typed fields
- Runs on a cheap Iranian VPS; Astro pulls from it at build time
- Updating it means replacing **one file** — no plugin ecosystem, no PHP
  version churn, no CVE treadmill

It is a server, so it is not maintenance-free. But it is a very different risk
profile from WordPress, and the client's editing experience is the same.

## Pages is on

`DEPLOY_TARGET` was set to `pages` on 2026-11-08, so every push to `main`
builds and deploys. The site is served from **charsoo-mag.ir** and the guide
from **charsoo-mag.ir/admin/guide/**.

`public/CNAME` is what tells Pages which hostname to answer on. The build ran
under a `/charsoopub/` sub-path until 2026-11-25, which is why `src/lib/url.ts`
exists — it is no longer needed for the sub-path, but root-absolute paths still
go through it and it costs nothing to leave in place.

Note: Pages publishes from a **private** repo only on GitHub Pro ($4/month).
On a free account it needs a public repo — which would expose the 112 MB of
print-resolution cover artwork in `archive/`. Either pay, or split the archive
into its own private repo first.

## Deployment — settled

Resolved in favour of Pages, above. The worry had been that an Iranian audience
wants Iranian hosting (ArvanCloud, Parspack) and that GitHub Actions cannot push
into an Iranian host — true, but moot: Pages serves the site itself, and it was
measured at 533 ms from the client's network in Tehran with no VPN. See
`docs/decisions.md`.

Pointing the domain is the remaining step, and it is its own document:
`docs/domain.md`.

## Internal flags are not public

`needsReview` on a book and `coverNeedsOriginal` on an issue are notes to us,
not to readers. They render only under `npm run dev`; the live build omits them.
The publisher still sees each one in the CMS as a labelled checkbox
(نیازمند بازبینی, جلد با کیفیت پایین), which is where they are useful — she is
the person who can resolve them.

Anything of that kind belongs behind `import.meta.env.DEV`, or in `docs/`. The
site went live on 2026-11-26 with five book pages whose entire body was such a
note; they read as unfinished to a visitor and said nothing a reader wanted.

## Sharing a link on Telegram

Every page carries a preview card: the wordmark on the house accent, the same
image as the favicon. One card for the whole site — a per-page cover was tried
and dropped, because every issue looks different and a reader could not tell
from a shared link whose it was.

**A URL Telegram has seen before will not pick up a new card on its own.**
`charsoo-mag.ir` had been crawled years earlier, when it was WordPress behind a
self-signed certificate that fails to fetch, and Telegram caches that failure
indefinitely. A page it has never seen previews correctly first time.

Send the URL to **@WebpageBot** to clear it. It keys on the exact string, so
purge every form that might be cached — the one that worked here was not the
one first tried:

```
charsoo-mag.ir
http://charsoo-mag.ir/
https://charsoo-mag.ir          ← no trailing slash is a different key
https://www.charsoo-mag.ir/
```

Then paste into a chat the link is not already sitting in; Desktop and mobile
each hold a local cache on top of the server's, so an existing message never
updates in place.

## Housekeeping

Hook the media uploader to convert **CMYK → sRGB** on upload. Sixteen of the
recovered files are CMYK print JPEGs that render with shifted colours in Chrome,
and the client uploads straight from the designer's print files — so it will
recur forever otherwise. Downscale oversized originals in the same place; they
uploaded a 39 MB TIFF and several 8700×6150 spreads.
