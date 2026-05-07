"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LeadSharperLogo } from "@/components/brand/leadsharper-logo";

const links = [
  { href: "/workspace", label: "Weekly OS" },
  { href: "/workspace/signals", label: "Signals Triage" },
  { href: "/workspace/actions", label: "Execution Plans" },
  { href: "/workspace/evidence", label: "Evidence Review" },
  { href: "/workspace/reports", label: "Cabinet Brief" }
];

export function WorkspaceShell({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <main className="min-h-screen bg-[#F6F8FC] text-[#071B4D]">
      <div className="mx-auto flex max-w-7xl gap-6 px-6 py-8 sm:px-10">
        <aside className="hidden w-72 rounded-3xl border border-[#D8E3F7] bg-white p-5 lg:block">
          <LeadSharperLogo size="md" />
          <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#36558f]">District Leadership Workspace</p>
          <nav className="mt-4 space-y-2">
            {links.map((l) => <Link key={l.href} href={l.href} className={`block rounded-xl px-3 py-2 text-sm font-semibold ${pathname === l.href ? "bg-[#0D6EFD] text-white" : "hover:bg-[#F6F8FC]"}`}>{l.label}</Link>)}
          </nav>
          <Link href="/" className="mt-6 inline-block text-xs font-semibold text-[#0D6EFD] underline">Return to LeadSharper home</Link>
        </aside>

        <section className="flex-1 space-y-5">
          <header className="rounded-3xl border border-[#D8E3F7] bg-white p-6">
            <div className="flex flex-wrap items-center justify-between gap-4 lg:hidden"><LeadSharperLogo size="sm" /><Link href="/" className="text-xs font-semibold text-[#0D6EFD] underline">Return to LeadSharper home</Link></div>
            <h1 className="mt-4 text-3xl font-bold tracking-tight">{title}</h1>
            <p className="mt-2 text-sm text-[#36558f]">{subtitle}</p>
          </header>
          {children}
        </section>
      </div>
    </main>
  );
}
