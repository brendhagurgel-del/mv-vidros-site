import { NextResponse } from "next/server";

export async function POST(
  _req: Request,
  { params }: { params: { id: string } }
) {
  void params.id;
  return NextResponse.json({
    success: true,
    message:
      "Olá! Vi que vocês têm um ótimo trabalho com vidros e esquadrias na região. Percebi que seu site tem muito potencial, mas alguns ajustes simples poderiam trazer muito mais clientes pelo celular. Tenho uma análise gratuita pronta para vocês — posso compartilhar?",
    xpGained: 10,
  });
}
