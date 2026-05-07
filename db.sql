-- LeadSharper Supabase baseline schema
-- Safe to run multiple times.

create extension if not exists pgcrypto;

create table if not exists leadership_signals (
  id uuid primary key default gen_random_uuid(),
  district_id text default 'demo-district',
  created_at timestamptz not null default now(),
  school_name text not null,
  leader_name text not null,
  indicator text not null,
  severity text not null,
  summary text not null,
  owner text,
  evidence_status text default 'Not started'
);

alter table leadership_signals add column if not exists created_at timestamptz default now();
alter table leadership_signals add column if not exists school_name text;
alter table leadership_signals add column if not exists leader_name text;
alter table leadership_signals add column if not exists indicator text;
alter table leadership_signals add column if not exists severity text;
alter table leadership_signals add column if not exists summary text;
alter table leadership_signals add column if not exists owner text;
alter table leadership_signals add column if not exists evidence_status text default 'Not started';

create table if not exists leadership_actions (
  id uuid primary key default gen_random_uuid(),
  district_id text default 'demo-district',
  signal_id text,
  school text not null,
  owner_role text not null,
  action_description text not null,
  due_date date,
  status text not null default 'Not Started',
  required_evidence text,
  evidence_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by_role text
);

alter table leadership_actions add column if not exists signal_id text;
alter table leadership_actions add column if not exists school text;
alter table leadership_actions add column if not exists owner_role text;
alter table leadership_actions add column if not exists action_description text;
alter table leadership_actions add column if not exists due_date date;
alter table leadership_actions add column if not exists status text;
alter table leadership_actions add column if not exists required_evidence text;
alter table leadership_actions add column if not exists evidence_notes text;
alter table leadership_actions add column if not exists created_at timestamptz default now();
alter table leadership_actions add column if not exists updated_at timestamptz default now();
alter table leadership_actions add column if not exists created_by_role text;

create table if not exists executive_records (
  id uuid primary key default gen_random_uuid(),
  district_id text default 'demo-district',
  report_title text,
  reporting_period text,
  high_risk_signals integer default 0,
  active_actions integer default 0,
  completed_actions integer default 0,
  evidence_submitted integer default 0,
  summary text not null,
  created_by_role text,
  created_at timestamptz not null default now()
);

alter table executive_records add column if not exists report_title text;
alter table executive_records add column if not exists reporting_period text;
alter table executive_records add column if not exists high_risk_signals integer default 0;
alter table executive_records add column if not exists active_actions integer default 0;
alter table executive_records add column if not exists completed_actions integer default 0;
alter table executive_records add column if not exists evidence_submitted integer default 0;
alter table executive_records add column if not exists summary text;
alter table executive_records add column if not exists created_by_role text;
alter table executive_records add column if not exists created_at timestamptz default now();


create table if not exists leadership_evidence (
  id uuid primary key default gen_random_uuid(),
  district_id text default 'demo-district',
  action_id text not null,
  signal_id text,
  school text not null,
  evidence_type text not null,
  evidence_summary text not null,
  submitted_by text not null,
  submitted_by_role text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table leadership_evidence add column if not exists action_id text;
alter table leadership_evidence add column if not exists signal_id text;
alter table leadership_evidence add column if not exists school text;
alter table leadership_evidence add column if not exists evidence_type text;
alter table leadership_evidence add column if not exists evidence_summary text;
alter table leadership_evidence add column if not exists submitted_by text;
alter table leadership_evidence add column if not exists submitted_by_role text;
alter table leadership_evidence add column if not exists created_at timestamptz default now();
alter table leadership_evidence add column if not exists updated_at timestamptz default now();

alter table leadership_signals add column if not exists district_id text default 'demo-district';
create index if not exists idx_leadership_signals_district_id on leadership_signals(district_id);
alter table leadership_actions add column if not exists district_id text default 'demo-district';
create index if not exists idx_leadership_actions_district_id on leadership_actions(district_id);
alter table leadership_evidence add column if not exists district_id text default 'demo-district';
create index if not exists idx_leadership_evidence_district_id on leadership_evidence(district_id);
alter table executive_records add column if not exists district_id text default 'demo-district';
create index if not exists idx_executive_records_district_id on executive_records(district_id);