export function TopNav() {
  return (
    <nav className="flex items-center justify-between rounded-3xl bg-white px-5 py-4 border border-slate-200">
      <a href="/" className="flex items-center gap-3">
        <img
          src="/logo.png"
          alt="LeadSharper"
          className="h-10 w-auto"
        />

        <div>
          <p className="text-sm font-bold text-slate-950">LeadSharper</p>
          <p className="text-xs text-slate-500">Leadership readiness infrastructure</p>
        </div>
      </a>

      <div className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
        <a href="/instant-demo" className="hover:text-blue-600">
          Try Simulation
        </a>

        <a href="/district" className="hover:text-blue-600">
          District Dashboard
        </a>

        <a href="/platform-demo" className="hover:text-blue-600">
          Platform Tour
        </a>

        <a href="/procurement" className="hover:text-blue-600">
          Procurement
        </a>
      </div>

      <a
        href="/pilot"
        className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
      >
        Schedule Pilot
      </a>
    </nav>
  )
}
