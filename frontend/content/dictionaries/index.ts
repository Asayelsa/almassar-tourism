import type { Locale } from '@/content/i18n'
import { en } from './en'
import { ar } from './ar'

export type Dictionary = typeof en

const dictionaries: Record<Locale, Dictionary> = { en, ar }

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale]
}
