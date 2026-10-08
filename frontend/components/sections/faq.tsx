import { site } from '@/content/site'

/**
 * Native <details>/<summary> — keyboard and screen-reader support for free,
 * no client JavaScript. The marker is replaced with a rotating chevron.
 */
export function Faq() {
  return (
    <section id="faq" className="scroll-mt-24 px-6 py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_2fr]">
        <div>
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-ink/40 dark:text-paper/40">
            questions
          </p>
          <h2 className="font-display text-4xl font-semibold tracking-tight text-ink dark:text-paper">
            How this works
          </h2>
        </div>

        <div>
          {site.faq.map((item) => (
            <details
              key={item.question}
              className="group border-b border-ink/10 py-2 dark:border-paper/10"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-left font-medium text-ink transition-colors hover:text-accent [&::-webkit-details-marker]:hidden dark:text-paper">
                {item.question}
                <svg
                  className="h-4 w-4 shrink-0 text-ink/40 transition-transform group-open:rotate-45 dark:text-paper/40"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </summary>
              <p className="pb-5 pr-8 leading-relaxed text-ink/60 dark:text-paper/60">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
