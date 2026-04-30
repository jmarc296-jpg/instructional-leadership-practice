import { buildExecutiveSummary } from '../utils/executiveSummary'
import EscalationBanner from '../components/EscalationBanner'

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
    <div className='p-6 space-y-6'>
      <EscalationBanner escalationCount={summary.escalationCount} />

      <div className='text-2xl font-bold'>Executive Summary</div>
      <div>At-Risk Leaders: {summary.atRiskLeaders}</div>
      <div>Immediate Actions: {summary.immediateActions}</div>
      <div>Ownership Shifts: {summary.ownershipShifts}</div>

      <div className='text-red-600 font-semibold'>
        {summary.summaryLine}
      </div>
    </div>
  )
}
