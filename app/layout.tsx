import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "LeadMachine AI — Oportunidades locais. Vendas reais.",
  description:
    "SaaS de prospecção local com IA. Encontre, analise e converta leads com inteligência artificial.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className="dark">
      <body className="bg-[#0D0D0D] text-white antialiased">{children}</body>
    </html>
  )
}
