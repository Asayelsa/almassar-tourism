import { Waiting } from '@/components/sections/waiting'

/**
 * Default page: the waiting screen — this site's product is being built, and
 * this page holds the address with the owner's brand until it is.
 *
 * When the product is ready, replace <Waiting /> with a composition from the
 * section kit (all copy comes from content/site.ts):
 *
 *   import { Header } from '@/components/sections/header'
 *   import { Hero } from '@/components/sections/hero'
 *   import { Features } from '@/components/sections/features'
 *   import { Faq } from '@/components/sections/faq'
 *   import { Contact } from '@/components/sections/contact'
 *   import { Newsletter } from '@/components/sections/newsletter'
 *   import { Footer } from '@/components/sections/footer'
 */
export default function HomePage() {
  return <Waiting />
}
