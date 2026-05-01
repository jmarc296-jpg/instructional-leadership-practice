'use client'

import { useEffect } from 'react'
import { districtScenario } from '../config/districtScenario'
import { buildExecutiveSummary } from '../utils/executiveSummary'
import ExecutiveDecisionPanel from '../components/ExecutiveDecisionPanel'
import DemoActionTable from '../components/DemoActionTable'
import EscalationBanner from '../components/EscalationBanner'
import ValueProof from '../components/ValueProof'
import { track } from '@/app/lib/track'

export default function DemoRunPage() {
  const escalationCount = districtScenario.filter(r => r.escalation === 'HIGH').length
  const summary = buildExecutiveSummary(districtScenario)

  useEffect(() => {
    track('demo_run_view')
    const t = setTimeout(() => track('demo_run_5s'), 5000)
    return () => clearTimeout(t)
  }, [])

  return (
    <main className="min-h-screen bg-[#f8f7f4] px-6 py-8 text-gray-950">
      <div className="mx-auto max-w-6xl space-y-5">

        <div className="flex gap-3">
          <button onClick={() => track('assign_now')} className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold">
            Assign Ownership Now
          </button>
          <button onClick={() => track('delay_action')} className="border px-4 py-2 rounded-lg font-semibold">
            Delay Decision
          </button>
        </div>

        <section className="border-b border-gray-200 pb-6">
          <div className="text-xs font-medium text-gray-500">
            Active Leadership Risk
          </div>
          <h1 className="mt-2 max-w-3xl text-3xl font-semibold tracking-tight">
            You are currently carrying uncontained leadership risk across multiple schools. Inaction will result in classroom impact.
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-gray-700">
            {summary.summaryLine}
          </p>
        </section>

        <EscalationBanner escalationCount={escalationCount} />

        <section className="grid gap-3 md:grid-cols-4">
          <div className="rounded-lg border bg-white p-4 shadow-sm">
            <div className="text-xs font-medium text-gray-500">At-Risk Leaders</div>
            <div className="mt-1 text-2xl font-semibold tracking-tight">{summary.atRiskLeaders}</div>
          </div>
          <div className="rounded-lg border bg-white p-4 shadow-sm">
            <div className="text-xs font-medium text-gray-500">Immediate Actions</div>
            <div className="mt-1 text-2xl font-semibold tracking-tight">{summary.immediateActions}</div>
          </div>
          <div className="rounded-lg border bg-white p-4 shadow-sm">
            <div className="text-xs font-medium text-gray-500">Ownership Gaps</div>
            <div className="mt-1 text-2xl font-semibold tracking-tight">{summary.ownershipShifts}</div>
          </div>
          <div className="rounded-lg border bg-white p-4 shadow-sm">
            <div className="text-xs font-medium text-gray-500">Escalations</div>
            <div className="mt-1 text-2xl font-semibold tracking-tight">{summary.escalationCount}</div>
          </div>
        </section>

        <ExecutiveDecisionPanel />
        <DemoActionTable />
        <ValueProof />

      </div>
    </main>
  )
}
