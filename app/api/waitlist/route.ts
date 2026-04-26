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
        <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;background:#f8fafc;padding:40px;">
  <div style="max-width:640px;margin:0 auto;background:white;border-radius:20px;overflow:hidden;border:1px solid #e2e8f0;box-shadow:0 10px 30px rgba(15,23,42,.06);">

    <div style="background:#020617;padding:28px;text-align:center;">
      <img src="https://leadwellpractice.vercel.app/logo.png" 
           alt="LeadSharper Logo" 
           style="max-width:220px; height:auto;" />
    </div>

    <div style="padding:48px 52px;">
      <p style="font-size:12px;font-weight:700;color:#2563eb;letter-spacing:2px;text-transform:uppercase;margin-bottom:20px;">
        Pilot Request Received
      </p>

      <h1 style="font-size:42px;font-weight:700;line-height:1.1;color:#0f172a;margin:0 0 24px 0;">
        You're officially on our radar.
      </h1>

      <p style="font-size:18px;line-height:1.7;color:#475569;margin-bottom:20px;">
        We received your pilot request and our team is reviewing your submission.
      </p>

      <p style="font-size:18px;line-height:1.7;color:#475569;margin-bottom:32px;">
        LeadSharper helps districts, universities, and leadership pipelines measure principal readiness before leadership decisions become high stakes.
      </p>

      <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:16px;padding:28px;margin-bottom:35px;">
        <h3 style="font-size:20px;font-weight:600;color:#0f172a;margin-top:0;">
          What happens next
        </h3>

        <p style="font-size:16px;color:#475569;line-height:1.6;margin:12px 0;">
          → Submission reviewed within 1–2 business days
        </p>

        <p style="font-size:16px;color:#475569;line-height:1.6;margin:12px 0;">
          → We’ll schedule a short discovery conversation
        </p>

        <p style="font-size:16px;color:#475569;line-height:1.6;margin:12px 0;">
          → You’ll explore pilot implementation options
        </p>
      </div>

      <div style="text-align:center;">
        <a href="https://leadwellpractice.vercel.app"
           style="display:inline-block;background:#2563eb;color:white;
                  padding:14px 28px;text-decoration:none;border-radius:12px;
                  font-size:16px;font-weight:600;">
          Explore Platform
        </a>
      </div>
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




