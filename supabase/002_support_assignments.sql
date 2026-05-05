create table if not exists support_assignments (
  id uuid primary key default gen_random_uuid(),
  signal_id uuid references leadership_signals(id) on delete cascade,
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
on support_assignments (signal_id);

create index if not exists support_assignments_status_idx
on support_assignments (status);

create index if not exists support_assignments_due_date_idx
on support_assignments (due_date);
