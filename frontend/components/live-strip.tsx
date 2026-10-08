'use client'

import { useEffect, useState } from 'react'

/**
 * Live status strip — it reports the truth: the frontend is rendering it,
 * and the API check is a real request to /api/health with its round-trip
 * time. If the API is not reachable it says so plainly instead of
 * pretending.
 */
export function LiveStrip() {
  const [api, setApi] = useState<{ state: 'checking' | 'live' | 'unreachable'; ms?: number }>({
    state: 'checking',
  })

  useEffect(() => {
    const started = performance.now()
    fetch('/api/health', { cache: 'no-store' })
      .then((r) => {
        if (!r.ok) throw new Error()
        setApi({ state: 'live', ms: Math.max(1, Math.round(performance.now() - started)) })
      })
      .catch(() => setApi({ state: 'unreachable' }))
  }, [])

  const dot = (cls: string) => (
    <span className={`relative inline-flex h-1.5 w-1.5 rounded-full ${cls}`}>
      <span className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-60 motion-reduce:hidden ${cls}`} />
    </span>
  )

  return (
    <div className="inline-flex flex-wrap items-center gap-x-6 gap-y-2 rounded-full border border-ink/10 bg-paper px-5 py-2.5 font-mono text-xs text-ink/60 shadow-sm dark:border-paper/10 dark:bg-ink-raised dark:text-paper/60">
      <span className="flex items-center gap-2">
        {dot('bg-live')}
        frontend&nbsp;live
      </span>
      <span className="flex items-center gap-2">
        {api.state === 'checking' && (
          <>
            {dot('bg-ink/30 dark:bg-paper/30')}
            api&nbsp;checking…
          </>
        )}
        {api.state === 'live' && (
          <>
            {dot('bg-live')}
            api&nbsp;live&nbsp;·&nbsp;{api.ms}ms
          </>
        )}
        {api.state === 'unreachable' && (
          <>
            {dot('bg-ink/30 dark:bg-paper/30')}
            api&nbsp;unreachable
          </>
        )}
      </span>
    </div>
  )
}
