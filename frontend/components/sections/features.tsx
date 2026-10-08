'use client'

import { motion } from 'framer-motion'
import { site } from '@/content/site'

/**
 * Features as an editorial list: an oversized display-face keyword against a
 * quiet sentence, in place of the usual icon-card grid. The keyword column is
 * the design; keep the descriptions to one or two sentences so it holds.
 */
export function Features() {
  return (
    <section id="features" className="scroll-mt-24 px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <p className="mb-16 font-mono text-xs uppercase tracking-[0.25em] text-ink/40 dark:text-paper/40">
          what&apos;s in the box
        </p>

        <div className="grid gap-x-16 gap-y-14 sm:grid-cols-2">
          {site.features.map((feature) => (
            <motion.div
              key={feature.keyword}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <h3 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl dark:text-paper">
                {feature.keyword}
                <span className="text-accent">.</span>
              </h3>
              <p className="mt-3 max-w-md leading-relaxed text-ink/60 dark:text-paper/60">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
