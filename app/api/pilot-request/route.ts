import { supabase } from '@/lib/supabase/server'
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const { data, error } = await supabase
    .from("pilot_requests")
    .insert([body]);

  if (error) {
    return NextResponse.json({ error: error.message });
  }

  return NextResponse.json({ success: true });
}


