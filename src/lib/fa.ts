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

/** Readable contrast against an arbitrary issue accent. */
export const onAccent = (hex: string): string => {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  const lin = (c: number) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  const L = 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
  return L > 0.42 ? "#17171b" : "#ffffff";
};
