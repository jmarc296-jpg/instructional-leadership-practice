import { NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function POST(request: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY

    if (!apiKey) {
      return NextResponse.json(
        { success: false, message: 'Email service is not configured.' },
        { status: 500 }
      )
    }

    const resend = new Resend(apiKey)

    const body = await request.json()
    const email = String(body.email || '').trim()
    const name = String(body.name || '').trim()
    const organization = String(body.organization || '').trim()
    const role = String(body.role || '').trim()
    const context = String(body.context || 'LeadSharper inquiry').trim()

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { success: false, message: 'Please enter a valid email.' },
        { status: 400 }
      )
    }

    await resend.emails.send({
      from: 'LeadSharper <onboarding@resend.dev>',
      to: 'jmarc296@gmail.com',
      subject: 'New LeadSharper Pilot Request',
      html: `
        <h2>New LeadSharper submission</h2>
        <p><strong>Name:</strong> ${name || 'Not provided'}</p>
        <p><strong>Organization:</strong> ${organization || 'Not provided'}</p>
        <p><strong>Role:</strong> ${role || 'Not provided'}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Context:</strong> ${context}</p>
      `
    })

    await resend.emails.send({
      from: 'LeadSharper <onboarding@resend.dev>',
      to: email,
      subject: 'Your LeadSharper request was received',
      html: `
        <h2>Thanks for your interest in LeadSharper</h2>
        <p>We received your request and will follow up soon.</p>
        <p>LeadSharper helps school leaders practice high-stakes instructional leadership decisions before they face them in real schools.</p>
      `
    })

    return NextResponse.json({
      success: true,
      message: 'Request received.'
    })
  } catch (error) {
    console.error('LeadSharper waitlist error:', error)

    return NextResponse.json(
      { success: false, message: 'Unable to submit right now.' },
      { status: 500 }
    )
  }
}
