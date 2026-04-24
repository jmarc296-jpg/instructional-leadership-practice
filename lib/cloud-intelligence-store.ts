import { supabase } from './supabase'

export type CloudIntelligenceSnapshot = {
  user_id?: string
  organization_id?: string
  cohort_id?: string
  card_id: string
  domain: string
  score: unknown
  insights: unknown
  profile: unknown
  consequences: unknown
  recommendation: unknown
}

export async function saveCloudIntelligenceSnapshot(
  snapshot: CloudIntelligenceSnapshot
) {
  if (!supabase) return { success: false, reason: 'Supabase not configured' }

  const { error } = await supabase
    .from('leadership_intelligence_snapshots')
    .insert({
      user_id: snapshot.user_id ?? null,
      organization_id: snapshot.organization_id ?? null,
      cohort_id: snapshot.cohort_id ?? null,
      card_id: snapshot.card_id,
      domain: snapshot.domain,
      score: snapshot.score,
      insights: snapshot.insights,
      profile: snapshot.profile,
      consequences: snapshot.consequences,
      recommendation: snapshot.recommendation
    })

  if (error) {
    return { success: false, reason: error.message }
  }

  return { success: true }
}

export async function getCloudIntelligenceSnapshots() {
  if (!supabase) return []

  const { data, error } = await supabase
    .from('leadership_intelligence_snapshots')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) return []

  return data ?? []
}
