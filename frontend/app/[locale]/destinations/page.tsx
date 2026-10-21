import type { Metadata } from 'next'
import { isLocale, defaultLocale, type Locale } from '@/content/i18n'
import { getDictionary } from '@/content/dictionaries'
import { PageHero } from '@/components/page-hero'
import { Reveal } from '@/components/reveal'
import { WorldMap } from '@/components/world-map'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale: raw } = await params
  const locale: Locale = isLocale(raw) ? raw : defaultLocale
  const dict = getDictionary(locale)
  return {
    title: dict.seo.destinationsTitle,
    description: dict.seo.destinationsDescription,
    alternates: { canonical: `/${locale}/destinations`, languages: { en: '/en/destinations', ar: '/ar/destinations' } },
  }
}

export default async function DestinationsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params
  const locale: Locale = isLocale(raw) ? raw : defaultLocale
  const dict = getDictionary(locale)

  return (
    <main>
      <PageHero
        eyebrow={dict.destinationsPage.hero.eyebrow}
        headline={dict.destinationsPage.hero.headline}
        sub={dict.destinationsPage.hero.sub}
        image="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=2400&q=80"
        imageAlt=""
      />

      <section className="bg-ink px-6 py-20 text-paper sm:py-28 lg:px-10">
        <div className="mx-auto max-w-5xl text-center">
          <Reveal>
            <WorldMap className="mx-auto w-full max-w-3xl text-paper" />
            <p className="mt-6 font-display text-2xl font-semibold tracking-tight sm:text-3xl">
              {dict.destinationsPage.mapCaption}
            </p>
            <p className="mx-auto mt-3 max-w-lg text-sm text-paper/50">{dict.destinationsPage.mapNote}</p>
          </Reveal>
        </div>
      </section>

      <section className="px-6 py-24 sm:py-32 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <Reveal className="max-w-2xl">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl dark:text-paper">
              {dict.destinationsPage.categoriesHeadline}
            </h2>
            <p className="mt-4 leading-relaxed text-ink/60 dark:text-paper/60">{dict.destinationsPage.categoriesSub}</p>
          </Reveal>

          <div className="mt-14 grid gap-px overflow-hidden rounded-3xl bg-ink/10 sm:grid-cols-2 lg:grid-cols-3 dark:bg-paper/10">
            {dict.destinationsPage.categories.map((category, i) => (
              <Reveal
                key={category.title}
                delay={(i % 6) * 0.05}
                className="bg-paper p-7 dark:bg-ink"
              >
                <h3 className="font-display text-lg font-semibold tracking-tight text-ink dark:text-paper">
                  {category.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/60 dark:text-paper/60">{category.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
