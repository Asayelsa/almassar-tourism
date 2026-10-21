import Image from 'next/image'
import { Reveal } from '@/components/reveal'

export function PageHero({
  eyebrow,
  headline,
  sub,
  image,
  imageAlt,
}: {
  eyebrow: string
  headline: string
  sub?: string
  image?: string
  imageAlt?: string
}) {
  return (
    <section className="relative flex min-h-[56vh] items-end overflow-hidden bg-ink pb-16 pt-40 sm:min-h-[60vh] sm:pb-20">
      {image && (
        <div className="absolute inset-0">
          <Image
            src={image}
            alt={imageAlt || ''}
            fill
            priority
            sizes="100vw"
            className="animate-ken-burns object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/30" />
          <div className="absolute inset-0 bg-ink/30" />
        </div>
      )}

      <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-10">
        <Reveal>
          <p className="mb-5 font-mono text-xs uppercase tracking-widest2 text-accent">{eyebrow}</p>
          <h1 className="max-w-3xl font-display text-4xl font-semibold leading-[1.08] tracking-tight text-paper sm:text-6xl">
            {headline}
          </h1>
          {sub && <p className="mt-6 max-w-xl text-lg leading-relaxed text-paper/70">{sub}</p>}
        </Reveal>
      </div>
    </section>
  )
}
