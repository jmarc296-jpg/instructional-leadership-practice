create table if not exists executive_audit_events (
  id uuid primary key default gen_random_uuid(),

  event_type text not null,
  entity_type text not null,
  entity_id text not null,

  actor_id text,
  actor_email text,

  event_payload jsonb not null default '{}'::jsonb,

  created_at timestamptz not null default now(),

  immutable_hash text
);

create index if not exists idx_audit_entity
on executive_audit_events(entity_type, entity_id);

create index if not exists idx_audit_created
on executive_audit_events(created_at desc);
