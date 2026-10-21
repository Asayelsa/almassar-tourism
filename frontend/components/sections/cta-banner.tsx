import { Reveal } from '@/components/reveal'
import { Button } from '@/components/ui/button'

export function CtaBanner({
  headline,
  sub,
  primaryLabel,
  primaryHref,
}: {
  headline: string
  sub?: string
  primaryLabel: string
  primaryHref: string
}) {
  return (
    <section className="px-6 py-24 sm:py-32 lg:px-10">
      <Reveal className="mx-auto max-w-5xl rounded-3xl bg-ink px-8 py-16 text-center sm:px-16 sm:py-20">
        <h2 className="font-display text-3xl font-semibold tracking-tight text-paper sm:text-5xl">{headline}</h2>
        {sub && <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-paper/65">{sub}</p>}
        <Button href={primaryHref} size="lg" className="mt-9">
          {primaryLabel}
        </Button>
      </Reveal>
    </section>
  )
}
