'use client'

import { useState } from 'react'
import { generateDraft } from '@/lib/ai'
import { upsertQuestion } from '@/lib/local-store'
import type { Card } from '@/types'

export function AiQuestionGenerator() {
  const [topic, setTopic] = useState('')
  const [status, setStatus] = useState('')
  const [result, setResult] = useState<Card | null>(null)

  function handleGenerate() {
    const draft = generateDraft(topic)
    setResult(draft)
    setStatus('Draft generated.')
  }

  function saveDraft() {
    if (!result) return
    upsertQuestion(result)
    setStatus('Draft saved as a question.')
  }

  return (
    <div className="card" style={{ padding: 24 }}>
      <h2>AI-assisted question creation</h2>
      <p className="small">
        This local build uses a structured draft generator so the workflow works immediately.
      </p>

      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 16 }}>
        <input
          className="input"
          style={{ flex: 1, minWidth: 240 }}
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Example: instructional leadership feedback on rigor"
        />
        <button className="btn btn-dark" onClick={handleGenerate}>Generate draft</button>
      </div>

      <div className="small" style={{ marginTop: 12 }}>{status}</div>

      {result && (
        <div className="card" style={{ padding: 20, background: 'var(--soft)', marginTop: 20 }}>
          <div className="stack">
            <div><strong>Category:</strong> {result.category}</div>
            <div><strong>Difficulty:</strong> {result.difficulty}</div>
            <div><strong>Question:</strong> {result.question}</div>
            <div><strong>Prompt:</strong> {result.prompt}</div>
            <div><strong>Exemplar response:</strong> {result.exemplar}</div>
          </div>

          <button className="btn btn-dark" style={{ marginTop: 16 }} onClick={saveDraft}>
            Save draft as question
          </button>
        </div>
      )}
    </div>
  )
}
