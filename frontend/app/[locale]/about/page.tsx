import type { Metadata } from 'next'
import { isLocale, defaultLocale, type Locale } from '@/content/i18n'
import { getDictionary } from '@/content/dictionaries'
import { PageHero } from '@/components/page-hero'
import { Reveal } from '@/components/reveal'
import { Differentiators } from '@/components/sections/differentiators'
import { CtaBanner } from '@/components/sections/cta-banner'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale: raw } = await params
  const locale: Locale = isLocale(raw) ? raw : defaultLocale
  const dict = getDictionary(locale)
  return {
    title: dict.seo.aboutTitle,
    description: dict.seo.aboutDescription,
    alternates: { canonical: `/${locale}/about`, languages: { en: '/en/about', ar: '/ar/about' } },
  }
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params
  const locale: Locale = isLocale(raw) ? raw : defaultLocale
  const dict = getDictionary(locale)

  return (
    <main>
      <PageHero
        eyebrow={dict.about.hero.eyebrow}
        headline={dict.about.hero.headline}
        image="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=2400&q=80"
        imageAlt=""
      />

      <section className="px-6 py-24 sm:py-32 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-widest2 text-ink/40 dark:text-paper/40">
              {dict.about.who.eyebrow}
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl dark:text-paper">
              {dict.about.who.title}
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/65 dark:text-paper/65">
              {dict.about.who.body}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-24 sm:pb-32 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 sm:grid-cols-2">
          <Reveal className="rounded-3xl bg-ink/[0.03] p-10 dark:bg-paper/[0.04]">
            <h3 className="font-display text-2xl font-semibold tracking-tight text-ink dark:text-paper">
              {dict.about.vision.title}
            </h3>
            <p className="mt-4 leading-relaxed text-ink/65 dark:text-paper/65">{dict.about.vision.body}</p>
          </Reveal>
          <Reveal delay={0.08} className="rounded-3xl bg-ink/[0.03] p-10 dark:bg-paper/[0.04]">
            <h3 className="font-display text-2xl font-semibold tracking-tight text-ink dark:text-paper">
              {dict.about.mission.title}
            </h3>
            <p className="mt-4 leading-relaxed text-ink/65 dark:text-paper/65">{dict.about.mission.body}</p>
          </Reveal>
        </div>
      </section>

      <Differentiators
        eyebrow={dict.about.differentiators.eyebrow}
        headline={dict.about.differentiators.headline}
        items={dict.about.differentiators.items}
      />

      <CtaBanner headline={dict.about.cta.headline} primaryLabel={dict.about.cta.button} primaryHref={`/${locale}/contact`} />
    </main>
  )
}
