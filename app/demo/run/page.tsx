import { buildExecutiveSummary } from '../utils/executiveSummary'
import { districtScenario } from '../config/districtScenario'
import EscalationBanner from '../components/EscalationBanner'
import WhyItMatters from '../components/WhyItMatters'
import ValueProof from '../components/ValueProof'
import BoardReportCTA from '../components/BoardReportCTA'
import StabilizationPath from '../components/StabilizationPath'
import DemoActionTable from '../components/DemoActionTable'
import ExecutiveDecisionPanel from '../components/ExecutiveDecisionPanel'

export default function DemoRun() {
  const summary = buildExecutiveSummary(districtScenario)

  return (
    <main className='min-h-screen bg-gray-100 p-6'>
      <div className='mx-auto max-w-5xl space-y-6'>
        <EscalationBanner escalationCount={summary.escalationCount} />

        <section className='rounded-2xl bg-white p-6 shadow-sm'>
          <div className='text-sm font-semibold uppercase tracking-wide text-gray-500'>
            LeadSharper Executive Demo
          </div>

          <h1 className='mt-2 text-3xl font-bold text-gray-950'>
            Leadership risk is only useful when it turns into action.
          </h1>

          <p className='mt-3 max-w-3xl text-gray-700'>
            LeadSharper converts risk signals into assigned actions, evidence, escalation visibility, and ownership shifts before instability reaches students, staff, or the board.
          </p>

          <div className='mt-6 grid gap-4 md:grid-cols-3'>
            <div className='rounded-xl border p-4'>
              <div className='text-sm text-gray-500'>At-Risk Leaders</div>
              <div className='text-3xl font-bold'>{summary.atRiskLeaders}</div>
            </div>

            <div className='rounded-xl border p-4'>
              <div className='text-sm text-gray-500'>Actions Required This Week</div>
              <div className='text-3xl font-bold'>{summary.immediateActions}</div>
            </div>

            <div className='rounded-xl border p-4'>
              <div className='text-sm text-gray-500'>Assigned Accountability Shifts</div>
              <div className='text-3xl font-bold'>{summary.ownershipShifts}</div>
            </div>
          </div>

          <div className='mt-4 text-xs font-medium text-gray-500'>
            Data sources: walkthrough trends, unit assessment patterns, coaching logs, staffing exposure, and execution evidence.
          </div>
        </section>

        <ExecutiveDecisionPanel />
        <ValueProof />
        <StabilizationPath />
        <DemoActionTable />
        <WhyItMatters />
        <BoardReportCTA />

        <div className='rounded-xl border bg-white p-5 text-sm font-semibold text-red-600'>
          {summary.summaryLine}
        </div>
      </div>
    </main>
  )
}

