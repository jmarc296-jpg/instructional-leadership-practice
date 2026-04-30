import DemoExecutiveSummary from "./DemoExecutiveSummary"
import DemoEscalationMoment from "./DemoEscalationMoment"
import DemoOwnershipShift from "./DemoOwnershipShift"
import DemoActionTable from "./DemoActionTable"

export default function DistrictDemoShell() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-6xl space-y-6">
        <DemoExecutiveSummary />
        <DemoEscalationMoment />
        <DemoOwnershipShift />
        <DemoActionTable />
      </div>
    </div>
  )
}
