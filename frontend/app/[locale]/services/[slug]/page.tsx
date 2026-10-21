import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { locales, isLocale, defaultLocale, type Locale } from '@/content/i18n'
import { getDictionary } from '@/content/dictionaries'
import { services, getService } from '@/content/services-data'
import { corporateEventsMetric } from '@/content/metrics-data'
import { PageHero } from '@/components/page-hero'
import { Reveal } from '@/components/reveal'
import { CtaBanner } from '@/components/sections/cta-banner'
import { Stats } from '@/components/sections/stats'

export function generateStaticParams() {
  return locales.flatMap((locale) => services.map((service) => ({ locale, slug: service.slug })))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale: raw, slug } = await params
  const locale: Locale = isLocale(raw) ? raw : defaultLocale
  const service = getService(slug)
  if (!service) return {}
  return {
    title: service[locale].title,
    description: service[locale].summary,
    alternates: {
      canonical: `/${locale}/services/${slug}`,
      languages: { en: `/en/services/${slug}`, ar: `/ar/services/${slug}` },
    },
  }
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale: raw, slug } = await params
  const locale: Locale = isLocale(raw) ? raw : defaultLocale
  const dict = getDictionary(locale)
  const service = getService(slug)
  if (!service) notFound()
  const copy = service[locale]

  return (
    <main>
      <PageHero
        eyebrow={`${dict.nav.services} · ${service.number}`}
        headline={copy.title}
        sub={copy.summary}
        image={service.image}
        imageAlt={service.imageAlt[locale]}
      />

      <section className="px-6 py-20 sm:py-28 lg:px-10">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <Link
              href={`/${locale}/services`}
              className="font-mono text-xs uppercase tracking-widest2 text-teal transition-colors hover:text-teal-strong"
            >
              {locale === 'ar' ? '→' : '←'} {dict.servicesPage.detail.backLabel}
            </Link>
            <p className="mt-6 text-lg leading-relaxed text-ink/65 dark:text-paper/65">{copy.description}</p>
          </Reveal>

          <Reveal delay={0.08} className="mt-14">
            <p className="font-mono text-[11px] uppercase tracking-widest2 text-ink/40 dark:text-paper/40">
              {dict.servicesPage.capabilitiesLabel}
            </p>
            <div className="mt-5 grid gap-x-8 gap-y-6 sm:grid-cols-2">
              {copy.capabilities.map((cap, i) => (
                <div key={cap.title} className="flex items-start gap-3 border-b border-ink/10 pb-5 dark:border-paper/10">
                  <span className="mt-0.5 shrink-0 font-mono text-xs text-accent">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <p className="text-sm font-medium text-ink dark:text-paper">{cap.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-ink/60 dark:text-paper/60">{cap.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          {service.slug === 'tourism-investment-advisory' && (
            <Reveal delay={0.12} className="mt-12 rounded-2xl border border-teal/25 bg-teal/[0.05] p-8 dark:bg-teal/[0.08]">
              <p className="text-sm leading-relaxed text-ink/70 dark:text-paper/70">{dict.servicesPage.investmentNote}</p>
            </Reveal>
          )}
        </div>
      </section>

      {service.slug === 'corporate-travel-events' && (
        <Stats items={[corporateEventsMetric]} locale={locale} />
      )}

      <CtaBanner
        headline={dict.servicesPage.detail.ctaHeadline}
        sub={dict.servicesPage.detail.ctaSub}
        primaryLabel={dict.servicesPage.detail.ctaButton}
        primaryHref={`/${locale}/contact`}
      />
    </main>
  )
}
