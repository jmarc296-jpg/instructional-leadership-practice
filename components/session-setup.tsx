'use client'

import type { Domain, SessionSettings } from '@/types'

type Props = {
  settings: SessionSettings
  setSettings: React.Dispatch<React.SetStateAction<SessionSettings>>
}

const DOMAINS: Array<{ value: 'all' | Domain; label: string }> = [
  { value: 'all', label: 'All Domains' },
  { value: 'rigor', label: 'Rigor' },
  { value: 'ddi', label: 'DDI' },
  { value: 'coaching', label: 'Coaching' },
  { value: 'assessment', label: 'Assessment' },
  { value: 'culture', label: 'Culture' },
  { value: 'leadership', label: 'Leadership' }
]

export function SessionSetup({ settings, setSettings }: Props) {
  return (
    <aside className="space-y-6">
      <div>
        <div className="text-xs font-bold uppercase tracking-[0.24em] text-blue-600">
          Session Setup
        </div>
        <h2 className="mt-2 text-2xl font-bold text-slate-950">
          Configure your practice
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Set the experience you want, then work through realistic instructional leadership scenarios.
        </p>
      </div>

      <div className="space-y-5">
        {/* Mode */}
        <div>
          <div className="mb-2 text-sm font-semibold text-slate-800">Mode</div>
          <div className="grid grid-cols-2 gap-2">
            {([
              ['quiz', 'Quiz Mode'],
              ['review', 'Review Mode']
            ] as const).map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() =>
                  setSettings((prev) => ({
                    ...prev,
                    mode: value,
includePrompt: value === 'review',
includeExemplar: value === 'review',
coachMode: value === 'review'
                  }))
                }
                className={`rounded-2xl border px-4 py-3 text-sm font-semibold transition ${
                  settings.mode === value
                    ? 'border-blue-600 bg-blue-600 text-white'
                    : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Coach Mode */}
        <label className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
          <div className="pr-4">
            <div className="text-sm font-semibold text-slate-900">Coach insights</div>
            <div className="text-sm text-slate-600">
              Show coaching guidance and reflection support.
            </div>
          </div>
          <input
            type="checkbox"
            checked={settings.coachMode}
            onChange={(e) =>
              setSettings((prev) => ({
                ...prev,
                coachMode: e.target.checked
              }))
            }
            className="h-4 w-4"
          />
        </label>

        {/* Adaptive Mode */}
        <label className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
          <div className="pr-4">
            <div className="text-sm font-semibold text-slate-900">Adaptive practice</div>
            <div className="text-sm text-slate-600">
              Prioritize weaker areas and revision opportunities.
            </div>
          </div>
          <input
            type="checkbox"
            checked={settings.adaptiveMode}
            onChange={(e) =>
              setSettings((prev) => ({
                ...prev,
                adaptiveMode: e.target.checked
              }))
            }
            className="h-4 w-4"
          />
        </label>

        {/* Prompt toggle */}
        <label className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
          <div className="pr-4">
            <div className="text-sm font-semibold text-slate-900">Show prompt immediately</div>
            <div className="text-sm text-slate-600">
              Helpful for review mode and faster reps.
            </div>
          </div>
          <input
            type="checkbox"
            checked={settings.includePrompt ?? false}
            onChange={(e) =>
              setSettings((prev) => ({
                ...prev,
                includePrompt: e.target.checked
              }))
            }
            className="h-4 w-4"
          />
        </label>

        {/* Exemplar toggle */}
        <label className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
          <div className="pr-4">
            <div className="text-sm font-semibold text-slate-900">Show exemplar support</div>
            <div className="text-sm text-slate-600">
              Keep exemplar comparison available after your response.
            </div>
          </div>
          <input
            type="checkbox"
            checked={settings.includeExemplar ?? true}
            onChange={(e) =>
              setSettings((prev) => ({
                ...prev,
                includeExemplar: e.target.checked
              }))
            }
            className="h-4 w-4"
          />
        </label>

        {/* Domain */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-800">
            Focus Domain
          </label>
          <select
            value={settings.category ?? 'all'}
            onChange={(e) =>
              setSettings((prev) => ({
                ...prev,
                category: e.target.value as 'all' | Domain
              }))
            }
            className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none focus:border-blue-500"
          >
            {DOMAINS.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </div>

        {/* Difficulty */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-800">
            Difficulty
          </label>
          <select
            value={settings.difficulty ?? 'all'}
            onChange={(e) =>
              setSettings((prev) => ({
                ...prev,
                difficulty: e.target.value as 'all' | 'easy' | 'medium' | 'hard'
              }))
            }
            className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none focus:border-blue-500"
          >
            <option value="all">All levels</option>
            <option value="easy">Foundational</option>
            <option value="medium">Strong</option>
            <option value="hard">Advanced</option>
          </select>
        </div>

        {/* Session length */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-800">
            Session length
          </label>
          <select
            value={settings.sessionLength ?? 5}
            onChange={(e) =>
              setSettings((prev) => ({
                ...prev,
                sessionLength: Number(e.target.value)
              }))
            }
            className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none focus:border-blue-500"
          >
            <option value={5}>5 scenarios</option>
            <option value={10}>10 scenarios</option>
            <option value={15}>15 scenarios</option>
          </select>
        </div>
              <a
          href='#practice-workspace'
          className='block w-full rounded-2xl bg-slate-900 px-6 py-4 text-center text-sm font-semibold text-white hover:bg-slate-800'
        >
          Continue to Practice Workspace →
        </a>
      </div>
    </aside>
  )
}


