import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { locales, isLocale, defaultLocale, type Locale } from '@/content/i18n'
import { getDictionary } from '@/content/dictionaries'
import { projects, getProject } from '@/content/projects-data'
import { Reveal } from '@/components/reveal'

export function generateStaticParams() {
  return locales.flatMap((locale) => projects.map((project) => ({ locale, slug: project.slug })))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale: raw, slug } = await params
  const locale: Locale = isLocale(raw) ? raw : defaultLocale
  const project = getProject(slug)
  if (!project) return {}
  return {
    title: project[locale].title,
    description: project[locale].description,
    alternates: {
      canonical: `/${locale}/projects/${slug}`,
      languages: { en: `/en/projects/${slug}`, ar: `/ar/projects/${slug}` },
    },
  }
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale: raw, slug } = await params
  const locale: Locale = isLocale(raw) ? raw : defaultLocale
  const dict = getDictionary(locale)
  const project = getProject(slug)
  if (!project) notFound()
  const copy = project[locale]

  return (
    <main>
      <section className="relative flex min-h-[56vh] items-end overflow-hidden bg-ink pb-16 pt-40">
        <div className="absolute inset-0">
          <Image
            src={project.image}
            alt={project.imageAlt[locale]}
            fill
            priority
            sizes="100vw"
            className="animate-ken-burns object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/30" />
        </div>
        <div className="relative mx-auto w-full max-w-5xl px-6 lg:px-10">
          <Reveal>
            <span className="rounded-full bg-accent px-3 py-1 font-mono text-[10px] uppercase tracking-widest2 text-ink">
              {dict.common.concept}
            </span>
            <h1 className="mt-5 max-w-2xl font-display text-4xl font-semibold leading-tight tracking-tight text-paper sm:text-5xl">
              {copy.title}
            </h1>
            <p className="mt-4 font-mono text-xs uppercase tracking-widest2 text-paper/50">
              {copy.category} · {project.date}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="px-6 py-20 sm:py-28 lg:px-10">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <Link
              href={`/${locale}/projects`}
              className="font-mono text-xs uppercase tracking-widest2 text-teal transition-colors hover:text-teal-strong"
            >
              {locale === 'ar' ? '→' : '←'} {dict.projectsPage.detail.backLabel}
            </Link>

            <div className="mt-10">
              <p className="font-mono text-[11px] uppercase tracking-widest2 text-ink/40 dark:text-paper/40">
                {dict.projectsPage.detail.overviewLabel}
              </p>
              <p className="mt-3 text-lg leading-relaxed text-ink/70 dark:text-paper/70">{copy.overview}</p>
            </div>

            <div className="mt-10">
              <p className="font-mono text-[11px] uppercase tracking-widest2 text-ink/40 dark:text-paper/40">
                {dict.projectsPage.detail.objectivesLabel}
              </p>
              <ul className="mt-3 space-y-2">
                {copy.objectives.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm leading-relaxed text-ink/70 dark:text-paper/70">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-teal" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10">
              <p className="font-mono text-[11px] uppercase tracking-widest2 text-ink/40 dark:text-paper/40">
                {dict.projectsPage.detail.scopeLabel}
              </p>
              <p className="mt-3 leading-relaxed text-ink/70 dark:text-paper/70">{copy.scope}</p>
            </div>

            <div className="mt-10">
              <p className="font-mono text-[11px] uppercase tracking-widest2 text-ink/40 dark:text-paper/40">
                {dict.projectsPage.detail.phasesLabel}
              </p>
              <div className="mt-3 grid gap-x-8 gap-y-2 sm:grid-cols-2">
                {copy.phases.map((phase, i) => (
                  <div key={phase} className="flex items-start gap-3 border-b border-ink/10 py-2 dark:border-paper/10">
                    <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, '0')}</span>
                    <span className="text-sm text-ink/75 dark:text-paper/75">{phase}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10">
              <p className="font-mono text-[11px] uppercase tracking-widest2 text-ink/40 dark:text-paper/40">
                {dict.projectsPage.detail.outcomesLabel}
              </p>
              <p className="mt-3 leading-relaxed text-ink/70 dark:text-paper/70">{copy.outcomes}</p>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="mt-14">
            <p className="font-mono text-[11px] uppercase tracking-widest2 text-ink/40 dark:text-paper/40">
              {dict.common.gallery}
            </p>
            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              {project.gallery.map((src) => (
                <div key={src} className="relative aspect-[4/3] overflow-hidden rounded-xl">
                  <Image src={src} alt="" fill sizes="33vw" className="object-cover" />
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  )
}
