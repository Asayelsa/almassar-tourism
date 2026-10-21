import Image from 'next/image'
import Link from 'next/link'

export function WorkCard({
  href,
  image,
  imageAlt,
  badge,
  category,
  date,
  title,
  summary,
}: {
  href: string
  image: string
  imageAlt: string
  badge: string
  category: string
  date?: string
  title: string
  summary: string
}) {
  return (
    <Link href={href} className="group block">
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/0 to-transparent" />
        <span className="absolute start-4 top-4 rounded-full bg-ink/70 px-3 py-1 font-mono text-[10px] uppercase tracking-widest2 text-paper backdrop-blur-sm">
          {badge}
        </span>
      </div>
      <div className="mt-5">
        <p className="font-mono text-[11px] uppercase tracking-widest2 text-ink/40 dark:text-paper/40">
          {category}
          {date ? ` · ${date}` : ''}
        </p>
        <h3 className="mt-2 font-display text-xl font-semibold tracking-tight text-ink transition-colors group-hover:text-teal dark:text-paper dark:group-hover:text-accent">
          {title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-ink/60 dark:text-paper/60">{summary}</p>
      </div>
    </Link>
  )
}
