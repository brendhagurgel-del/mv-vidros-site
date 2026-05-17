interface LMLogoIconProps {
  size?: number
  className?: string
}

/** Pixel-art LM Machine icon — simplified SVG approximation of the brand mascot */
export function LMLogoIcon({ size = 40, className }: LMLogoIconProps) {
  return (
    <svg
      width={size}
      height={size * 0.75}
      viewBox="0 0 64 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Body */}
      <rect x="4" y="10" width="28" height="26" fill="#FFD400" />
      <rect x="3" y="9" width="30" height="28" stroke="#000" strokeWidth="2" fill="none" />

      {/* Handle top */}
      <rect x="10" y="4" width="16" height="7" fill="#FFD400" stroke="#000" strokeWidth="1.5" />

      {/* Blue indicator bars */}
      <rect x="5" y="20" width="6" height="2" fill="#00B2FF" />
      <rect x="5" y="24" width="6" height="2" fill="#00B2FF" />

      {/* LM text on body */}
      <text x="11" y="28" fontFamily="monospace" fontWeight="900" fontSize="11" fill="#000" letterSpacing="-0.5">
        LM
      </text>

      {/* Barrel rings */}
      <rect x="32" y="16" width="6" height="16" fill="#FFD400" stroke="#000" strokeWidth="1.5" />
      <rect x="38" y="17" width="5" height="14" fill="#FFD400" stroke="#000" strokeWidth="1.5" />
      <rect x="43" y="18" width="5" height="12" fill="#FFD400" stroke="#000" strokeWidth="1.5" />
      {/* Lens front */}
      <circle cx="51" cy="24" r="5" fill="#111" stroke="#FFD400" strokeWidth="1.5" />
      <circle cx="51" cy="24" r="2.5" fill="#222" />

      {/* Pixel particles */}
      <rect x="58" y="18" width="3" height="3" fill="#FFD400" />
      <rect x="62" y="22" width="2" height="2" fill="#00B2FF" />
      <rect x="57" y="26" width="2" height="2" fill="#00B2FF" />
      <rect x="61" y="16" width="2" height="2" fill="#FFD400" />

      {/* Tracks */}
      <rect x="4" y="36" width="28" height="6" rx="1" fill="#222" stroke="#000" strokeWidth="1.5" />
      <rect x="6" y="37" width="4" height="4" rx="2" fill="#444" />
      <rect x="12" y="37" width="4" height="4" rx="2" fill="#444" />
      <rect x="18" y="37" width="4" height="4" rx="2" fill="#444" />
      <rect x="24" y="37" width="4" height="4" rx="2" fill="#444" />
    </svg>
  )
}

interface LMLogoFullProps {
  size?: "sm" | "md" | "lg"
}

/** Full LeadMachine AI wordmark with tagline */
export function LMLogoFull({ size = "md" }: LMLogoFullProps) {
  const scale = size === "sm" ? 0.7 : size === "lg" ? 1.3 : 1

  return (
    <div style={{ transform: `scale(${scale})`, transformOrigin: "top left" }}>
      <div className="flex items-baseline gap-0.5 leading-none">
        <span className="font-display font-bold text-[22px] text-[#FFD400] leading-none">
          Lead
        </span>
        <span className="font-display font-bold text-[22px] text-white leading-none">
          Machine
        </span>
        <span className="font-display font-bold text-[14px] text-[#00B2FF] leading-none ml-1">
          =AI
        </span>
      </div>
      <div className="flex items-center gap-0.5 mt-1">
        <span className="text-[#FFD400] font-mono text-[9px]">[·+·——</span>
        <span className="text-[#888888] font-body text-[9px]">Oportunidades locais.</span>
        <span className="text-[#FFD400] font-body text-[9px] font-bold">Vendas reais.</span>
        <span className="text-[#FFD400] font-mono text-[9px]">——·+·]</span>
      </div>
    </div>
  )
}
