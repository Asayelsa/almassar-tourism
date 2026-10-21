'use client'

import { useState } from 'react'
import type { Dictionary } from '@/content/dictionaries'
import { areaOfInterestValues } from '@/content/contact-options'
import { submitContact } from '@/lib/api'
import { Button } from '@/components/ui/button'
import { Input, Label, Select, Textarea } from '@/components/ui/field'

type Status = 'idle' | 'sending' | 'sent' | 'error'

export function ContactForm({ dict }: { dict: Dictionary }) {
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')
  const form = dict.contactPage.form

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const target = e.currentTarget
    const data = new FormData(target)
    setStatus('sending')
    setError('')
    try {
      await submitContact({
        name: String(data.get('name') || ''),
        email: String(data.get('email') || ''),
        message: String(data.get('message') || ''),
        company: String(data.get('company') || '') || undefined,
        phone: String(data.get('phone') || '') || undefined,
        country: String(data.get('country') || '') || undefined,
        area_of_interest: String(data.get('area_of_interest') || '') || undefined,
      })
      setStatus('sent')
      target.reset()
    } catch (err) {
      setStatus('error')
      setError(err instanceof Error ? err.message : form.errorFallback)
    }
  }

  if (status === 'sent') {
    return (
      <div className="rounded-3xl bg-ink p-10 text-paper sm:p-14">
        <p className="font-display text-2xl font-semibold">{form.successHeadline}</p>
        <p className="mt-3 text-paper/65">{form.successBody}</p>
        <Button
          type="button"
          variant="outline-light"
          className="mt-8"
          onClick={() => setStatus('idle')}
        >
          {form.sendAnother}
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5 rounded-3xl bg-ink p-8 text-paper sm:p-12">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="contact-name" className="text-paper/60">
            {form.name}
          </Label>
          <Input
            id="contact-name"
            name="name"
            required
            autoComplete="name"
            placeholder={form.namePlaceholder}
            className="border-paper/15 bg-paper/[0.06] text-paper placeholder:text-paper/30"
          />
        </div>
        <div>
          <Label htmlFor="contact-company" className="text-paper/60">
            {form.company}
          </Label>
          <Input
            id="contact-company"
            name="company"
            autoComplete="organization"
            placeholder={form.companyPlaceholder}
            className="border-paper/15 bg-paper/[0.06] text-paper placeholder:text-paper/30"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="contact-email" className="text-paper/60">
            {form.email}
          </Label>
          <Input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder={form.emailPlaceholder}
            className="border-paper/15 bg-paper/[0.06] text-paper placeholder:text-paper/30"
          />
        </div>
        <div>
          <Label htmlFor="contact-phone" className="text-paper/60">
            {form.phone}
          </Label>
          <Input
            id="contact-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder={form.phonePlaceholder}
            className="border-paper/15 bg-paper/[0.06] text-paper placeholder:text-paper/30"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="contact-country" className="text-paper/60">
            {form.country}
          </Label>
          <Input
            id="contact-country"
            name="country"
            autoComplete="country-name"
            placeholder={form.countryPlaceholder}
            className="border-paper/15 bg-paper/[0.06] text-paper placeholder:text-paper/30"
          />
        </div>
        <div>
          <Label htmlFor="contact-area" className="text-paper/60">
            {form.areaOfInterest}
          </Label>
          <Select
            id="contact-area"
            name="area_of_interest"
            defaultValue=""
            className="border-paper/15 bg-paper/[0.06] text-paper [&>option]:text-ink"
          >
            <option value="" disabled>
              {form.areaOfInterest}
            </option>
            {areaOfInterestValues.map((value, i) => (
              <option key={value} value={value}>
                {form.areaOptions[i]}
              </option>
            ))}
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="contact-message" className="text-paper/60">
          {form.message}
        </Label>
        <Textarea
          id="contact-message"
          name="message"
          required
          placeholder={form.messagePlaceholder}
          className="border-paper/15 bg-paper/[0.06] text-paper placeholder:text-paper/30"
        />
      </div>

      {status === 'error' && (
        <p role="alert" className="text-sm text-red-300">
          {error}
        </p>
      )}

      <Button type="submit" size="lg" disabled={status === 'sending'} className="w-full sm:w-auto">
        {status === 'sending' ? form.sending : form.submit}
      </Button>
    </form>
  )
}
