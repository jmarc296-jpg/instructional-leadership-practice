'use client'

import { useMemo } from 'react'
import { Heart, RotateCcw, Sparkles } from 'lucide-react'
import type { Card } from '@/types'
import { getResponseVersions } from '@/lib/local-store'

type Props = {
  favoriteCards: Card[]
  onOpenFavorite: (card: Card) => void
}

export function FavoritesView({ favoriteCards, onOpenFavorite }: Props) {
  const enrichedCards = useMemo(() => {
    return favoriteCards.map((card) => {
      const versions = getResponseVersions(card.id)

      return {
        ...card,
        versionCount: versions.length,
        hasResponse: versions.length > 0
      }
    })
  }, [favoriteCards])

  return (
    <div className="space-y-6 fade-in">
      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="grid gap-0 lg:grid-cols-[1.35fr_0.85fr]">
          <div className="p-6 sm:p-8">
            <div className="section-label">Favorites</div>

            <h2 className="mt-3 text-3xl font-bold leading-tight text-slate-950 sm:text-4xl">
              Keep the scenarios worth revisiting close
            </h2>

            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
              Save the prompts that stretch your thinking, expose your weak spots,
              or deserve a second pass. Favorites should become your strongest
              reps over time, not just a saved list.
            </p>
          </div>

          <div className="hero-gradient p-6 sm:p-8">
            <div className="flex items-center gap-2 text-white">
              <Heart size={18} />
              <div className="text-xs font-bold uppercase tracking-[0.22em] text-white/75">
                Saved Focus
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
                <div className="text-xs uppercase tracking-[0.16em] text-white/70">
                  Favorite Scenarios
                </div>
                <div className="mt-1 text-3xl font-bold text-white">
                  {favoriteCards.length}
                </div>
              </div>

              <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
                <div className="text-xs uppercase tracking-[0.16em] text-white/70">
                  Saved For Revision
                </div>
                <div className="mt-1 text-3xl font-bold text-white">
                  {enrichedCards.filter((card) => card.hasResponse).length}
                </div>
              </div>

              <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
                <div className="text-xs uppercase tracking-[0.16em] text-white/70">
                  Best Use
                </div>
                <div className="mt-1 text-xl font-bold text-white">
                  Revisit and refine
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {favoriteCards.length === 0 ? (
        <section className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
            <Heart className="text-slate-500" size={22} />
          </div>

          <h3 className="mt-5 text-xl font-semibold text-slate-900">
            No favorites yet
          </h3>

          <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-600">
            Save scenarios you want to revisit. Favorites make it easier to return,
            compare, and sharpen your leadership thinking over time.
          </p>
        </section>
      ) : (
        <div className="space-y-5">
          {enrichedCards.map((card) => (
            <article
              key={card.id}
              className="app-card p-5 sm:p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                <div className="min-w-0 space-y-4">
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

                    {card.tags?.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-[11px] font-semibold text-blue-700 sm:text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-xl font-bold leading-tight text-slate-950 sm:text-2xl">
                      {card.stem}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">
                      {card.scenario}
                    </p>
                  </div>

                  <div className="grid gap-3 md:grid-cols-2">
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <div className="mb-2 flex items-center gap-2 text-slate-700">
                        <RotateCcw size={16} />
                        <div className="text-sm font-semibold">Revision readiness</div>
                      </div>
                      <p className="text-sm leading-6 text-slate-600">
                        {card.hasResponse
                          ? 'You already have saved thinking here. This is a strong candidate to revisit and improve.'
                          : 'You have not saved a response yet. Use this as a fresh leadership rep.'}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <div className="mb-2 flex items-center gap-2 text-slate-700">
                        <Sparkles size={16} />
                        <div className="text-sm font-semibold">Why save this</div>
                      </div>
                      <p className="text-sm leading-6 text-slate-600">
                        Favorites are most useful when they represent the exact scenarios
                        you want to master, not just the ones you like.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex w-full shrink-0 flex-col gap-2 sm:flex-row lg:w-auto lg:flex-col">
                  <button
                    type="button"
                    onClick={() => onOpenFavorite(card)}
                    className="btn-primary w-full sm:w-auto"
                  >
                    Open in Practice
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}