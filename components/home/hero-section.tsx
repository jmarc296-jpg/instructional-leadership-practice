import { ArrowRight, Sparkles } from 'lucide-react'

type Props = {
  onLaunchPractice: () => void
  onScrollToWorkspace: () => void
}

export function HeroSection({
  onLaunchPractice,
  onScrollToWorkspace
}: Props) {
  return (
    <div className="premium-panel fade-in-up rounded-[32px] border border-slate-200 bg-white px-10 py-10 shadow-sm">
      <div className="mb-10 flex flex-col sm:flex-row sm:items-center gap-6">
        <div className="flex-shrink-0">
          <img
            src="/logo.png"
            alt="LeadSharper Logo"
            className="h-28 sm:h-32 lg:h-36 w-auto object-contain"
          />
        </div>

        <div className="max-w-md">
          <div className="text-[12px] font-semibold uppercase tracking-[0.4em] text-blue-600">
            LeadSharper
          </div>

          <div className="mt-2 text-lg sm:text-xl font-medium text-slate-700 leading-relaxed">
            Measure readiness. Build stronger leaders.
          </div>
        </div>
      </div>

      <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-blue-700">
        <Sparkles size={14} />
        Leadership Readiness Infrastructure
      </div>

      <h1 className="max-w-4xl text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-[-0.05em] leading-[0.95] text-slate-950">
        Measure principal readiness before the job is on the line.
      </h1>

      <p className="mt-6 max-w-3xl text-xl leading-9 text-slate-600">
        LeadSharper helps districts, universities, and leadership pipelines simulate real school leadership moments, identify blind spots, and build stronger principal pipelines through behavioral intelligence.
      </p>

      <div className="mt-8 flex flex-wrap gap-4">
        <button
          onClick={onLaunchPractice}
          className="premium-button inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
        >
          Start Readiness Simulation
          <ArrowRight size={16} />
        </button>

        <button
          onClick={onScrollToWorkspace}
          className="premium-button rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 hover:bg-slate-50"
        >
          View Leadership Workspace
        </button>
      </div>
    </div>
  )
}




