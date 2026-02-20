'use client'

import { useEffect, useState } from 'react'

const formatNumber = (value: number) => value.toLocaleString()

type LabContext = {
  budget: number | null
  packageLabel: string
  timeframe: string
  maturity: string
  fit: string
  strategy: string
}

export default function ContactClient() {
  const [submitted, setSubmitted] = useState(false)
  const [source, setSource] = useState<string | null>(null)
  const [labContext, setLabContext] = useState<LabContext | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const searchParams = new URLSearchParams(window.location.search)
    const sourceValue = searchParams.get('source')
    setSource(sourceValue)

    const budget = searchParams.get('budget')
    const pkg = searchParams.get('package')
    const timeframe = searchParams.get('timeframe')
    const maturity = searchParams.get('maturity')
    const fit = searchParams.get('fit')
    const strategy = searchParams.get('strategy')

    if (!budget && !pkg && !strategy) {
      setLabContext(null)
      return
    }

    const budgetValue = budget ? Number(budget) : null

    setLabContext({
      budget: budgetValue,
      packageLabel: pkg ?? 'Custom',
      timeframe: timeframe ?? '6',
      maturity: maturity ?? 'Growing studio',
      fit: fit ?? 'Strong Potential',
      strategy: strategy ?? ''
    })
  }, [])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 2400)
  }

  const messagePrefill = labContext
    ? `Growth Lab summary:\nPackage: ${labContext.packageLabel}\nTimeframe: ${labContext.timeframe} months\nMaturity: ${labContext.maturity}\nFit: ${labContext.fit}\nStrategy: ${labContext.strategy}`
    : ''

  return (
    <main className="mx-auto max-w-5xl px-6 pb-28">
      <section className="contact-hero mt-10">
        <div className="contact-decor contact-decor-left" />
        <div className="contact-decor contact-decor-right" />
        <p className="eyebrow">Contact</p>
        <h1 className="font-serif text-4xl sm:text-5xl mb-4">
          Begin a collaboration tailored to your studio.
        </h1>
        <p className="text-neutral-600 max-w-2xl">
          Share your goals, project timeline, and ideal clients. We will respond within two business days
          with a curated proposal.
        </p>
        {source && (
          <div className="mt-4 text-sm text-neutral-500">
            Enquiry source: {source}
          </div>
        )}
      </section>

      <section className="mt-16 section-grid">
        <div>
          <p className="eyebrow">Enquiries</p>
          <h2 className="font-serif text-3xl sm:text-4xl mb-4">Private consultations</h2>
          <p className="text-neutral-600 mb-6">
            We work with a limited number of studios each quarter to ensure every engagement receives
            senior attention and a bespoke level of care.
          </p>
          <div className="card">
            <p className="font-serif text-xl mb-2">Studio details</p>
            <p className="text-sm text-neutral-600">
              Prefer email? Reach us at <span className="font-medium">sleek.studiolondon@gmail.com</span>
            </p>
          </div>
          <div className="card mt-6">
            <p className="font-serif text-xl mb-2">What happens next</p>
            <p className="text-sm text-neutral-600">
              We respond within two business days with a discreet, tailored follow-up.
            </p>
            <p className="text-sm text-neutral-600 mt-2">
              Every enquiry is reviewed by a senior strategist to ensure a calm, considered onboarding process.
            </p>
          </div>

          {labContext && (
            <div className="card mt-6">
              <p className="eyebrow">Growth Lab summary</p>
              <p className="text-sm text-neutral-600">Package: {labContext.packageLabel}</p>
              <p className="text-sm text-neutral-600">Timeframe: {labContext.timeframe} months</p>
              <p className="text-sm text-neutral-600">Maturity: {labContext.maturity}</p>
              <p className="text-sm text-neutral-600">Fit: {labContext.fit}</p>
              {labContext.budget !== null && (
                <p className="text-sm text-neutral-600">Budget: £{formatNumber(labContext.budget)}</p>
              )}
            </div>
          )}
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <input aria-label="Name" placeholder="Full name" className="form-field" required />
          <input aria-label="Email" placeholder="Email address" type="email" className="form-field" required />
          <input aria-label="Studio" placeholder="Studio name" className="form-field" />
          <select aria-label="Project type" className="form-field form-select" required>
            <option value="">Project type</option>
            <option>Brand positioning</option>
            <option>Website design + build</option>
            <option>Content direction</option>
            <option>Full transformation</option>
          </select>
          <select aria-label="Estimated budget" className="form-field form-select" required>
            <option value="">Estimated budget</option>
            <option>£3.5k-6.5k</option>
            <option>£6.5k-10k</option>
            <option>£10k-15k</option>
            <option>£15k</option>
          </select>
          <select aria-label="Timeline" className="form-field form-select">
            <option value="">Preferred timeline</option>
            <option>4-6 weeks</option>
            <option>6-8 weeks</option>
            <option>8-12 weeks</option>
            <option>Flexible</option>
          </select>
          <input aria-label="Website" placeholder="Website or Instagram" className="form-field" />
          <textarea
            aria-label="Message"
            placeholder="Tell us about the project, timeline, and goals."
            className="form-field form-textarea"
            defaultValue={messagePrefill}
            required
          />
          {labContext && (
            <>
              <input type="hidden" name="lab_package" value={labContext.packageLabel} />
              <input type="hidden" name="lab_timeframe" value={labContext.timeframe} />
              <input type="hidden" name="lab_maturity" value={labContext.maturity} />
              <input type="hidden" name="lab_fit" value={labContext.fit} />
              <input type="hidden" name="lab_strategy" value={labContext.strategy} />
              {labContext.budget !== null && (
                <input type="hidden" name="lab_budget" value={String(labContext.budget)} />
              )}
            </>
          )}
          <button className="form-button" type="submit">
            Send enquiry
          </button>
          <label className="form-checkbox">
            <input type="checkbox" required />
            I agree to receive a response and occasional studio updates.
          </label>
          {submitted && (
            <p className="form-success">
              Thank you. We will respond within two business days.
            </p>
          )}
        </form>
      </section>
    </main>
  )
}
