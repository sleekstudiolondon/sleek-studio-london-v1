import { NextRequest, NextResponse } from 'next/server'

export const runtime = "nodejs"

type GrowthLabPayload = {
  budget?: number | null
  packageLabel?: string
  timeframe?: string
  maturity?: string
  fit?: string
  strategy?: string
}

type EnquiryPayload = {
  name?: string
  email?: string
  studio?: string
  projectType?: string
  estimatedBudget?: string
  timeline?: string
  website?: string
  message?: string
  consent?: boolean
  companyWebsite?: string
  growthLab?: GrowthLabPayload | null
}

const TO_EMAIL = 'sleek.studiolondon@gmail.com'
const SUBJECT = 'New Enquiry \u2014 Sleek Studio London'

const sanitize = (value: unknown): string => (typeof value === 'string' ? value.trim() : '')

const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)

const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error && error.message) return error.message
  if (typeof error === 'string' && error.trim()) return error.trim()
  if (error && typeof error === 'object') {
    const maybeMessage = 'message' in error ? (error as { message?: unknown }).message : null
    if (typeof maybeMessage === 'string' && maybeMessage.trim()) return maybeMessage.trim()
    try {
      return JSON.stringify(error)
    } catch {
      return 'Unknown error'
    }
  }

  return 'Unknown error'
}

const resend = {
  emails: {
    async send(payload: {
      from: string
      to: string[]
      replyTo: string
      subject: string
      text: string
    }) {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: payload.from,
          to: payload.to,
          reply_to: payload.replyTo,
          subject: payload.subject,
          text: payload.text
        })
      })

      if (!response.ok) {
        const text = await response.text().catch(() => '')
        throw new Error(text || `Resend request failed with status ${response.status}`)
      }
    }
  }
}

const buildTextBody = (payload: EnquiryPayload) => {
  const lines = [
    'New enquiry received',
    '',
    `Name: ${sanitize(payload.name)}`,
    `Email: ${sanitize(payload.email)}`,
    `Studio: ${sanitize(payload.studio) || 'Not provided'}`,
    `Project type: ${sanitize(payload.projectType) || 'Not provided'}`,
    `Estimated budget: ${sanitize(payload.estimatedBudget) || 'Not provided'}`,
    `Timeline: ${sanitize(payload.timeline) || 'Not provided'}`,
    `Website/Instagram: ${sanitize(payload.website) || 'Not provided'}`,
    `Company website (honeypot): ${sanitize(payload.companyWebsite) || 'Not provided'}`,
    `Consent: ${payload.consent ? 'Yes' : 'No'}`,
    '',
    'Message:',
    sanitize(payload.message)
  ]

  if (payload.growthLab) {
    const lab = payload.growthLab
    lines.push('', 'Growth Lab context:')
    lines.push(`Package: ${sanitize(lab.packageLabel) || 'Not provided'}`)
    lines.push(`Timeframe: ${sanitize(lab.timeframe) || 'Not provided'} months`)
    lines.push(`Maturity: ${sanitize(lab.maturity) || 'Not provided'}`)
    lines.push(`Fit: ${sanitize(lab.fit) || 'Not provided'}`)
    lines.push(`Strategy: ${sanitize(lab.strategy) || 'Not provided'}`)
    lines.push(`Budget: ${typeof lab.budget === 'number' ? `GBP ${lab.budget}` : 'Not provided'}`)
  }

  return lines.join('\n')
}

export async function POST(request: NextRequest) {
  let payload: EnquiryPayload

  try {
    payload = (await request.json()) as EnquiryPayload
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON body.' }, { status: 400 })
  }

  if (sanitize(payload.companyWebsite)) {
    return NextResponse.json({ ok: false, error: 'Unable to submit enquiry.' }, { status: 400 })
  }

  const name = sanitize(payload.name)
  const email = sanitize(payload.email)
  const message = sanitize(payload.message)

  if (!name || !email || !message) {
    return NextResponse.json(
      { ok: false, error: 'Name, email, and message are required.' },
      { status: 400 }
    )
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ ok: false, error: 'Please provide a valid email address.' }, { status: 400 })
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error('Enquiry API unavailable: RESEND_API_KEY is not configured.')
    return NextResponse.json(
      { ok: false, error: 'Email service not configured (RESEND_API_KEY missing).' },
      { status: 503 }
    )
  }

  try {
    await resend.emails.send({
      from: 'Sleek Studio London <onboarding@resend.dev>',
      to: [TO_EMAIL],
      replyTo: email,
      subject: SUBJECT,
      text: buildTextBody({ ...payload, name, email, message })
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Resend email send failed.', error)
    const message = getErrorMessage(error)
    return NextResponse.json(
      { ok: false, error: `Email send failed: ${message}` },
      { status: 500 }
    )
  }
}
