import type { Metadata } from 'next'
import { isLocale, defaultLocale, type Locale } from '@/content/i18n'
import { getDictionary } from '@/content/dictionaries'
import { insights } from '@/content/insights-data'
import { PageHero } from '@/components/page-hero'
import { Reveal } from '@/components/reveal'
import { WorkCard } from '@/components/work-card'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale: raw } = await params
  const locale: Locale = isLocale(raw) ? raw : defaultLocale
  const dict = getDictionary(locale)
  return {
    title: dict.seo.insightsTitle,
    description: dict.seo.insightsDescription,
    alternates: { canonical: `/${locale}/insights`, languages: { en: '/en/insights', ar: '/ar/insights' } },
  }
}

export default async function InsightsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params
  const locale: Locale = isLocale(raw) ? raw : defaultLocale
  const dict = getDictionary(locale)

  return (
    <main>
      <PageHero
        eyebrow={dict.insightsPage.hero.eyebrow}
        headline={dict.insightsPage.hero.headline}
        sub={dict.insightsPage.hero.sub}
        image="https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=2400&q=80"
        imageAlt=""
      />

      <section className="px-6 py-20 sm:py-28 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {insights.map((insight, i) => (
              <Reveal key={insight.slug} delay={(i % 3) * 0.08}>
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
    </main>
  )
}
