import { NextResponse } from "next/server";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  try {
    const supabase = getSupabaseAdminClient();

    if (!supabase) {
      return NextResponse.json(
        {
          ok: false,
          error: "Supabase admin client unavailable.",
        },
        { status: 500 }
      );
    }

    const body = await request.json();

    const {
      signalId,
      lifecycleStage,
      escalationLevel,
      executiveOwner,
      actionSummary,
      evidenceReference,
      rationale,
      immutableHash,
    } = body;

    const payload = {
      signal_id: signalId,
      lifecycle_stage: lifecycleStage,
      escalation_level: escalationLevel,
      executive_owner: executiveOwner,
      action_summary: actionSummary,
      evidence_reference: evidenceReference,
      rationale,
      immutable_hash: immutableHash,
      created_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from("immutable_executive_records")
      .insert(payload)
      .select("*")
      .single();

    if (error) {
      console.error(
        "[immutable-executive-records][POST]",
        error
      );

      return NextResponse.json(
        {
          ok: false,
          error: "Unable to persist immutable executive record.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      source: "supabase",
      record: data,
    });
  } catch (error) {
    console.error(
      "[immutable-executive-records][route]",
      error
    );

    return NextResponse.json(
      {
        ok: false,
        error: "Immutable executive records route failed.",
      },
      { status: 500 }
    );
  }
}
