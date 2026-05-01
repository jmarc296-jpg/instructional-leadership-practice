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
    <main className="min-h-screen bg-[#f8f7f4] px-6 py-8 text-gray-950">
      <div className="mx-auto max-w-6xl space-y-5">
        <section className="border-b border-gray-200 pb-6">
          <div className="text-xs font-medium text-gray-500">
            LeadSharper Demo
          </div>
          <h1 className="mt-2 max-w-3xl text-3xl font-semibold tracking-tight">
            See your district&apos;s leadership risk profile before instability reaches schools.
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-gray-700">
            {summary.summaryLine}
          </p>
        </section>

        <EscalationBanner escalationCount={escalationCount} />

        <ExecutiveDecisionPanel />

        <DemoActionTable />

        <ValueProof />
      </div>
    </main>
  )
}


