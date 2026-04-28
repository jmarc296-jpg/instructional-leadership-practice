"use client"

import { useEffect, useMemo, useState } from "react"
import { EnterpriseShell } from "@/components/shell/enterprise-shell"
import { WorkspaceAssignment, workspaceModules, workspaceStatuses, WorkspaceStatus } from "@/lib/workspace-data"

const STORAGE_KEY = "leadsharper-workspace-assignments"

const starterAssignments: WorkspaceAssignment[] = [
  {
    id: "assignment-1",
    title: "Complete DDI internalization review",
    module: "DDI Meeting Internalization",
    assignee: "A. Johnson",
    role: "Assistant Principal",
    dueDate: "2026-05-08",
    status: "In Progress",
    evidence: "Uploaded Unit 4 data analysis and reteach plan.",
    coachingNote: "Next step is tightening the misconception analysis before teacher facilitation.",
    createdAt: "2026-04-27"
  },
  {
    id: "assignment-2",
    title: "Submit walkthrough evidence cycle",
    module: "Instructional Walkthrough Calibration",
    assignee: "M. Rivera",
    role: "Principal",
    dueDate: "2026-05-10",
    status: "Evidence Added",
    evidence: "Three classroom notes added with trend summary.",
    coachingNote: "Evidence is strong. Push next toward feedback quality and teacher-facing action.",
    createdAt: "2026-04-27"
  }
]

function getToday() {
  return new Date().toISOString().slice(0, 10)
}

function getDaysUntil(date: string) {
  const today = new Date(getToday()).getTime()
  const due = new Date(date).getTime()
  return Math.ceil((due - today) / 86400000)
}

function getProgress(status: WorkspaceStatus) {
  if (status === "Not Started") return 10
  if (status === "In Progress") return 45
  if (status === "Evidence Added") return 75
  return 100
}

