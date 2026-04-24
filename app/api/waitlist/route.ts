import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const email = String(body.email || '').trim()
    const context = String(body.context || 'LeadSharper inquiry').trim()

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { success: false, message: 'Please enter a valid email.' },
        { status: 400 }
      )
    }

    console.log('LeadSharper waitlist submission:', {
      email,
      context,
      submittedAt: new Date().toISOString()
    })

    return NextResponse.json({
      success: true,
      message: 'Request received.'
    })
  } catch {
    return NextResponse.json(
      { success: false, message: 'Unable to submit right now.' },
      { status: 500 }
    )
  }
}
