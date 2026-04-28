"use client"

import { useEffect, useState } from "react"

type Assignment = {
  id: string
  leader: string
  role: string
  gap: string
  module: string
  dueDate: string
  status: "Assigned" | "In Progress" | "Completed"
  evidence: string
}

const starterAssignments: Assignment[] = [
  {
    id: "1",
    leader: "Assistant Principal A",
    role: "Assistant Principal",
    gap: "Instructional Feedback",
    module: "Coaching Difficult Conversations",
    dueDate: "2026-05-10",
    status: "In Progress",
    evidence: "Completed first reflection. Needs follow-up coaching on naming the instructional gap directly."
  },
  {
    id: "2",
    leader: "Dean B",
    role: "Dean of Students",
    gap: "Culture Leadership",
    module: "School Culture Reset",
    dueDate: "2026-05-17",
    status: "Assigned",
    evidence: ""
  }
]

export default function WorkspacePage() {
  const [assignments, setAssignments] = useState<Assignment[]>([])
  const [leader, setLeader] = useState("")
  const [role, setRole] = useState("")
  const [gap, setGap] = useState("Instructional Feedback")
  const [module, setModule] = useState("Coaching Difficult Conversations")
  const [dueDate, setDueDate] = useState("")

  useEffect(() => {
    const saved = window.localStorage.getItem("leadsharper_assignments")
    if (saved) {
      setAssignments(JSON.parse(saved))
    } else {
      setAssignments(starterAssignments)
      window.localStorage.setItem("leadsharper_assignments", JSON.stringify(starterAssignments))
    }
  }, [])

  function saveAssignments(next: Assignment[]) {
    setAssignments(next)
    window.localStorage.setItem("leadsharper_assignments", JSON.stringify(next))
  }

  function createAssignment() {
    if (!leader || !role || !dueDate) return

    const nextAssignment: Assignment = {
      id: crypto.randomUUID(),
      leader,
      role,
      gap,
      module,
      dueDate,
      status: "Assigned",
      evidence: ""
    }

    saveAssignments([nextAssignment, ...assignments])
    setLeader("")
    setRole("")
    setGap("Instructional Feedback")
    setModule("Coaching Difficult Conversations")
    setDueDate("")
  }

  function updateStatus(id: string, status: Assignment["status"]) {
    saveAssignments(assignments.map((item) => item.id === id ? { ...item, status } : item))
  }

  function updateEvidence(id: string, evidence: string) {
    saveAssignments(assignments.map((item) => item.id === id ? { ...item, evidence } : item))
  }

  function deleteAssignment(id: string) {
    saveAssignments(assignments.filter((item) => item.id !== id))
  }

  return (
    <main className="min-h-screen bg-[#f6f8fb] px-6 py-8 text-slate-950">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex flex-wrap gap-3">
          <a href="/" className="rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold">
            Home
          </a>
          <a href="/workflow" className="rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold">
            Workflow
          </a>
          <a href="/district" className="rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold">
            Dashboard
          </a>
        </div>

        <section className="rounded-[28px] border border-slate-200 bg-white p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-700">
            LeadSharper Workspace
          </p>

          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em]">
            Manage real leadership development assignments.
          </h1>

          <p className="mt-4 max-w-2xl leading-8 text-slate-600">
            Create assignments, track completion, collect evidence, and monitor whether leaders are acting on their development priorities.
          </p>
        </section>

        <section className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="rounded-[28px] border border-slate-200 bg-white p-6">
            <h2 className="text-2xl font-semibold tracking-[-0.03em]">
              Create assignment
            </h2>

            <div className="mt-6 space-y-4">
              <input
                value={leader}
                onChange={(event) => setLeader(event.target.value)}
                placeholder="Leader name"
                className="w-full rounded-2xl border border-slate-300 px-4 py-3"
              />

              <input
                value={role}
                onChange={(event) => setRole(event.target.value)}
                placeholder="Current role"
                className="w-full rounded-2xl border border-slate-300 px-4 py-3"
              />

              <select
                value={gap}
                onChange={(event) => setGap(event.target.value)}
                className="w-full rounded-2xl border border-slate-300 px-4 py-3"
              >
                <option>Instructional Feedback</option>
                <option>Operational Execution</option>
                <option>Culture Leadership</option>
                <option>People Leadership</option>
              </select>

              <select
                value={module}
                onChange={(event) => setModule(event.target.value)}
                className="w-full rounded-2xl border border-slate-300 px-4 py-3"
              >
                <option>Coaching Difficult Conversations</option>
                <option>Systems Execution Sprint</option>
                <option>School Culture Reset</option>
                <option>Leading Through Conflict</option>
              </select>

              <input
                type="date"
                value={dueDate}
                onChange={(event) => setDueDate(event.target.value)}
                className="w-full rounded-2xl border border-slate-300 px-4 py-3"
              />

              <button
                onClick={createAssignment}
                className="w-full rounded-2xl bg-blue-700 px-5 py-3 font-semibold text-white hover:bg-blue-800"
              >
                Create Assignment
              </button>
            </div>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-white p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold tracking-[-0.03em]">
                Active assignments
              </h2>

              <p className="text-sm font-medium text-slate-500">
                {assignments.length} total
              </p>
            </div>

            <div className="mt-6 space-y-4">
              {assignments.map((item) => (
                <div key={item.id} className="rounded-[22px] border border-slate-200 p-5">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                      <p className="text-lg font-semibold">{item.leader}</p>
                      <p className="mt-1 text-sm text-slate-500">{item.role}</p>
                      <p className="mt-3 text-sm">
                        <span className="font-semibold">Gap:</span> {item.gap}
                      </p>
                      <p className="mt-1 text-sm">
                        <span className="font-semibold">Module:</span> {item.module}
                      </p>
                      <p className="mt-1 text-sm">
                        <span className="font-semibold">Due:</span> {item.dueDate}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <button onClick={() => updateStatus(item.id, "Assigned")} className="rounded-full bg-slate-100 px-3 py-2 text-sm font-medium">
                        Assigned
                      </button>
                      <button onClick={() => updateStatus(item.id, "In Progress")} className="rounded-full bg-blue-100 px-3 py-2 text-sm font-medium text-blue-800">
                        In Progress
                      </button>
                      <button onClick={() => updateStatus(item.id, "Completed")} className="rounded-full bg-green-100 px-3 py-2 text-sm font-medium text-green-800">
                        Complete
                      </button>
                    </div>
                  </div>

                  <div className="mt-5 rounded-2xl bg-slate-50 p-4">
                    <p className="text-sm font-semibold text-slate-700">Status: {item.status}</p>

                    <textarea
                      value={item.evidence}
                      onChange={(event) => updateEvidence(item.id, event.target.value)}
                      placeholder="Add evidence, coaching notes, or follow-up needed..."
                      className="mt-3 w-full min-h-[90px] rounded-2xl border border-slate-300 bg-white p-4 text-sm"
                    />
                  </div>

                  <button
                    onClick={() => deleteAssignment(item.id)}
                    className="mt-4 text-sm font-semibold text-red-600"
                  >
                    Delete assignment
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
