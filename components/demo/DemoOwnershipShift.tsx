import { demoSignals } from "@/lib/demo/execution-demo-data"

export default function DemoOwnershipShift() {
  const shifted = demoSignals.find((s) => s.ownershipShift.includes("→"))

  if (!shifted) return null

  return (
    <section className="rounded-2xl border border-orange-300 bg-orange-50 p-6">
      <p className="text-sm font-semibold uppercase text-orange-700">Ownership Shift</p>
      <h2 className="mt-2 text-2xl font-bold text-orange-950">{shifted.school}</h2>

      <div className="mt-4 flex items-center gap-4">
        <div className="rounded-xl bg-white p-4">
          <p className="text-xs text-gray-500">Previous Owner</p>
          <p className="font-semibold text-gray-950">Principal</p>
        </div>

        <div className="text-2xl font-bold text-orange-700">→</div>

        <div className="rounded-xl bg-white p-4">
          <p className="text-xs text-gray-500">Current Owner</p>
          <p className="font-semibold text-gray-950">Network Superintendent</p>
        </div>
      </div>
    </section>
  )
}
