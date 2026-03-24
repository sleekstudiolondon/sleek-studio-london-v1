import { NextResponse } from 'next/server'

export const runtime = "nodejs"

export async function GET() {
  return NextResponse.json({ ok: true, probe: "enquiry route alive" }, { status: 200 })
}

export async function OPTIONS() {
  return NextResponse.json({ ok: true }, { status: 200 })
}

type EnquiryPayload = {
  selectedPlanId?: string
  selectedPlanName?: string
  name?: string
  email?: string
  phone?: string
  website?: string
  studio?: string
  timeline?: string
  budgetRange?: string
  preferredContact?: string
  message?: string
  brandAssets?: string
  copywriting?: string
  companyWebsite?: string
}

const TO_EMAIL = 'sleek.studiolondon@gmail.com'
const SUBJECT = 'New Application - Sleek Studio London'

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
    'New application received',
    '',
    `Name: ${sanitize(payload.name)}`,
    `Email: ${sanitize(payload.email)}`,
    `Phone: ${sanitize(payload.phone) || 'Not provided'}`,
    `Preferred contact: ${sanitize(payload.preferredContact) || 'Not provided'}`,
    `Website: ${sanitize(payload.website) || 'Not provided'}`,
    `Studio: ${sanitize(payload.studio) || 'Not provided'}`,
    `Selected plan: ${sanitize(payload.selectedPlanName) || sanitize(payload.selectedPlanId) || 'Not provided'}`,
    `Timeline: ${sanitize(payload.timeline) || 'Not provided'}`,
    `Budget range: ${sanitize(payload.budgetRange) || 'Not provided'}`,
    `Brand assets available: ${sanitize(payload.brandAssets) || 'Not provided'}`,
    `Copywriting needed: ${sanitize(payload.copywriting) || 'Not provided'}`,
    `Company website (honeypot): ${sanitize(payload.companyWebsite) || 'Not provided'}`,
    '',
    'Message:',
    sanitize(payload.message)
  ]

  return lines.join('\n')
}

export async function POST(req: Request) {
  let payload: EnquiryPayload

  try {
    payload = (await req.json()) as EnquiryPayload
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON body.' }, { status: 400 })
  }

  if (sanitize(payload.companyWebsite)) {
    return NextResponse.json({ ok: true }, { status: 200 })
  }

  const name = sanitize(payload.name)
  const email = sanitize(payload.email)
  const timeline = sanitize(payload.timeline)
  const budgetRange = sanitize(payload.budgetRange)
  const preferredContact = sanitize(payload.preferredContact)
  const message = sanitize(payload.message)

  if (!name || !email || !timeline || !budgetRange || !preferredContact || !message) {
    return NextResponse.json(
      {
        ok: false,
        error: 'Name, email, timeline, budget range, preferred contact method, and message are required.'
      },
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
      text: buildTextBody({
        ...payload,
        name,
        email,
        timeline,
        budgetRange,
        preferredContact,
        message
      })
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
