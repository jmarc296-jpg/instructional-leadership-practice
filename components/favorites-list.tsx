'use client'

import { useEffect, useState } from 'react'
import { getFavoriteCards } from '@/lib/local-store'
import type { Card } from '@/types'

export function FavoritesList() {
  const [favorites, setFavorites] = useState<Card[]>([])

  useEffect(() => {
    setFavorites(getFavoriteCards())
  }, [])

  if (!favorites.length) {
    return (
      <div className="card" style={{ padding: 24 }}>
        <h1>Favorites</h1>
        <p className="small">No saved favorites yet.</p>
      </div>
    )
  }

  return (
    <div className="stack">
      <div className="card" style={{ padding: 24 }}>
        <h1>Favorites</h1>
        <p className="small">Saved questions you want to revisit.</p>
      </div>

      {favorites.map((card) => (
        <div key={card.id} className="card" style={{ padding: 24 }}>
          <div className="eyebrow">{card.category} · {card.difficulty}</div>
          <h2>{card.question}</h2>
          <div className="stack">
            <div>
              <div style={{ fontWeight: 700, marginBottom: 6 }}>Prompt</div>
              <div className="small" style={{ color: 'var(--text)', lineHeight: 1.7 }}>{card.prompt}</div>
            </div>
            <div>
              <div style={{ fontWeight: 700, marginBottom: 6 }}>Exemplar response</div>
              <div className="small" style={{ color: 'var(--text)', lineHeight: 1.7 }}>{card.exemplar}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
