import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { locales, isLocale, defaultLocale, type Locale } from '@/content/i18n'
import { getDictionary } from '@/content/dictionaries'
import { insights, getInsight } from '@/content/insights-data'
import { Reveal } from '@/components/reveal'

export function generateStaticParams() {
  return locales.flatMap((locale) => insights.map((insight) => ({ locale, slug: insight.slug })))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale: raw, slug } = await params
  const locale: Locale = isLocale(raw) ? raw : defaultLocale
  const insight = getInsight(slug)
  if (!insight) return {}
  return {
    title: insight[locale].title,
    description: insight[locale].summary,
    alternates: {
      canonical: `/${locale}/insights/${slug}`,
      languages: { en: `/en/insights/${slug}`, ar: `/ar/insights/${slug}` },
    },
  }
}

export default async function InsightDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale: raw, slug } = await params
  const locale: Locale = isLocale(raw) ? raw : defaultLocale
  const dict = getDictionary(locale)
  const insight = getInsight(slug)
  if (!insight) notFound()
  const copy = insight[locale]

  return (
    <main>
      <section className="relative flex min-h-[56vh] items-end overflow-hidden bg-ink pb-16 pt-40">
        <div className="absolute inset-0">
          <Image
            src={insight.image}
            alt={insight.imageAlt[locale]}
            fill
            priority
            sizes="100vw"
            className="animate-ken-burns object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/30" />
        </div>
        <div className="relative mx-auto w-full max-w-3xl px-6 lg:px-10">
          <Reveal>
            <span className="rounded-full bg-accent px-3 py-1 font-mono text-[10px] uppercase tracking-widest2 text-ink">
              {dict.common.sampleArticle}
            </span>
            <h1 className="mt-5 font-display text-4xl font-semibold leading-tight tracking-tight text-paper sm:text-5xl">
              {copy.title}
            </h1>
            <p className="mt-4 font-mono text-xs uppercase tracking-widest2 text-paper/50">
              {copy.category} · {insight.date}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="px-6 py-20 sm:py-28 lg:px-10">
        <div className="mx-auto max-w-2xl">
          <Reveal>
            <Link
              href={`/${locale}/insights`}
              className="font-mono text-xs uppercase tracking-widest2 text-teal transition-colors hover:text-teal-strong"
            >
              {locale === 'ar' ? '→' : '←'} {dict.insightsPage.detail.backLabel}
            </Link>

            <p className="mt-10 text-xl leading-relaxed text-ink/80 dark:text-paper/80">{copy.summary}</p>
            <div className="mt-6 space-y-5">
              {copy.body.map((p) => (
                <p key={p} className="leading-relaxed text-ink/65 dark:text-paper/65">
                  {p}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  )
}
