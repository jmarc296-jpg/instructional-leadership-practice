'use client'

import { useState } from 'react'
import { parseCsvToCards } from '@/lib/csv'
import { getQuestions, saveQuestions } from '@/lib/local-store'
import type { Card } from '@/types'

type UploadMode = 'json' | 'csv'

export function BulkUploadForm() {
  const [mode, setMode] = useState<UploadMode>('json')
  const [text, setText] = useState('')
  const [status, setStatus] = useState('')

  function handleUpload(e: React.FormEvent) {
    e.preventDefault()
    let rows: Card[] = []

    try {
      if (mode === 'json') {
        const parsed = JSON.parse(text) as Array<Omit<Card, 'id'> & Partial<Pick<Card, 'id'>>>
        rows = parsed.map((item, index) => ({
          id: item.id || `bulk-${Date.now()}-${index}`,
          category: item.category,
          difficulty: item.difficulty,
          question: item.question,
          prompt: item.prompt,
          exemplar: item.exemplar,
          isActive: item.isActive ?? true,
          createdAt: item.createdAt || new Date().toISOString()
        }))
      } else {
        rows = parseCsvToCards(text)
      }
    } catch {
      setStatus('Invalid upload format.')
      return
    }

    if (!rows.length) {
      setStatus('No valid rows found.')
      return
    }

    saveQuestions([...rows, ...getQuestions()])
    setStatus(`Bulk upload complete. Inserted ${rows.length} questions.`)
    setText('')
  }

  return (
    <form onSubmit={handleUpload} className="card" style={{ padding: 24 }}>
      <h1>Bulk upload questions</h1>
      <p className="small">
        Paste either a JSON array or CSV text using category, difficulty, question, prompt, and exemplar.
      </p>

      <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
        <button type="button" className={`btn ${mode === 'json' ? 'btn-dark' : ''}`} onClick={() => setMode('json')}>
          JSON
        </button>
        <button type="button" className={`btn ${mode === 'csv' ? 'btn-dark' : ''}`} onClick={() => setMode('csv')}>
          CSV
        </button>
      </div>

      <textarea
        className="textarea"
        style={{ minHeight: 320, marginTop: 16 }}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={
          mode === 'json'
            ? '[{"category":"rigor","difficulty":"strong","question":"...","prompt":"...","exemplar":"..."}]'
            : 'category,difficulty,question,prompt,exemplar'
        }
      />

      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, marginTop: 16, alignItems: 'center' }}>
        <div className="small">{status}</div>
        <button className="btn btn-dark" type="submit">
          Upload questions
        </button>
      </div>
    </form>
  )
}
