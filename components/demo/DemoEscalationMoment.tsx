import { demoSignals } from "@/lib/demo/execution-demo-data"

export default function DemoEscalationMoment() {
  const critical = demoSignals.find((signal) => signal.risk === "Critical")

  if (!critical) return null

  return (
    <section className="rounded-2xl border border-red-300 bg-red-50 p-6 shadow-sm">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-red-700">Escalation Triggered</p>
          <h2 className="mt-2 text-2xl font-bold text-red-950">{critical.school}</h2>
          <p className="mt-2 max-w-3xl text-sm text-red-900">{critical.signal}</p>
        </div>
        <div className="rounded-full bg-red-700 px-4 py-2 text-sm font-bold text-white">
          {critical.escalation}
        </div>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-4">
        <div className="rounded-xl bg-white p-4">
          <p className="text-xs font-semibold uppercase text-gray-500">Risk Score</p>
          <p className="mt-1 text-2xl font-bold text-red-700">{critical.riskScore}</p>
        </div>
        <div className="rounded-xl bg-white p-4">
          <p className="text-xs font-semibold uppercase text-gray-500">Required Action</p>
          <p className="mt-1 text-sm font-semibold text-gray-950">{critical.action}</p>
        </div>
        <div className="rounded-xl bg-white p-4">
          <p className="text-xs font-semibold uppercase text-gray-500">Owner</p>
          <p className="mt-1 text-sm font-semibold text-gray-950">{critical.owner}</p>
        </div>
        <div className="rounded-xl bg-white p-4">
          <p className="text-xs font-semibold uppercase text-gray-500">Evidence Due</p>
          <p className="mt-1 text-sm font-semibold text-gray-950">{critical.dueDate}</p>
        </div>
      </div>
    </section>
  )
}
