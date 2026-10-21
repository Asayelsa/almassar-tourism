export const locales = ['en', 'ar'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'en'

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value)
}

export function otherLocale(locale: Locale): Locale {
  return locale === 'en' ? 'ar' : 'en'
}

export function dirOf(locale: Locale): 'ltr' | 'rtl' {
  return locale === 'ar' ? 'rtl' : 'ltr'
}

/** Swap the locale segment of a path, keeping the rest of the route intact. */
export function withLocale(pathname: string, locale: Locale): string {
  const segments = pathname.split('/')
  if (segments.length > 1 && isLocale(segments[1])) {
    segments[1] = locale
    return segments.join('/') || `/${locale}`
  }
  return `/${locale}${pathname.startsWith('/') ? pathname : `/${pathname}`}`
}
