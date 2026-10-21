import type { Metadata } from 'next'
import { isLocale, defaultLocale, type Locale } from '@/content/i18n'
import { getDictionary } from '@/content/dictionaries'
import { projects } from '@/content/projects-data'
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
    title: dict.seo.projectsTitle,
    description: dict.seo.projectsDescription,
    alternates: { canonical: `/${locale}/projects`, languages: { en: '/en/projects', ar: '/ar/projects' } },
  }
}

export default async function ProjectsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params
  const locale: Locale = isLocale(raw) ? raw : defaultLocale
  const dict = getDictionary(locale)

  return (
    <main>
      <PageHero
        eyebrow={dict.projectsPage.hero.eyebrow}
        headline={dict.projectsPage.hero.headline}
        sub={dict.projectsPage.hero.sub}
        image="https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=2400&q=80"
        imageAlt=""
      />

      <section className="px-6 py-20 sm:py-28 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, i) => (
              <Reveal key={project.slug} delay={(i % 3) * 0.08}>
                <WorkCard
                  href={`/${locale}/projects/${project.slug}`}
                  image={project.image}
                  imageAlt={project.imageAlt[locale]}
                  badge={dict.common.concept}
                  category={project[locale].category}
                  date={project.date}
                  title={project[locale].title}
                  summary={project[locale].description}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