export function WorkspaceClient() {
  const [assignments, setAssignments] = useState<WorkspaceAssignment[]>([])
  const [title, setTitle] = useState("")
  const [module, setModule] = useState(workspaceModules[0])
  const [assignee, setAssignee] = useState("")
  const [role, setRole] = useState("")
  const [dueDate, setDueDate] = useState("")
  const [selectedId, setSelectedId] = useState<string | null>(null)

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (saved) {
      setAssignments(JSON.parse(saved))
    } else {
      setAssignments(starterAssignments)
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(starterAssignments))
    }
  }, [])

  useEffect(() => {
    if (assignments.length > 0) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(assignments))
    }
  }, [assignments])

  const selectedAssignment = assignments.find((item) => item.id === selectedId) ?? assignments[0]

  const metrics = useMemo(() => {
    const total = assignments.length
    const complete = assignments.filter((item) => item.status === "Complete").length
    const evidence = assignments.filter((item) => item.evidence.trim().length > 0).length
    const overdue = assignments.filter((item) => item.dueDate && item.dueDate < getToday() && item.status !== "Complete").length

    return { total, complete, evidence, overdue }
  }, [assignments])

  function createAssignment() {
    if (!title.trim() || !assignee.trim() || !dueDate) return

    const nextAssignment: WorkspaceAssignment = {
      id: crypto.randomUUID(),
      title: title.trim(),
      module,
      assignee: assignee.trim(),
      role: role.trim() || "Leader",
      dueDate,
      status: "Not Started",
      evidence: "",
      coachingNote: "",
      createdAt: getToday()
    }

    setAssignments((current) => [nextAssignment, ...current])
    setSelectedId(nextAssignment.id)
    setTitle("")
    setAssignee("")
    setRole("")
    setDueDate("")
    setModule(workspaceModules[0])
  }

  function updateAssignment(id: string, updates: Partial<WorkspaceAssignment>) {
    setAssignments((current) =>
      current.map((item) => (item.id === id ? { ...item, ...updates } : item))
    )
  }

  function deleteAssignment(id: string) {
    setAssignments((current) => current.filter((item) => item.id !== id))
    setSelectedId(null)
  }

  return (
    <EnterpriseShell>
      <main>
        <section className="border-b border-black/10 bg-[#111827] text-white">
          <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
            <div className="flex flex-col justify-between gap-5 xl:flex-row xl:items-end">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/50">
                  District Workspace
                </p>
                <h1 className="mt-3 max-w-4xl text-4xl font-semibold tracking-[-0.05em] md:text-5xl">
                  Manage leadership execution across the district pipeline.
                </h1>
              </div>
              <div className="grid grid-cols-4 gap-2 xl:w-[560px]">
                <Metric label="Active" value={metrics.total} />
                <Metric label="Done" value={metrics.complete} />
                <Metric label="Evidence" value={metrics.evidence} />
                <Metric label="Past due" value={metrics.overdue} />
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-5 px-6 py-6 lg:grid-cols-[320px_1fr_390px] lg:px-8">
          <aside className="rounded-3xl border border-black/10 bg-white p-5 shadow-sm">
            <div className="mb-5">
              <h2 className="text-lg font-semibold tracking-[-0.02em]">Quick assign</h2>
              <p className="mt-1 text-sm leading-5 text-black/55">
                Create a leadership task with owner, module, and due date.
              </p>
            </div>

            <div className="space-y-4">
              <Field label="Assignment title">
                <input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Upload reteach plan evidence" className="input" />
              </Field>

              <Field label="Module">
                <select value={module} onChange={(event) => setModule(event.target.value)} className="input">
                  {workspaceModules.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </Field>

              <Field label="Assigned leader">
                <input value={assignee} onChange={(event) => setAssignee(event.target.value)} placeholder="Leader name" className="input" />
              </Field>

              <div className="grid grid-cols-2 gap-3">
                <Field label="Role">
                  <input value={role} onChange={(event) => setRole(event.target.value)} placeholder="AP" className="input" />
                </Field>

                <Field label="Due">
                  <input type="date" value={dueDate} onChange={(event) => setDueDate(event.target.value)} className="input" />
                </Field>
              </div>

              <button onClick={createAssignment} className="w-full rounded-2xl bg-[#111827] px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-black">
                Create assignment
              </button>
            </div>

            <div className="mt-6 rounded-2xl border border-black/10 bg-[#f7f5f0] p-4">
              <p className="text-sm font-semibold">Filters coming next</p>
              <p className="mt-1 text-xs leading-5 text-black/55">
                Module, leader, due date, status, and readiness priority.
              </p>
            </div>
          </aside>

          <section className="rounded-3xl border border-black/10 bg-white p-5 shadow-sm">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold tracking-[-0.02em]">Assignment queue</h2>
                <p className="mt-1 text-sm text-black/55">Execution view for active leader development work.</p>
              </div>
              <div className="rounded-full border border-black/10 px-3 py-1 text-xs font-semibold text-black/55">
                Local workspace
              </div>
            </div>

            <div className="space-y-3">
              {assignments.map((assignment) => {
                const days = getDaysUntil(assignment.dueDate)
                const overdue = days < 0 && assignment.status !== "Complete"
                const progress = getProgress(assignment.status)

                return (
                  <button
                    key={assignment.id}
                    onClick={() => setSelectedId(assignment.id)}
                    className={`w-full rounded-3xl border p-4 text-left transition ${
                      selectedAssignment?.id === assignment.id
                        ? "border-[#111827] bg-[#f4f0e8]"
                        : "border-black/10 bg-white hover:bg-black/[0.03]"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="font-semibold tracking-[-0.01em]">{assignment.title}</p>
                          {overdue && <span className="rounded-full bg-red-100 px-2 py-1 text-[11px] font-semibold text-red-700">Overdue</span>}
                        </div>
                        <p className="mt-1 text-sm text-black/55">{assignment.module}</p>
                      </div>
                      <StatusBadge status={assignment.status} />
                    </div>

                    <div className="mt-4 grid gap-3 text-sm text-black/65 md:grid-cols-4">
                      <p><span className="block text-xs font-semibold uppercase tracking-[0.12em] text-black/35">Owner</span>{assignment.assignee}</p>
                      <p><span className="block text-xs font-semibold uppercase tracking-[0.12em] text-black/35">Role</span>{assignment.role}</p>
                      <p><span className="block text-xs font-semibold uppercase tracking-[0.12em] text-black/35">Due</span>{assignment.dueDate}</p>
                      <p><span className="block text-xs font-semibold uppercase tracking-[0.12em] text-black/35">Signal</span>{days < 0 ? `${Math.abs(days)} days late` : `${days} days left`}</p>
                    </div>

                    <div className="mt-4">
                      <div className="mb-2 flex items-center justify-between text-xs text-black/45">
                        <span>Progress</span>
                        <span>{progress}%</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-black/10">
                        <div className="h-full rounded-full bg-[#111827]" style={{ width: `${progress}%` }} />
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </section>

          <section className="rounded-3xl border border-black/10 bg-white p-5 shadow-sm">
            {selectedAssignment ? (
              <div>
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-black/35">Leader record</p>
                    <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em]">{selectedAssignment.assignee}</h2>
                    <p className="mt-1 text-sm text-black/55">{selectedAssignment.title}</p>
                  </div>
                  <button onClick={() => deleteAssignment(selectedAssignment.id)} className="rounded-xl border border-black/10 px-3 py-2 text-xs font-semibold text-black/60 hover:bg-red-50 hover:text-red-700">
                    Remove
                  </button>
                </div>

                <div className="mb-5 grid grid-cols-2 gap-3">
                  <Insight label="Readiness" value="74%" />
                  <Insight label="Simulations" value="3" />
                  <Insight label="Risk" value="Moderate" />
                  <Insight label="Evidence" value={selectedAssignment.evidence ? "Added" : "Missing"} />
                </div>

                <div className="space-y-4">
                  <Field label="Status">
                    <select
                      value={selectedAssignment.status}
                      onChange={(event) => updateAssignment(selectedAssignment.id, { status: event.target.value as WorkspaceStatus })}
                      className="input"
                    >
                      {workspaceStatuses.map((status) => (
                        <option key={status}>{status}</option>
                      ))}
                    </select>
                  </Field>

                  <Field label="Due date">
                    <input
                      type="date"
                      value={selectedAssignment.dueDate}
                      onChange={(event) => updateAssignment(selectedAssignment.id, { dueDate: event.target.value })}
                      className="input"
                    />
                  </Field>

                  <Field label="Coaching evidence">
                    <textarea
                      value={selectedAssignment.evidence}
                      onChange={(event) => updateAssignment(selectedAssignment.id, { evidence: event.target.value })}
                      placeholder="Add artifact notes, observed evidence, or completion signal."
                      className="input min-h-28 resize-none"
                    />
                  </Field>

                  <Field label="Coaching note">
                    <textarea
                      value={selectedAssignment.coachingNote}
                      onChange={(event) => updateAssignment(selectedAssignment.id, { coachingNote: event.target.value })}
                      placeholder="Capture the next best leadership move."
                      className="input min-h-24 resize-none"
                    />
                  </Field>
                </div>
              </div>
            ) : null}
          </section>
        </section>
      </main>
    </EnterpriseShell>
  )
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/10 p-3">
      <p className="text-2xl font-semibold tracking-[-0.04em]">{value}</p>
      <p className="mt-1 text-xs text-white/55">{label}</p>
    </div>
  )
}

function Insight({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-black/10 bg-[#f7f5f0] p-3">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-black/35">{label}</p>
      <p className="mt-2 text-lg font-semibold tracking-[-0.03em]">{value}</p>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-black/70">{label}</span>
      {children}
    </label>
  )
}

function StatusBadge({ status }: { status: WorkspaceStatus }) {
  return (
    <span className="rounded-full border border-black/10 bg-white px-3 py-1 text-xs font-semibold text-black/70">
      {status}
    </span>
  )
}
