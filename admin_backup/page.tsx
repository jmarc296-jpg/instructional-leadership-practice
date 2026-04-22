'use client'

import { useEffect, useState } from 'react'
import { AdminQuestionEditor } from '@/components/admin-question-editor'
import { AdminQuestionForm } from '@/components/admin-question-form'
import { AiQuestionGenerator } from '@/components/ai-question-generator'
import { getAdminMode } from '@/lib/local-store'

export default function AdminPage() {
  const [allowed, setAllowed] = useState(true)

  useEffect(() => {
    setAllowed(getAdminMode())
  }, [])

  if (!allowed) {
    return (
      <main className="card" style={{ padding: 24 }}>
        <h1>Admin</h1>
        <p className="small">Admin mode is disabled. Re-enable it from the practice page.</p>
      </main>
    )
  }

  return (
    <main className="stack">
      <AdminQuestionForm />
      <AiQuestionGenerator />
      <AdminQuestionEditor />
    </main>
  )
}
