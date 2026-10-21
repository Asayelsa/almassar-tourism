import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { isLocale, defaultLocale, type Locale } from '@/content/i18n'
import { getDictionary } from '@/content/dictionaries'
import { services } from '@/content/services-data'
import { PageHero } from '@/components/page-hero'
import { Reveal } from '@/components/reveal'
import { Button } from '@/components/ui/button'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale: raw } = await params
  const locale: Locale = isLocale(raw) ? raw : defaultLocale
  const dict = getDictionary(locale)
  return {
    title: dict.seo.servicesTitle,
    description: dict.seo.servicesDescription,
    alternates: { canonical: `/${locale}/services`, languages: { en: '/en/services', ar: '/ar/services' } },
  }
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params
  const locale: Locale = isLocale(raw) ? raw : defaultLocale
  const dict = getDictionary(locale)

  return (
    <main>
      <PageHero
        eyebrow={dict.servicesPage.hero.eyebrow}
        headline={dict.servicesPage.hero.headline}
        sub={dict.servicesPage.hero.sub}
        image="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=2400&q=80"
        imageAlt=""
      />

      <section className="px-6 py-20 sm:py-28 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-24">
          {services.map((service, i) => {
            const copy = service[locale]
            const imageFirst = i % 2 === 0
            return (
              <div
                key={service.slug}
                className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
              >
                <Reveal className={imageFirst ? 'lg:order-1' : 'lg:order-2'}>
                  <div className="group relative aspect-[5/4] overflow-hidden rounded-3xl">
                    <Image
                      src={service.image}
                      alt={service.imageAlt[locale]}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>
                </Reveal>
                <Reveal delay={0.08} className={imageFirst ? 'lg:order-2' : 'lg:order-1'}>
                  <span className="font-mono text-xs text-accent">{service.number}</span>
                  <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl dark:text-paper">
                    {copy.title}
                  </h2>
                  <p className="mt-4 leading-relaxed text-ink/65 dark:text-paper/65">{copy.description}</p>

                  <p className="mt-6 font-mono text-[11px] uppercase tracking-widest2 text-ink/40 dark:text-paper/40">
                    {dict.servicesPage.capabilitiesLabel}
                  </p>
                  <ul className="mt-3 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">
                    {copy.capabilities.map((cap) => (
                      <li key={cap.title} className="flex items-start gap-2 text-sm text-ink/70 dark:text-paper/70">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-teal" />
                        {cap.title}
                      </li>
                    ))}
                  </ul>

                  <Button href={`/${locale}/services/${service.slug}`} variant="secondary" className="mt-8">
                    {dict.servicesPage.ctaLabel}
                  </Button>
                </Reveal>
              </div>
            )
          })}
        </div>
      </section>
    </main>
  )
}
