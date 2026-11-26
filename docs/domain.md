# Pointing charsoo-mag.ir at the new site

**Done 2026-11-26.** The site is live on the domain. Kept as the record of what
changed, and as the rollback reference if it ever needs undoing.

The zone as it now stands:

```
charsoo-mag.ir.       900  A      185.199.108.153  .109.153  .110.153  .111.153
www.charsoo-mag.ir.   900  CNAME  rezaska.github.io
mail.charsoo-mag.ir. 14400 A      78.157.35.72          ← unchanged, old server
charsoo-mag.ir.       900  MX     10 mail.charsoo-mag.ir
ftp.charsoo-mag.ir.   900  A      78.157.35.72          ← unchanged
TXT × 4                              SPF, DKIM, two AutoSSL leftovers — unchanged
```

Mail never moved. It was decoupled from the apex first, so the website change
could not touch it.

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

The full zone, read from the Zone Editor on 2026-11-25. This is the rollback
reference — if anything goes wrong, these are the values to put back.

```
charsoo-mag.ir.                     900  A      78.157.35.72
mail.charsoo-mag.ir.                900  CNAME  charsoo-mag.ir
www.charsoo-mag.ir.                 900  CNAME  charsoo-mag.ir
ftp.charsoo-mag.ir.                 900  A      78.157.35.72
charsoo-mag.ir.                     900  MX     0  charsoo-mag.ir
default._domainkey.charsoo-mag.ir.  900  TXT    v=DKIM1; k=rsa; p=MIIBIjAN…
charsoo-mag.ir.                     900  TXT    v=spf1 ip4:78.157.35.67 … ~all
_cpanel-dcv-test-record…            900  TXT    (cPanel AutoSSL leftover)
_acme-challenge…                    900  TXT    (cPanel AutoSSL leftover)
```

Only four of these change: `mail`, `MX`, the apex `A` and `www`. **`ftp` keeps
its own `A` record**, so it stays on the old server untouched, and the DKIM and
SPF records are mail's, not the website's — leave all of them alone.

The DKIM record is worth noticing. Mail here was not left at defaults; someone
set up signing for it. That is the argument for doing step 1 rather than
assuming the mailbox is empty.

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

Done 2026-11-25, while step 1 propagated:

1. ✅ `public/CNAME` containing `charsoo-mag.ir`
2. ✅ `BASE_PATH` and `SITE_URL` dropped from `.github/workflows/build.yml`, so
   the build serves from base `/` instead of the `/charsoopub/` sub-path
3. Settings → Pages → Custom domain: `charsoo-mag.ir`
4. Wait for the certificate, **then** tick Enforce HTTPS

Between 2 and the apex change, neither URL works — the sub-path build is gone
and the domain does not point here yet. That gap is expected and nobody is
using the github.io address.

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

## What happened on the night

Two things worth remembering, because both will recur.

**cPanel refuses mismatched TTLs.** Adding the three extra apex `A` records
failed until their TTL was set to `900` to match the existing one — the Add
Record form defaults to `14400`. Same name and type must share a TTL.

**A stale local DNS cache will lie to you.** The first check after the change
returned the *old* WordPress site, because the machine doing the checking still
had the previous record cached. `dig @8.8.8.8` and `dig @1.1.1.1` bypass it;
`curl --resolve` forces a specific address. Do not conclude anything from a
browser alone for the first fifteen minutes.

## Leftovers worth clearing one day

`_cpanel-dcv-test-record` and `_acme-challenge` are from cPanel's AutoSSL trying
to certify a site that no longer lives there. Harmless — GitHub validates over
HTTP, not DNS — but they are noise in the zone.
