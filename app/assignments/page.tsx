'use client'

import { useState } from 'react'
import { getAssignments, saveAssignment } from '@/lib/local-store'
import { TopNav } from '@/components/home/top-nav'

const modules = [
  'DDI Execution',
  'Crucial Conversations',
  'Teacher Coaching',
  'Instructional Walkthroughs',
  'School Culture Leadership',
  'Strategic Staffing'
]

export default function AssignmentsPage() {
  const [leaderName, setLeaderName] = useState('')
  const [role, setRole] = useState('Assistant Principal')
  const [module, setModule] = useState(modules[0])
  const [dueDate, setDueDate] = useState('')
  const [refreshKey, setRefreshKey] = useState(0)

  const assignments = getAssignments()

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (!leaderName.trim() || !dueDate) return

    saveAssignment({
      leaderName,
      role,
      module,
      dueDate,
      status: 'Assigned'
    })

    setLeaderName('')
    setRole('Assistant Principal')
    setModule(modules[0])
    setDueDate('')
    setRefreshKey((key) => key + 1)
  }

  return (
    <main className="min-h-screen bg-slate-50 px-5 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <TopNav />

        <section className="rounded-3xl bg-slate-950 p-8 text-white">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-300">
            Assignment Engine
          </p>

          <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight">
            Assign targeted leadership development modules.
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
            Principals, supervisors, and district leaders can assign specific development areas tied to readiness data, coaching cycles, and leadership growth goals.
          </p>
        </section>

        <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <form onSubmit={handleSubmit} className="rounded-3xl bg-white p-8 border border-slate-200">
            <h2 className="text-2xl font-semibold text-slate-900">
              Create Assignment
            </h2>

            <div className="mt-6 space-y-4">
              <input
                value={leaderName}
                onChange={(e) => setLeaderName(e.target.value)}
                placeholder="Leader name"
                className="w-full rounded-2xl border border-slate-300 px-4 py-3"
              />

              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full rounded-2xl border border-slate-300 px-4 py-3"
              >
                <option>Principal</option>
                <option>Assistant Principal</option>
                <option>Instructional Coach</option>
                <option>Dean / Operations Leader</option>
                <option>Aspiring Leader</option>
              </select>

              <select
                value={module}
                onChange={(e) => setModule(e.target.value)}
                className="w-full rounded-2xl border border-slate-300 px-4 py-3"
              >
                {modules.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>

              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full rounded-2xl border border-slate-300 px-4 py-3"
              />

              <button className="w-full rounded-2xl bg-blue-600 px-6 py-3 font-semibold text-white">
                Assign Module
              </button>
            </div>
          </form>

          <section className="rounded-3xl bg-white p-8 border border-slate-200">
            <h2 className="text-2xl font-semibold text-slate-900">
              Active Development Assignments
            </h2>

            <div className="mt-6 space-y-4">
              {assignments.length === 0 ? (
                <div className="rounded-2xl bg-slate-50 p-5 text-slate-600">
                  No assignments yet. Create a targeted module assignment to begin tracking leadership development.
                </div>
              ) : (
                assignments.map((assignment) => (
                  <div key={assignment.id} className="rounded-2xl border border-slate-200 p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-semibold text-slate-900">{assignment.leaderName}</p>
                        <p className="mt-1 text-sm text-slate-500">{assignment.role}</p>
                      </div>

                      <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                        {assignment.status}
                      </span>
                    </div>

                    <p className="mt-4 text-sm font-semibold text-slate-900">
                      {assignment.module}
                    </p>
                    <p className="mt-1 text-sm text-slate-500">
                      Due: {assignment.dueDate}
                    </p>
                  </div>
                ))
              )}
            </div>
          </section>
        </section>
      </div>
    </main>
  )
}

