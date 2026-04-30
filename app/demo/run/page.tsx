import { buildExecutiveSummary } from '../utils/executiveSummary'
import EscalationBanner from '../components/EscalationBanner'
import WhyItMatters from '../components/WhyItMatters'
import ValueProof from '../components/ValueProof'
import BoardReportCTA from '../components/BoardReportCTA'
import StabilizationPath from '../components/StabilizationPath'

type DemoRecord = {
  risk: 'LOW' | 'MEDIUM' | 'HIGH'
  escalation: 'LOW' | 'MEDIUM' | 'HIGH'
  ownerChanged?: boolean
}

const mockData: DemoRecord[] = [
  { risk: 'HIGH', escalation: 'HIGH', ownerChanged: true },
  { risk: 'MEDIUM', escalation: 'LOW' },
  { risk: 'HIGH', escalation: 'HIGH' }
]

export default function DemoRun() {
  const summary = buildExecutiveSummary(mockData)

  return (
    <main className='min-h-screen bg-gray-100 p-6'>
      <div className='mx-auto max-w-5xl space-y-6'>
        <EscalationBanner escalationCount={summary.escalationCount} />

        <section className='rounded-2xl bg-white p-6 shadow-sm'>
          <div className='text-sm font-semibold text-gray-500 uppercase tracking-wide'>
            LeadSharper Executive Demo
          </div>
          <h1 className='mt-2 text-3xl font-bold text-gray-950'>
            Leadership risk is only useful when it turns into action.
          </h1>
          <p className='mt-3 max-w-3xl text-gray-700'>
            This demo shows how LeadSharper moves from risk signal to required action, owner, evidence, escalation, and ownership shift.
          </p>

          <div className='mt-6 grid gap-4 md:grid-cols-3'>
            <div className='rounded-xl border p-4'>
              <div className='text-sm text-gray-500'>At-Risk Leaders</div>
              <div className='text-3xl font-bold'>{summary.atRiskLeaders}</div>
            </div>
            <div className='rounded-xl border p-4'>
              <div className='text-sm text-gray-500'>Immediate Actions</div>
              <div className='text-3xl font-bold'>{summary.immediateActions}</div>
            </div>
            <div className='rounded-xl border p-4'>
              <div className='text-sm text-gray-500'>Ownership Shifts</div>
              <div className='text-3xl font-bold'>{summary.ownershipShifts}</div>
            </div>
          </div>
        </section>

        <ValueProof />
        <StabilizationPath />
        <WhyItMatters />
        <BoardReportCTA />

        <div className='rounded-xl border bg-white p-5 text-sm font-semibold text-red-600'>
          {summary.summaryLine}
        </div>
      </div>
    </main>
  )
}
