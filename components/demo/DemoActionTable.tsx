import { demoSignals } from "@/lib/demo/execution-demo-data"

export default function DemoActionTable() {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">Execution Actions</p>

      <div className="mt-4 overflow-hidden rounded-xl border border-gray-200">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-100 text-xs uppercase text-gray-500">
            <tr>
              <th className="p-3">School</th>
              <th className="p-3">Signal</th>
              <th className="p-3">Action</th>
              <th className="p-3">Owner</th>
              <th className="p-3">Due</th>
              <th className="p-3">Evidence</th>
            </tr>
          </thead>
          <tbody>
            {demoSignals.map((row) => (
              <tr key={row.id} className="border-t border-gray-200">
                <td className="p-3 font-semibold text-gray-950">{row.school}</td>
                <td className="p-3 text-gray-700">{row.signal}</td>
                <td className="p-3 text-gray-700">{row.action}</td>
                <td className="p-3 font-semibold text-gray-950">{row.owner}</td>
                <td className="p-3 text-gray-700">{row.dueDate}</td>
                <td className="p-3 text-gray-700">{row.evidence}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
