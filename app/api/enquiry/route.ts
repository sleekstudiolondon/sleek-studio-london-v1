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
  inspirationWebsite?: string
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
const FROM_EMAIL = 'Sleek Studio London <hello@sleekstudiolondon.com>'
const SUBJECT = 'New Project Enquiry - Sleek Studio London'
const AUTO_REPLY_SUBJECT = 'Thank you for your enquiry \u2014 Sleek Studio London'

const sanitize = (value: unknown): string => (typeof value === 'string' ? value.trim() : '')
const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

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
      html: string
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
          html: payload.html,
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
    `Inspiration website: ${sanitize(payload.inspirationWebsite) || 'Not provided'}`,
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

const buildAutoReplyTextBody = (payload: EnquiryPayload) => {
  const name = sanitize(payload.name)
  const selectedPlan = sanitize(payload.selectedPlanName) || sanitize(payload.selectedPlanId)
  const openingLine = name
    ? `Thank you for your enquiry, ${name}. Your details have been received.`
    : 'Thank you for your enquiry. Your details have been received.'

  const lines = [
    openingLine,
    '',
    'Your details have been received and are now under review.',
    'The information shared gives a clear initial sense of the project scope and direction.',
    'The enquiry is now being reviewed by the team.',
    'A response will follow within one business day, outlining the most appropriate next step.',
    'A limited number of projects are taken on each cycle to ensure a high level of attention and execution.',
    selectedPlan ? `Selected plan: ${selectedPlan}` : '',
    '',
    'Sleek Studio London',
    'sleekstudiolondon.com'
  ].filter(Boolean)

  return lines.join('\n')
}

const formatHtmlValue = (value: string, multiline = false) => {
  const safeValue = escapeHtml(value || 'Not provided')
  return multiline ? safeValue.replace(/\r?\n/g, '<br />') : safeValue
}

