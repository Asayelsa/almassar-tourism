import { Reveal } from '@/components/reveal'

export function Differentiators({
  eyebrow,
  headline,
  items,
}: {
  eyebrow: string
  headline: string
  items: { title: string; body: string }[]
}) {
  return (
    <section className="px-6 py-24 sm:py-32 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <Reveal className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-widest2 text-ink/40 dark:text-paper/40">{eyebrow}</p>
          <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl dark:text-paper">
            {headline}
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-x-12 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <Reveal key={item.title} delay={(i % 3) * 0.08}>
              <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="mt-3 font-display text-xl font-semibold tracking-tight text-ink dark:text-paper">
                {item.title}
              </h3>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-ink/60 dark:text-paper/60">{item.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
