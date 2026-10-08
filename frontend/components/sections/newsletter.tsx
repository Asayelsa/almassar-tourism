'use client'

import { useState } from 'react'
import { site } from '@/content/site'
import { subscribeNewsletter } from '@/lib/api'
import { Button } from '@/components/ui/button'
import { Input, Label } from '@/components/ui/field'

type Status = 'idle' | 'sending' | 'done' | 'error'

export function Newsletter() {
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const email = String(new FormData(form).get('email') || '')
    setStatus('sending')
    setError('')
    try {
      await subscribeNewsletter(email)
      setStatus('done')
      form.reset()
    } catch (err) {
      setStatus('error')
      setError(err instanceof Error ? err.message : 'Could not subscribe — try again.')
    }
  }

  return (
    <section className="px-6 pb-24 sm:pb-32">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 border-t border-ink/10 pt-16 sm:flex-row sm:items-end dark:border-paper/10">
        <div>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-ink dark:text-paper">
            {site.newsletter.heading}
          </h2>
          <p className="mt-2 text-ink/60 dark:text-paper/60">{site.newsletter.sub}</p>
        </div>

        {status === 'done' ? (
          <p className="font-mono text-sm text-live">subscribed ✓</p>
        ) : (
          <form onSubmit={onSubmit} className="flex w-full max-w-md items-end gap-3">
            <div className="flex-1">
              <Label htmlFor="newsletter-email">Email</Label>
              <Input
                id="newsletter-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@example.com"
              />
            </div>
            <Button type="submit" disabled={status === 'sending'} className="h-[50px]">
              {status === 'sending' ? '…' : 'Subscribe'}
            </Button>
          </form>
        )}
      </div>
      {status === 'error' && (
        <p role="alert" className="mx-auto mt-3 max-w-6xl text-sm text-red-500">
          {error}
        </p>
      )}
    </section>
  )
}
