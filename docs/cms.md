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
collections is published as an artifact; keep it updated when fields change.

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

## Turning Pages on

The workflow already builds and uploads the site on every push. Deployment is
gated so nothing happens until we decide. To switch it on:

1. Repo **Settings → Pages → Source: GitHub Actions**
2. Repo **Settings → Secrets and variables → Actions → Variables**, add
   `DEPLOY_TARGET` = `pages`
3. For the custom domain, set `charsoo-mag.ir` in Settings → Pages and add a
   `public/CNAME` file containing that hostname

That is the whole switch. Until step 2, the `deploy` job is skipped and the
`build` job just acts as CI.

Note: Pages publishes from a **private** repo only on GitHub Pro ($4/month).
On a free account it needs a public repo — which would expose the 112 MB of
print-resolution cover artwork in `archive/`. Either pay, or split the archive
into its own private repo first.

## Deployment — unresolved

The build output is a plain folder. For an Iranian audience it should sit on
Iranian hosting (ArvanCloud, Parspack) — fast locally, outside sanctions.

The open question is whether **GitHub Actions can push into an Iranian host**;
egress from US-hosted CI to Iranian IPs is unreliable. Two ways round it:

- Build on a small VPS outside Iran that pulls from GitHub and pushes to Arvan
- Deploy somewhere neutral and point the `.ir` domain at it

Worth settling before much more is built on top.

## Housekeeping

Hook the media uploader to convert **CMYK → sRGB** on upload. Sixteen of the
recovered files are CMYK print JPEGs that render with shifted colours in Chrome,
and the client uploads straight from the designer's print files — so it will
recur forever otherwise. Downscale oversized originals in the same place; they
uploaded a 39 MB TIFF and several 8700×6150 spreads.
