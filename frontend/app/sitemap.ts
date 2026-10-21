import type { MetadataRoute } from 'next'
import { locales } from '@/content/i18n'
import { services } from '@/content/services-data'
import { projects } from '@/content/projects-data'
import { insights } from '@/content/insights-data'

const base = 'https://create-a-premium-modern-intern-6u44.tediux.com'

const staticPaths = [
  '',
  '/about',
  '/services',
  '/destinations',
  '/projects',
  '/insights',
  '/contact',
  '/privacy',
  '/terms',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []

  for (const locale of locales) {
    for (const path of staticPaths) {
      entries.push({ url: `${base}/${locale}${path}` })
    }
    for (const service of services) {
      entries.push({ url: `${base}/${locale}/services/${service.slug}` })
    }
    for (const project of projects) {
      entries.push({ url: `${base}/${locale}/projects/${project.slug}` })
    }
    for (const insight of insights) {
      entries.push({ url: `${base}/${locale}/insights/${insight.slug}` })
    }
  }

  return entries
}
