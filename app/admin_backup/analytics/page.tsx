'use client'

import { useEffect, useState } from 'react'
import { AnalyticsCards } from '@/components/analytics-cards'
import { getAdminMode } from '@/lib/local-store'

export default function AdminAnalyticsPage() {
  const [allowed, setAllowed] = useState(true)

  useEffect(() => {
    setAllowed(getAdminMode())
  }, [])

  if (!allowed) {
    return (
      <main className="card" style={{ padding: 24 }}>
        <h1>Analytics</h1>
        <p className="small">Admin mode is disabled. Re-enable it from the practice page.</p>
      </main>
    )
  }

  return (
    <main>
      <AnalyticsCards />
    </main>
  )
}
