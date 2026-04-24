type Props = {
  onLaunchDemo: () => void
}

export function DemoModeBanner({ onLaunchDemo }: Props) {
  return (
    <section className="premium-panel rounded-[28px] border border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-5 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-700">
            Demo Mode
          </div>

          <h3 className="mt-2 text-lg font-semibold text-slate-950">
            Instantly showcase the platform in under 60 seconds
          </h3>

          <p className="mt-2 text-sm leading-7 text-slate-600">
            Load a curated leadership scenario, AI feedback, and analytics-ready simulation flow for demos.
          </p>
        </div>

        <button
          onClick={onLaunchDemo}
          className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition"
        >
          Launch Demo Scenario
        </button>
      </div>
    </section>
  )
}
