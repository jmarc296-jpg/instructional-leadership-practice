import { talentLeaders } from "@/lib/talent/mock-data"
import { getReadinessBand } from "@/lib/talent/scoring"

export default function SuccessionPipelinePage() {
  return (
    <main className="min-h-screen bg-[#f7f7f4] p-8 text-[#111827]">
      <div className="rounded-[2rem] border border-black/10 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">Succession Pipeline</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight">Internal candidate slate</h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-gray-600">
          Track who is ready, who is developing, and what evidence is needed before the next placement conversation.
        </p>
      </div>

      <div className="mt-6 grid gap-4">
        {talentLeaders.map((leader) => (
          <div key={leader.id} className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <div>
                <h2 className="text-xl font-bold">{leader.name}</h2>
                <p className="text-gray-600">{leader.currentRole} at {leader.school}</p>
              </div>
              <div className="text-left md:text-right">
                <p className="text-sm text-gray-500">Target Role</p>
                <p className="font-semibold">{leader.targetRole}</p>
              </div>
              <div className="text-left md:text-right">
                <p className="text-sm text-gray-500">Readiness Band</p>
                <p className="font-semibold">{getReadinessBand(leader.readinessScore)}</p>
              </div>
            </div>

            <div className="mt-5 rounded-2xl border border-black/10 bg-[#fbfbf8] p-4">
              <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">Next development moves</p>
              <ul className="mt-3 space-y-2 text-gray-700">
                {leader.developmentPriorities.map((priority) => (
                  <li key={priority}>- {priority}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
