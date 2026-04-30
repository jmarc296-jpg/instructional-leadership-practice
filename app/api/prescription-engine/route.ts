import { NextResponse } from "next/server";
import { generatePrescription } from "@/lib/prescriptions/generatePrescription";

export async function POST(req: Request) {
  const body = await req.json();

  const result = generatePrescription(body.risk);

  return NextResponse.json(result);
}

