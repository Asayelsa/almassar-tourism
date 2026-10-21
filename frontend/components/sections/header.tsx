'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import type { Dictionary } from '@/content/dictionaries'
import type { Locale } from '@/content/i18n'
import { Logo } from '@/components/logo'
import { LocaleSwitcher } from '@/components/locale-switcher'
import { ThemeToggle } from '@/components/theme-toggle'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function Header({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const pathname = usePathname() || '/'
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  const solid = scrolled || open
  const navItems = [
    { href: `/${locale}`, label: dict.nav.home },
    { href: `/${locale}/about`, label: dict.nav.about },
    { href: `/${locale}/services`, label: dict.nav.services },
    { href: `/${locale}/destinations`, label: dict.nav.destinations },
    { href: `/${locale}/projects`, label: dict.nav.projects },
    { href: `/${locale}/insights`, label: dict.nav.insights },
    { href: `/${locale}/contact`, label: dict.nav.contact },
  ]

  const isActive = (href: string) => pathname === href || (href !== `/${locale}` && pathname.startsWith(href))

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-colors duration-500',
        solid
          ? 'border-b border-ink/[0.06] bg-paper/90 backdrop-blur-md dark:border-paper/[0.06] dark:bg-ink/90'
          : 'border-b border-transparent bg-transparent'
      )}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
        <Logo locale={locale} dict={dict} tone={solid ? 'auto' : 'light'} />

        <nav className="hidden items-center gap-8 text-sm lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'transition-colors',
                solid ? 'text-ink/60 hover:text-ink dark:text-paper/60 dark:hover:text-paper' : 'text-paper/75 hover:text-paper',
                isActive(item.href) && (solid ? 'text-ink dark:text-paper' : 'text-paper')
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <LocaleSwitcher locale={locale} tone={solid ? 'auto' : 'light'} />
          <ThemeToggle />
          <Button href={`/${locale}/contact`} size="md">
            {dict.nav.cta}
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
          aria-expanded={open}
          className={cn(
            'flex h-10 w-10 items-center justify-center rounded-full lg:hidden',
            solid ? 'text-ink dark:text-paper' : 'text-paper'
          )}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            {open ? (
              <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-ink/10 bg-paper lg:hidden dark:border-paper/10 dark:bg-ink"
          >
            <nav className="flex flex-col gap-1 px-6 py-6">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-lg px-2 py-3 text-base text-ink/80 transition-colors hover:text-ink dark:text-paper/80 dark:hover:text-paper"
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-4 flex items-center justify-between border-t border-ink/10 pt-4 dark:border-paper/10">
                <LocaleSwitcher locale={locale} />
                <ThemeToggle />
              </div>
              <Button href={`/${locale}/contact`} size="lg" className="mt-4 w-full">
                {dict.nav.cta}
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
