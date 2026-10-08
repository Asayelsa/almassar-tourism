'use client'

import { motion } from 'framer-motion'
import { site } from '@/content/site'
import { LiveStrip } from '@/components/live-strip'
import { Button } from '@/components/ui/button'

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
}

const stagger = { visible: { transition: { staggerChildren: 0.12 } } }

export function Hero() {
  return (
    <section className="px-6 pb-14 pt-40 sm:pb-20 sm:pt-48">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={stagger}
        className="mx-auto max-w-6xl"
      >
        <motion.p
          variants={fadeUp}
          className="mb-6 font-mono text-xs uppercase tracking-[0.25em] text-accent"
        >
          {site.hero.eyebrow}
        </motion.p>

        <motion.h1
          variants={fadeUp}
          className="max-w-4xl font-display text-5xl font-semibold leading-[1.02] tracking-tight text-ink sm:text-7xl lg:text-8xl dark:text-paper"
        >
          {site.hero.headline}
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="mt-8 max-w-xl text-lg leading-relaxed text-ink/60 dark:text-paper/60"
        >
          {site.hero.sub}
        </motion.p>

        <motion.div variants={fadeUp} className="mt-10 flex flex-wrap items-center gap-4">
          <Button href={site.hero.primaryCta.href} size="lg">
            {site.hero.primaryCta.label}
          </Button>
        </motion.div>

        <motion.div variants={fadeUp} className="mt-16">
          <LiveStrip />
        </motion.div>
      </motion.div>
    </section>
  )
}
