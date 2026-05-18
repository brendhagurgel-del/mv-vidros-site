import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  void params.id;
  const body = await req.json();
  void (body as { note: string }).note;
  return NextResponse.json({ success: true });
}
