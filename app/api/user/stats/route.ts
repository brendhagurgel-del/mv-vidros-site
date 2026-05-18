import { NextResponse } from "next/server";

export async function GET(_req: Request) {
  return NextResponse.json({
    xp: 7250,
    level: 9,
    xpForNextLevel: 10000,
    potencia: 73,
    leadsToday: 84,
    leadsLimit: 150,
  });
}
