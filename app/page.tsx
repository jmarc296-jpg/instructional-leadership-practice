'use client'

import { useState } from 'react'
import { Brain, BarChart3, Heart, History } from 'lucide-react'

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('practice')
  const [activeFilter, setActiveFilter] = useState('all')

  const tabs = [
    { id: 'practice', label: 'Practice', icon: Brain },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'favorites', label: 'Favorites', icon: Heart },
    { id: 'history', label: 'History', icon: History }
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
      <div className="max-w-7xl mx-auto space-y-8">

        {/* NAVIGATION */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-4">
          <div className="flex flex-wrap gap-3">
            {tabs.map((tab) => {
              const Icon = tab.icon

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-medium transition-all ${
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

        {/* HERO */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-3xl p-10 shadow-sm border border-slate-200">
            <div className="text-xs font-bold tracking-[0.25em] uppercase text-blue-600 mb-4">
              Instructional Leadership Practice
            </div>

            <h1 className="text-5xl font-bold leading-tight text-slate-900 mb-6">
              Build elite instructional leadership judgment through realistic scenario practice.
            </h1>

            <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">
              Practice high-stakes leadership decisions, sharpen your coaching instincts,
              and strengthen response quality through repeated scenario-based reps.
            </p>
          </div>

          <div className="rounded-3xl overflow-hidden shadow-lg relative min-h-[420px]">
  <img
    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
    alt="school leadership meeting"
    className="w-full h-full object-cover"
  />

  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

  <div className="absolute bottom-0 left-0 p-8 text-white">
    <div className="text-xs uppercase tracking-[0.25em] mb-3 opacity-80">
      Real-world leadership reps
    </div>

    <h3 className="text-2xl font-bold mb-2">
      Practice decisions leaders face every day
    </h3>

    <p className="text-sm opacity-90 max-w-sm">
      Coaching conversations. Data meetings. Instructional decisions.
      Build sharper judgment before the real moment arrives.
    </p>
  </div>
</div>

        {/* PRACTICE FILTERS */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
          <div className="text-xs font-bold tracking-[0.25em] uppercase text-slate-500 mb-4">
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

        {/* QUESTION CARD */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl">
          <div className="text-sm text-slate-500 mb-3">Question 1</div>

          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            The reteach plan does not match the misconception.
          </h2>

          <p className="text-slate-600 mb-6 leading-relaxed">
            Students struggled on a multi-step equation. The team plans to reteach the
            full lesson, but most errors were only in isolating the variable.
          </p>

          <div className="flex gap-4">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition">
              Start Scenario
            </button>

            <button className="border border-slate-300 px-6 py-3 rounded-xl font-semibold hover:bg-slate-50 transition">
              Save Favorite
            </button>
          </div>
        </div>

      </div>
    </main>
  )
}