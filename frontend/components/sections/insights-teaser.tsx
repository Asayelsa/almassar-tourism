import type { Dictionary } from '@/content/dictionaries'
import type { Locale } from '@/content/i18n'
import { insights } from '@/content/insights-data'
import { Reveal } from '@/components/reveal'
import { WorkCard } from '@/components/work-card'
import { Button } from '@/components/ui/button'

export function InsightsTeaser({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section className="bg-ink/[0.02] px-6 py-24 sm:py-32 lg:px-10 dark:bg-paper/[0.02]">
      <div className="mx-auto max-w-7xl">
        <Reveal className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-xl">
            <p className="font-mono text-xs uppercase tracking-widest2 text-ink/40 dark:text-paper/40">
              {dict.home.insights.eyebrow}
            </p>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl dark:text-paper">
              {dict.home.insights.headline}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-ink/60 dark:text-paper/60">{dict.home.insights.sub}</p>
          </div>
          <Button href={`/${locale}/insights`} variant="secondary">
            {dict.home.insights.cta}
          </Button>
        </Reveal>

        <div className="mt-14 grid gap-10 sm:grid-cols-3">
          {insights.slice(0, 3).map((insight, i) => (
            <Reveal key={insight.slug} delay={i * 0.08}>
              <WorkCard
                href={`/${locale}/insights/${insight.slug}`}
                image={insight.image}
                imageAlt={insight.imageAlt[locale]}
                badge={dict.common.sampleArticle}
                category={insight[locale].category}
                date={insight.date}
                title={insight[locale].title}
                summary={insight[locale].summary}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
