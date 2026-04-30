import { supabase } from '@/lib/supabase/server'
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase/client";

export async function POST(req: Request) {
  const body = await req.json();

  const { data, error } = await supabase
    .from("district_risk_data")
    .insert(body.records);

  if (error) {
    return NextResponse.json({
      error: error.message
    });
  }

  return NextResponse.json({
    success: true,
    data
  });
}

