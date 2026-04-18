'use client'

import { useEffect, useState } from 'react'
import { getAdminMode, setAdminMode } from '@/lib/local-store'

export function AuthPanel() {
  const [adminMode, setAdminModeState] = useState(true)

  useEffect(() => {
    setAdminModeState(getAdminMode())
  }, [])

  function toggleMode() {
    const next = !adminMode
    setAdminModeState(next)
    setAdminMode(next)
  }

  return (
    <div className="card" style={{ padding: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
        <div>
          <div style={{ fontWeight: 700 }}>Local mode</div>
          <div className="small">
            This build runs without external auth. Admin mode is a local toggle for testing the full product.
          </div>
        </div>
        <button className="btn" onClick={toggleMode}>
          {adminMode ? 'Disable admin mode' : 'Enable admin mode'}
        </button>
      </div>
    </div>
  )
}
