import Link from 'next/link'
import { cn } from '@/lib/utils'
import type { Dictionary } from '@/content/dictionaries'
import type { Locale } from '@/content/i18n'

interface LogoProps {
  locale: Locale
  dict: Dictionary
  className?: string
  tone?: 'auto' | 'light'
}

/**
 * Temporary brand mark: a wordmark with a single restrained curved path —
 * a journey line, not a travel-agency icon. Swap this component for a real
 * mark later; every page consumes it from here.
 */
export function Logo({ locale, dict, className, tone = 'auto' }: LogoProps) {
  const textColor = tone === 'light' ? 'text-paper' : 'text-ink dark:text-paper'
  const subColor = tone === 'light' ? 'text-paper/60' : 'text-ink/50 dark:text-paper/50'

  return (
    <Link href={`/${locale}`} className={cn('inline-flex items-center gap-3', className)}>
      <svg
        viewBox="0 0 40 40"
        width="30"
        height="30"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        <path
          d="M6 29C6 29 11 9 20.5 9C30 9 25.5 29 34 29"
          stroke="#D6B77C"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="6" cy="29" r="2" fill="#D6B77C" />
        <circle cx="34" cy="29" r="2" fill="#D6B77C" />
      </svg>
      <span className="flex flex-col leading-none">
        <span className={cn('font-display text-lg font-semibold tracking-wide', textColor)}>
          {dict.brand.name}
        </span>
        <span
          className={cn(
            'mt-1 font-medium uppercase',
            locale === 'ar'
              ? 'font-arabic text-[11px] tracking-normal'
              : 'font-mono text-[10px] tracking-widest2',
            subColor
          )}
        >
          {dict.brand.subtitle}
        </span>
      </span>
    </Link>
  )
}
