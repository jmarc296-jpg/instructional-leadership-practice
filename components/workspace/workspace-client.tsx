"use client"

import { useEffect, useMemo, useState } from "react"
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
    <main className="min-h-screen bg-[#f7f5f0] text-[#171717]">
      <section className="border-b border-black/10 bg-[#111827] text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-10 lg:px-8">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div className="max-w-3xl">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.28em] text-white/60">
                District Workspace
              </p>
              <h1 className="text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
                Assign leadership practice. Track evidence. Move growth from conversation to execution.
              </h1>
            </div>
            <div className="max-w-sm rounded-2xl border border-white/15 bg-white/10 p-5 shadow-2xl backdrop-blur">
              <p className="text-sm leading-6 text-white/75">
                Built for district teams managing principal coaching, readiness modules, and follow-through across multiple leaders.
              </p>
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-4">
            <Metric label="Active assignments" value={metrics.total} />
            <Metric label="Completed" value={metrics.complete} />
            <Metric label="Evidence added" value={metrics.evidence} />
            <Metric label="Past due" value={metrics.overdue} />
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-6 py-8 lg:grid-cols-[380px_1fr] lg:px-8">
        <aside className="rounded-3xl border border-black/10 bg-white p-5 shadow-sm">
          <div className="mb-5">
            <h2 className="text-xl font-semibold tracking-[-0.02em]">Create assignment</h2>
            <p className="mt-1 text-sm text-black/60">
              Assign a leadership module with a clear owner, due date, and evidence expectation.
            </p>
          </div>

          <div className="space-y-4">
            <Field label="Assignment title">
              <input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Example: Upload reteach plan evidence" className="input" />
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

            <Field label="Role">
              <input value={role} onChange={(event) => setRole(event.target.value)} placeholder="Principal, AP, Coach..." className="input" />
            </Field>

            <Field label="Due date">
              <input type="date" value={dueDate} onChange={(event) => setDueDate(event.target.value)} className="input" />
            </Field>

            <button onClick={createAssignment} className="w-full rounded-2xl bg-[#111827] px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-black">
              Create assignment
            </button>
          </div>
        </aside>

        <div className="grid gap-6 xl:grid-cols-[1fr_420px]">
          <section className="rounded-3xl border border-black/10 bg-white p-5 shadow-sm">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold tracking-[-0.02em]">Assignment queue</h2>
                <p className="mt-1 text-sm text-black/60">Live local workspace data for district-facing execution.</p>
              </div>
            </div>

            <div className="space-y-3">
              {assignments.map((assignment) => (
                <button
                  key={assignment.id}
                  onClick={() => setSelectedId(assignment.id)}
                  className={`w-full rounded-2xl border p-4 text-left transition ${
                    selectedAssignment?.id === assignment.id
                      ? "border-[#111827] bg-[#f4f0e8]"
                      : "border-black/10 bg-white hover:bg-black/[0.03]"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-semibold tracking-[-0.01em]">{assignment.title}</p>
                      <p className="mt-1 text-sm text-black/60">{assignment.module}</p>
                    </div>
                    <StatusBadge status={assignment.status} />
                  </div>

                  <div className="mt-4 grid gap-2 text-sm text-black/65 md:grid-cols-3">
                    <p><span className="font-medium text-black">Owner:</span> {assignment.assignee}</p>
                    <p><span className="font-medium text-black">Role:</span> {assignment.role}</p>
                    <p><span className="font-medium text-black">Due:</span> {assignment.dueDate}</p>
                  </div>
                </button>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-black/10 bg-white p-5 shadow-sm">
            {selectedAssignment ? (
              <div>
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-black/40">Coaching record</p>
                    <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em]">{selectedAssignment.assignee}</h2>
                    <p className="mt-1 text-sm text-black/60">{selectedAssignment.title}</p>
                  </div>
                  <button onClick={() => deleteAssignment(selectedAssignment.id)} className="rounded-xl border border-black/10 px-3 py-2 text-xs font-semibold text-black/60 hover:bg-red-50 hover:text-red-700">
                    Remove
                  </button>
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
                      placeholder="Add artifact notes, observed evidence, uploaded evidence description, or completion signal."
                      className="input min-h-32 resize-none"
                    />
                  </Field>

                  <Field label="Coaching note">
                    <textarea
                      value={selectedAssignment.coachingNote}
                      onChange={(event) => updateAssignment(selectedAssignment.id, { coachingNote: event.target.value })}
                      placeholder="Capture the next best leadership move."
                      className="input min-h-28 resize-none"
                    />
                  </Field>
                </div>
              </div>
            ) : (
              <div className="flex min-h-96 items-center justify-center rounded-2xl border border-dashed border-black/15 bg-black/[0.02] p-8 text-center">
                <p className="max-w-xs text-sm text-black/55">
                  Select an assignment to update status, evidence, and coaching notes.
                </p>
              </div>
            )}
          </section>
        </div>
      </section>
    </main>
  )
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-white/15 bg-white/10 p-4">
      <p className="text-3xl font-semibold tracking-[-0.04em]">{value}</p>
      <p className="mt-1 text-sm text-white/65">{label}</p>
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
