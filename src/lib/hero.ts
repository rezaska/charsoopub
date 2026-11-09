import type { CollectionEntry } from "astro:content";
import { fa, seasonLabel, shamsi, toman, onAccent } from "./fa";

/**
 * Whatever leads the homepage, reduced to one shape.
 *
 * An issue, a book and a news item carry different fields but occupy the same
 * slot, so each is mapped here rather than branching inside the template.
 */
export interface Hero {
  kicker: string;
  title: string;
  sub?: string;
  dek?: string;
  image?: string;
  /** Issues bring their own; everything else uses the house colour. */
  accent: string;
  onAccent: string;
  href: string;
  cta: string;
  /** Second, quieter action — omitted where there is nothing useful to offer. */
  altHref?: string;
  altCta?: string;
}

const HOUSE = "#c83a4d";

/**
 * The hero holds one short paragraph. Descriptions are written for a detail
 * page and can run long, which would push the buttons out of view, so they are
 * trimmed here on a word boundary rather than constraining what she can write.
 */
const trim = (text: string | undefined, max = 180): string | undefined => {
  if (!text) return undefined;
  const flat = text.replace(/\s+/g, " ").trim();
  if (flat.length <= max) return flat;
  return flat.slice(0, flat.lastIndexOf(" ", max)).replace(/[،,.؛]$/, "") + "…";
};

const make = (h: Omit<Hero, "onAccent">): Hero => ({
  ...h,
  dek: trim(h.dek),
  onAccent: onAccent(h.accent),
});

export const fromIssue = (e: CollectionEntry<"issues">): Hero =>
  make({
    kicker: `شماره‌ی ${fa(e.data.number)} · ${seasonLabel(e.data.number)}`,
    title: `ویژه‌نامه‌ی ${e.data.play}`,
    sub: "فصلنامه‌ی تخصصی سینما و تئاتر پیام چارسو",
    dek: e.body?.trim() || undefined,
    image: e.data.cover,
    accent: e.data.accent,
    href: `/magazine/${e.data.number}/`,
    cta: "مشاهده‌ی فهرست مطالب",
    altHref: "/contact/",
    altCta: "تهیه‌ی نسخه‌ی چاپی",
  });

export const fromBook = (e: CollectionEntry<"books">): Hero => {
  const by = [e.data.author, e.data.translator && `ترجمه‌ی ${e.data.translator}`]
    .filter(Boolean)
    .join(" · ");
  const soon = e.data.status === "به‌زودی";
  return make({
    kicker: soon ? "به‌زودی" : e.data.series || e.data.form,
    title: e.data.title,
    sub: by || undefined,
    dek: e.body?.replace(/^>.*$/gm, "").trim() || undefined,
    image: e.data.cover,
    accent: HOUSE,
    href: `/books/${e.id}/`,
    cta: "درباره‌ی این کتاب",
    // Nothing to buy yet, so no second action on a forthcoming title.
    altHref: soon ? undefined : "/contact/",
    altCta: soon ? undefined : "تهیه‌ی کتاب",
  });
};

export const fromNews = (e: CollectionEntry<"news">): Hero =>
  make({
    kicker: shamsi(e.data.date),
    title: e.data.title,
    dek: e.data.summary,
    image: e.data.image,
    accent: HOUSE,
    href: `/news/${e.id}/`,
    cta: "ادامه‌ی خبر",
  });

/**
 * Picks what leads the homepage.
 *
 * A ticked item wins; with nothing ticked the newest issue leads, which is what
 * the site did before this existed and means the slot can never come up empty.
 * Issues are checked first so that during the normal case — a new issue is out
 * and ticked — the order is obvious.
 */
export const pickHero = (
  issues: CollectionEntry<"issues">[],
  books: CollectionEntry<"books">[],
  news: CollectionEntry<"news">[],
): Hero => {
  const issue = issues.find((e) => e.data.featured);
  if (issue) return fromIssue(issue);

  const book = books.find((e) => e.data.featured);
  if (book) return fromBook(book);

  const item = news.find((e) => e.data.featured);
  if (item) return fromNews(item);

  const newest = [...issues].sort((a, b) => b.data.number - a.data.number)[0];
  return fromIssue(newest);
};

export { toman };
