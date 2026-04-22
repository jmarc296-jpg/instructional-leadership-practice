'use client'

import { useState } from 'react'
import {
  Brain,
  BarChart3,
  Heart,
  History as HistoryIcon
} from 'lucide-react'

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('practice')
  const [activeFilter, setActiveFilter] = useState('All Domains')

  const tabs = [
    { id: 'practice', label: 'Practice', icon: Brain },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'favorites', label: 'Favorites', icon: Heart },
    { id: 'history', label: 'History', icon: HistoryIcon }
  ]

  const filters = [
    'All Domains',
    'Rigor',
    'DDI',
    'Coaching',
    'Assessment',
    'Culture',
    'Leadership'
  ]

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-8">
      <div className="mx-auto max-w-7xl space-y-8">

        {/* NAV */}
        <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex flex-wrap gap-3">
            {tabs.map((tab) => {
              const Icon = tab.icon

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 rounded-2xl px-4 py-2.5 font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-slate-900 text-white shadow-md'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <Icon size={16} />
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* HERO SECTION */}
        <div className="grid gap-6 lg:grid-cols-3">

          <div className="lg:col-span-2 rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
            <div className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-blue-600">
              Instructional Leadership Practice
            </div>

            <h1 className="mb-6 text-5xl font-bold leading-tight text-slate-900">
              Build elite instructional leadership judgment through realistic scenario practice.
            </h1>

            <p className="max-w-2xl text-lg leading-relaxed text-slate-600">
              Practice high-stakes leadership decisions, sharpen your coaching instincts,
              and strengthen response quality through repeated scenario-based reps.
            </p>
          </div>

          <div className="relative min-h-[420px] overflow-hidden rounded-3xl shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80"
              alt="leadership meeting"
              className="h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            <div className="absolute bottom-0 left-0 p-8 text-white">
              <div className="mb-3 text-xs uppercase tracking-[0.25em] opacity-80">
                Real-world leadership reps
              </div>

              <h3 className="mb-2 text-2xl font-bold">
                Practice decisions leaders face every day
              </h3>

              <p className="max-w-sm text-sm opacity-90">
                Coaching conversations. Data meetings. Instructional decisions.
                Build sharper judgment before the real moment arrives.
              </p>
            </div>
          </div>
        </div>

        {/* FILTERS */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-slate-500">
            Practice Focus
          </div>

          <div className="flex flex-wrap gap-3">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                  activeFilter === filter
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* REAL PRODUCT SECTION */}
        <div className="grid gap-6 lg:grid-cols-2">

          {/* PRACTICE CTA */}
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-blue-600">
              Live Practice Engine
            </div>

            <h2 className="mb-4 text-3xl font-bold text-slate-900">
              Start real scenario reps
            </h2>

            <p className="mb-6 leading-relaxed text-slate-600">
              Move beyond reading scenarios. Practice writing real responses,
              receive feedback, and build stronger instructional leadership instincts.
            </p>

            <div className="space-y-3">
              <button className="w-full rounded-xl bg-blue-600 px-6 py-4 font-semibold text-white hover:bg-blue-700 transition">
                Launch Practice Session
              </button>

              <button className="w-full rounded-xl border border-slate-300 px-6 py-4 font-semibold hover:bg-slate-50 transition">
                Continue Previous Session
              </button>
            </div>
          </div>

          {/* ANALYTICS PREVIEW */}
          <div className="rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 p-8 text-white shadow-lg">
            <div className="mb-5 text-xs uppercase tracking-[0.25em] opacity-70">
              Performance Snapshot
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl bg-white/10 p-4">
                <div className="text-sm opacity-70">
                  Scenarios Completed
                </div>
                <div className="text-3xl font-bold">
                  42
                </div>
              </div>

              <div className="rounded-2xl bg-white/10 p-4">
                <div className="text-sm opacity-70">
                  Response Quality
                </div>
                <div className="text-3xl font-bold">
                  87%
                </div>
              </div>

              <div className="rounded-2xl bg-white/10 p-4">
                <div className="text-sm opacity-70">
                  Strongest Domain
                </div>
                <div className="text-3xl font-bold">
                  Coaching
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}