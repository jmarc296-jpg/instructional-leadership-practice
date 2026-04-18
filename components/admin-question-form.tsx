'use client'

import { useState } from 'react'
import { upsertQuestion } from '@/lib/local-store'
import type { Category, Difficulty } from '@/types'

export function AdminQuestionForm() {
  const [form, setForm] = useState({
    category: 'rigor' as Exclude<Category, 'all'>,
    difficulty: 'strong' as Difficulty,
    question: '',
    prompt: '',
    exemplar: ''
  })
  const [status, setStatus] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!form.question.trim() || !form.prompt.trim() || !form.exemplar.trim()) {
      setStatus('Complete all fields before saving.')
      return
    }

    upsertQuestion({
      id: `manual-${Date.now()}`,
      category: form.category,
      difficulty: form.difficulty,
      question: form.question.trim(),
      prompt: form.prompt.trim(),
      exemplar: form.exemplar.trim(),
      isActive: true,
      createdAt: new Date().toISOString()
    })

    setForm({
      category: 'rigor',
      difficulty: 'strong',
      question: '',
      prompt: '',
      exemplar: ''
    })
    setStatus('Question saved.')
  }

  return (
    <form className="card stack" style={{ padding: 24 }} onSubmit={handleSubmit}>
      <h1 style={{ marginBottom: 0 }}>Create question</h1>

      <div className="grid-two">
        <select
          className="select"
          value={form.category}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, category: e.target.value as Exclude<Category, 'all'> }))
          }
        >
          <option value="rigor">Rigor</option>
          <option value="ddi">DDI</option>
          <option value="observation-feedback">Observation and feedback</option>
          <option value="curriculum-alignment">Curriculum alignment</option>
          <option value="ilt-leadership">ILT leadership</option>
          <option value="principal-decision-making">Principal decision-making</option>
        </select>

        <select
          className="select"
          value={form.difficulty}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, difficulty: e.target.value as Difficulty }))
          }
        >
          <option value="foundational">Foundational</option>
          <option value="strong">Strong</option>
          <option value="advanced">Advanced</option>
        </select>
      </div>

      <textarea
        className="textarea"
        value={form.question}
        placeholder="Question"
        onChange={(e) => setForm((prev) => ({ ...prev, question: e.target.value }))}
      />
      <textarea
        className="textarea"
        value={form.prompt}
        placeholder="Prompt"
        onChange={(e) => setForm((prev) => ({ ...prev, prompt: e.target.value }))}
      />
      <textarea
        className="textarea"
        value={form.exemplar}
        placeholder="Exemplar response"
        onChange={(e) => setForm((prev) => ({ ...prev, exemplar: e.target.value }))}
      />

      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'center' }}>
        <div className="small">{status}</div>
        <button className="btn btn-dark" type="submit">Save question</button>
      </div>
    </form>
  )
}
