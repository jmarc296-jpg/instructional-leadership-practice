-- Production RLS (authenticated access).
alter table leadership_actions enable row level security;
alter table leadership_signals enable row level security;
alter table executive_records enable row level security;
alter table leadership_evidence enable row level security;

drop policy if exists "authenticated read actions" on leadership_actions;
create policy "authenticated read actions" on leadership_actions
for select to authenticated using (true);

drop policy if exists "authenticated write actions" on leadership_actions;
create policy "authenticated write actions" on leadership_actions
for insert to authenticated with check (true);

drop policy if exists "authenticated update actions" on leadership_actions;
create policy "authenticated update actions" on leadership_actions
for update to authenticated using (true) with check (true);

drop policy if exists "authenticated read signals" on leadership_signals;
create policy "authenticated read signals" on leadership_signals
for select to authenticated using (true);

drop policy if exists "authenticated write signals" on leadership_signals;
create policy "authenticated write signals" on leadership_signals
for insert to authenticated with check (true);

drop policy if exists "authenticated read executive" on executive_records;
create policy "authenticated read executive" on executive_records
for select to authenticated using (true);

drop policy if exists "authenticated write executive" on executive_records;
create policy "authenticated write executive" on executive_records
for insert to authenticated with check (true);


drop policy if exists "authenticated read evidence" on leadership_evidence;
create policy "authenticated read evidence" on leadership_evidence
for select to authenticated using (true);

drop policy if exists "authenticated write evidence" on leadership_evidence;
create policy "authenticated write evidence" on leadership_evidence
for insert to authenticated with check (true);
