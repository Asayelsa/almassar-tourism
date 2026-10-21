import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://create-a-premium-modern-intern-6u44.tediux.com/sitemap.xml',
  }
}
