type TrackPayload = Record<string, string | number | boolean | null | undefined>

function getSessionId() {
  if (typeof window === 'undefined') return 'server'

  const key = 'leadsharper_session_id'
  const existing = window.localStorage.getItem(key)

  if (existing) return existing

  const next = crypto.randomUUID()
  window.localStorage.setItem(key, next)

  return next
}

export function track(event: string, payload: TrackPayload = {}) {
  if (typeof window === 'undefined') return

  const body = JSON.stringify({
    event,
    payload,
    sessionId: getSessionId(),
    path: window.location.pathname,
    ts: Date.now()
  })

  try {
    if (navigator.sendBeacon) {
      const blob = new Blob([body], { type: 'application/json' })
      navigator.sendBeacon('/api/track', blob)
      return
    }

    fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
      keepalive: true
    })
  } catch {
    return
  }
}
