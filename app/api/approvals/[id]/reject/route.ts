import { NextResponse } from "next/server";

export async function PUT(
  _req: Request,
  { params }: { params: { id: string } }
) {
  void params.id;
  return NextResponse.json({ success: true });
}
