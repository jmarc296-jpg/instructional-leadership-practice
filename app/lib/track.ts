export function track(event: string, payload: Record<string, unknown> = {}) {
  try {
    fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event, payload, ts: Date.now() })
    })
  } catch {}
}
