'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { withLocale, type Locale } from '@/content/i18n'

interface LocaleSwitcherProps {
  locale: Locale
  tone?: 'auto' | 'light'
  className?: string
}

/** Renders the literal "العربية | English" switcher, preserving the current route. */
export function LocaleSwitcher({ locale, tone = 'auto', className }: LocaleSwitcherProps) {
  const pathname = usePathname() || '/'
  const base = tone === 'light' ? 'text-paper/50 hover:text-paper' : 'text-ink/50 hover:text-ink dark:text-paper/50 dark:hover:text-paper'
  const active = tone === 'light' ? 'text-paper' : 'text-ink dark:text-paper'

  return (
    <div className={cn('flex items-center gap-2 font-mono text-xs', className)}>
      <Link
        href={withLocale(pathname, 'ar')}
        aria-current={locale === 'ar' ? 'page' : undefined}
        className={cn('transition-colors', locale === 'ar' ? active : base)}
      >
        العربية
      </Link>
      <span className={tone === 'light' ? 'text-paper/30' : 'text-ink/30 dark:text-paper/30'}>|</span>
      <Link
        href={withLocale(pathname, 'en')}
        aria-current={locale === 'en' ? 'page' : undefined}
        className={cn('transition-colors', locale === 'en' ? active : base)}
      >
        English
      </Link>
    </div>
  )
}
