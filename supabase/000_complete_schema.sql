create extension if not exists pgcrypto;

create table if not exists public.leadership_signals (
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
on public.leadership_signals (created_at desc);

create index if not exists leadership_signals_severity_idx
on public.leadership_signals (severity);

create index if not exists leadership_signals_status_idx
on public.leadership_signals (status);

create table if not exists public.support_assignments (
  id uuid primary key default gen_random_uuid(),
  signal_id uuid references public.leadership_signals(id) on delete cascade,
  owner_name text not null,
  owner_role text not null,
  action_step text not null,
  due_date date,
  status text not null default 'assigned' check (status in ('assigned', 'in_progress', 'completed', 'blocked')),
  follow_up_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists support_assignments_signal_id_idx
on public.support_assignments (signal_id);

create index if not exists support_assignments_status_idx
on public.support_assignments (status);

create index if not exists support_assignments_due_date_idx
on public.support_assignments (due_date);

create table if not exists public.evidence_records (
  id uuid primary key default gen_random_uuid(),
  assignment_id uuid references public.support_assignments(id) on delete cascade,
  evidence_type text not null default 'follow_up_note',
  summary text not null,
  artifact_url text,
  submitted_by text,
  created_at timestamptz not null default now()
);

create index if not exists evidence_records_assignment_id_idx
on public.evidence_records (assignment_id);

create index if not exists evidence_records_created_at_idx
on public.evidence_records (created_at desc);
