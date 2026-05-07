# Supabase workspace persistence setup

LeadSharper workspace persistence expects these tables:
- `leadership_signals`
- `leadership_actions`
- `leadership_evidence`
- `executive_records`

## Environment variables
Set in Vercel/Supabase project settings:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

If either is missing, workspace APIs gracefully fall back to mock/demo mode for `/api/workspace-actions`, `/api/workspace-signals`, and `/api/workspace-evidence`.

## SQL files
- `db.sql` → baseline schema (signals, actions, evidence, executive records)
- `db.rls.demo.sql` → demo-only anon RLS policies (includes `leadership_evidence`)
- `db.rls.production.sql` → recommended authenticated production RLS policies (includes `leadership_evidence`)

## Setup order
1. Run `db.sql`.
2. Choose one RLS mode and run only one file:
   - Demo environments: `db.rls.demo.sql`
   - Production environments: `db.rls.production.sql`

## API behavior notes
- `/api/workspace-actions` expects: `signal_id, school, owner_role, action_description, due_date, status, required_evidence, evidence_notes, created_at, updated_at, created_by_role`.
- `/api/workspace-signals` expects: `school_name, leader_name, indicator, severity, summary, owner, evidence_status`.
- `/api/workspace-evidence` expects: `action_id, signal_id, school, evidence_type, evidence_summary, submitted_by, submitted_by_role, created_at, updated_at`.
- On Supabase schema/runtime errors, APIs log server-side errors and return clear messages (verbose in development).
- On missing Supabase env vars, APIs return mock data so workspace UX does not break.

## Controlled Input Standards
- Risk levels: `LOW`, `MEDIUM`, `HIGH` (case-insensitive on input; normalized server-side).
- Action status: `Not Started`, `In Progress`, `Evidence Needed`, `Complete`.
- Evidence types: `walkthrough`, `student_work`, `assessment_data`, `observation`, `other`.
- Role values: `principal`, `coach`, `teacher`, `district`.

APIs normalize accepted values and reject invalid enum inputs with `400` responses where required.

## District Scoping (Pre-Auth)
Until authentication is added, APIs scope records by `district_id` using this precedence:
1. `x-district-id` request header
2. `?district_id=` query param
3. fallback default: `demo-district`

All workspace APIs (`workspace-signals`, `workspace-actions`, `workspace-evidence`, `workspace-reports`) read/write within the resolved district scope.

## Workflow Integrity & Health Metrics

`GET /api/workspace-reports` now includes a `workflow_health` object that extends (does not replace) the existing response.

Metrics returned:
- `signals_with_no_actions`: count of leadership signals that have no linked action.
- `actions_without_evidence`: count of actions with no evidence row and no evidence notes.
- `overdue_actions`: count of actions with `due_date` in the past and status not `Complete`.
- `unlinked_actions`: count of actions created without `signal_id` linkage.

Notes:
- Action creation still requires `school`; `district_id` is enforced via request resolution and insert defaults.
- Creating an action without `signal_id` is allowed but now returns a warning to improve workflow integrity.
- Metrics work with Supabase and keep mock fallback behavior intact.
