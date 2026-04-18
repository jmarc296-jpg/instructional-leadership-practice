'use client'

import type { Category, Difficulty, SessionSettings } from '@/types'

type Props = {
  settings: SessionSettings
  setSettings: React.Dispatch<React.SetStateAction<SessionSettings>>
  onBegin: () => void
  onReset: () => void
}

export function SessionSetup({ settings, setSettings, onBegin, onReset }: Props) {
  return (
    <aside className="card" style={{ padding: 24 }}>
      <h2 style={{ marginTop: 0 }}>Session setup</h2>
      <p className="small">Set your practice preferences, then begin a new session.</p>

      <div className="stack" style={{ marginTop: 24 }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 8 }}>Mode</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {([
              ['quiz', 'Quiz mode'],
              ['review', 'Review mode']
            ] as const).map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => setSettings((prev) => ({ ...prev, mode: value }))}
                className={`btn ${settings.mode === value ? 'btn-dark' : ''}`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <label className="card" style={{ padding: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: 14 }}>Include prompt</div>
            <div className="small">Show scenario context</div>
          </div>
          <input
            type="checkbox"
            checked={settings.includePrompt}
            onChange={(e) =>
              setSettings((prev) => ({ ...prev, includePrompt: e.target.checked }))
            }
          />
        </label>

        <label className="card" style={{ padding: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: 14 }}>Include exemplar response</div>
            <div className="small">Show model thinking</div>
          </div>
          <input
            type="checkbox"
            checked={settings.includeExemplar}
            onChange={(e) =>
              setSettings((prev) => ({ ...prev, includeExemplar: e.target.checked }))
            }
          />
        </label>

        <div>
          <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 8 }}>Category</div>
          <select
            className="select"
            value={settings.category}
            onChange={(e) =>
              setSettings((prev) => ({ ...prev, category: e.target.value as Category }))
            }
          >
            <option value="all">All categories</option>
            <option value="rigor">Rigor</option>
            <option value="ddi">DDI</option>
            <option value="observation-feedback">Observation and feedback</option>
            <option value="curriculum-alignment">Curriculum alignment</option>
            <option value="ilt-leadership">ILT leadership</option>
            <option value="principal-decision-making">Principal decision-making</option>
          </select>
        </div>

        <div>
          <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 8 }}>Difficulty</div>
          <select
            className="select"
            value={settings.difficulty}
            onChange={(e) =>
              setSettings((prev) => ({
                ...prev,
                difficulty: e.target.value as Difficulty | 'all'
              }))
            }
          >
            <option value="all">All levels</option>
            <option value="foundational">Foundational</option>
            <option value="strong">Strong</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>

        <div>
          <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 8 }}>Session length</div>
          <select
            className="select"
            value={settings.sessionLength}
            onChange={(e) =>
              setSettings((prev) => ({ ...prev, sessionLength: Number(e.target.value) }))
            }
          >
            <option value={5}>5 cards</option>
            <option value={10}>10 cards</option>
            <option value={15}>15 cards</option>
            <option value={0}>All matching cards</option>
          </select>
        </div>

        <div className="stack">
          <button className="btn btn-dark" onClick={onBegin}>Begin session</button>
          <button className="btn" onClick={onReset}>Reset view</button>
        </div>
      </div>
    </aside>
  )
}
