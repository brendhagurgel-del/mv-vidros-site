import { NextResponse } from "next/server";

function generateChartData() {
  const data = [];
  const base = new Date("2026-04-18");
  for (let i = 0; i < 30; i++) {
    const d = new Date(base);
    d.setDate(base.getDate() + i);
    data.push({
      date: d.toISOString().split("T")[0],
      leads: Math.floor(30 + Math.random() * 60),
      conversions: Math.floor(5 + Math.random() * 20),
    });
  }
  return data;
}

export async function GET(_req: Request) {
  return NextResponse.json({
    totalLeads: 1248,
    hotLeads: 323,
    mediumLeads: 541,
    coldLeads: 384,
    activeCampaigns: 12,
    pendingMessages: 47,
    trends: {
      totalLeads: 18,
      hotLeads: 24,
      mediumLeads: 12,
      coldLeads: -5,
      activeCampaigns: 8,
      pendingMessages: 15,
    },
    chartData: generateChartData(),
  });
}
