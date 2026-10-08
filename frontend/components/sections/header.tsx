import Link from 'next/link'
import { site } from '@/content/site'
import { ThemeToggle } from '@/components/theme-toggle'
import { Button } from '@/components/ui/button'

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-ink/[0.06] bg-paper/80 backdrop-blur-md dark:border-paper/[0.06] dark:bg-ink/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          className="font-display text-lg font-semibold tracking-tight text-ink dark:text-paper"
        >
          {site.brand}
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-ink/60 sm:flex dark:text-paper/60">
          <a href="#features" className="transition-colors hover:text-ink dark:hover:text-paper">
            Features
          </a>
          <a href="#faq" className="transition-colors hover:text-ink dark:hover:text-paper">
            FAQ
          </a>
          <a href="#contact" className="transition-colors hover:text-ink dark:hover:text-paper">
            Contact
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button href="#contact" size="md">
            Get in touch
          </Button>
        </div>
      </div>
    </header>
  )
}
