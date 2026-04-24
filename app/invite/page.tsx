'use client'

import { useState } from 'react'

type Leader = {
  name: string
  email: string
  role: string
  status: string
}

export default function InvitePage() {
  const [leaders, setLeaders] = useState<Leader[]>([
    {
      name: 'Jordan Smith',
      email: 'jsmith@district.org',
      role: 'Assistant Principal',
      status: 'Activated'
    },
    {
      name: 'Taylor Johnson',
      email: 'tjohnson@district.org',
      role: 'Dean',
      status: 'Invited'
    },
    {
      name: 'Morgan Lee',
      email: 'mlee@district.org',
      role: 'Instructional Coach',
      status: 'Completed Simulation'
    }
  ])

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-8">
      <div className="mx-auto max-w-6xl space-y-8">

        <section className="rounded-3xl bg-slate-900 p-8 text-white">
          <div className="text-sm uppercase tracking-[0.2em] text-blue-200">
            District Enrollment Engine
          </div>

          <h1 className="mt-3 text-4xl font-semibold">
            Invite Leadership Cohorts
          </h1>

          <p className="mt-4 text-slate-300 max-w-3xl">
            Launch cohorts, onboard future principals, and track activation before simulations begin.
          </p>
        </section>

        <section className="grid gap-4 md:grid-cols-4">
          <MetricCard label="Invited" value="48" />
          <MetricCard label="Activated" value="32" />
          <MetricCard label="Completed First Rep" value="24" />
          <MetricCard label="Inactive" value="16" />
        </section>

        <section className="rounded-3xl bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold">
            Leader Enrollment Roster
          </h2>

          <div className="mt-6 space-y-3">
            {leaders.map((leader) => (
              <div
                key={leader.email}
                className="flex items-center justify-between rounded-2xl bg-slate-50 p-4"
              >
                <div>
                  <div className="font-semibold">
                    {leader.name}
                  </div>

                  <div className="text-sm text-slate-500">
                    {leader.role}
                  </div>
                </div>

                <div className="text-sm font-medium text-blue-600">
                  {leader.status}
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </main>
  )
}

function MetricCard({
  label,
  value
}: {
  label: string
  value: string
}) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm">
      <div className="text-xs uppercase tracking-wide text-slate-500">
        {label}
      </div>

      <div className="mt-2 text-3xl font-semibold text-slate-900">
        {value}
      </div>
    </div>
  )
}

