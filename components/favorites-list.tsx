'use client'

import { useEffect, useState } from 'react'
import { getFavorites } from '@/lib/local-store'
import { QUESTION_BANK } from '@/data/questions'
import type { Card } from '@/types'

export function FavoritesList() {
  const [favorites, setFavorites] = useState<Card[]>([])

  useEffect(() => {
    const favoriteIds = getFavorites()

    const favoriteCards = QUESTION_BANK.filter((card) =>
      favoriteIds.includes(card.id)
    )

    setFavorites(favoriteCards)
  }, [])

  if (!favorites.length) {
    return (
      <div className="rounded-[24px] border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500 shadow-sm">
        No favorites yet.
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {favorites.map((card) => (
        <div
          key={card.id}
          className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm"
        >
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
              {card.domain}
            </span>

            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
              {card.difficulty}
            </span>
          </div>

          <h3 className="mt-4 text-lg font-bold text-slate-900">
            {card.stem}
          </h3>

          <p className="mt-2 text-sm leading-7 text-slate-600">
            {card.scenario}
          </p>
        </div>
      ))}
    </div>
  )
}