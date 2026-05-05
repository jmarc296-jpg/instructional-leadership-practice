const { createClient } = require("@supabase/supabase-js")

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !serviceRoleKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY")
  process.exit(1)
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
})

async function seedPilotData() {
  const { data: signal, error: signalError } = await supabase
    .from("leadership_signals")
    .insert({
      district_name: "Pilot District",
      school_name: "Riverside Middle School",
      leader_name: "Jordan Ellis",
      signal_type: "instructional_leadership_execution",
      severity: "high",
      source: "pilot_seed",
      summary:
        "Walkthrough evidence and DDI follow-up show inconsistent execution of agreed instructional priorities across grade-level teams.",
      evidence:
        "Recent walkthrough notes show limited evidence of student discourse, inconsistent checks for understanding, and incomplete follow-up from the last data meeting.",
      recommended_action:
        "Assign cabinet-level ownership, complete a focused leadership coaching cycle, and require evidence of follow-through within two weeks.",
      status: "new",
    })
    .select()
    .single()

  if (signalError) throw signalError

  const dueDate = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
    .toISOString()
    .slice(0, 10)

  const { data: assignment, error: assignmentError } = await supabase
    .from("support_assignments")
    .insert({
      signal_id: signal.id,
      owner_name: "Dr. Avery Coleman",
      owner_role: "Assistant Superintendent",
      action_step:
        "Conduct a leadership coaching visit, review DDI artifacts, and confirm the next instructional leadership move with the principal.",
      due_date: dueDate,
      status: "in_progress",
      follow_up_notes:
        "Initial coaching visit scheduled. Principal will bring walkthrough evidence and latest data meeting notes.",
    })
    .select()
    .single()

  if (assignmentError) throw assignmentError

  const { error: evidenceError } = await supabase.from("evidence_records").insert({
    assignment_id: assignment.id,
    evidence_type: "coaching_follow_up",
    summary:
      "Assistant Superintendent reviewed current walkthrough trends and identified the need for tighter ownership of CFU implementation across teams.",
    submitted_by: "Dr. Avery Coleman",
  })

  if (evidenceError) throw evidenceError

  console.log("Pilot data seeded successfully.")
}

seedPilotData().catch((error) => {
  console.error(error.message || error)
  process.exit(1)
})
