import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-5xl font-bold max-w-4xl">
        Predict principal failure before it becomes district failure.
      </h1>

      <p className="mt-6 text-xl max-w-2xl text-gray-600">
        LeadSharper helps districts identify struggling school leaders,
        prescribe interventions, and build succession pipelines before
        vacancies and student outcomes suffer.
      </p>

      <div className="flex gap-4 mt-8">
        <Link
          href="/district-audit"
          className="bg-black text-white px-6 py-3 rounded-lg"
        >
          Upload District Data
        </Link>

        <Link
          href="/executive-intelligence"
          className="border px-6 py-3 rounded-lg"
        >
          View Platform
        </Link>
      </div>
    </main>
  );
}
