'use client'

import { useEffect, useState } from 'react'
import { getFavoriteCards } from '@/lib/local-store'
import { QUESTION_BANK } from '@/data/questions'
import type { Card } from '@/types'

export function FavoritesList() {
  const [favorites, setFavorites] = useState<Card[]>([])

  useEffect(() => {
    const favoriteIds = getFavoriteCards()
    const favoriteCards = QUESTION_BANK.filter((card) =>
      favoriteIds.includes(card.id)
    )
    setFavorites(favoriteCards)
  }, [])

  if (!favorites.length) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6 text-slate-500 shadow-sm">
        No favorites yet.
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {favorites.map((card) => (
        <div
          key={card.id}
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <div className="text-lg font-semibold text-slate-950">{card.stem}</div>
          <div className="mt-2 text-sm capitalize text-slate-500">
            {card.domain} • Difficulty {card.difficulty}
          </div>
          <p className="mt-4 text-base leading-7 text-slate-700">
            {card.scenario}
          </p>
        </div>
      ))}
    </div>
  )
}