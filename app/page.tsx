import Link from "next/link"
import DemoHotkey from "@/app/components/DemoHotkey"

export default function Home() {
  return (
    <>
      <DemoHotkey />
      <main className="min-h-screen bg-slate-950 text-white">
        <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8 space-y-10">
          <div className="grid gap-3 md:grid-cols-3">
            <div className="rounded-xl border border-red-400/30 bg-red-500/10 p-4">
              <div className="text-xs font-semibold uppercase tracking-wide text-red-200">Executive Escalations</div>
              <div className="mt-1 text-2xl font-bold">2</div>
              <div className="text-xs text-red-200">Action required this week</div>
            </div>

            <div className="rounded-xl border border-orange-400/30 bg-orange-500/10 p-4">
              <div className="text-xs font-semibold uppercase tracking-wide text-orange-200">Unassigned Ownership</div>
              <div className="mt-1 text-2xl font-bold">1</div>
              <div className="text-xs text-orange-200">No clear owner</div>
            </div>

            <div className="rounded-xl border border-slate-400/30 bg-slate-500/10 p-4">
              <div className="text-xs font-semibold uppercase tracking-wide text-slate-200">Overdue Actions</div>
              <div className="mt-1 text-2xl font-bold">3</div>
              <div className="text-xs text-slate-200">No evidence logged</div>
            </div>
          </div>

          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold">
              2 issues require action this week. One has no owner. 3 actions are overdue.
            </h1>

            <p className="mt-6 text-lg text-slate-300">
              No owner. No follow-up. No evidence.
            </p>

            <div className="mt-8 flex gap-4">
              <Link href="/demo/run" className="bg-white text-black px-6 py-3 rounded-xl font-semibold">
                Open the issues
              </Link>

              <Link href="/demo/run" className="border border-white px-6 py-3 rounded-xl font-semibold">
                Open board view
              </Link>
            </div>
          </div>

          <div className="text-sm font-semibold text-red-200">
            If these are not addressed this week, instruction will be impacted within 2â€“3 weeks.
          </div>
        </section>
      </main>
    </>
  )
}


