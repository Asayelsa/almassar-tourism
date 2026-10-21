import Image from 'next/image'
import Link from 'next/link'
import type { Dictionary } from '@/content/dictionaries'
import type { Locale } from '@/content/i18n'
import { services } from '@/content/services-data'
import { Reveal } from '@/components/reveal'

export function ServicesPreview({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section className="px-6 py-24 sm:py-32 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <Reveal className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-widest2 text-ink/40 dark:text-paper/40">
            {dict.home.services.eyebrow}
          </p>
          <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl dark:text-paper">
            {dict.home.services.headline}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-ink/60 dark:text-paper/60">{dict.home.services.sub}</p>
        </Reveal>

        <div className="mt-16 grid gap-px overflow-hidden rounded-3xl bg-ink/10 sm:grid-cols-3 dark:bg-paper/10">
          {services.map((service, i) => (
            <Reveal key={service.slug} delay={i * 0.08}>
              <Link
                href={`/${locale}/services/${service.slug}`}
                className="group relative block h-full overflow-hidden bg-paper dark:bg-ink"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.imageAlt[locale]}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent" />
                  <span className="absolute start-6 top-6 font-mono text-xs text-accent">
                    {service.number}
                  </span>
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <h3 className="font-display text-xl font-semibold text-paper">{service[locale].title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-paper/70">{service[locale].summary}</p>
                    <span className="mt-4 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest2 text-accent opacity-0 transition-opacity group-hover:opacity-100">
                      {dict.common.learnMore}
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
