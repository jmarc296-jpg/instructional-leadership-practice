create table if not exists leadership_actions (
  id uuid primary key default gen_random_uuid(),
  campus text,
  signal text,
  action text,
  owner text,
  risk text,
  status text default 'Not Started',
  last_updated timestamp default now()
);
