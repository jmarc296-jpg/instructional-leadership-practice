import Link from "next/link"
import { EnterpriseShell } from "@/components/shell/enterprise-shell"

const steps = [
  {
    phase: "1",
    title: "Confirm district setup",
    status: "Complete",
    details: "District profile, schools, role groups, and readiness framework confirmed."
  },
  {
    phase: "2",
    title: "Import leader roster",
    status: "In Progress",
    details: "Principal, assistant principal, dean, and aspiring leader records prepared for upload."
  },
  {
    phase: "3",
    title: "Assign launch modules",
    status: "Ready",
    details: "Initial simulation and practice pathways mapped by role and leadership priority."
  },
  {
    phase: "4",
    title: "Activate evidence workflow",
    status: "Next",
    details: "Coaching evidence, simulation results, and readiness signals connected to leader profiles."
  }
]

const launchMetrics = [
  { label: "Schools configured", value: "18" },
  { label: "Leaders staged", value: "64" },
  { label: "Modules mapped", value: "9" },
  { label: "Launch readiness", value: "82%" }
]

export default function OnboardingPage() {
  return (
    <EnterpriseShell>
      <main className="min-h-screen bg-[#f7f5f0]">
        <section className="border-b border-black/10 bg-[#111827] text-white">
          <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/50">
              District Onboarding
            </p>
            <div className="mt-3 flex flex-col justify-between gap-6 xl:flex-row xl:items-end">
              <div>
                <h1 className="max-w-4xl text-5xl font-semibold tracking-[-0.05em]">
                  Move a district from purchase to launch.
                </h1>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-white/60">
                  Configure schools, import leaders, assign launch modules, and connect evidence workflows before district activation.
                </p>
              </div>

              <Link
                href="/workspace"
                className="rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-[#111827] shadow-sm transition hover:bg-white/90"
              >
                Continue setup
              </Link>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-6 lg:px-8">
          <div className="grid gap-4 md:grid-cols-4">
            {launchMetrics.map((metric) => (
              <div key={metric.label} className="rounded-3xl border border-black/10 bg-white p-5 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-black/35">{metric.label}</p>
                <p className="mt-3 text-3xl font-semibold tracking-[-0.04em]">{metric.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_380px]">
            <section className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
              <div className="mb-5">
                <h2 className="text-xl font-semibold tracking-[-0.02em]">Implementation workflow</h2>
                <p className="mt-1 text-sm text-black/55">
                  A district-facing launch path that keeps setup, ownership, and next steps visible.
                </p>
              </div>

              <div className="space-y-3">
                {steps.map((step) => (
                  <div key={step.title} className="rounded-2xl border border-black/10 bg-[#f7f5f0] p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex gap-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#111827] text-sm font-semibold text-white">
                          {step.phase}
                        </div>
                        <div>
                          <p className="font-semibold">{step.title}</p>
                          <p className="mt-1 text-sm leading-6 text-black/60">{step.details}</p>
                        </div>
                      </div>

                      <span className="rounded-full border border-black/10 bg-white px-3 py-1 text-xs font-semibold text-black/60">
                        {step.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <aside className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-black/35">Launch control</p>
              <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em]">Activation checklist</h2>

              <div className="mt-6 space-y-3">
                <CheckRow label="District profile confirmed" status="Done" />
                <CheckRow label="Leader roster staged" status="Active" />
                <CheckRow label="Role pathways mapped" status="Active" />
                <CheckRow label="Evidence expectations set" status="Next" />
                <CheckRow label="Executive dashboard shared" status="Next" />
              </div>

              <Link
                href="/workspace"
                className="mt-6 block rounded-2xl bg-[#111827] px-4 py-3 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-black"
              >
                Open workspace
              </Link>
            </aside>
          </div>
        </section>
      </main>
    </EnterpriseShell>
  )
}

function CheckRow({ label, status }: { label: string; status: string }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-black/10 bg-[#f7f5f0] p-4">
      <p className="text-sm font-semibold">{label}</p>
      <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-black/55">{status}</span>
    </div>
  )
}
