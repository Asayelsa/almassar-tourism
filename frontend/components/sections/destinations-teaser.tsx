import type { Dictionary } from '@/content/dictionaries'
import type { Locale } from '@/content/i18n'
import { Reveal } from '@/components/reveal'
import { WorldMap } from '@/components/world-map'
import { Button } from '@/components/ui/button'

export function DestinationsTeaser({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section className="overflow-hidden bg-ink px-6 py-24 text-paper sm:py-32 lg:px-10">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-widest2 text-accent">{dict.home.destinations.eyebrow}</p>
          <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            {dict.home.destinations.headline}
          </h2>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-paper/65">{dict.home.destinations.body}</p>
          <Button href={`/${locale}/destinations`} variant="outline-light" className="mt-8">
            {dict.home.destinations.cta}
          </Button>
        </Reveal>
        <Reveal delay={0.1} className="text-paper/70">
          <WorldMap className="w-full" />
        </Reveal>
      </div>
    </section>
  )
}
