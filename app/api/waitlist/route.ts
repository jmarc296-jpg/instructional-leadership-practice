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
  <div style="background:#f8fafc;padding:40px 0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
    <div style="max-width:720px;margin:0 auto;background:#ffffff;border-radius:24px;overflow:hidden;border:1px solid #e2e8f0;box-shadow:0 18px 50px rgba(15,23,42,0.10);">

      <div style="background:linear-gradient(135deg,#020617 0%,#0f172a 60%,#1d4ed8 100%);padding:54px 42px;text-align:center;">
        <img src="https://leadwellpractice.vercel.app/logo.png" alt="LeadSharper" style="width:430px;max-width:100%;height:auto;display:block;margin:0 auto;" />
      </div>

      <div style="padding:52px 56px 44px 56px;">
        <div style="font-size:13px;font-weight:800;letter-spacing:3px;text-transform:uppercase;color:#2563eb;margin-bottom:24px;">
          Pilot Request Received
        </div>

        <h1 style="font-size:52px;line-height:1.08;letter-spacing:-1.8px;color:#020617;margin:0 0 28px 0;font-weight:850;">
          Thanks for your interest in LeadSharper.
        </h1>

        <p style="font-size:20px;line-height:1.75;color:#475569;margin:0 0 22px 0;">
          We received your pilot request and our team is reviewing your submission.
        </p>

        <p style="font-size:20px;line-height:1.75;color:#475569;margin:0 0 38px 0;">
          LeadSharper helps districts, universities, and leadership pipelines measure principal readiness before leadership decisions become high stakes.
        </p>

        <div style="background:linear-gradient(180deg,#eff6ff 0%,#f8fbff 100%);border:1px solid #bfdbfe;border-radius:22px;padding:34px 36px;margin:0 0 40px 0;">
          <div style="font-size:14px;font-weight:800;letter-spacing:2px;text-transform:uppercase;color:#1d4ed8;margin-bottom:22px;">
            What happens next
          </div>

          <div style="font-size:17px;line-height:1.7;color:#334155;margin-bottom:16px;">
            <span style="display:inline-block;background:#2563eb;color:white;border-radius:999px;width:24px;height:24px;text-align:center;line-height:24px;font-weight:700;margin-right:10px;">✓</span>
            Submission reviewed within 1–2 business days
          </div>

          <div style="font-size:17px;line-height:1.7;color:#334155;margin-bottom:16px;">
            <span style="display:inline-block;background:#2563eb;color:white;border-radius:999px;width:24px;height:24px;text-align:center;line-height:24px;font-weight:700;margin-right:10px;">✓</span>
            We’ll reach out to schedule a short discovery conversation
          </div>

          <div style="font-size:17px;line-height:1.7;color:#334155;">
            <span style="display:inline-block;background:#2563eb;color:white;border-radius:999px;width:24px;height:24px;text-align:center;line-height:24px;font-weight:700;margin-right:10px;">✓</span>
            You’ll explore pilot fit and implementation options
          </div>
        </div>

        <div style="text-align:center;margin-bottom:42px;">
          <a href="https://leadwellpractice.vercel.app" style="display:inline-block;background:linear-gradient(135deg,#2563eb 0%,#1d4ed8 100%);color:#ffffff;text-decoration:none;border-radius:14px;padding:17px 42px;font-size:17px;font-weight:800;box-shadow:0 10px 25px rgba(37,99,235,0.28);">
            Explore LeadSharper
          </a>
        </div>

        <div style="border-top:1px solid #e2e8f0;padding-top:28px;display:flex;align-items:center;gap:16px;">
          <img src="https://leadwellpractice.vercel.app/logo.png" alt="LeadSharper" style="width:110px;height:auto;" />
          <div style="font-size:14px;line-height:1.5;color:#64748b;">
            <strong style="color:#0f172a;">LeadSharper</strong><br />
            Sharpen your leadership. Accelerate your growth.
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







