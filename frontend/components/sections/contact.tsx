'use client'

import { useState } from 'react'
import { site } from '@/content/site'
import { submitContact } from '@/lib/api'
import { Button } from '@/components/ui/button'
import { Input, Label, Textarea } from '@/components/ui/field'

type Status = 'idle' | 'sending' | 'sent' | 'error'

export function Contact() {
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    setStatus('sending')
    setError('')
    try {
      await submitContact({
        name: String(data.get('name') || ''),
        email: String(data.get('email') || ''),
        message: String(data.get('message') || ''),
      })
      setStatus('sent')
      form.reset()
    } catch (err) {
      setStatus('error')
      setError(err instanceof Error ? err.message : 'Something went wrong — try again.')
    }
  }

  return (
    <section id="contact" className="scroll-mt-24 px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl bg-ink text-paper dark:bg-ink-raised">
        <div className="grid gap-12 p-8 sm:p-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-paper/40">
              contact
            </p>
            <h2 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
              {site.contact.heading}
            </h2>
            <p className="mt-5 max-w-md leading-relaxed text-paper/60">{site.contact.sub}</p>
          </div>

          {status === 'sent' ? (
            <div className="flex flex-col items-start justify-center">
              <p className="font-display text-2xl font-semibold">Message sent.</p>
              <p className="mt-2 text-paper/60">
                It&apos;s in the database — check the contact_submissions table.
              </p>
              <Button
                type="button"
                variant="secondary"
                className="mt-6 bg-paper/10 text-paper hover:bg-paper/15"
                onClick={() => setStatus('idle')}
              >
                Send another
              </Button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <Label htmlFor="contact-name" className="text-paper/60">
                    Name
                  </Label>
                  <Input
                    id="contact-name"
                    name="name"
                    required
                    autoComplete="name"
                    placeholder="Ada Lovelace"
                    className="border-paper/15 bg-paper/[0.06] text-paper placeholder:text-paper/30 dark:bg-paper/[0.06]"
                  />
                </div>
                <div>
                  <Label htmlFor="contact-email" className="text-paper/60">
                    Email
                  </Label>
                  <Input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="ada@example.com"
                    className="border-paper/15 bg-paper/[0.06] text-paper placeholder:text-paper/30 dark:bg-paper/[0.06]"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="contact-message" className="text-paper/60">
                  Message
                </Label>
                <Textarea
                  id="contact-message"
                  name="message"
                  required
                  placeholder="What can we help with?"
                  className="border-paper/15 bg-paper/[0.06] text-paper placeholder:text-paper/30 dark:bg-paper/[0.06]"
                />
              </div>
              {status === 'error' && (
                <p role="alert" className="text-sm text-red-300">
                  {error}
                </p>
              )}
              <Button type="submit" size="lg" disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending…' : 'Send message'}
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