const buildHtmlBody = (payload: EnquiryPayload) => {
  const name = sanitize(payload.name) || 'Not provided'
  const email = sanitize(payload.email) || 'Not provided'
  const phone = sanitize(payload.phone) || 'Not provided'
  const preferredContact = sanitize(payload.preferredContact) || 'Not provided'
  const studio = sanitize(payload.studio) || 'Not provided'
  const website = sanitize(payload.website) || 'Not provided'
  const inspirationWebsite = sanitize(payload.inspirationWebsite) || 'Not provided'
  const selectedPlan = sanitize(payload.selectedPlanName) || sanitize(payload.selectedPlanId) || 'Not provided'
  const timeline = sanitize(payload.timeline) || 'Not provided'
  const budgetRange = sanitize(payload.budgetRange) || 'Not provided'
  const message = sanitize(payload.message) || 'Not provided'
  const normalizedBudget = budgetRange.toLowerCase()
  const normalizedPlan = selectedPlan.toLowerCase()
  const isHighValueLead =
    normalizedBudget.includes('8k+') ||
    normalizedBudget.includes('10,000') ||
    normalizedBudget.includes('20,000+') ||
    normalizedPlan.includes('top') ||
    normalizedPlan.includes('white-glove') ||
    normalizedPlan.includes('white glove')

  const buildDetailRow = (label: string, value: string) => `
    <tr>
      <td style="padding: 0 0 12px 0; vertical-align: top;">
        <div style="font-family: Arial, Helvetica, sans-serif; font-size: 11px; line-height: 1.35; letter-spacing: 0.08em; text-transform: uppercase; color: #7d7d7d; margin-bottom: 2px;">
          ${escapeHtml(label)}
        </div>
        <div style="font-family: Arial, Helvetica, sans-serif; font-size: 15px; line-height: 1.5; color: #111111; font-weight: 500;">
          ${formatHtmlValue(value)}
        </div>
      </td>
    </tr>
  `

  const buildSummaryCell = (label: string, value: string) => `
    <td style="padding: 0 18px 0 0; vertical-align: top;">
      <div style="font-family: Arial, Helvetica, sans-serif; font-size: 10px; line-height: 1.3; letter-spacing: 0.08em; text-transform: uppercase; color: #7d7d7d; margin-bottom: 4px;">
        ${escapeHtml(label)}
      </div>
      <div style="font-family: Arial, Helvetica, sans-serif; font-size: 15px; line-height: 1.45; color: #111111; font-weight: 700;">
        ${formatHtmlValue(value)}
      </div>
    </td>
  `

  return `
<!DOCTYPE html>
<html lang="en">
  <body style="margin: 0; padding: 0; background-color: #f6f3ee;">
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f6f3ee; margin: 0; padding: 24px 0; width: 100%;">
      <tr>
        <td align="center" style="padding: 0 16px;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width: 600px; width: 100%;">
            <tr>
              <td style="height: 8px; background-color: #b69b7a; border-radius: 12px 12px 0 0;"></td>
            </tr>
            <tr>
              <td style="background-color: #ffffff; border: 1px solid #e7e1d8; border-top: 0; border-radius: 0 0 12px 12px; padding: 32px 32px 24px 32px;">
                <div style="font-family: Arial, Helvetica, sans-serif; font-size: 12px; line-height: 1.4; letter-spacing: 0.12em; text-transform: uppercase; color: #8f7c68; margin-bottom: 10px;">
                  Sleek Studio London
                </div>
                <div style="font-family: Arial, Helvetica, sans-serif; font-size: 28px; line-height: 1.2; font-weight: 700; color: #1d1d1d; margin-bottom: 6px;">
                  New Project Enquiry
                </div>
                <div style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; line-height: 1.6; color: #666666; margin-bottom: 28px;">
                  A new consultation request has been submitted through sleekstudiolondon.com.
                </div>

                ${isHighValueLead ? `
                <div style="font-family: Arial, Helvetica, sans-serif; font-size: 12px; line-height: 1.5; color: #6b6257; margin-bottom: 12px;">
                  High-value enquiry
                </div>
                ` : ''}

                <div style="background-color: #f3eee7; border: 1px solid #e7ddd1; border-radius: 10px; padding: 16px 18px; margin-bottom: 30px;">
                  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="width: 100%; border-collapse: collapse;">
                    <tr>
                      ${buildSummaryCell('Selected plan', selectedPlan)}
                      ${buildSummaryCell('Budget range', budgetRange)}
                      ${buildSummaryCell('Timeline', timeline)}
                    </tr>
                  </table>
                </div>

                <div style="font-family: Arial, Helvetica, sans-serif; font-size: 18px; line-height: 1.35; font-weight: 700; color: #111111; margin-bottom: 16px;">
                  Client Details
                </div>
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="width: 100%; border-collapse: collapse;">
                  ${buildDetailRow('Name', name)}
                  ${buildDetailRow('Email', email)}
                  ${buildDetailRow('Phone', phone)}
                  ${buildDetailRow('Preferred contact', preferredContact)}
                </table>

                <div style="border-top: 1px solid #e7e1d8; margin: 14px 0 28px 0;"></div>

                <div style="font-family: Arial, Helvetica, sans-serif; font-size: 18px; line-height: 1.35; font-weight: 700; color: #111111; margin-bottom: 16px;">
                  Project Overview
                </div>
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="width: 100%; border-collapse: collapse;">
                  ${buildDetailRow('Studio name', studio)}
                  ${buildDetailRow('Website', website)}
                  ${buildDetailRow('Inspiration website', inspirationWebsite)}
                  ${buildDetailRow('Selected plan', selectedPlan)}
                  ${buildDetailRow('Timeline', timeline)}
                  ${buildDetailRow('Budget', budgetRange)}
                </table>

                <div style="border-top: 1px solid #e7e1d8; margin: 14px 0 28px 0;"></div>

                <div style="font-family: Arial, Helvetica, sans-serif; font-size: 18px; line-height: 1.35; font-weight: 700; color: #111111; margin-bottom: 12px;">
                  Project Details
                </div>
                <div style="background-color: #f7f2eb; border: 1px solid #ece3d7; border-radius: 10px; padding: 22px 20px; font-family: Arial, Helvetica, sans-serif; font-size: 15px; line-height: 1.85; color: #111111; white-space: normal;">
                  ${formatHtmlValue(message, true)}
                </div>

                <div style="border-top: 1px solid #e7e1d8; margin: 24px 0 0 0;"></div>
                <div style="font-family: Arial, Helvetica, sans-serif; font-size: 11px; line-height: 1.5; color: #8a8a8a; padding-top: 16px;">
                  Submitted via sleekstudiolondon.com
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`
}

