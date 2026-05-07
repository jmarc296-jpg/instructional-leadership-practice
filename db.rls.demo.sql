-- Demo-only RLS (anon read/write). Do not use in production.
alter table leadership_actions enable row level security;
alter table leadership_signals enable row level security;
alter table executive_records enable row level security;
alter table leadership_evidence enable row level security;

drop policy if exists "demo anon full access actions" on leadership_actions;
create policy "demo anon full access actions" on leadership_actions
for all to anon using (true) with check (true);

drop policy if exists "demo anon full access signals" on leadership_signals;
create policy "demo anon full access signals" on leadership_signals
for all to anon using (true) with check (true);

drop policy if exists "demo anon full access executive" on executive_records;
create policy "demo anon full access executive" on executive_records
for all to anon using (true) with check (true);


drop policy if exists "demo anon full access evidence" on leadership_evidence;
create policy "demo anon full access evidence" on leadership_evidence
for all to anon using (true) with check (true);
