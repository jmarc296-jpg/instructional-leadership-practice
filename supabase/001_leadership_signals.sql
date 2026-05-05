create table if not exists leadership_signals (
  id uuid primary key default gen_random_uuid(),
  district_name text,
  school_name text,
  leader_name text,
  signal_type text not null,
  severity text not null check (severity in ('low', 'medium', 'high')),
  source text not null default 'demo_run',
  summary text not null,
  evidence text,
  recommended_action text,
  status text not null default 'new',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists leadership_signals_created_at_idx
on leadership_signals (created_at desc);

create index if not exists leadership_signals_severity_idx
on leadership_signals (severity);

create index if not exists leadership_signals_status_idx
on leadership_signals (status);
