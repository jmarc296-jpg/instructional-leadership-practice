import { supabase } from '@/lib/supabase/server'
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase/client";

function determineAction(score: number) {
  if (score >= 80) return "Executive Intervention";
  if (score >= 60) return "Principal Coaching Sprint";
  if (score >= 40) return "Targeted Monitoring";
  return "Maintain Systems";
}

export async function GET() {
  const { data } = await supabase
    .from("district_risk_data")
    .select("*");

  const alerts =
    data?.filter((school: any) => school.risk_score >= 60)
      .map((school: any) => ({
        school: school.school_name,
        risk: school.risk_score,
        action: determineAction(school.risk_score)
      })) || [];

  return NextResponse.json({
    weeklyAlerts: alerts
  });
}

