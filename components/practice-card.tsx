'use client'

import { useEffect, useState } from 'react'
import { addFavorite, getFavorites, removeFavorite, saveProgress } from '@/lib/local-store'
import type { Card, SessionSettings } from '@/types'

type Props = {
  card: Card
  settings: SessionSettings
  progressLabel: string
  isLastCard: boolean
  showPrompt: boolean
  showExemplar: boolean
  onRevealPrompt: () => void
  onRevealExemplar: () => void
  onNext: () => void
}

export function PracticeCard({
  card,
  settings,
  progressLabel,
  isLastCard,
  showPrompt,
  showExemplar,
  onRevealPrompt,
  onRevealExemplar,
  onNext
}: Props) {
  const [favoriteStatus, setFavoriteStatus] = useState('')
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    setIsFavorite(getFavorites().includes(card.id))
  }, [card.id])

  function toggleFavorite() {
    if (isFavorite) {
      removeFavorite(card.id)
      setFavoriteStatus('Removed from favorites.')
      setIsFavorite(false)
    } else {
      addFavorite(card.id)
      setFavoriteStatus('Saved to favorites.')
      setIsFavorite(true)
    }
  }

  function handleNext() {
    saveProgress(card.id)
    onNext()
  }

  return (
    <section className="card" style={{ padding: 24 }}>
      <div style={{ minHeight: 520, display: 'flex', flexDirection: 'column' }}>
        <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: 20, display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
          <div>
            <div className="eyebrow">{progressLabel}</div>
            <h2 style={{ marginBottom: 0 }}>{card.question}</h2>
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'flex-start' }}>
            <span className="badge">{card.category}</span>
            <span className="badge">{card.difficulty}</span>
            <span className="badge">{settings.mode}</span>
          </div>
        </div>

        <div className="stack" style={{ flex: 1, padding: '24px 0' }}>
          {settings.includePrompt && (
            <div className="card" style={{ background: 'var(--soft)', padding: 20 }}>
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 8 }}>Prompt</div>
              {showPrompt ? (
                <p style={{ margin: 0, lineHeight: 1.7 }}>{card.prompt}</p>
              ) : (
                <p className="small" style={{ margin: 0, fontStyle: 'italic' }}>
                  Hidden for quiz mode. Reveal when ready.
                </p>
              )}
            </div>
          )}

          {settings.includeExemplar && (
            <div className="card" style={{ background: 'var(--soft)', padding: 20 }}>
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 8 }}>
                Exemplar response
              </div>
              {showExemplar ? (
                <p style={{ margin: 0, lineHeight: 1.7 }}>{card.exemplar}</p>
              ) : (
                <p className="small" style={{ margin: 0, fontStyle: 'italic' }}>
                  Hidden for quiz mode. Reveal when ready.
                </p>
              )}
            </div>
          )}
        </div>

        <div style={{ borderTop: '1px solid var(--border)', paddingTop: 20, display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
          {settings.mode === 'quiz' && settings.includePrompt && !showPrompt && (
            <button className="btn" onClick={onRevealPrompt}>Reveal prompt</button>
          )}

          {settings.mode === 'quiz' && settings.includeExemplar && !showExemplar && (
            <button className="btn" onClick={onRevealExemplar}>Reveal exemplar</button>
          )}

          <button className="btn" onClick={toggleFavorite}>
            {isFavorite ? 'Unfavorite' : 'Favorite'}
          </button>

          <div className="small">{favoriteStatus}</div>

          <button className="btn btn-dark" onClick={handleNext} style={{ marginLeft: 'auto' }}>
            {isLastCard ? 'Finish session' : 'Next card'}
          </button>
        </div>
      </div>
    </section>
  )
}
