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

    const leadScore =
      organizationType.toLowerCase().includes('district') ||
      organizationType.toLowerCase().includes('charter') ||
      organizationType.toLowerCase().includes('university')
        ? 'Hot'
        : 'Warm'

    const followUpAngle =
      leadScore === 'Hot'
        ? 'Lead with district pipeline ROI, readiness data, and pilot cohort implementation.'
        : 'Lead with discovery, use case clarity, and a lightweight pilot conversation.'

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { success: false, message: 'Please enter a valid email.' },
        { status: 400 }
      )
    }

    await resend.emails.send({
  from: 'LeadSharper <onboarding@resend.dev>',
  to: 'jmarc296@gmail.com',
  subject: `🔥 New LeadSharper Pilot Lead: ${organization || 'New Inquiry'}`,
  html: `
  <div style="background:#f8fafc;padding:30px;font-family:Arial,Helvetica,sans-serif;">
    <div style="max-width:700px;margin:0 auto;background:white;border-radius:20px;border:1px solid #e2e8f0;overflow:hidden;">
      <div style="background:#020617;padding:30px;text-align:center;">
        <img src="https://leadwellpractice.vercel.app/logo.png" alt="LeadSharper" style="width:240px;max-width:100%;height:auto;" />
      </div>

      <div style="padding:40px;">
        <div style="font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#2563eb;margin-bottom:16px;">New Pilot Lead • ${leadScore}</div>

        <h1 style="font-size:32px;font-weight:800;color:#0f172a;margin:0 0 25px 0;">
          ${organization || 'New Organization Inquiry'}
        </h1>

        <table width="100%" cellpadding="12" cellspacing="0" style="border-collapse:collapse;">
          <tr><td style="border-bottom:1px solid #e2e8f0;"><strong>Name</strong></td><td style="border-bottom:1px solid #e2e8f0;">${name || 'Not provided'}</td></tr>
          <tr><td style="border-bottom:1px solid #e2e8f0;"><strong>Email</strong></td><td style="border-bottom:1px solid #e2e8f0;">${email}</td></tr>
          <tr><td style="border-bottom:1px solid #e2e8f0;"><strong>Role</strong></td><td style="border-bottom:1px solid #e2e8f0;">${role || 'Not provided'}</td></tr>
          <tr><td style="border-bottom:1px solid #e2e8f0;"><strong>Organization Type</strong></td><td style="border-bottom:1px solid #e2e8f0;">${organizationType}</td></tr>
        </table>

        <div style="margin-top:30px;padding:24px;background:#eff6ff;border-radius:16px;">
          <div style="font-size:14px;font-weight:700;color:#1d4ed8;margin-bottom:12px;">
            Their biggest challenge
          </div>
          <div style="font-size:16px;line-height:1.6;color:#334155;">
            ${challenge}
          </div>
        </div>

        <div style="margin-top:30px;text-align:center;">
          <a href="mailto:${email}" style="display:inline-block;background:#2563eb;color:white;padding:16px 28px;border-radius:12px;text-decoration:none;font-weight:700;">
            Reply to Lead
          </a>
        </div>

        <div style="margin-top:25px;padding:18px;background:#f8fafc;border-radius:14px;font-size:14px;color:#475569;text-align:left;"><strong>Recommended follow-up:</strong><br />${followUpAngle}</div>
      </div>
    </div>
  </div>
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

        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin:0 0 42px 0;">
  <tr>
    <td align="center">
      <table role="presentation" cellspacing="0" cellpadding="0" border="0">
        <tr>
          <td bgcolor="#2563eb" style="background-color:#2563eb;border-radius:14px;text-align:center;">
            <a href="https://leadwellpractice.vercel.app"
              style="display:block;padding:18px 44px;color:#ffffff;font-size:17px;font-weight:800;text-decoration:none;font-family:Arial,Helvetica,sans-serif;">
              Explore LeadSharper
            </a>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>

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












