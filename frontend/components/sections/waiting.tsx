'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { site } from '@/content/site'
import { subscribeNewsletter } from '@/lib/api'
import { LiveStrip } from '@/components/live-strip'
import { ThemeToggle } from '@/components/theme-toggle'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/field'

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
}

const stagger = { visible: { transition: { staggerChildren: 0.12 } } }

/**
 * Ambient build phases. Deliberately words, not percentages — this page
 * cannot know real progress, so it never invents a number. The proof that
 * something real is here is the LiveStrip next to it, which is measured.
 */
function BuildPulse() {
  const reduce = useReducedMotion()
  const [i, setI] = useState(0)

  useEffect(() => {
    if (reduce) return
    const t = setInterval(() => setI((n) => (n + 1) % site.waiting.phases.length), 2800)
    return () => clearInterval(t)
  }, [reduce])

  return (
    <div className="flex items-center gap-4">
      <div className="relative h-px w-40 overflow-hidden bg-ink/10 dark:bg-paper/10">
        <motion.div
          className="absolute inset-y-0 w-16 bg-accent"
          animate={reduce ? { left: '30%' } : { left: ['-40%', '100%'] }}
          transition={reduce ? undefined : { duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
      <div className="relative h-5 overflow-hidden font-mono text-xs text-ink/50 dark:text-paper/50">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={site.waiting.phases[i]}
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -12, opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="block"
          >
            {site.waiting.phases[i]}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  )
}

function Notify() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const email = String(new FormData(form).get('email') || '')
    setStatus('sending')
    try {
      await subscribeNewsletter(email)
      setStatus('done')
      form.reset()
    } catch {
      setStatus('error')
    }
  }

  if (status === 'done') {
    return (
      <p className="font-mono text-sm text-live">you&apos;ll be the first to know ✓</p>
    )
  }

  return (
    <div>
      <p className="mb-1 font-medium text-ink dark:text-paper">{site.waiting.notify.heading}</p>
      <p className="mb-4 text-sm text-ink/50 dark:text-paper/50">{site.waiting.notify.sub}</p>
      <form onSubmit={onSubmit} className="flex w-full max-w-sm gap-3">
        <Input
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          aria-label="Email address"
          className="h-11"
        />
        <Button type="submit" disabled={status === 'sending'} className="h-11 shrink-0 whitespace-nowrap">
          {status === 'sending' ? '…' : 'Notify me'}
        </Button>
      </form>
      {status === 'error' && (
        <p role="alert" className="mt-2 text-sm text-red-500">
          That didn&apos;t go through — try again in a moment.
        </p>
      )}
    </div>
  )
}

/**
 * The waiting screen — a single viewport, no scroll. This site's product is
 * being built; the page's job is to hold the address with the owner's brand
 * on it and make the wait feel alive: an ambient build pulse, a measured
 * live check, and a launch-notify capture that writes to the database.
 */
export function Waiting() {
  return (
    <div className="relative flex min-h-dvh flex-col bg-paper text-ink dark:bg-ink dark:text-paper">
      {/* Faint dot grid, the only decoration */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.06]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }}
      />

      <header className="relative z-10 flex items-center justify-between px-6 py-5 sm:px-10">
        <span className="font-display text-lg font-semibold tracking-tight">{site.brand}</span>
        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </header>

      <main className="relative z-10 flex flex-1 items-center px-6 sm:px-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="mx-auto w-full max-w-3xl"
        >
          <motion.p
            variants={fadeUp}
            className="mb-6 font-mono text-xs uppercase tracking-[0.25em] text-accent"
          >
            {site.waiting.eyebrow}
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl"
          >
            {site.waiting.headline}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-xl text-lg leading-relaxed text-ink/60 dark:text-paper/60"
          >
            {site.waiting.sub}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-10">
            <BuildPulse />
          </motion.div>

          <motion.div variants={fadeUp} className="mt-16">
            <Notify />
          </motion.div>
        </motion.div>
      </main>

      <footer className="relative z-10 flex flex-wrap items-center justify-between gap-4 px-6 py-6 sm:px-10">
        <LiveStrip />
        <p className="text-sm text-ink/40 dark:text-paper/40">
          Powered by{' '}
          <a
            href="https://tediux.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-ink/60 transition-colors hover:text-ink dark:text-paper/60 dark:hover:text-paper"
          >
            Tediux
          </a>
        </p>
      </footer>
    </div>
  )
}
