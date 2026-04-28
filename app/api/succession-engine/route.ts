import { NextResponse } from "next/server";
import { calculateReadiness } from "@/lib/succession/calculateReadiness";

export async function POST(req: Request) {
  const body = await req.json();

  const result = calculateReadiness(body);

  return NextResponse.json(result);
}
