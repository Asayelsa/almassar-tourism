'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import type { Dictionary } from '@/content/dictionaries'
import type { Locale } from '@/content/i18n'
import { Button } from '@/components/ui/button'

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
}

const stagger = { visible: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } } }

export function Hero({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section className="relative flex h-[100vh] min-h-[640px] items-center overflow-hidden bg-ink">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=2400&q=80"
          alt=""
          fill
          priority
          sizes="100vw"
          className="animate-ken-burns object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/40" />
        <div className="absolute inset-0 bg-ink/35" />
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={stagger}
        className="relative mx-auto w-full max-w-7xl px-6 pt-20 lg:px-10"
      >
        <motion.p
          variants={fadeUp}
          className={
            locale === 'ar'
              ? 'mb-6 font-arabic text-sm uppercase tracking-normal text-accent'
              : 'mb-6 font-mono text-xs uppercase tracking-widest2 text-accent'
          }
        >
          {dict.brand.subtitle}
        </motion.p>

        <motion.h1
          variants={fadeUp}
          className={
            locale === 'ar'
              ? 'max-w-4xl font-arabic-display text-5xl font-bold leading-[1.1] tracking-tight text-paper sm:text-7xl'
              : 'max-w-4xl font-display text-6xl font-semibold leading-[1.02] tracking-tight text-paper sm:text-8xl'
          }
        >
          {dict.brand.name}
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="mt-8 max-w-xl text-xl font-medium leading-relaxed text-paper/90 sm:text-2xl"
        >
          {dict.brand.tagline}
        </motion.p>

        <motion.p variants={fadeUp} className="mt-4 max-w-xl text-sm uppercase tracking-widest2 text-paper/55">
          {dict.brand.pillars}
        </motion.p>

        <motion.div variants={fadeUp} className="mt-12 flex flex-wrap items-center gap-4">
          <Button href={`/${locale}/services`} size="lg">
            {dict.home.hero.primaryCta}
          </Button>
          <Button href={`/${locale}/contact`} size="lg" variant="outline-light">
            {dict.home.hero.secondaryCta}
          </Button>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute inset-x-0 bottom-8 flex justify-center"
      >
        <span className="h-10 w-px animate-pulse bg-paper/40" />
      </motion.div>
    </section>
  )
}
