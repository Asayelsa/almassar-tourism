import type { Metadata } from 'next'
import { isLocale, defaultLocale, type Locale } from '@/content/i18n'
import { getDictionary } from '@/content/dictionaries'
import { PageHero } from '@/components/page-hero'
import { Reveal } from '@/components/reveal'
import { ContactForm } from '@/components/sections/contact-form'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale: raw } = await params
  const locale: Locale = isLocale(raw) ? raw : defaultLocale
  const dict = getDictionary(locale)
  return {
    title: dict.seo.contactTitle,
    description: dict.seo.contactDescription,
    alternates: { canonical: `/${locale}/contact`, languages: { en: '/en/contact', ar: '/ar/contact' } },
  }
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params
  const locale: Locale = isLocale(raw) ? raw : defaultLocale
  const dict = getDictionary(locale)

  return (
    <main>
      <PageHero
        eyebrow={dict.nav.contact}
        headline={dict.contactPage.hero.headline}
        sub={dict.contactPage.hero.sub}
        image="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=2400&q=80"
        imageAlt=""
      />

      <section className="px-6 py-20 sm:py-28 lg:px-10">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-widest2 text-ink/40 dark:text-paper/40">
              {dict.nav.contact}
            </p>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl dark:text-paper">
              {dict.contactPage.hero.headline}
            </h2>
            <p className="mt-5 leading-relaxed text-ink/60 dark:text-paper/60">{dict.contactPage.note}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <ContactForm dict={dict} />
          </Reveal>
        </div>
      </section>
    </main>
  )
}
