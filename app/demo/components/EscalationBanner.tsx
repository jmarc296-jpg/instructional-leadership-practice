type Props = {
  escalationCount: number
}

export default function EscalationBanner({ escalationCount }: Props) {
  if (escalationCount === 0) return null

  return (
    <div className="rounded-xl bg-red-700 p-5 text-white shadow-lg">
      <div className="text-lg font-semibold">
        {escalationCount} schools require executive action now.
      </div>
      <div className="mt-1 text-sm opacity-90">
        No owner means no containment.
      </div>
      <div className="mt-2 text-xs opacity-80">
        Delay converts a known risk into a leadership failure.
      </div>
    </div>
  )
}
