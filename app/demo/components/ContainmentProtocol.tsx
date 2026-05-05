'use client'

import { useMemo, useState } from 'react'
import { track } from '@/app/lib/track'
import { districtScenario } from '../config/districtScenario'

type RowExecution = {
  id: string
  owner: string
  action: string
  proof: string
  deadline: string
  evidence: string
  verified: boolean
}

export default function ContainmentProtocol() {
  const risks = useMemo(() => {
    return districtScenario
      .filter(r => r.escalation === 'HIGH')
      .slice(0, 3)
      .map((r, i) => ({
        id: `${r.school}-${i}`,
        school: r.school,
        signal: r.signal,
        owner: r.owner || ''
      }))
  }, [])

  const [execution, setExecution] = useState<Record<string, RowExecution>>(
    risks.reduce((acc, r) => {
      acc[r.id] = {
        id: r.id,
        owner: r.owner,
        action: '',
        proof: '',
        deadline: '',
        evidence: '',
        verified: false
      }
      return acc
    }, {} as Record<string, RowExecution>)
  )

  const incomplete = risks.filter(r => {
    const item = execution[r.id]
    return !item.owner || !item.action || !item.proof || !item.deadline || !item.verified
  }).length

  function update(id: string, field: keyof RowExecution, value: string | boolean) {
    setExecution(prev => ({
      ...prev,
      [id]: { ...prev[id], [field]: value }
    }))
  }

  function verify(id: string) {
    const item = execution[id]

    if (!item.evidence) {
      track('verification_blocked', { id })
      return
    }

    update(id, 'verified', true)

    track('containment_verified', {
      id,
      evidenceProvided: true
    })
  }

  function release(id: string) {
    update(id, 'verified', false)
    track('containment_reopened', { id })
  }

  return (
    <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">

      <div className="flex items-start justify-between border-b border-slate-200 pb-5">
        <div>
          <div className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500">
            Containment Protocol
          </div>

          <h2 className="mt-2 text-2xl font-semibold text-slate-950">
            {incomplete > 0
              ? `${incomplete} risks are not contained`
              : 'All risks are contained and verified'}
          </h2>

          <p className="mt-2 text-sm text-slate-600">
            Identification is not containment. Every risk must move through execution and verified evidence.
          </p>
        </div>
      </div>

      <div className="mt-5 space-y-5">
        {risks.map(r => {
          const item = execution[r.id]
          const blocked = !item.owner || !item.action || !item.proof || !item.deadline

          return (
            <div
              key={r.id}
              className={`rounded-2xl border p-5 ${
                item.verified
                  ? 'border-emerald-300 bg-emerald-50'
                  : blocked
                    ? 'border-red-300 bg-red-50'
                    : 'border-amber-300 bg-amber-50'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wide text-slate-500">
                    {r.school}
                  </div>

                  <div className="mt-1 font-semibold text-slate-950">
                    {r.signal}
                  </div>
                </div>

                <div className={`text-xs font-bold ${
                  item.verified
                    ? 'text-emerald-700'
                    : blocked
                      ? 'text-red-700'
                      : 'text-amber-700'
                }`}>
                  {item.verified ? 'CONTAINED' : blocked ? 'EXPOSED' : 'IN PROGRESS'}
                </div>
              </div>

              <div className="mt-4 grid gap-3 md:grid-cols-4">
                <input
                  value={item.owner}
                  onChange={e => update(r.id, 'owner', e.target.value)}
                  placeholder="Owner"
                  className="rounded-xl border px-3 py-2 text-sm"
                />

                <input
                  value={item.action}
                  onChange={e => update(r.id, 'action', e.target.value)}
                  placeholder="Action"
                  className="rounded-xl border px-3 py-2 text-sm"
                />

                <input
                  value={item.proof}
                  onChange={e => update(r.id, 'proof', e.target.value)}
                  placeholder="Proof"
                  className="rounded-xl border px-3 py-2 text-sm"
                />

                <input
                  value={item.deadline}
                  onChange={e => update(r.id, 'deadline', e.target.value)}
                  placeholder="Deadline"
                  className="rounded-xl border px-3 py-2 text-sm"
                />
              </div>

              <div className="mt-4 flex gap-3">
                <input
                  value={item.evidence}
                  onChange={e => update(r.id, 'evidence', e.target.value)}
                  placeholder="Paste evidence to verify"
                  className="flex-1 rounded-xl border px-3 py-2 text-sm"
                />

                {item.verified ? (
                  <button
                    onClick={() => release(r.id)}
                    className="rounded-full border px-4 text-sm font-semibold"
                  >
                    Reopen
                  </button>
                ) : (
                  <button
                    onClick={() => verify(r.id)}
                    className={`rounded-full px-4 text-sm font-semibold ${
                      item.evidence
                        ? 'bg-[#071B4D] text-white'
                        : 'bg-gray-300 text-gray-600'
                    }`}
                  >
                    Verify
                  </button>
                )}
              </div>

              {blocked && (
                <div className="mt-3 text-xs font-semibold text-red-700">
                  Missing required fields. Risk remains active at executive level.
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className="mt-6 rounded-xl border border-slate-200 bg-slate-950 p-5 text-white">
        <div className="text-xs font-bold uppercase tracking-wide text-slate-400">
          System State
        </div>

        <div className="mt-2 text-sm">
          {incomplete > 0
            ? 'Containment incomplete. System will continue escalation.'
            : 'Containment verified. Risk neutralized pending monitoring.'}
        </div>
      </div>

    </section>
  )
}
