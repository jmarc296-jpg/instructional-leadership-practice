'use client'

import { useEffect, useState } from 'react'
import { getAnalytics } from '@/lib/local-store'
import type { AnalyticsSummary } from '@/types'

export function AnalyticsCards() {
  const [analytics, setAnalytics] = useState<AnalyticsSummary | null>(null)

  useEffect(() => {
    setAnalytics(getAnalytics())
  }, [])

  if (!analytics) return <div className="small">Loading analytics...</div>

  return (
    <div className="stack">
      <div className="grid-two" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        <div className="card" style={{ padding: 24 }}>
          <div className="small">Total questions</div>
          <div style={{ fontSize: 36, fontWeight: 700 }}>{analytics.totalQuestions}</div>
        </div>
        <div className="card" style={{ padding: 24 }}>
          <div className="small">Active questions</div>
          <div style={{ fontSize: 36, fontWeight: 700 }}>{analytics.activeQuestions}</div>
        </div>
        <div className="card" style={{ padding: 24 }}>
          <div className="small">Favorites saved</div>
          <div style={{ fontSize: 36, fontWeight: 700 }}>{analytics.totalFavorites}</div>
        </div>
        <div className="card" style={{ padding: 24 }}>
          <div className="small">Practice events</div>
          <div style={{ fontSize: 36, fontWeight: 700 }}>{analytics.totalProgressEvents}</div>
        </div>
      </div>

      <div className="grid-two">
        <div className="card" style={{ padding: 24 }}>
          <h2>By category</h2>
          <div className="stack">
            {analytics.categoryCounts.map((item) => (
              <div key={item.category} style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                <span>{item.category}</span>
                <strong>{item.count}</strong>
              </div>
            ))}
          </div>
        </div>

        <div className="card" style={{ padding: 24 }}>
          <h2>By difficulty</h2>
          <div className="stack">
            {analytics.difficultyCounts.map((item) => (
              <div key={item.difficulty} style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                <span>{item.difficulty}</span>
                <strong>{item.count}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
