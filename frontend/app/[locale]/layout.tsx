import type { Metadata } from 'next'
import {
  Bricolage_Grotesque,
  Inter,
  JetBrains_Mono,
  Noto_Kufi_Arabic,
  IBM_Plex_Sans_Arabic,
} from 'next/font/google'
import '../globals.css'
import { locales, isLocale, dirOf, defaultLocale, type Locale } from '@/content/i18n'
import { getDictionary } from '@/content/dictionaries'
import { Header } from '@/components/sections/header'
import { Footer } from '@/components/sections/footer'

const display = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

const arabicDisplay = Noto_Kufi_Arabic({
  subsets: ['arabic'],
  weight: ['500', '600', '700'],
  variable: '--font-arabic-display',
  display: 'swap',
})

const arabicBody = IBM_Plex_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['400', '500', '600'],
  variable: '--font-arabic-body',
  display: 'swap',
})

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale: raw } = await params
  const locale: Locale = isLocale(raw) ? raw : defaultLocale
  const dict = getDictionary(locale)

  return {
    metadataBase: new URL('https://create-a-premium-modern-intern-6u44.tediux.com'),
    title: {
      default: dict.seo.homeTitle,
      template: `%s | ${dict.brand.name}`,
    },
    description: dict.seo.homeDescription,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: '/en',
        ar: '/ar',
      },
    },
    openGraph: {
      title: dict.seo.homeTitle,
      description: dict.seo.homeDescription,
      locale: locale === 'ar' ? 'ar_AR' : 'en_US',
      type: 'website',
    },
    icons: {
      icon: '/favicon.svg',
    },
  }
}

const themeInit = `
try {
  var t = localStorage.getItem('theme');
  if (t === 'dark' || (!t && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
  }
} catch (e) {}
`

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale: raw } = await params
  const locale: Locale = isLocale(raw) ? raw : defaultLocale
  const dir = dirOf(locale)
  const dict = getDictionary(locale)

  return (
    <html
      lang={locale}
      dir={dir}
      suppressHydrationWarning
      className={`${display.variable} ${inter.variable} ${mono.variable} ${arabicDisplay.variable} ${arabicBody.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body
        className={`antialiased ${locale === 'ar' ? 'font-arabic' : 'font-sans'} bg-paper text-ink dark:bg-ink dark:text-paper`}
      >
        <Header locale={locale} dict={dict} />
        {children}
        <Footer locale={locale} dict={dict} />
      </body>
    </html>
  )
}
