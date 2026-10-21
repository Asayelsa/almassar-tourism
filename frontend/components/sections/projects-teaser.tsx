import type { Dictionary } from '@/content/dictionaries'
import type { Locale } from '@/content/i18n'
import { projects } from '@/content/projects-data'
import { Reveal } from '@/components/reveal'
import { WorkCard } from '@/components/work-card'
import { Button } from '@/components/ui/button'

export function ProjectsTeaser({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section className="px-6 py-24 sm:py-32 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <Reveal className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-xl">
            <p className="font-mono text-xs uppercase tracking-widest2 text-ink/40 dark:text-paper/40">
              {dict.home.projects.eyebrow}
            </p>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl dark:text-paper">
              {dict.home.projects.headline}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-ink/60 dark:text-paper/60">{dict.home.projects.sub}</p>
          </div>
          <Button href={`/${locale}/projects`} variant="secondary">
            {dict.home.projects.cta}
          </Button>
        </Reveal>

        <div className="mt-14 grid gap-10 sm:grid-cols-3">
          {projects.slice(0, 3).map((project, i) => (
            <Reveal key={project.slug} delay={i * 0.08}>
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
  )
}