const buildAutoReplyHtml = (payload: EnquiryPayload) => {
  const name = sanitize(payload.name)
  const selectedPlan = sanitize(payload.selectedPlanName) || sanitize(payload.selectedPlanId) || 'Not provided'
  const timeline = sanitize(payload.timeline) || 'Not provided'
  const openingLine = name ? `Thank you for your enquiry, ${escapeHtml(name)}.` : 'Thank you for your enquiry.'
  const statusLabel = 'In review'

  const buildSummaryCell = (label: string, value: string) => `
    <td style="padding: 0 24px 0 0; vertical-align: top;">
      <div style="font-family: Arial, Helvetica, sans-serif; font-size: 10px; line-height: 1.3; letter-spacing: 0.1em; text-transform: uppercase; color: #7d7d7d; margin-bottom: 8px;">
        ${escapeHtml(label)}
      </div>
      <div style="font-family: Arial, Helvetica, sans-serif; font-size: 18px; line-height: 1.4; color: #111111; font-weight: 700;">
        ${formatHtmlValue(value)}
      </div>
    </td>
  `

  return `
<!DOCTYPE html>
<html lang="en">
  <body style="margin: 0; padding: 0; background-color: #f6f3ee;">
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f6f3ee; margin: 0; padding: 36px 0; width: 100%;">
      <tr>
        <td align="center" style="padding: 0 18px;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width: 640px; width: 100%;">
            <tr>
              <td style="height: 8px; background-color: #b69b7a; border-radius: 12px 12px 0 0;"></td>
            </tr>
            <tr>
              <td style="background-color: #ffffff; border: 1px solid #e7e1d8; border-top: 0; border-radius: 0 0 12px 12px; padding: 44px 40px 44px 40px;">
                <div style="font-family: Arial, Helvetica, sans-serif; font-size: 12px; line-height: 1.4; letter-spacing: 0.14em; text-transform: uppercase; color: #8f7c68; margin-bottom: 16px;">
                  Sleek Studio London
                </div>
                <div style="font-family: Arial, Helvetica, sans-serif; font-size: 34px; line-height: 1.15; font-weight: 700; color: #1d1d1d; margin-bottom: 10px;">
                  Enquiry Received
                </div>
                <div style="font-family: Arial, Helvetica, sans-serif; font-size: 15px; line-height: 1.85; color: #5c554d; margin-bottom: 34px;">
                  Your project enquiry has been successfully received.
                </div>

                <div style="font-family: Arial, Helvetica, sans-serif; font-size: 17px; line-height: 1.9; color: #111111; margin-bottom: 14px;">
                  ${openingLine}
                </div>
                <div style="font-family: Arial, Helvetica, sans-serif; font-size: 17px; line-height: 1.9; color: #111111; margin-bottom: 34px;">
                  Your details have been received and are now under review.
                </div>

                <div style="background-color: #f3eee7; border: 1px solid #e1d6c8; border-radius: 12px; padding: 22px 24px; margin-bottom: 26px;">
                  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="width: 100%; border-collapse: collapse;">
                    <tr>
                      ${buildSummaryCell('Selected plan', selectedPlan)}
                      ${buildSummaryCell('Timeline', timeline)}
                    </tr>
                  </table>
                </div>

                <div style="font-family: Arial, Helvetica, sans-serif; font-size: 11px; line-height: 1.4; letter-spacing: 0.1em; text-transform: uppercase; color: #8a7f71; margin-bottom: 10px;">
                  Status: ${statusLabel}
                </div>
                <div style="font-family: Arial, Helvetica, sans-serif; font-size: 16px; line-height: 2; color: #111111; margin-bottom: 18px;">
                  The information provided gives a clear initial understanding of the project scope and direction.
                </div>
                <div style="font-family: Arial, Helvetica, sans-serif; font-size: 16px; line-height: 2; color: #111111; margin-bottom: 18px;">
                  The enquiry is now being reviewed by the team.
                </div>
                <div style="font-family: Arial, Helvetica, sans-serif; font-size: 16px; line-height: 2; color: #111111; margin-bottom: 28px;">
                  A response will follow within one business day, outlining the most appropriate next step.
                </div>
                <div style="font-family: Arial, Helvetica, sans-serif; font-size: 15px; line-height: 1.95; color: #111111; margin-bottom: 0;">
                  A limited number of projects are taken on each cycle to ensure a high level of attention and execution.
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`
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
    console.warn('DEV MODE: No RESEND_API_KEY, logging instead of sending')
    console.log('Form submission:', payload)

    return NextResponse.json({ ok: true })
  }

  try {
    const normalizedPayload = {
      ...payload,
      name,
      email,
      timeline,
      budgetRange,
      preferredContact,
      message
    }

    console.log('Enquiry admin send: starting', {
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject: SUBJECT
    })

    await resend.emails.send({
      from: 'Sleek Studio London <hello@sleekstudiolondon.com>',
      to: [TO_EMAIL],
      replyTo: email,
      subject: SUBJECT,
      html: buildHtmlBody(normalizedPayload),
      text: buildTextBody(normalizedPayload)
    })

    console.log('Enquiry admin send: success', {
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject: SUBJECT
    })

    try {
      console.log('Enquiry auto-reply send: starting', {
        from: FROM_EMAIL,
        to: email,
        replyTo: 'sleek.studiolondon@gmail.com',
        subject: AUTO_REPLY_SUBJECT
      })

      await resend.emails.send({
        from: 'Sleek Studio London <hello@sleekstudiolondon.com>',
        to: [email],
        replyTo: 'sleek.studiolondon@gmail.com',
        subject: AUTO_REPLY_SUBJECT,
        html: buildAutoReplyHtml(normalizedPayload),
        text: buildAutoReplyTextBody(normalizedPayload)
      })

      console.log('Enquiry auto-reply send: success', {
        from: FROM_EMAIL,
        to: email,
        replyTo: 'sleek.studiolondon@gmail.com',
        subject: AUTO_REPLY_SUBJECT
      })
    } catch (autoReplyError) {
      const autoReplyMessage = getErrorMessage(autoReplyError)
      console.error('Enquiry auto-reply send: failed', {
        from: FROM_EMAIL,
        to: email,
        replyTo: 'sleek.studiolondon@gmail.com',
        subject: AUTO_REPLY_SUBJECT,
        error: autoReplyMessage,
        rawError: autoReplyError
      })
    }

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
