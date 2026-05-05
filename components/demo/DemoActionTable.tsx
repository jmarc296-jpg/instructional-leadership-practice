'use client'

import { useState } from "react"
import { demoSignals } from "@/lib/demo/execution-demo-data"

export default function DemoActionTable() {
  const [owned, setOwned] = useState<string[]>([])
  const [evidenced, setEvidenced] = useState<string[]>([])

  function claim(id: string) {
    if (!owned.includes(id)) {
      setOwned([...owned, id])
    }
  }

  function prove(id: string) {
    if (owned.includes(id) && !evidenced.includes(id)) {
      setEvidenced([...evidenced, id])
    }
  }

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">
            Required Execution
          </p>
          <p className="text-xs text-gray-600 mt-1">
            Actions must be claimed and evidenced. Unclaimed work will escalate.
          </p>
        </div>

        <div className="text-xs text-gray-500">
          {owned.length}/{demoSignals.length} owned · {evidenced.length} proven
        </div>
      </div>

      <div className="mt-4 overflow-hidden rounded-xl border border-gray-200">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-100 text-xs uppercase text-gray-500">
            <tr>
              <th className="p-3">School</th>
              <th className="p-3">Signal</th>
              <th className="p-3">Action</th>
              <th className="p-3">Owner</th>
              <th className="p-3">Due</th>
              <th className="p-3">Execution</th>
            </tr>
          </thead>
          <tbody>
            {demoSignals.map((row) => {
              const isOwned = owned.includes(row.id)
              const isProven = evidenced.includes(row.id)

              return (
                <tr key={row.id} className="border-t border-gray-200">
                  <td className="p-3 font-semibold text-gray-950">{row.school}</td>

                  <td className="p-3 text-gray-700">{row.signal}</td>

                  <td className="p-3 text-gray-700">{row.action}</td>

                  <td className="p-3 font-semibold text-gray-950">
                    {isOwned ? row.owner : "Unassigned"}
                  </td>

                  <td className="p-3 text-gray-700">{row.dueDate}</td>

                  <td className="p-3">
                    <div className="flex gap-2">
                      {!isOwned && (
                        <button
                          onClick={() => claim(row.id)}
                          className="rounded-md border border-red-300 bg-red-50 px-2 py-1 text-xs font-semibold text-red-700 hover:bg-red-100"
                        >
                          Claim
                        </button>
                      )}

                      {isOwned && !isProven && (
                        <button
                          onClick={() => prove(row.id)}
                          className="rounded-md border border-orange-300 bg-orange-50 px-2 py-1 text-xs font-semibold text-orange-700 hover:bg-orange-100"
                        >
                          Prove
                        </button>
                      )}

                      {isProven && (
                        <span className="text-xs font-semibold text-green-600">
                          Verified
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {owned.length < demoSignals.length && (
        <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-xs text-red-800">
          Not all actions are owned. System exposure remains active.
        </div>
      )}

      {owned.length === demoSignals.length && evidenced.length < demoSignals.length && (
        <div className="mt-4 rounded-lg border border-orange-200 bg-orange-50 p-3 text-xs text-orange-800">
          All actions are owned. Execution proof is still required.
        </div>
      )}

      {evidenced.length === demoSignals.length && (
        <div className="mt-4 rounded-lg border border-green-200 bg-green-50 p-3 text-xs text-green-800">
          All actions verified. Risk is actively contained.
        </div>
      )}
    </section>
  )
}
