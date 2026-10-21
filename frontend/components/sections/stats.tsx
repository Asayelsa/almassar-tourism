import type { Locale } from '@/content/i18n'
import type { Metric } from '@/content/metrics-data'
import { Reveal } from '@/components/reveal'
import { cn } from '@/lib/utils'

export function Stats({ items, locale }: { items: Metric[]; locale: Locale }) {
  const single = items.length === 1

  return (
    <section className="border-y border-ink/10 px-6 py-16 dark:border-paper/10">
      <div
        className={cn(
          'mx-auto grid max-w-7xl gap-10',
          single ? 'max-w-xs text-center' : 'sm:grid-cols-2 lg:grid-cols-4'
        )}
      >
        {items.map((item, i) => (
          <Reveal key={item.en} delay={i * 0.06} className={single ? '' : 'text-center sm:text-start'}>
            <p className="font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl dark:text-paper">
              {item.value}
            </p>
            <p className="mt-2 text-sm text-ink/60 dark:text-paper/60">{item[locale]}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
