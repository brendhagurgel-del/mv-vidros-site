import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const body = await req.json();
  const updated = {
    id: params.id,
    ...body,
    updatedAt: new Date().toISOString(),
  };
  return NextResponse.json({ campaign: updated });
}
