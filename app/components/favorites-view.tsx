import { useMemo } from 'react'
import type { Card } from '@/types'
import { getResponseVersions } from '@/lib/local-store'

type Props = {
  favoriteCards: Card[]
  onOpenFavorite: (card: Card) => void
}

export function FavoritesView({ favoriteCards, onOpenFavorite }: Props) {
  const enrichedCards = useMemo(() => {
    return favoriteCards.map(card => {
      const versions = getResponseVersions(card.id)

      return {
        ...card,
        versionCount: versions.length,
        hasResponse: versions.length > 0
      }
    })
  }, [favoriteCards])

  return (
    <div className="space-y-4 sm:space-y-5">
      {favoriteCards.length === 0 && (
        <section className="rounded-[24px] border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500 shadow-sm sm:rounded-[28px] sm:p-10">
          <h3 className="text-lg font-semibold text-slate-900">
            No favorites yet
          </h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Save scenarios you want to revisit. Favorites make it easier to return and refine your thinking.
          </p>
        </section>
      )}

      {enrichedCards.map(card => (
        <article
          key={card.id}
          className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm sm:rounded-[28px] sm:p-6"
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="space-y-4 min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold capitalize text-slate-700 sm:text-xs">
                  {card.domain}
                </span>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold capitalize text-slate-700 sm:text-xs">
                  {card.difficulty}
                </span>

                {card.hasResponse && (
                  <span className="rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-[11px] font-semibold text-violet-700 sm:text-xs">
                    {card.versionCount} version{card.versionCount === 1 ? '' : 's'}
                  </span>
                )}
              </div>

              <div className="min-w-0">
                <h3 className="text-lg font-semibold leading-tight text-slate-950 sm:text-xl">
                  {card.stem}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">
                  {card.scenario}
                </p>
              </div>
            </div>

            <div className="flex w-full shrink-0 flex-col gap-2 sm:flex-row lg:w-auto lg:flex-col">
              <button
                type="button"
                onClick={() => onOpenFavorite(card)}
                className="w-full rounded-2xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-95 sm:w-auto"
              >
                Open in Practice
              </button>
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}