type CabinetAttentionItem = {
  id: string
  title: string
  action: string
}

export default function CabinetAttention({ items }: { items: CabinetAttentionItem[] }) {
  if (!items.length) {
    return (
      <section className="rounded-xl border border-gray-200 bg-white p-5">
        <h3 className="text-sm font-semibold text-gray-900">Cabinet Attention</h3>
        <p className="mt-2 text-sm text-gray-500">
          No immediate risks requiring escalation.
        </p>
      </section>
    )
  }

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-5">
      <h3 className="text-sm font-semibold text-red-600">
        Cabinet Attention Required
      </h3>

      <div className="mt-3 space-y-3">
        {items.slice(0, 3).map((item) => (
          <div key={item.id} className="text-sm text-gray-900">
            <div className="font-semibold">{item.title}</div>
            <div className="text-gray-600">{item.action}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

