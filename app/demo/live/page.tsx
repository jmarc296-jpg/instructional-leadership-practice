import Link from 'next/link'

export default function LiveDemo() {
  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6">
      <div className="max-w-3xl w-full space-y-6 text-center">
        <h1 className="text-4xl font-bold">
          Leadership risk is already happening.
        </h1>

        <p className="text-lg text-slate-300">
          This demo shows what requires action this week, who owns it, and what happens if it is not addressed.
        </p>

        <div className="flex gap-4 justify-center">
          <Link
            href="/demo/run"
            className="bg-white text-black px-6 py-3 rounded-xl font-semibold"
          >
            Open Live Demo
          </Link>

          <Link
            href="/board-report"
            className="border border-white px-6 py-3 rounded-xl font-semibold"
          >
            View Board Output
          </Link>
        </div>
      </div>
    </main>
  )
}
