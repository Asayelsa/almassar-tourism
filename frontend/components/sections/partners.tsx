import type { Dictionary } from '@/content/dictionaries'
import { partners } from '@/content/partners-data'
import { Reveal } from '@/components/reveal'

/**
 * Wordmark strip for confirmed AL MASSAR partners. Swap a name for an
 * <Image> once its official logo file lands in public/partners/ (see
 * content/partners-data.ts for the exact filename expected per partner).
 */
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
          className="mt-12 grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:grid-cols-6"
        >
          {partners.map((partner) => (
            <div key={partner.name} className="flex items-center justify-center">
              <span className="font-display text-lg font-semibold tracking-tight text-ink/40 transition-colors hover:text-ink dark:text-paper/40 dark:hover:text-paper">
                {partner.name}
              </span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
