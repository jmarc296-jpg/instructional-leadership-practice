'use client'

import { useEffect, useMemo, useState } from 'react'
import {
  addFavorite,
  getFavorites,
  getResponseVersions,
  getWrittenResponse,
  removeFavorite,
  saveProgress,
  saveWrittenResponse
} from '@/lib/local-store'
import { scoreResponseAgainstExemplar } from '@/lib/response-scoring'
import type { Card, Rating, SessionSettings } from '@/types'

type Props = {
  card: Card
  settings: SessionSettings
  progressLabel: string
  isLastCard?: boolean
  showPrompt: boolean
  showExemplar: boolean
  onRevealPrompt: () => void
  onRevealExemplar: () => void
  onNext: () => void
}

function getRatingClasses(rating: Rating, selected: Rating | null) {
  const isSelected = selected === rating

  if (rating === 'strong') {
    return isSelected
      ? 'border-emerald-600 bg-emerald-600 text-white'
      : 'border-emerald-200 bg-white text-emerald-700 hover:bg-emerald-50'
  }

  if (rating === 'partial') {
    return isSelected
      ? 'border-amber-500 bg-amber-500 text-white'
      : 'border-amber-200 bg-white text-amber-700 hover:bg-amber-50'
  }

  return isSelected
    ? 'border-rose-600 bg-rose-600 text-white'
    : 'border-rose-200 bg-white text-rose-700 hover:bg-rose-50'
}

function getRatingDescription(rating: Rating) {
  if (rating === 'strong') {
    return 'Clear issue, strong reasoning, high-leverage move.'
  }

  if (rating === 'partial') {
    return 'Mostly right, but lacked precision or evidence.'
  }

  return 'Missed the core issue or chose the wrong move.'
}

