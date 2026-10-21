import type { Metadata } from 'next'
import { isLocale, defaultLocale, type Locale } from '@/content/i18n'
import { getDictionary } from '@/content/dictionaries'
import { Reveal } from '@/components/reveal'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale: raw } = await params
  const locale: Locale = isLocale(raw) ? raw : defaultLocale
  const dict = getDictionary(locale)
  return { title: dict.legal.privacy.title }
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params
  const locale: Locale = isLocale(raw) ? raw : defaultLocale
  const dict = getDictionary(locale)

  return (
    <main className="px-6 py-40 sm:py-48 lg:px-10">
      <Reveal className="mx-auto max-w-2xl">
        <h1 className="font-display text-4xl font-semibold tracking-tight text-ink dark:text-paper">
          {dict.legal.privacy.title}
        </h1>
        <p className="mt-6 leading-relaxed text-ink/65 dark:text-paper/65">{dict.legal.privacy.intro}</p>

        <div className="mt-12 space-y-10">
          {dict.legal.privacy.sections.map((section) => (
            <div key={section.heading}>
              <h2 className="font-display text-lg font-semibold tracking-tight text-ink dark:text-paper">
                {section.heading}
              </h2>
              <p className="mt-2 leading-relaxed text-ink/60 dark:text-paper/60">{section.body}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </main>
  )
}
