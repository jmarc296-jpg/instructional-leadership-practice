import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase/client";

export async function GET() {
  const { data, error } = await supabase
    .from("district_risk_data")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({
      error: error.message
    });
  }

  return NextResponse.json({
    records: data
  });
}
