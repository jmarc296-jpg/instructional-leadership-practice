# LeadSharper Enterprise Hardening Plan

## Objective
Move LeadSharper from demo-ready to district-pilot-ready by hardening the system spine: real data persistence, integration readiness, executive reporting, and pilot-to-scale implementation.

## Current Readiness

### Production-Ready
- Homepage clearly communicates the executive buyer problem.
- Core workflow is established: Detect → Prescribe → Execute → Report.
- /demo/run is stage-gated and connected to /api/capture-signal.
- Build and deployment pipeline is stable on Next.js + Vercel.
- Route structure is controlled with no unnecessary sprawl.

### Not Yet District-Ready
- Captured signals are not yet stored in a durable district-level system of record.
- No formal data model exists for districts, schools, leaders, risks, assignments, evidence, and reports.
- Integrations are named but not yet mapped to data inputs, ownership, or ingestion format.
- Executive reporting is not yet generated from live captured signal activity.
- Pilot pathway needs clearer operating rhythm, success criteria, and expansion logic.

---

## Enterprise Data Spine

### Core Entities

#### District
Represents the customer organization.
Required fields:
- id
- name
- state
- superintendent_name
- cabinet_owner
- created_at
- updated_at

#### School
Represents a building within a district.
Required fields:
- id
- district_id
- name
- grade_band
- principal_leader_id
- region
- created_at
- updated_at

#### Leader
Represents a principal, assistant principal, cabinet member, or leadership candidate.
Required fields:
- id
- district_id
- school_id
- first_name
- last_name
- role
- email
- status
- created_at
- updated_at

#### LeadershipSignal
Represents a detected risk, trend, concern, or support need.
Required fields:
- id
- district_id
- school_id
- leader_id
- signal_type
- severity
- source
- summary
- evidence
- recommended_action
- status
- created_at
- updated_at

#### SupportAssignment
Represents the ownership layer after a signal is detected.
Required fields:
- id
- signal_id
- owner_name
- owner_role
- action_step
- due_date
- status
- follow_up_notes
- created_at
- updated_at

#### EvidenceRecord
Represents follow-through, artifacts, notes, walkthrough evidence, DDI evidence, or coaching documentation.
Required fields:
- id
- assignment_id
- evidence_type
- summary
- artifact_url
- submitted_by
- created_at

#### ExecutiveReport
Represents board/cabinet-ready reporting output.
Required fields:
- id
- district_id
- reporting_period
- risk_summary
- action_summary
- succession_summary
- unresolved_risks
- recommended_decisions
- created_at

---

## Persistence Strategy

### Phase 1: Supabase Postgres
Use Supabase as the first durable persistence layer because it gives LeadSharper:
- relational district data structure
- secure authentication alignment
- row-level security readiness
- fast pilot implementation
- future integration flexibility

### Initial Persistence Priority
1. Persist captured leadership signals from /api/capture-signal.
2. Connect each signal to district, school, leader, severity, source, and recommended action.
3. Store assignment and follow-up status.
4. Generate executive summaries from stored records.

### Do Not Build Yet
- Do not add complex dashboards before persistence is stable.
- Do not add new routes.
- Do not build fake integrations.
- Do not expand the demo until captured data can be reused.

---

## Integration Layer

### Priority Integration Categories

#### DDI Systems
Purpose:
- Identify instructional leadership execution gaps.
- Capture evidence of reteach planning, data meetings, and follow-up.

Likely inputs:
- assessment performance
- subgroup performance
- reteach completion
- action plan evidence
- meeting notes

#### Walkthrough Tools
Purpose:
- Detect trends in instructional leadership practice.
- Connect observation evidence to coaching needs.

Likely inputs:
- walkthrough scores
- look-for evidence
- teacher practice trends
- leader feedback quality

#### Evaluation Systems
Purpose:
- Identify leadership performance risks and succession readiness.
- Connect formal evaluation evidence to support plans.

Likely inputs:
- evaluation ratings
- goal progress
- evaluator comments
- professional growth plan indicators

#### HRIS / Talent Systems
Purpose:
- Protect succession pipelines and leadership continuity.

Likely inputs:
- vacancy status
- tenure
- role history
- candidate pool
- retention risk

---

## Executive Reporting Outputs

### Required Buyer-Level Outputs

#### Cabinet Risk Brief
Answers:
- Where is leadership risk increasing?
- Which schools need immediate support?
- Who owns the next action?
- What remains unresolved?

#### Superintendent Decision Memo
Answers:
- What decision is needed?
- What evidence supports the decision?
- What are the consequences of inaction?
- What is the recommended move?

#### Board Leadership Risk Report
Answers:
- What is the state of leadership stability?
- What support has been deployed?
- What trends are improving or worsening?
- What succession exposure exists?

---

## Pilot-to-Scale Pathway

### Pilot Scope
Start with:
- 1 district
- 3 to 5 schools
- 5 to 10 leaders
- 1 executive owner
- 1 monthly cabinet review cycle

### Pilot Success Criteria
LeadSharper is working if the district can clearly answer:
- Which leaders need support now?
- Why do they need support?
- Who owns the response?
- What evidence shows follow-through?
- What risks remain unresolved?
- What succession decisions need attention?

### Scale Trigger
Move from pilot to expansion when:
- signals are captured consistently
- assignments are completed and documented
- executive reports are usable without manual reconstruction
- cabinet leaders trust the system enough to use it in recurring decision meetings

---

## Next Engineering Move

The next build should create the persistence foundation, not more surface-level UI.

Recommended next step:
- Add Supabase server client
- Create schema SQL for the core enterprise tables
- Update /api/capture-signal so captured demo signals can persist as LeadershipSignal records
- Keep existing routes intact
- Preserve current homepage and demo UX

## Engineering Guardrails
- No new routes
- No route sprawl
- No generic dashboards
- No fake enterprise claims
- No UI expansion until persistence works
- Every change must improve district pilot readiness
