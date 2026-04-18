'use client'

import { useState } from 'react'

type Props = {
  onSearchChange: (value: string) => void
  onStatusChange: (value: 'all' | 'active' | 'archived') => void
}

export function AdminToolbar({ onSearchChange, onStatusChange }: Props) {
  const [status, setStatus] = useState<'all' | 'active' | 'archived'>('all')

  return (
    <div className="card" style={{ padding: 16 }}>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <input
          className="input"
          style={{ flex: 1, minWidth: 240 }}
          type="text"
          placeholder="Search questions"
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <select
          className="select"
          style={{ maxWidth: 180 }}
          value={status}
          onChange={(e) => {
            const value = e.target.value as 'all' | 'active' | 'archived'
            setStatus(value)
            onStatusChange(value)
          }}
        >
          <option value="all">All statuses</option>
          <option value="active">Active only</option>
          <option value="archived">Archived only</option>
        </select>
      </div>
    </div>
  )
}
