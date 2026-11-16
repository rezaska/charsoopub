# Client-facing pages

Three HTML pages written for the client, not for us. They are not part of the
site's content — they are documents about it.

Each file is an artifact body: no `<!doctype>`, `<html>` or `<head>`, because
that wrapper is added when the artifact is published. Opening one directly in a
browser gives unstyled, left-to-right text. That is expected, not a bug.

## In use

**`cms-guide.html`** — راهنمای افزودن محتوا به سایت. The publisher's
step-by-step walkthrough in Persian: signing in once, then books, issues and
news, field by field. The one page here that is still read and still changes.

It is served from the site at **`/admin/guide/`**, next to the panel it
describes — a plain URL anyone can be given, no sign-in and nothing to share
first. `src/pages/admin/guide.astro` renders this file: it lifts out the
`<title>` and the Google Fonts links (the site's own Vazirmatn is used
instead), and draws the accent strip at build time, since the source builds it
with a script and inserted scripts do not run. Under `/admin/`, so robots.txt
disallows it and it stays out of the sitemap. Nothing links to it.

> The live URL does not exist yet — Pages deployment is still gated off. See
> "Turning Pages on" in `docs/cms.md`. Until then, `npm run dev` and open
> `/admin/guide/`.

A second copy is published as an artifact:
[راهنمای مدیریت محتوا](https://claude.ai/code/artifact/a284d4c4-5fe3-4273-902b-ac2b037ed736).
Same file, so editing it updates both — this page on the next deploy, the
artifact on the next republish. The artifact is private until shared, and
claude.ai's reachability from Iran is untested, so treat `/admin/guide/` as the
address to hand out and the artifact as a convenience.

**Keep it in step with `public/admin/config.yml`.** If a field is added or
renamed in the CMS, the guide is wrong until it is updated here.

### Before the link goes to the publisher

Step 1 tells her to open `charsoo-mag.ir/admin/`. That is only correct once the
domain points at the deployed site — see "Who makes DNS changes" in
`docs/decisions.md`, the open question this is waiting on.

## Retired

Both did their job and are kept only so the reasoning is not lost. Neither is
maintained; read them as a record of what was decided in November 2026, not as
a description of what is true now.

| file | was | artifact |
|---|---|---|
| `brief.html` | The rebuild brief — what is being built, what is settled, what is open | [link](https://claude.ai/code/artifact/8c9fd985-d6d4-4aa6-b5d4-0045b439af54) |
| `index.html` | Visual direction — typography, colour, the issue accent system | [link](https://claude.ai/code/artifact/6d493161-40b0-4a6e-82af-ffc0e2a56ca7) |

`docs/decisions.md` is where the current answers live.
