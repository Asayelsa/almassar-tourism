import type { Metadata } from 'next'
import { isLocale, defaultLocale, type Locale } from '@/content/i18n'
import { getDictionary } from '@/content/dictionaries'
import { Hero } from '@/components/sections/hero'
import { Intro } from '@/components/sections/intro'
import { ServicesPreview } from '@/components/sections/services-preview'
import { DestinationsTeaser } from '@/components/sections/destinations-teaser'
import { ProjectsTeaser } from '@/components/sections/projects-teaser'
import { InsightsTeaser } from '@/components/sections/insights-teaser'
import { Differentiators } from '@/components/sections/differentiators'
import { CtaBanner } from '@/components/sections/cta-banner'
import { Stats } from '@/components/sections/stats'
import { Partners } from '@/components/sections/partners'
import { homeMetrics } from '@/content/metrics-data'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale: raw } = await params
  const locale: Locale = isLocale(raw) ? raw : defaultLocale
  const dict = getDictionary(locale)
  return {
    title: dict.seo.homeTitle,
    description: dict.seo.homeDescription,
    alternates: { canonical: `/${locale}`, languages: { en: '/en', ar: '/ar' } },
  }
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params
  const locale: Locale = isLocale(raw) ? raw : defaultLocale
  const dict = getDictionary(locale)

  return (
    <main>
  <div style={{ background: '#16a34a', color: 'white', padding: '12px', textAlign: 'center' }}>
    اختبار تحديث GitHub - المسار السياحية
  </div>
      <Hero locale={locale} dict={dict} />
      <Intro dict={dict} />
      <Stats items={homeMetrics} locale={locale} />
      <ServicesPreview locale={locale} dict={dict} />
      <DestinationsTeaser locale={locale} dict={dict} />
      <ProjectsTeaser locale={locale} dict={dict} />
      <InsightsTeaser locale={locale} dict={dict} />
      <Differentiators
        eyebrow={dict.home.why.eyebrow}
        headline={dict.home.why.headline}
        items={dict.about.differentiators.items}
      />
      <Partners dict={dict} />
      <CtaBanner
        headline={dict.home.finalCta.headline}
        sub={dict.home.finalCta.sub}
        primaryLabel={dict.home.finalCta.primary}
        primaryHref={`/${locale}/contact`}
      />
    </main>
  )
}
