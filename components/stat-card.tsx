type Props = {
  label: string
  value: string | number
  tone?: 'default' | 'success' | 'warning'
  helper?: string
}

export function StatCard({
  label,
  value,
  tone = 'default',
  helper
}: Props) {
  const toneClasses =
    tone === 'success'
      ? 'border-emerald-200 bg-emerald-50'
      : tone === 'warning'
        ? 'border-amber-200 bg-amber-50'
        : 'border-slate-200 bg-white'

  return (
    <div className={`rounded-[24px] border p-5 shadow-sm ${toneClasses}`}>
      <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
        {label}
      </div>

      <div className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-slate-950">
        {value}
      </div>

      {helper ? (
        <div className="mt-2 text-sm text-slate-600">{helper}</div>
      ) : null}
    </div>
  )
}
