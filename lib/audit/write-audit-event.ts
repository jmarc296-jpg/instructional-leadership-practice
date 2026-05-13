import crypto from "crypto"
import { createClient } from "@supabase/supabase-js"

export async function writeAuditEvent(input: {
  eventType: string
  entityType: string
  entityId: string
  actorId?: string
  actorEmail?: string
  payload?: unknown
}) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error("Audit writer missing Supabase server configuration.")
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  })

  const payload = input.payload ?? {}
  const createdAt = new Date().toISOString()

  const immutableHash = crypto
    .createHash("sha256")
    .update(
      JSON.stringify({
        eventType: input.eventType,
        entityType: input.entityType,
        entityId: input.entityId,
        payload,
        createdAt,
      })
    )
    .digest("hex")

  const { error } = await supabase.from("executive_audit_events").insert({
    event_type: input.eventType,
    entity_type: input.entityType,
    entity_id: input.entityId,
    actor_id: input.actorId ?? null,
    actor_email: input.actorEmail ?? null,
    event_payload: payload,
    immutable_hash: immutableHash,
    created_at: createdAt,
  })

  if (error) {
    throw new Error(`AUDIT_WRITE_FAILED: ${error.message}`)
  }
}
