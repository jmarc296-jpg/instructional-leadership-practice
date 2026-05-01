import { districtScenario } from '../config/districtScenario'
import { buildExecutiveSummary } from '../utils/executiveSummary'
import ExecutiveDecisionPanel from '../components/ExecutiveDecisionPanel'
import DemoActionTable from '../components/DemoActionTable'
import EscalationBanner from '../components/EscalationBanner'
import ValueProof from '../components/ValueProof'
import DecisionControlBar from '../components/DecisionControlBar'
import TrackView from '../components/TrackView'

export default function DemoRunPage() {
  const escalationCount = districtScenario.filter(r => r.escalation === 'HIGH').length
  const summary = buildExecutiveSummary(districtScenario)
  const ownershipGaps = districtScenario.filter(r => !r.owner).length

  return (
    <main className="min-h-screen bg-[#f8f7f4] px-6 py-8 text-gray-950">
      <TrackView
        escalationCount={escalationCount}
        atRiskLeaders={summary.atRiskLeaders}
        ownershipGaps={ownershipGaps}
      />

      <div className="mx-auto max-w-6xl space-y-5">
        <section className="border-b border-gray-200 pb-6">
          <div className="text-xs font-medium text-gray-500">
            Active Leadership Risk
          </div>
          <h1 className="mt-2 max-w-3xl text-3xl font-semibold tracking-tight">
            You are carrying uncontained leadership risk across multiple schools.
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-gray-700">
            Inaction will result in classroom impact. {summary.summaryLine}
          </p>
        </section>

        <DecisionControlBar
          escalationCount={escalationCount}
          ownershipGaps={ownershipGaps}
        />

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
            <div className="mt-1 text-2xl font-semibold tracking-tight">{ownershipGaps}</div>
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
