import crypto from "crypto"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function writeAuditEvent(input: {
  eventType: string
  entityType: string
  entityId: string
  actorId?: string
  actorEmail?: string
  payload?: unknown
}) {
  const payload = input.payload ?? {}

  const immutableHash = crypto
    .createHash("sha256")
    .update(JSON.stringify({
      eventType: input.eventType,
      entityType: input.entityType,
      entityId: input.entityId,
      payload,
      createdAt: new Date().toISOString()
    }))
    .digest("hex")

  const { error } = await supabase
    .from("executive_audit_events")
    .insert({
      event_type: input.eventType,
      entity_type: input.entityType,
      entity_id: input.entityId,
      actor_id: input.actorId,
      actor_email: input.actorEmail,
      event_payload: payload,
      immutable_hash: immutableHash
    })

  if (error) {
    console.error("AUDIT_WRITE_FAILED", error)
  }
}
