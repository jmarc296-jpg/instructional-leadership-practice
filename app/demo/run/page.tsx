import { districtScenario } from '../config/districtScenario'
import { buildExecutiveSummary } from '../utils/executiveSummary'
import ExecutiveDecisionPanel from '../components/ExecutiveDecisionPanel'
import DemoActionTable from '../components/DemoActionTable'
import EscalationBanner from '../components/EscalationBanner'
import ValueProof from '../components/ValueProof'

export default function DemoRunPage() {
  const escalationCount = districtScenario.filter(r => r.escalation === 'HIGH').length
  const summary = buildExecutiveSummary(districtScenario)

  return (
    <main className="min-h-screen bg-[#f8f7f4] p-8 space-y-6">

      <EscalationBanner escalationCount={escalationCount} />

      <section className="bg-white rounded-2xl p-6 shadow-sm border">
        <div className="text-sm font-semibold uppercase tracking-wide text-gray-500">
          Executive Summary
        </div>
        <h1 className="text-2xl font-bold mt-2 text-gray-950">
          Leadership Risk Snapshot
        </h1>
        <p className="mt-3 text-gray-700 max-w-3xl">
          {summary.summaryLine}
        </p>
      </section>

      <ExecutiveDecisionPanel />

      <DemoActionTable />

      <ValueProof />

    </main>
  )
}

