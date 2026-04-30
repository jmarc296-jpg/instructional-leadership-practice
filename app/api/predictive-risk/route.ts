import { supabase } from '@/lib/supabase/server'
import { NextResponse } from "next/server";

function predictFutureRisk(score: number) {
  if (score >= 80) {
    return {
      projectedRisk: "Critical Escalation Likely",
      probability: "91%"
    };
  }

  if (score >= 60) {
    return {
      projectedRisk: "High Risk Escalation",
      probability: "74%"
    };
  }

  if (score >= 40) {
    return {
      projectedRisk: "Moderate Risk Drift",
      probability: "52%"
    };
  }

  return {
    projectedRisk: "Stable",
    probability: "18%"
  };
}

export async function GET() {
  const { data } = await supabase
    .from("district_risk_data")
    .select("*");

  const predictions =
    data?.map((school: any) => ({
      school: school.school_name,
      currentRisk: school.risk_score,
      ...predictFutureRisk(school.risk_score)
    })) || [];

  return NextResponse.json({
    predictions
  });
}


