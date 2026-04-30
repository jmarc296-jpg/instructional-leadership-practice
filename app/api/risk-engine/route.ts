import { NextResponse } from "next/server";
import { calculatePrincipalRisk } from "@/lib/risk/principalRiskScorer";

export async function POST(req: Request) {
  const body = await req.json();

  const result = calculatePrincipalRisk(body);

  return NextResponse.json(result);
}


