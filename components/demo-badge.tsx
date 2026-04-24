type Props = {
  isDemo?: boolean
}

export function DemoBadge({ isDemo = true }: Props) {
  if (!isDemo) return null

  return (
    <div className="rounded-2xl border border-indigo-100 bg-indigo-50 px-4 py-3 text-sm text-indigo-900">
      <span className="font-semibold">Demo Scenario Active:</span>{' '}
      This view is optimized to showcase the LeadSharper simulation loop.
    </div>
  )
}
