# Client-facing documents

Three standalone HTML pages written for the client, not for us. Each one is also
published as an artifact — the file here is the source of truth; the artifact is
the copy she gets a link to. **Edit the file, then republish.**

| file | what it is | for | live link |
|---|---|---|---|
| `cms-guide.html` | راهنمای افزودن محتوا به سایت — step-by-step walkthrough of `/admin/`, in Persian: signing in once, then books, issues and news field by field | the publisher | [راهنمای مدیریت محتوا](https://claude.ai/code/artifact/a284d4c4-5fe3-4273-902b-ac2b037ed736) |
| `brief.html` | The rebuild brief — what is being built, what is settled, and the open questions | the client | [Charsoo Rebuild Brief](https://claude.ai/code/artifact/8c9fd985-d6d4-4aa6-b5d4-0045b439af54) |
| `index.html` | Visual direction — typography, colour, the issue accent system | the client | [Charsoo Visual Direction](https://claude.ai/code/artifact/6d493161-40b0-4a6e-82af-ffc0e2a56ca7) |

Keep `brief.html` in step with `docs/decisions.md`, and `cms-guide.html` in step
with the fields in `public/admin/config.yml` — if a field is added or renamed in
the CMS, the guide is wrong until it is updated here and republished.

## These files are fragments

They have no `<!doctype>`, `<html>` or `<head>` — that wrapper is added when the
artifact is published, so opening one of these directly in a browser gives you
unstyled, left-to-right text. That is expected, not a bug.

## Sending the guide to the publisher

Two ways, and the second is the safer one for Tehran.

**The artifact link.** Easiest, and it stays current when the page is
republished — but artifacts are private until shared, so it has to be shared
first, and claude.ai's reachability from Iran is not something we have tested.
Do not assume it opens on her end.

**A self-contained file.** Wrap the fragment into a real page and email it as an
attachment. It opens offline, from any browser, with nothing to sign in to:

```sh
{ echo '<!doctype html><html lang="fa" dir="rtl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head><body style="margin:0">'
  cat concept/cms-guide.html
  echo '</body></html>'
} > ~/Desktop/راهنما.html
```

The page pulls Vazirmatn from Google Fonts, which is not dependable from Iran.
If it does not load she gets Tahoma, which renders Persian fine — the layout
holds either way.

## Before it goes out

The guide opens by telling her to visit `charsoo-mag.ir/admin/`. That address is
only correct once the domain points at the deployed site. **Check that step 1
still says the right thing before sending** — see "Who makes DNS changes" in
`docs/decisions.md`, which is the open question this is waiting on.
