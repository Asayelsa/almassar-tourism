import type { Dictionary } from '@/content/dictionaries'
import { Reveal } from '@/components/reveal'

export function Intro({ dict }: { dict: Dictionary }) {
  return (
    <section className="px-6 py-24 sm:py-32 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-widest2 text-ink/40 dark:text-paper/40">
            {dict.home.intro.eyebrow}
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="font-display text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl dark:text-paper">
            {dict.home.intro.headline}
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/65 dark:text-paper/65">
            {dict.home.intro.body}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
