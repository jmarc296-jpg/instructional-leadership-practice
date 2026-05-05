import { ArrowRight } from 'lucide-react'

type Props = {
  onLaunchPractice: () => void
  onScrollToWorkspace: () => void
}

export function HeroSection({
  onLaunchPractice,
  onScrollToWorkspace
}: Props) {
  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-[#020617]">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:32px_32px]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_28%_18%,rgba(37,99,235,0.20),transparent_34%),radial-gradient(circle_at_82%_20%,rgba(14,165,233,0.11),transparent_30%)]" />

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-14 px-6 py-20 lg:grid-cols-[1.12fr_0.88fr] lg:items-center lg:py-24">
        <div>
          <div className="mb-7 inline-flex rounded-full border border-white/10 bg-white/[0.035] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.3em] text-white/55">
            Executive Accountability Infrastructure
          </div>

          <h1 className="max-w-3xl text-5xl font-semibold leading-[0.93] tracking-[-0.065em] text-white sm:text-6xl lg:text-7xl">
            Leadership clarity before consequences.
          </h1>

          <p className="mt-7 max-w-xl text-lg leading-8 text-white/62">
            LeadSharper detects leadership drift, explains the signal, forces a decision, assigns ownership, and records accountability before risk becomes visible.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <button
              onClick={onLaunchPractice}
              className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 text-[13px] font-bold uppercase tracking-[0.22em] text-[#020617] shadow-[0_18px_60px_rgba(255,255,255,0.12)] transition hover:bg-white/90"
            >
              Enter System
              <ArrowRight size={16} />
            </button>

            <button
              onClick={onScrollToWorkspace}
              className="rounded-full border border-white/12 px-6 py-4 text-[12px] font-bold uppercase tracking-[0.22em] text-white/60 transition hover:border-white/25 hover:text-white"
            >
              Upload Data
            </button>
          </div>

          <div className="mt-14 flex flex-wrap gap-3 text-[10px] font-bold uppercase tracking-[0.24em] text-white/35">
            <span>Detect</span>
            <span className="text-white/18">/</span>
            <span>Explain</span>
            <span className="text-white/18">/</span>
            <span>Decide</span>
            <span className="text-white/18">/</span>
            <span>Assign</span>
            <span className="text-white/18">/</span>
            <span>Record</span>
          </div>
        </div>

        <div className="rounded-[30px] border border-white/10 bg-white/[0.026] p-6 shadow-2xl shadow-black/25">
          <div className="flex items-center justify-between border-b border-white/10 pb-5">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">
                Active Signal
              </div>
              <div className="mt-2 text-xl font-semibold tracking-[-0.03em] text-white">
                Leadership drift detected
              </div>
            </div>
            <div className="rounded-full border border-amber-300/25 bg-amber-400/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-amber-200">
              Review
            </div>
          </div>

          <div className="mt-6 grid gap-3">
            {[
              ['Walkthrough follow-through', 'Declining'],
              ['Coaching evidence', 'Incomplete'],
              ['Assessment movement', 'Flat'],
              ['Ownership clarity', 'Unclear']
            ].map(([label, value]) => (
              <div
                key={label}
                className="flex items-center justify-between rounded-2xl border border-white/8 bg-[#020617]/60 px-5 py-4"
              >
                <span className="text-sm font-medium text-white/68">{label}</span>
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-white/40">{value}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-blue-400/20 bg-blue-500/[0.08] px-5 py-4">
            <div className="text-[10px] font-bold uppercase tracking-[0.24em] text-blue-200/70">
              Next Required Move
            </div>
            <div className="mt-2 text-sm font-semibold text-white">
              Choose response and assign ownership.
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
