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
    const organizationType = String(body.organizationType || 'Not provided').trim()
    const challenge = String(body.challenge || body.context || 'LeadSharper inquiry').trim()

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
        <p><strong>Organization Type:</strong> ${organizationType}</p>
        <p><strong>Challenge:</strong> ${challenge}</p>
      `
    })

    await resend.emails.send({
      from: 'LeadSharper <onboarding@resend.dev>',
      to: email,
      subject: 'Your LeadSharper request was received',
      html: `
        <div style="font-family: Arial, sans-serif; background:#f8fafc; padding:40px;">
          <div style="max-width:650px; margin:0 auto; background:white; border-radius:16px; overflow:hidden; border:1px solid #e2e8f0;">
            <div style="background:#0f172a; padding:30px; text-align:center;">
              <img src="https://leadwellpractice.vercel.app/logo.png" alt="LeadSharper Logo" style="max-width:220px;" />
            </div>

            <div style="padding:40px;">
              <p style="font-size:12px; font-weight:bold; color:#2563eb; letter-spacing:2px;">PILOT REQUEST RECEIVED</p>

              <h1 style="font-size:32px; color:#0f172a; margin-bottom:20px;">Thanks for your interest in LeadSharper.</h1>

              <p style="font-size:18px; color:#475569; line-height:1.6;">We received your pilot request and will review your submission.</p>

              <p style="font-size:18px; color:#475569; line-height:1.6;">LeadSharper helps districts, universities, and leadership pipelines measure principal readiness before leadership decisions are high stakes.</p>

              <div style="margin-top:30px; padding:25px; background:#eff6ff; border-radius:12px;">
                <h3 style="color:#1e3a8a;">What happens next?</h3>
                <p style="color:#334155;">Submission reviewed within 1–2 business days</p>
                <p style="color:#334155;">We’ll reach out to schedule a short conversation</p>
                <p style="color:#334155;">You’ll explore pilot fit and implementation options</p>
              </div>

              <div style="margin-top:35px; text-align:center;">
                <a href="https://leadwellpractice.vercel.app" style="background:#2563eb; color:white; padding:14px 24px; text-decoration:none; border-radius:10px; font-weight:bold;">Visit LeadSharper</a>
              </div>
            </div>
          </div>
        </div>
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



