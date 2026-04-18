'use client'

import { useEffect, useMemo, useState } from 'react'
import { AdminToolbar } from '@/components/admin-toolbar'
import { getQuestions, saveQuestions, toggleQuestionActive } from '@/lib/local-store'
import type { Card, Category, Difficulty } from '@/types'

type EditableCard = Card & { isActive?: boolean }

export function AdminQuestionEditor() {
  const [questions, setQuestions] = useState<EditableCard[]>([])
  const [status, setStatus] = useState('')
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'archived'>('all')

  function loadQuestions() {
    setQuestions(getQuestions())
  }

  useEffect(() => {
    loadQuestions()
  }, [])

  const visibleQuestions = useMemo(() => {
    return questions.filter((question) => {
      const matchesSearch =
        question.question.toLowerCase().includes(search.toLowerCase()) ||
        question.prompt.toLowerCase().includes(search.toLowerCase()) ||
        question.exemplar.toLowerCase().includes(search.toLowerCase())

      const active = question.isActive !== false
      const matchesStatus =
        filterStatus === 'all' ||
        (filterStatus === 'active' && active) ||
        (filterStatus === 'archived' && !active)

      return matchesSearch && matchesStatus
    })
  }, [questions, search, filterStatus])

  function updateField(id: string, field: keyof EditableCard, value: string | boolean) {
    setQuestions((prev) => prev.map((q) => (q.id === id ? { ...q, [field]: value } : q)))
  }

  function persistQuestion(question: EditableCard) {
    const next = questions.map((q) => (q.id === question.id ? question : q))
    saveQuestions(next)
    setQuestions(next)
    setStatus('Changes saved.')
  }

  function archiveToggle(question: EditableCard) {
    toggleQuestionActive(question.id)
    loadQuestions()
    setStatus(question.isActive !== false ? 'Question archived.' : 'Question restored.')
  }

  return (
    <div className="stack">
      <AdminToolbar onSearchChange={setSearch} onStatusChange={setFilterStatus} />
      <div className="small">{status}</div>

      {visibleQuestions.map((question) => (
        <div key={question.id} className="card" style={{ padding: 24 }}>
          <div className="grid-two">
            <select
              className="select"
              value={question.category}
              onChange={(e) =>
                updateField(question.id, 'category', e.target.value as Exclude<Category, 'all'>)
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
              value={question.difficulty}
              onChange={(e) =>
                updateField(question.id, 'difficulty', e.target.value as Difficulty)
              }
            >
              <option value="foundational">Foundational</option>
              <option value="strong">Strong</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>

          <div className="stack" style={{ marginTop: 16 }}>
            <textarea
              className="textarea"
              value={question.question}
              onChange={(e) => updateField(question.id, 'question', e.target.value)}
            />
            <textarea
              className="textarea"
              value={question.prompt}
              onChange={(e) => updateField(question.id, 'prompt', e.target.value)}
            />
            <textarea
              className="textarea"
              value={question.exemplar}
              onChange={(e) => updateField(question.id, 'exemplar', e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', gap: 12, marginTop: 16, flexWrap: 'wrap', alignItems: 'center' }}>
            <button className="btn btn-dark" onClick={() => persistQuestion(question)}>
              Save changes
            </button>
            <button className="btn" onClick={() => archiveToggle(question)}>
              {question.isActive !== false ? 'Archive' : 'Restore'}
            </button>
            <span className="small">{question.isActive !== false ? 'Active' : 'Archived'}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
