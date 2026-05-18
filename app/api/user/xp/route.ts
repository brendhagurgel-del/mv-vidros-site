import { NextResponse } from "next/server";

const BASE_XP = 7250;

function computeLevel(xp: number): number {
  return Math.floor(xp / 1000) + 1;
}

export async function POST(req: Request) {
  const body = await req.json();
  const { xpGained } = body as { eventType: string; xpGained: number; description: string };
  const totalXp = BASE_XP + (xpGained ?? 0);
  const newLevel = computeLevel(totalXp);
  return NextResponse.json({ success: true, totalXp, newLevel });
}
