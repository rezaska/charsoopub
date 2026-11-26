# Pointing charsoo-mag.ir at the new site

Everything below is ready to run. The one thing missing is the cPanel password —
see "What is still needed".

## Where DNS is managed

The domain's nameservers are `ns25.irpowerweb.com` / `ns26.irpowerweb.com`, so
the records are edited in the host's **cPanel → Zone Editor**. Not at IRNIC, and
not through a support ticket.

```
panel    https://cp23-66.cp.fnv.privatedns.biz:2083
webmail  https://cp23-66.cp.fnv.privatedns.biz:2096
```

That hostname resolves to `78.157.35.72` — the same IP that serves the website.
One server runs the site, the mail and the panel, which is the whole reason the
cutover needs two steps instead of one.

## The records today

Checked 2026-11-25:

```
charsoo-mag.ir        A      78.157.35.72
www                   CNAME  charsoo-mag.ir
mail                  CNAME  charsoo-mag.ir
MX               0    charsoo-mag.ir
TXT                   v=spf1 ip4:78.157.35.67 ip4:78.157.35.72 … ~all
```

**`MX` and `mail` both chain to the apex.** Repoint the apex `A` record and the
mail follows it to GitHub, which runs no mail server — delivery stops, with no
bounce to tell anyone. That is the trap this document exists to avoid.

## First, a question worth thirty seconds

Log into webmail and look at whether any `@charsoo-mag.ir` mailbox holds real
mail. The contact page uses `charsoomagazine@gmail.com`, so the domain
addresses may never have been used.

- **Mailboxes in use** → do step 1, wait, then step 2.
- **Nothing there** → skip step 1 and go straight to step 2.

Do not guess at this. The cost of asking is a minute; the cost of being wrong is
silently dropped mail.

## Step 1 — cut mail loose from the apex

In Zone Editor:

| action | type | name | value |
|---|---|---|---|
| replace the CNAME | `A` | `mail` | `78.157.35.72` |
| edit | `MX` | `@` | `mail.charsoo-mag.ir`, priority `10` |

Now mail points at the server by its own record rather than by following the
website. The TTL is 900 seconds, so **wait fifteen minutes** before step 2 and
confirm:

```sh
dig +short mail.charsoo-mag.ir   # → 78.157.35.72
dig +short charsoo-mag.ir MX     # → 10 mail.charsoo-mag.ir.
```

Leave the SPF record alone. It already lists `78.157.35.72`, so outgoing mail
keeps passing.

## Step 2 — move the website

| action | type | name | value |
|---|---|---|---|
| replace `78.157.35.72` | `A` | `@` | `185.199.108.153` |
| add | `A` | `@` | `185.199.109.153` |
| add | `A` | `@` | `185.199.110.153` |
| add | `A` | `@` | `185.199.111.153` |
| replace the CNAME | `CNAME` | `www` | `rezaska.github.io` |

Those four are GitHub's Pages addresses. All four, not one — they are what makes
the site resolve if a datacentre drops.

## Step 3 — the repo side

Mine to do, about ten minutes, once DNS is moving:

1. `public/CNAME` containing `charsoo-mag.ir`
2. Drop `BASE_PATH` and `SITE_URL` from `.github/workflows/build.yml`, so the
   build goes back to base `/` instead of the `/charsoopub/` sub-path
3. Settings → Pages → Custom domain: `charsoo-mag.ir`
4. Wait for the certificate, **then** tick Enforce HTTPS

Step 4 is not optional and not instant. GitHub issues a Let's Encrypt
certificate once it sees the DNS, usually within the hour. Ticking the box
before that serves errors to every visitor.

## Checking it worked

```sh
dig +short charsoo-mag.ir              # → the four 185.199.x addresses
curl -sI https://charsoo-mag.ir/ | head -1
curl -s https://charsoo-mag.ir/admin/guide/ | grep -o '<title>[^<]*'
```

The guide is the useful thing to check last: it is the page that gets handed to
the publisher, and its first instruction names this domain.

## Rolling back

Put the apex `A` record back to `78.157.35.72`. The old WordPress install is
untouched on that server throughout — nothing in this process deletes anything.
Fifteen minutes and it is as it was.

## Two things not to forget

**Keep paying the host.** The site moves to GitHub, but the nameservers stay at
IRPowerWeb and the mail stays on their server. Letting the account lapse takes
the DNS down with it, and the domain with that.

**The guide's first line names this domain.** `concept/cms-guide.html` step 1
tells the publisher to open `charsoo-mag.ir/admin/`. That is wrong until this is
done and right immediately after — so if the guide goes out before the cutover,
that line has to say `rezaska.github.io/charsoopub/admin/` instead.

## What is still needed

The **cPanel username and password**, from the publisher. The email she
forwarded has the server details but no credentials; hosts usually send those
separately when the account is created.

A cPanel login is full access — site files, every mailbox, the lot. If she would
rather not hand the whole account over, the alternative is that she signs in and
is walked through the Zone Editor. Six record edits, but she is the reader we
wrote `concept/cms-guide.html` for, which is the argument for doing it for her.
