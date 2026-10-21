import Link from 'next/link'
import type { Dictionary } from '@/content/dictionaries'
import type { Locale } from '@/content/i18n'
import { Logo } from '@/components/logo'
import { LocaleSwitcher } from '@/components/locale-switcher'
import { services } from '@/content/services-data'

export function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const nav = [
    { href: `/${locale}`, label: dict.nav.home },
    { href: `/${locale}/about`, label: dict.nav.about },
    { href: `/${locale}/destinations`, label: dict.nav.destinations },
    { href: `/${locale}/projects`, label: dict.nav.projects },
    { href: `/${locale}/insights`, label: dict.nav.insights },
    { href: `/${locale}/contact`, label: dict.nav.contact },
  ]

  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo locale={locale} dict={dict} tone="light" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-paper/55">{dict.brand.tagline}</p>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-widest2 text-paper/40">{dict.footer.navHeading}</p>
            <ul className="mt-5 space-y-3 text-sm">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-paper/70 transition-colors hover:text-paper">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-widest2 text-paper/40">{dict.footer.servicesHeading}</p>
            <ul className="mt-5 space-y-3 text-sm">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/${locale}/services/${service.slug}`}
                    className="text-paper/70 transition-colors hover:text-paper"
                  >
                    {service[locale].title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-widest2 text-paper/40">{dict.footer.languageHeading}</p>
            <div className="mt-5">
              <LocaleSwitcher locale={locale} tone="light" />
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-paper/10 pt-8 text-xs text-paper/40 sm:flex-row sm:items-center">
          <p>
            {dict.brand.name} — {dict.footer.copyright}
          </p>
          <div className="flex gap-6">
            <Link href={`/${locale}/privacy`} className="transition-colors hover:text-paper/70">
              {dict.footer.privacy}
            </Link>
            <Link href={`/${locale}/terms`} className="transition-colors hover:text-paper/70">
              {dict.footer.terms}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
