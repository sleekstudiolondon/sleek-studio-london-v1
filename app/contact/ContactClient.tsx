'use client'

import { useEffect, useRef, useState } from 'react'

const formatNumber = (value: number) => value.toLocaleString()

type LabContext = {
  budget: number | null
  packageLabel: string
  timeframe: string
  maturity: string
  fit: string
  strategy: string
}

type ContactFormValues = {
  name: string
  email: string
  studio: string
  projectType: string
  estimatedBudget: string
  timeline: string
  website: string
  companyWebsite: string
  message: string
  consent: boolean
}

type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>

const initialValues: ContactFormValues = {
  name: '',
  email: '',
  studio: '',
  projectType: '',
  estimatedBudget: '',
  timeline: '',
  website: '',
  companyWebsite: '',
  message: '',
  consent: false
}

const getMessagePrefill = (labContext: LabContext | null) => {
  if (!labContext) return ''
  return `Growth Lab summary:\nPackage: ${labContext.packageLabel}\nTimeframe: ${labContext.timeframe} months\nMaturity: ${labContext.maturity}\nFit: ${labContext.fit}\nStrategy: ${labContext.strategy}`
}

const validateForm = (values: ContactFormValues): ContactFormErrors => {
  const errors: ContactFormErrors = {}

  if (!values.name.trim()) errors.name = 'Please enter your full name.'

  const emailValue = values.email.trim()
  if (!emailValue) {
    errors.email = 'Please enter your email address.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
    errors.email = 'Please enter a valid email address.'
  }

  if (!values.projectType) errors.projectType = 'Please select a project type.'
  if (!values.estimatedBudget) errors.estimatedBudget = 'Please select an estimated budget.'

  if (!values.message.trim()) {
    errors.message = 'Please share project goals so we can respond with relevant guidance.'
  } else if (values.message.trim().length < 20) {
    errors.message = 'Please provide a little more detail (at least 20 characters).'
  }

  if (!values.consent) {
    errors.consent = 'Consent is required so we can contact you about this enquiry.'
  }

  return errors
}

