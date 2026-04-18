export function EmptyState() {
  return (
    <section className="card" style={{ padding: 24 }}>
      <div
        style={{
          minHeight: 500,
          border: '1px dashed var(--border)',
          borderRadius: 24,
          background: 'var(--soft)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: 32
        }}
      >
        <div style={{ maxWidth: 700 }}>
          <div className="eyebrow">Ready when you are</div>
          <h2 style={{ fontSize: 32, margin: '16px 0 8px' }}>
            Build a practice session and click through one leadership scenario at a time
          </h2>
          <p className="small" style={{ fontSize: 16, lineHeight: 1.7 }}>
            Choose your mode, set your display preferences, and begin a focused practice
            session to sharpen instructional leadership judgment.
          </p>
        </div>
      </div>
    </section>
  )
}
