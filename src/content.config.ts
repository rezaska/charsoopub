import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

/**
 * Two collections, matching how the press actually works:
 *   books  — انتشارات پیام چارسو, the catalogue (the parent brand)
 *   issues — فصلنامه پیام چارسو, the quarterly (one line within it)
 *
 * Field names are English so the code stays greppable; every label the
 * client sees is Persian and lives in public/admin/config.yml.
 */

const FORMS = ["نمایشنامه", "مجموعه داستان", "رمان", "نظریه و پژوهش"] as const;
const ORIGINS = ["تألیف", "ترجمه"] as const;
/** The channel marks every title either منتشر شد or به‌زودی. */
const STATUS = ["موجود", "ناموجود", "به‌زودی"] as const;
const SEASONS = ["بهار", "تابستان", "پاییز", "زمستان"] as const;

const books = defineCollection({
  loader: glob({ base: "./src/content/books", pattern: "**/*.md" }),
  schema: z.object({
    title: z.string(),
    author: z.string().optional(),
    translator: z.string().optional(),
    form: z.enum(FORMS),
    /** Product line, e.g. جیبی‌های چارسو. Most titles have none. */
    series: z.string().optional(),
    origin: z.enum(ORIGINS).default("تألیف"),
    cover: z.string().optional(),
    /** Price in تومان. Null means "ask us" — never a stale number. */
    price: z.number().nullable().default(null),
    isbn: z.string().optional(),
    pages: z.number().optional(),
    /** Shamsi year, e.g. ۱۳۹۹ stored as 1399 */
    year: z.number().optional(),
    status: z.enum(STATUS).default("موجود"),
    buyLinks: z
      .array(z.object({ name: z.string(), url: z.string().url() }))
      .default([]),
    order: z.number().default(0),
    /** Metadata read off a low-resolution cover — client should confirm. */
    needsReview: z.boolean().default(false),
    /** Lead the homepage with this instead of the newest issue. */
    featured: z.boolean().default(false),
  }),
});

const issues = defineCollection({
  loader: glob({ base: "./src/content/issues", pattern: "**/*.md" }),
  schema: z.object({
    number: z.number(),
    /** The play the issue is devoted to */
    play: z.string(),
    playwright: z.string().optional(),
    season: z.enum(SEASONS).optional(),
    year: z.number().optional(),
    cover: z.string().optional(),
    /**
     * The whole design system. Sampled from the printed colour band;
     * the issue page themes itself from this one value.
     */
    accent: z
      .string()
      .regex(/^#[0-9A-Fa-f]{6}$/, "Use a six-digit hex colour, e.g. #C83A4D"),
    price: z.number().nullable().default(null),
    /** True where the recovered cover is below usable web resolution. */
    coverNeedsOriginal: z.boolean().default(false),
    /** Lead the homepage with this issue specifically. */
    featured: z.boolean().default(false),
    toc: z
      .array(
        z.object({
          kind: z.string(),
          title: z.string(),
          by: z.string().optional(),
          page: z.number().optional(),
        }),
      )
      .default([]),
  }),
});

const news = defineCollection({
  loader: glob({ base: "./src/content/news", pattern: "**/*.md" }),
  schema: z.object({
    title: z.string(),
    /** Stored as a real date; rendered in the Shamsi calendar. */
    date: z.coerce.date(),
    summary: z.string().optional(),
    image: z.string().optional(),
    /** Pins this item to the top of /news. */
    pinned: z.boolean().default(false),
    /** Lead the homepage with this item. */
    featured: z.boolean().default(false),
  }),
});

export const collections = { books, issues, news };
