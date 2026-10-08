import { site } from '@/content/site'

export function Footer() {
  return (
    <footer className="border-t border-ink/10 px-6 py-10 dark:border-paper/10">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <p className="font-display font-semibold text-ink dark:text-paper">{site.brand}</p>
        <p className="text-sm text-ink/40 dark:text-paper/40">{site.footer.note}</p>
      </div>
    </footer>
  )
}
