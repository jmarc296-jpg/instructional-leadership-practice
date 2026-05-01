import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const data = await req.json()

    const event = typeof data.event === 'string' ? data.event.slice(0, 120) : 'unknown'
    const sessionId = typeof data.sessionId === 'string' ? data.sessionId.slice(0, 120) : 'unknown'
    const path = typeof data.path === 'string' ? data.path.slice(0, 240) : 'unknown'
    const payload = data.payload && typeof data.payload === 'object' ? data.payload : {}

    console.info('[leadsharper.track]', {
      event,
      sessionId,
      path,
      payload,
      receivedAt: new Date().toISOString()
    })

    return NextResponse.json(
      { ok: true },
      {
        headers: {
          'Cache-Control': 'no-store'
        }
      }
    )
  } catch {
    return NextResponse.json(
      { ok: false },
      { status: 400 }
    )
  }
}
