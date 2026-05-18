"use client"

import { useState } from "react"
import Link from "next/link"
import { LMLogoFull } from "@/components/ui/lm-logo"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
  }

  return (
    <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Card with pixel corners */}
        <div className="relative border border-[#1E1E1E] bg-[#0A0A0A] p-8">
          {/* Pixel corners */}
          <span className="pointer-events-none absolute left-0 top-0 h-3 w-3 border-l-2 border-t-2 border-[#FFD400]" />
          <span className="pointer-events-none absolute right-0 top-0 h-3 w-3 border-r-2 border-t-2 border-[#FFD400]" />
          <span className="pointer-events-none absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2 border-[#FFD400]" />
          <span className="pointer-events-none absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2 border-[#FFD400]" />

          {/* Logo */}
          <div className="mb-6 flex justify-center">
            <LMLogoFull size="md" />
          </div>

          {/* Title */}
          <h1
            className="text-center text-xl font-bold tracking-widest text-white uppercase mb-1"
            style={{ fontFamily: "var(--font-display, Rajdhani, sans-serif)" }}
          >
            ENTRAR NA MÁQUINA
          </h1>

          {/* Subtitle */}
          <p
            className="text-center text-[12px] text-[#666] mb-6"
            style={{ fontFamily: "var(--font-body, Inter, sans-serif)" }}
          >
            Acesse sua plataforma de prospecção com IA
          </p>

          {/* Google button */}
          <button
            type="button"
            className="w-full flex items-center justify-center gap-2.5 bg-white text-black font-bold text-sm py-2.5 px-4 mb-4 hover:bg-gray-100 transition-colors"
            style={{ fontFamily: "var(--font-body, Inter, sans-serif)" }}
          >
            {/* Google G icon */}
            <span
              className="text-base font-bold"
              style={{
                background:
                  "linear-gradient(to bottom right, #4285F4 25%, #34A853 25% 50%, #FBBC05 50% 75%, #EA4335 75%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              G
            </span>
            Entrar com Google
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-4">
            <span className="flex-1 h-px bg-[#2A2A2A]" />
            <span
              className="text-[11px] text-[#555]"
              style={{ fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)" }}
            >
              ou
            </span>
            <span className="flex-1 h-px bg-[#2A2A2A]" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#0D0D0D] border border-[#2A2A2A] text-white text-sm px-3 py-2.5 outline-none focus:border-[#FFD400] transition-colors placeholder:text-[#444]"
              style={{ fontFamily: "var(--font-body, Inter, sans-serif)" }}
            />
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#0D0D0D] border border-[#2A2A2A] text-white text-sm px-3 py-2.5 outline-none focus:border-[#FFD400] transition-colors placeholder:text-[#444]"
              style={{ fontFamily: "var(--font-body, Inter, sans-serif)" }}
            />

            <button
              type="submit"
              className="w-full bg-[#FFD400] text-black font-bold text-sm py-2.5 px-4 mt-1 hover:bg-[#F0C800] transition-colors tracking-widest"
              style={{ fontFamily: "var(--font-display, Rajdhani, sans-serif)" }}
            >
              ACESSAR →
            </button>
          </form>

          {/* Create account link */}
          <p
            className="text-center text-[11px] text-[#555] mt-4"
            style={{ fontFamily: "var(--font-body, Inter, sans-serif)" }}
          >
            Não tem conta?{" "}
            <Link
              href="/cadastro"
              className="text-[#FFD400] hover:underline"
            >
              Criar conta gratuita
            </Link>
          </p>
        </div>

        {/* Bottom text */}
        <p
          className="text-center text-[11px] text-[#444] mt-5"
          style={{ fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)" }}
        >
          Suas oportunidades locais estão esperando.
        </p>
      </div>
    </div>
  )
}