export default function ContactClient() {
  const [submitted, setSubmitted] = useState(false)
  const [labContext, setLabContext] = useState<LabContext | null>(null)
  const [formValues, setFormValues] = useState<ContactFormValues>(initialValues)
  const [errors, setErrors] = useState<ContactFormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const lastSubmitAtRef = useRef(0)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const searchParams = new URLSearchParams(window.location.search)

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

  useEffect(() => {
    if (!labContext) return
    setFormValues(prev => {
      if (prev.message.trim().length > 0) return prev
      return { ...prev, message: getMessagePrefill(labContext) }
    })
  }, [labContext])

  const handleTextChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = event.target
    const nextValue = type === 'checkbox' && 'checked' in event.target
      ? event.target.checked
      : value

    setFormValues(prev => ({
      ...prev,
      [name]: nextValue
    }))

    setErrors(prev => ({
      ...prev,
      [name]: ''
    }))
  }

  const validateField = (field: keyof ContactFormValues, values: ContactFormValues) => {
    const nextErrors = validateForm(values)
    setErrors(prev => ({
      ...prev,
      [field]: nextErrors[field] ?? ''
    }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (isSubmitting) return

    const validationErrors = validateForm(formValues)
    setErrors(validationErrors)
    setSubmitError('')

    if (Object.keys(validationErrors).length > 0) {
      setSubmitted(false)
      return
    }

    const now = Date.now()
    if (now - lastSubmitAtRef.current < 8000) {
      setSubmitError('Please wait a few seconds before submitting again.')
      return
    }

    lastSubmitAtRef.current = now
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formValues.name,
          email: formValues.email,
          studio: formValues.studio,
          projectType: formValues.projectType,
          estimatedBudget: formValues.estimatedBudget,
          timeline: formValues.timeline,
          website: formValues.website,
          message: formValues.message,
          consent: formValues.consent,
          companyWebsite: formValues.companyWebsite,
          growthLab: labContext
        })
      })

      const result = await response.json().catch(() => ({
        ok: false,
        error: 'Unable to submit your enquiry right now.'
      }))

      if (!response.ok || result.ok !== true) {
        setSubmitError(result.error ?? 'Unable to submit your enquiry right now.')
        setSubmitted(false)
        return
      }

      setSubmitted(true)
      setFormValues(initialValues)
      setErrors({})
      setSubmitError('')
    } catch {
      setSubmitted(false)
      setSubmitError('Temporarily unavailable. Please email sleek.studiolondon@gmail.com directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

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
              <p className="text-sm text-neutral-600">Package (recommended service level): {labContext.packageLabel}</p>
              <p className="text-sm text-neutral-600">Timeframe: {labContext.timeframe} months</p>
              <p className="text-sm text-neutral-600">Maturity (current business stage): {labContext.maturity}</p>
              <p className="text-sm text-neutral-600">Fit (how well this plan matches your goals): {labContext.fit}</p>
              {labContext.budget !== null && (
                <p className="text-sm text-neutral-600">Budget: £{formatNumber(labContext.budget)}</p>
              )}
            </div>
          )}
        </div>

        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          <div>
            <label htmlFor="name" className="form-label">Full name</label>
            <input
              id="name"
              name="name"
              value={formValues.name}
              onChange={handleTextChange}
              onBlur={() => validateField('name', formValues)}
              placeholder="Full name"
              className={`form-field ${errors.name ? 'is-invalid' : ''}`}
              aria-describedby={errors.name ? 'name-error' : undefined}
            />
            {errors.name && <p id="name-error" className="form-error">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="email" className="form-label">Email address</label>
            <input
              id="email"
              name="email"
              value={formValues.email}
              onChange={handleTextChange}
              onBlur={() => validateField('email', formValues)}
              placeholder="Email address"
              type="email"
              className={`form-field ${errors.email ? 'is-invalid' : ''}`}
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
            {errors.email && <p id="email-error" className="form-error">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="studio" className="form-label">Studio name (optional)</label>
            <input
              id="studio"
              name="studio"
              value={formValues.studio}
              onChange={handleTextChange}
              placeholder="Studio name"
              className="form-field"
            />
          </div>

          <div>
            <label htmlFor="projectType" className="form-label">Project type</label>
            <select
              id="projectType"
              name="projectType"
              value={formValues.projectType}
              onChange={handleTextChange}
              onBlur={() => validateField('projectType', formValues)}
              className={`form-field form-select ${errors.projectType ? 'is-invalid' : ''}`}
              aria-describedby={errors.projectType ? 'projectType-error' : undefined}
            >
              <option value="">Select project type</option>
              <option>Brand positioning</option>
              <option>Website design + build</option>
              <option>Content direction</option>
              <option>Full transformation</option>
            </select>
            {errors.projectType && <p id="projectType-error" className="form-error">{errors.projectType}</p>}
          </div>

          <div>
            <label htmlFor="estimatedBudget" className="form-label">Estimated budget</label>
            <select
              id="estimatedBudget"
              name="estimatedBudget"
              value={formValues.estimatedBudget}
              onChange={handleTextChange}
              onBlur={() => validateField('estimatedBudget', formValues)}
              className={`form-field form-select ${errors.estimatedBudget ? 'is-invalid' : ''}`}
              aria-describedby={errors.estimatedBudget ? 'estimatedBudget-error' : undefined}
            >
              <option value="">Select estimated budget</option>
              <option>£3.5k-6.5k</option>
              <option>£6.5k-10k</option>
              <option>£10k-15k</option>
              <option>£15k+</option>
            </select>
            {errors.estimatedBudget && <p id="estimatedBudget-error" className="form-error">{errors.estimatedBudget}</p>}
          </div>

          <div>
            <label htmlFor="timeline" className="form-label">Preferred timeline (optional)</label>
            <select
              id="timeline"
              name="timeline"
              value={formValues.timeline}
              onChange={handleTextChange}
              className="form-field form-select"
            >
              <option value="">Preferred timeline</option>
              <option>4-6 weeks</option>
              <option>6-8 weeks</option>
              <option>8-12 weeks</option>
              <option>Flexible</option>
            </select>
          </div>

          <div>
            <label htmlFor="website" className="form-label">Website or Instagram (optional)</label>
            <input
              id="website"
              name="website"
              value={formValues.website}
              onChange={handleTextChange}
              placeholder="Website or Instagram"
              className="form-field"
            />
          </div>

          <div className="hidden" aria-hidden="true">
            <label htmlFor="companyWebsite">Company website</label>
            <input
              id="companyWebsite"
              name="companyWebsite"
              tabIndex={-1}
              autoComplete="off"
              value={formValues.companyWebsite}
              onChange={handleTextChange}
            />
          </div>

          <div>
            <label htmlFor="message" className="form-label">Project details</label>
            <textarea
              id="message"
              name="message"
              value={formValues.message}
              onChange={handleTextChange}
              onBlur={() => validateField('message', formValues)}
              placeholder="Tell us about the project, timeline, and goals."
              className={`form-field form-textarea ${errors.message ? 'is-invalid' : ''}`}
              aria-describedby={errors.message ? 'message-error' : undefined}
            />
            {errors.message && <p id="message-error" className="form-error">{errors.message}</p>}
          </div>

          <div className="form-consent-group">
            <p id="consent-help" className="text-sm text-neutral-600">
              Consent is required so we can reply to this enquiry and share relevant project updates. We never sell your data.
            </p>
            <label className="form-checkbox" htmlFor="consent">
              <input
                id="consent"
                name="consent"
                type="checkbox"
                checked={formValues.consent}
                onChange={handleTextChange}
                onBlur={() => validateField('consent', formValues)}
                aria-describedby="consent-help consent-error"
              />
              I agree to be contacted about this enquiry.
            </label>
            {errors.consent && <p id="consent-error" className="form-error">{errors.consent}</p>}
          </div>

          <button className="form-button" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : 'Send enquiry'}
          </button>

          {submitted && (
            <p className="form-success" role="status">
              Thank you. Your enquiry has been received and our team will respond within two business days.
            </p>
          )}

          {submitError && (
            <p className="form-error" role="alert">
              {submitError}
            </p>
          )}
        </form>
      </section>
    </main>
  )
}

