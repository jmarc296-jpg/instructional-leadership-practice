create table if not exists evidence_records (
  id uuid primary key default gen_random_uuid(),
  assignment_id uuid references support_assignments(id) on delete cascade,
  evidence_type text not null default 'follow_up_note',
  summary text not null,
  artifact_url text,
  submitted_by text,
  created_at timestamptz not null default now()
);

create index if not exists evidence_records_assignment_id_idx
on evidence_records (assignment_id);

create index if not exists evidence_records_created_at_idx
on evidence_records (created_at desc);
