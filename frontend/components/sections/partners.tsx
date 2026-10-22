import type { Dictionary } from '@/content/dictionaries'
import { partners } from '@/content/partners-data'
import { Reveal } from '@/components/reveal'

/** Logo strip for confirmed AL MASSAR partners, using their official marks. */
export function Partners({ dict }: { dict: Dictionary }) {
  return (
    <section className="border-y border-ink/10 px-6 py-20 dark:border-paper/10">
      <div className="mx-auto max-w-7xl">
        <Reveal className="text-center">
          <p className="font-mono text-xs uppercase tracking-widest2 text-ink/40 dark:text-paper/40">
            {dict.home.partners.eyebrow}
          </p>
          <h2 className="mt-4 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl dark:text-paper">
            {dict.home.partners.headline}
          </h2>
        </Reveal>

        <Reveal
          delay={0.08}
          className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6"
        >
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="flex h-24 items-center justify-center rounded-xl bg-white p-4 shadow-sm"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={partner.logo}
                alt={partner.name}
                className={`${partner.maxH ?? 'max-h-10'} w-auto max-w-full object-contain`}
              />
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
