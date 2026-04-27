export function StickyPilotCta() {
  return (
    <div className="fixed bottom-5 right-5 z-50 hidden md:block">
      <a
        href="/pilot"
        className="rounded-2xl bg-blue-600 px-5 py-4 text-sm font-semibold text-white shadow-xl hover:bg-blue-700"
      >
        See this in your district
      </a>
    </div>
  )
}
