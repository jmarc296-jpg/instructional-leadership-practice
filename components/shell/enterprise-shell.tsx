import Link from "next/link"

const navItems = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Leaders", href: "/talent-review" },
  { label: "Workspace", href: "/workspace" },
  { label: "Simulations", href: "/simulation-room" },
  { label: "Assignments", href: "/assignments" },
  { label: "Talent Review", href: "/talent-review" },
  { label: "Promotion Readiness", href: "/promotion-readiness/leader-1" },
  { label: "Recommendations", href: "/recommendations" },
  { label: "Impact", href: "/impact-dashboard" }
]

export function EnterpriseShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f7f5f0] text-[#171717]">
      <div className="fixed left-0 top-0 z-40 hidden h-screen w-72 border-r border-black/10 bg-[#0f172a] px-5 py-6 text-white lg:block">
        <Link href="/" className="block">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/45">LeadSharper</p>
          <h1 className="mt-2 text-2xl font-semibold tracking-[-0.04em]">Command Center</h1>
        </Link>

        <nav className="mt-10 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href + item.label}
              href={item.href}
              className="block rounded-2xl px-4 py-3 text-sm font-medium text-white/70 transition hover:bg-white/10 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-6 left-5 right-5 rounded-3xl border border-white/10 bg-white/10 p-4">
          <p className="text-sm font-semibold">District operating layer</p>
          <p className="mt-2 text-xs leading-5 text-white/55">
            Assign practice, track evidence, and connect leadership growth to readiness decisions.
          </p>
        </div>
      </div>

      <div className="lg:pl-72">
        {children}
      </div>
    </div>
  )
}
