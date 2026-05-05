'use client'

import { useMemo, useState } from 'react'
import { districtScenario } from '../config/districtScenario'
import { buildExecutiveSummary } from '../utils/executiveSummary'
import { track } from '@/app/lib/track'

type BoardRecord = {
  decision: string
  exposure: string
  mitigation: string
  owner: string
  boardReady: boolean
}

export default function BoardExposureNarrative() {
  const summary = buildExecutiveSummary(districtScenario)
  const highRisks = useMemo(() => districtScenario.filter(row => row.escalation === 'HIGH'), [])

  const [record, setRecord] = useState<BoardRecord>({
    decision: '',
    exposure: '',
    mitigation: '',
    owner: '',
    boardReady: false
  })

  const blocked = !record.decision || !record.exposure || !record.mitigation || !record.owner

  function update(field: keyof BoardRecord, value: string | boolean) {
    setRecord(prev => ({ ...prev, [field]: value }))
  }

  function lockBoardRecord() {
    if (blocked) {
      track('board_record_blocked', {
        decision: Boolean(record.decision),
        exposure: Boolean(record.exposure),
        mitigation: Boolean(record.mitigation),
        owner: Boolean(record.owner)
      })
      return
    }

    setRecord(prev => ({ ...prev, boardReady: true }))

    track('board_record_locked', {
      highRisks: highRisks.length,
      atRiskLeaders: summary.atRiskLeaders,
      immediateActions: summary.immediateActions
    })
  }

  function reopenBoardRecord() {
    setRecord(prev => ({ ...prev, boardReady: false }))
    track('board_record_reopened', {})
  }

  return (
    <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
      <div className="grid gap-6 md:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-2xl border border-slate-200 bg-slate-950 p-5 text-white">
          <div className="text-xs font-bold uppercase tracking-[0.22em] text-slate-400">
            Board Exposure
          </div>

          <h2 className="mt-3 text-2xl font-semibold tracking-tight">
            {record.boardReady
              ? 'Board narrative locked.'
              : 'Board narrative is not defensible yet.'}
          </h2>

          <p className="mt-3 text-sm leading-6 text-slate-300">
            A leadership risk system must produce more than insight. It must create a board-ready record of what was known, who owned it, and what action was taken.
          </p>

          <div className="mt-5 grid grid-cols-3 gap-3">
            <div className="rounded-xl border border-white/10 bg-white/5 p-3">
              <div className="text-xs text-slate-400">High Risks</div>
              <div className="mt-1 text-2xl font-semibold">{highRisks.length}</div>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-3">
              <div className="text-xs text-slate-400">At Risk</div>
              <div className="mt-1 text-2xl font-semibold">{summary.atRiskLeaders}</div>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-3">
              <div className="text-xs text-slate-400">Actions</div>
              <div className="mt-1 text-2xl font-semibold">{summary.immediateActions}</div>
            </div>
          </div>

          <div className={`mt-5 rounded-xl border p-4 text-sm font-semibold ${
            record.boardReady
              ? 'border-emerald-400/40 bg-emerald-400/10 text-emerald-100'
              : 'border-red-400/40 bg-red-400/10 text-red-100'
          }`}>
            {record.boardReady
              ? 'This record can be shared as an executive accountability artifact.'
              : 'Without a complete record, leadership exposure remains informal and deniable.'}
          </div>
        </div>

        <div>
          <div className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500">
            Required Board Record
          </div>

          <div className="mt-4 space-y-3">
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Decision Made
              </span>
              <textarea
                value={record.decision}
                disabled={record.boardReady}
                onChange={event => update('decision', event.target.value)}
                placeholder="State the executive decision that was made."
                className="mt-1 min-h-20 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-[#0D6EFD] disabled:bg-slate-100"
              />
            </label>

            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Exposure if Ignored
              </span>
              <textarea
                value={record.exposure}
                disabled={record.boardReady}
                onChange={event => update('exposure', event.target.value)}
                placeholder="Name what becomes visible if action does not happen."
                className="mt-1 min-h-20 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-[#0D6EFD] disabled:bg-slate-100"
              />
            </label>

            <div className="grid gap-3 md:grid-cols-2">
              <label className="block">
                <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Mitigation
                </span>
                <input
                  value={record.mitigation}
                  disabled={record.boardReady}
                  onChange={event => update('mitigation', event.target.value)}
                  placeholder="Required mitigation"
                  className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-[#0D6EFD] disabled:bg-slate-100"
                />
              </label>

              <label className="block">
                <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Executive Owner
                </span>
                <input
                  value={record.owner}
                  disabled={record.boardReady}
                  onChange={event => update('owner', event.target.value)}
                  placeholder="Name the owner"
                  className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-[#0D6EFD] disabled:bg-slate-100"
                />
              </label>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="text-sm font-semibold text-slate-700">
              {record.boardReady
                ? 'Board record locked into the executive trail.'
                : blocked
                  ? 'Board record incomplete. Do not close this scenario.'
                  : 'Ready to lock into the executive trail.'}
            </div>

            {record.boardReady ? (
              <button
                onClick={reopenBoardRecord}
                className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-100"
              >
                Reopen
              </button>
            ) : (
              <button
                onClick={lockBoardRecord}
                className={`rounded-full px-4 py-2 text-sm font-bold ${
                  blocked
                    ? 'cursor-not-allowed bg-slate-300 text-slate-600'
                    : 'bg-[#071B4D] text-white hover:bg-[#0D6EFD]'
                }`}
              >
                Lock Board Record
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
