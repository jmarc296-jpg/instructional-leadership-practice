'use client'

import { useEffect, useState } from 'react'
import { BulkUploadForm } from '@/components/bulk-upload-form'
import { getAdminMode } from '@/lib/local-store'

export default function BulkUploadPage() {
  const [allowed, setAllowed] = useState(true)

  useEffect(() => {
    setAllowed(getAdminMode())
  }, [])

  if (!allowed) {
    return (
      <main className="card" style={{ padding: 24 }}>
        <h1>Bulk upload</h1>
        <p className="small">Admin mode is disabled. Re-enable it from the practice page.</p>
      </main>
    )
  }

  return (
    <main>
      <BulkUploadForm />
    </main>
  )
}
