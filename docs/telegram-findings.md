# What the Telegram channel reveals

Read from `t.me/s/charsoopub` on 2026-11-09. Channel name **نشر چارسو**,
332 subscribers, 17 posts between Nov 2025 and Nov 2026 — roughly one a month.
Latest post 2026-11-03.

This matters less as a feed to mirror than as **proof the catalogue on this site
is a year out of date**. Everything below is missing from `src/content/`.

## A whole book series we do not have

**جیبی‌های چارسو** — "Charsoo pocket books", a distinct line:

| Title | Author | Status per channel |
|---|---|---|
| بازی خوبی بود، دستشون درد نکنه! | شمیم شهلا | published 2026-06-02 |
| مرگ برق‌آسای مادربزرگ | ساسان مژده | published 2026-08-24 |
| آن سه‌نفر | بنیامین یزدانی | forthcoming, announced 2026-11-03 |

This is an IA change, not just missing rows: books need a **series** field.

## A Booker winner

**چراغ دل (برای یک بار هم که شده، زن باش)** — Banu Mushtaq, translated by
آذر نوری. Announced 2025-12-18 as forthcoming. The source won the
**International Booker Prize 2025**. No later post confirms publication.

If it is out, it is the most newsworthy title in the catalogue and belongs on
the homepage.

## An entire sub-brand

**رادیو چارسو** — a podcast, announced 2025-12-30, produced with
**انتشارات ققنوس** and **استودیوی رادیو پنجره**. Season one interviews Iranian
writers about how they work. Described as "زیرمجموعه‌ای از انتشارات چارسو".

Nothing on the site mentions it. If it has launched it needs its own section.

## Three plays by احمد آرام

From the 2026-10-20 obituary: *"انتشارات چارسو افتخار داشت از او سه نمایشنامه
منتشر کند"* — three plays by Ahmad Aram, none of which appear in our catalogue
of 19. He died 2026-10-20 (۲۸ مهر).

## The retailer list on our book pages is wrong

A pinned post from 2026-09-13 is the authoritative "how to buy":

1. WhatsApp / Bale / SMS — ۰۹۱۰۲۲۴۵۴۰۸
2. Phone — ۰۹۱۲۲۴۰۶۹۵۹
3. Instagram DM
4. Email — charsoomagazine@gmail.com
5. **کتابفروشی‌های پخش ققنوس**
6. ایران‌کتاب — only some titles

Our book pages still name **پخش گسترش** and **نشر چشمه**, taken from the 2017
site. Distribution has moved to **ققنوس**. This is live, wrong information and
should be corrected before anyone sees the site.

## Naming

The channel calls itself **نشر چارسو** and once **گروه فرهنگی چارسو** — a
cultural group, wider than "انتشارات پیام چارسو". With a press, a quarterly, a
pocket series and a radio show under it, the parent brand may genuinely be
broader than what the site currently claims. Worth confirming.

## Can this be automated?

Yes, and far more easily than Instagram.

- `t.me/s/charsoopub` renders server-side. **No API key, no app review, no
  Business account, no token to refresh.** Verified by fetching it directly.
- Post images are on `cdn4.telesco.pe` and fetch with a plain GET — verified,
  200 and 53 KB for the first one.
- A build-time job could mirror the latest N posts into `src/content/news/`,
  and because the files land in our own repo the reader never touches
  telegram.org — which matters, since Telegram is filtered in Iran.

Two caveats before relying on it:

- `/s/` is a **preview surface, not a documented API**. Telegram can change its
  markup and the scrape breaks. Acceptable for a nice-to-have, not for anything
  the site depends on.
- A mirror republishes their own words verbatim, which is fine — but posts
  include condolences and personal notes that may not belong on a publisher's
  front page. A human should choose what gets through.

**Recommendation:** use the channel as a *source* the way it has been used here
— read it, update the catalogue by hand a few times a year. Automate only if
the client finds that too slow.