export function PracticeCard({
  card,
  settings,
  progressLabel,
  showPrompt,
  showExemplar,
  onRevealPrompt,
  onRevealExemplar,
  onNext
}: Props) {
  const [favoriteStatus, setFavoriteStatus] = useState('')
  const [isFavorite, setIsFavorite] = useState(false)
  const [writtenResponse, setWrittenResponse] = useState('')
  const [savedResponse, setSavedResponse] = useState('')
  const [selectedRating, setSelectedRating] = useState<Rating | null>(null)
  const [hasSubmittedRating, setHasSubmittedRating] = useState(false)
  const [versionCount, setVersionCount] = useState(0)
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')

  useEffect(() => {
    const favorites = getFavorites()
    setIsFavorite(favorites.includes(card.id))

    const existingResponse = getWrittenResponse(card.id)
    setWrittenResponse(existingResponse)
    setSavedResponse(existingResponse)

    const versions = getResponseVersions(card.id)
    setVersionCount(versions.length)

    setSelectedRating(null)
    setHasSubmittedRating(false)
    setFavoriteStatus('')
    setSaveStatus('idle')
  }, [card.id])

  const hasWrittenResponse = writtenResponse.trim().length > 0
  const hasSavedResponse = savedResponse.trim().length > 0
  const isEditedFromSaved = writtenResponse.trim() !== savedResponse.trim()

  const revisionLabel = useMemo(() => {
    if (!hasSavedResponse) return 'Write your response'
    if (versionCount <= 1) return 'Revise your previous response'
    return `Revise your previous response (${versionCount} versions)`
  }, [hasSavedResponse, versionCount])

  const autoScore = useMemo(() => {
    if (!showExemplar || !writtenResponse.trim()) return null
    return scoreResponseAgainstExemplar(writtenResponse, card)
  }, [showExemplar, writtenResponse, card])

  function toggleFavorite() {
    if (isFavorite) {
      removeFavorite(card.id)
      setIsFavorite(false)
      setFavoriteStatus('Removed')
      return
    }

    addFavorite(card.id)
    setIsFavorite(true)
    setFavoriteStatus('Saved')
  }

  function handleSaveResponse() {
    if (!hasWrittenResponse) return

    setSaveStatus('saving')

    const success = saveWrittenResponse(card.id, writtenResponse)

    if (!success) {
      setSaveStatus('error')
      return
    }

    setSavedResponse(writtenResponse)

    const versions = getResponseVersions(card.id)
    setVersionCount(versions.length)

    setSaveStatus('saved')
  }

  function handleRating(rating: Rating) {
    if (!hasSavedResponse) {
      alert('Save your response before rating.')
      return
    }

    setSelectedRating(rating)

    saveProgress({
      cardId: card.id,
      domain: card.domain,
      difficulty: card.difficulty,
      rating
    })

    setHasSubmittedRating(true)
  }

  function handleNextWithGuard() {
    if (isEditedFromSaved) {
      const confirmLeave = confirm('You have unsaved changes. Save before moving on?')

      if (confirmLeave) {
        handleSaveResponse()
      }
    }

    onNext()
  }

  return (
    <div className="space-y-5">
      <section className="rounded-2xl border p-5">
        <div className="flex justify-between gap-4 flex-wrap">
          <div>
            <div className="text-sm text-slate-500">{progressLabel}</div>
            <h2 className="text-xl font-semibold">{card.stem}</h2>
            <p className="text-sm mt-2 text-slate-600">{card.scenario}</p>
          </div>

          <button
            onClick={toggleFavorite}
            className="border px-3 py-2 rounded"
            type="button"
          >
            {isFavorite ? 'Favorited' : 'Favorite'}
          </button>
        </div>
      </section>

      {!showPrompt && (
        <section className="border p-5 rounded-2xl space-y-3">
          <p className="text-sm text-slate-600">
            Click below to begin the scenario and write your response.
          </p>

          <button
            onClick={onRevealPrompt}
            className="btn-primary w-full"
            type="button"
          >
            Start Scenario
          </button>
        </section>
      )}

      {showPrompt && (
        <>
          <section className="border p-5 rounded-2xl">
            <h3 className="font-semibold">Prompt</h3>
            <p className="mt-2">{card.prompt}</p>
          </section>

          <section className="border p-5 rounded-2xl">
            <h4 className="font-semibold">{revisionLabel}</h4>

            {hasSavedResponse && (
              <div className="mt-3 text-sm text-slate-500">
                Previous saved version:
                <div className="mt-1 whitespace-pre-wrap text-slate-800">
                  {savedResponse}
                </div>
              </div>
            )}

            <textarea
              value={writtenResponse}
              onChange={(e) => {
                setWrittenResponse(e.target.value)
                setSaveStatus('idle')
              }}
              className="w-full mt-3 border rounded p-3 min-h-[200px]"
              placeholder="Name the issue, why it matters, and the next move..."
            />

            <div className="mt-3 flex gap-3 flex-wrap items-center">
              <button
                onClick={handleSaveResponse}
                disabled={!hasWrittenResponse}
                className="btn-primary"
                type="button"
              >
                {saveStatus === 'saving'
                  ? 'Saving...'
                  : isEditedFromSaved
                    ? 'Save New Version'
                    : 'Save Response'}
              </button>

              {saveStatus === 'saved' && (
                <span className="text-green-600 text-sm">Saved</span>
              )}

              {saveStatus === 'error' && (
                <span className="text-red-600 text-sm">Save failed. Try again.</span>
              )}
            </div>
          </section>

          {!showExemplar && (
            <button onClick={onRevealExemplar} className="btn-primary" type="button">
              Compare with Exemplar
            </button>
          )}

          {showExemplar && (
            <>
              <section className="border p-5 rounded-2xl">
                <h4 className="font-semibold">Exemplar</h4>
                <p className="mt-2 whitespace-pre-wrap">{card.exemplar}</p>
              </section>

              {autoScore && (
                <section className="border p-5 rounded-2xl bg-slate-50">
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <h4 className="font-semibold">Auto-score against exemplar</h4>
                    <span className="rounded-full bg-slate-900 px-3 py-1 text-sm font-semibold text-white">
                      {autoScore.total} / {autoScore.max}
                    </span>
                  </div>

                  <div className="mt-4 grid gap-2">
                    <div className="text-sm">
                      {autoScore.breakdown.namesIssue ? '✅' : '❌'} Names the issue
                    </div>
                    <div className="text-sm">
                      {autoScore.breakdown.explainsWhyItMatters ? '✅' : '❌'} Explains why it matters
                    </div>
                    <div className="text-sm">
                      {autoScore.breakdown.statesLeadershipMove ? '✅' : '❌'} States a leadership move
                    </div>
                    <div className="text-sm">
                      {autoScore.breakdown.usesEvidenceOrPrecision ? '✅' : '❌'} Uses evidence or precision
                    </div>
                    <div className="text-sm">
                      {autoScore.breakdown.namesStudentImpact ? '✅' : '❌'} Names student impact
                    </div>
                  </div>

                  <div className="mt-4">
                    <h5 className="text-sm font-semibold">Tighten next</h5>
                    <ul className="mt-2 space-y-1">
                      {autoScore.feedback.map((item) => (
                        <li key={item} className="text-sm text-slate-700">
                          • {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </section>
              )}

              <section className="border p-5 rounded-2xl">
                <h4 className="font-semibold">Rate your response</h4>

                <div className="grid gap-3 mt-3">
                  {(['strong', 'partial', 'struggled'] as Rating[]).map((rating) => (
                    <button
                      key={rating}
                      onClick={() => handleRating(rating)}
                      className={`border p-3 rounded ${getRatingClasses(
                        rating,
                        selectedRating
                      )}`}
                      type="button"
                    >
                      <div className="font-semibold">{rating}</div>
                      <div className="text-sm">{getRatingDescription(rating)}</div>
                    </button>
                  ))}
                </div>

                {hasSubmittedRating && (
                  <button onClick={handleNextWithGuard} className="btn-primary mt-4" type="button">
                    Next Question
                  </button>
                )}
              </section>
            </>
          )}
        </>
      )}

      {!showPrompt && !showExemplar && (
        <div className="mt-4">
          <button
            onClick={onRevealPrompt}
            className="btn-primary w-full"
            type="button"
          >
            Start Scenario
          </button>
        </div>
      )}
    </div>
  )
}