"use client"

import { useState } from "react"
import { clsx } from "clsx"
import { Bell, Search, ChevronDown, Calendar, User } from "lucide-react"

interface HeaderProps {
  title: string
  subtitle?: string
}

export function Header({ title, subtitle }: HeaderProps) {
  const [searchFocused, setSearchFocused] = useState(false)

  return (
    <header className="h-14 bg-[#0D0D0D] border-b border-[#1E1E1E] flex items-center px-5 gap-4 shrink-0">
      {/* Page title */}
      <div className="flex items-center gap-2 min-w-0 mr-auto">
        <h1 className="font-display font-bold text-white text-xl leading-none uppercase tracking-wide">
          {title}
        </h1>
        {/* Animated blue pixel dots */}
        <span
          className="text-[#00B2FF] font-mono text-xs tracking-widest leading-none"
          aria-hidden="true"
        >
          ·:·
        </span>
        {subtitle && (
          <span className="text-[10px] font-mono text-[#555555] hidden md:block">
            {subtitle}
          </span>
        )}
      </div>

      {/* Search */}
      <div
        className={clsx(
          "hidden md:flex items-center gap-2 border px-3 py-1.5 transition-colors duration-100 w-52",
          searchFocused
            ? "border-[#FFD400]/40 bg-[#111111]"
            : "border-[#1E1E1E] bg-[#111111] hover:border-[#2A2A2A]"
        )}
      >
        <Search size={11} className="text-[#555555] flex-shrink-0" />
        <input
          type="text"
          placeholder="Buscar leads, empresas..."
          className="bg-transparent text-[11px] font-body text-white flex-1 outline-none placeholder:text-[#444444]"
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
        />
      </div>

      {/* Date picker */}
      <button
        className={clsx(
          "hidden sm:flex items-center gap-2 px-3 py-1.5",
          "border border-[#1E1E1E] bg-[#111111]",
          "hover:border-[#2A2A2A] transition-colors"
        )}
      >
        <Calendar size={11} className="text-[#FFD400]" />
        <span className="text-[11px] font-display font-bold text-white whitespace-nowrap">
          Hoje, 14 de Mai
        </span>
        <ChevronDown size={10} className="text-[#555555]" />
      </button>

      {/* Notifications */}
      <button
        className={clsx(
          "relative w-8 h-8 flex items-center justify-center flex-shrink-0",
          "border border-[#1E1E1E] bg-[#111111]",
          "text-[#888888] hover:text-white hover:border-[#2A2A2A] transition-colors"
        )}
        aria-label="Notificações"
      >
        <Bell size={13} />
        <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-[#FFD400]" />
      </button>

      {/* User */}
      <button
        className={clsx(
          "flex items-center gap-2.5 px-2.5 py-1.5 flex-shrink-0",
          "border border-[#1E1E1E] bg-[#111111]",
          "hover:border-[#2A2A2A] transition-colors"
        )}
      >
        {/* Avatar */}
        <div className="w-6 h-6 bg-[#333333] border border-[#3A3A3A] flex items-center justify-center overflow-hidden">
          <User size={12} className="text-[#888888]" />
        </div>
        <div className="hidden sm:flex flex-col items-start leading-none gap-0.5">
          <span className="text-[11px] font-display font-bold text-white">
            João Silva
          </span>
          <span className="text-[9px] font-mono text-[#888888]">Admin</span>
        </div>
        <ChevronDown size={10} className="text-[#555555]" />
      </button>
    </header>
  )
}
