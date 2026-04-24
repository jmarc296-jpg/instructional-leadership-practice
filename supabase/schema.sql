create table if not exists organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  type text not null default 'district',
  created_at timestamp with time zone default now()
);

create table if not exists cohorts (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references organizations(id) on delete cascade,
  name text not null,
  description text,
  created_at timestamp with time zone default now()
);

create table if not exists leaders (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references organizations(id) on delete cascade,
  cohort_id uuid references cohorts(id) on delete set null,
  full_name text not null,
  email text,
  role text default 'aspiring_principal',
  created_at timestamp with time zone default now()
);

create table if not exists leadership_intelligence_snapshots (
  id uuid primary key default gen_random_uuid(),
  user_id uuid null,
  organization_id uuid references organizations(id) on delete cascade,
  cohort_id uuid references cohorts(id) on delete set null,
  card_id text not null,
  domain text not null,
  score jsonb,
  insights jsonb,
  profile jsonb,
  consequences jsonb,
  recommendation jsonb,
  created_at timestamp with time zone default now()
);

create index if not exists idx_snapshots_org on leadership_intelligence_snapshots(organization_id);
create index if not exists idx_snapshots_cohort on leadership_intelligence_snapshots(cohort_id);
create index if not exists idx_snapshots_domain on leadership_intelligence_snapshots(domain);
create index if not exists idx_leaders_org on leaders(organization_id);
create index if not exists idx_leaders_cohort on leaders(cohort_id);
