/**
 * Tiny i18n helper — bilingual content objects.
 *
 *   t({ ar: 'مرحبا', en: 'Hello' }, 'ar')
 *
 * If the value isn't a bilingual object, it's returned as-is.
 *
 * @template T
 * @param {{ ar: T, en: T } | T} value
 * @param {'ar' | 'en'} locale
 * @returns {T}
 */
export function t(value, locale) {
  if (value && typeof value === "object" && "ar" in value && "en" in value) {
    return /** @type {any} */ (value)[locale];
  }
  return /** @type {any} */ (value);
}
