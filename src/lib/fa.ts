/** Persian typography helpers. The old site mixed ۱۲۳ with 123 — never do that. */

const FA_DIGITS = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

/** 1396 → ۱۳۹۶ */
export const fa = (n: number | string): string =>
  String(n).replace(/\d/g, (d) => FA_DIGITS[Number(d)]);

/** 38000 → ۳۸٬۰۰۰ تومان — Arabic thousands separator, not a comma. */
export const toman = (n: number | null | undefined): string =>
  n == null ? "تماس بگیرید" : `${fa(n.toLocaleString("en-US").replace(/,/g, "٬"))} تومان`;

/** فصل یکم … فصل هشتم — the press numbers issues as seasons. */
const ORDINALS = ["", "یکم", "دوم", "سوم", "چهارم", "پنجم", "ششم", "هفتم", "هشتم",
                  "نهم", "دهم", "یازدهم", "دوازدهم"];
export const seasonLabel = (n: number): string =>
  ORDINALS[n] ? `فصل ${ORDINALS[n]}` : `شماره‌ی ${fa(n)}`;

/**
 * Readable text colour for an arbitrary issue accent.
 *
 * Picks whichever of ink or white actually has the higher contrast ratio,
 * rather than guessing from a luminance threshold — a threshold put white
 * text on issue 6's salmon band at 2.36:1, well under the 4.5:1 minimum,
 * when ink on the same colour gives 6.6:1.
 */
const INK = "#17171b";
const PAPER = "#ffffff";

const luminance = (hex: string): number => {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  const lin = (c: number) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
};

/** WCAG contrast ratio between two hex colours. */
export const contrast = (a: string, b: string): number => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

export const onAccent = (hex: string): string =>
  contrast(hex, INK) >= contrast(hex, PAPER) ? INK : PAPER;

/** A Gregorian date rendered in the Shamsi calendar: ۱۴ تیر ۱۳۹۸ */
export const shamsi = (d: Date): string =>
  new Intl.DateTimeFormat("fa-IR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(d);
