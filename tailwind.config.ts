import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["Barlow Condensed", "sans-serif"],
        body:    ["Barlow", "sans-serif"],
        mono:    ["JetBrains Mono", "monospace"],
      },
      colors: {
        yellow:  { DEFAULT: "#FFD400", 2: "#FFC800" },
        blue:    { DEFAULT: "#00AFFF", 2: "#0088CC" },
        green:   { DEFAULT: "#12D36B" },
        orange:  { DEFAULT: "#FF6B00" },
        red:     { DEFAULT: "#E03535" },
        dark: {
          base:    "#080808",
          card:    "#111111",
          card2:   "#161616",
          sidebar: "#0D0D0D",
        },
        border: {
          dim:    "#1A1A1A",
          tech:   "#252525",
          active: "#2A2A2A",
        },
      },
      borderRadius: { none: "0px", DEFAULT: "0px", sm: "0px", md: "0px", lg: "0px", xl: "0px", full: "9999px" },
      animation: {
        blink:    "blink 1.4s ease-in-out infinite",
        pulseDot: "pulse-dot 2s ease-in-out infinite",
        slideIn:  "slideIn 0.25s ease-out",
        fadeIn:   "fadeIn 0.3s ease-out",
      },
      keyframes: {
        blink:    { "0%,100%": { opacity: "1" }, "50%": { opacity: "0.2" } },
        "pulse-dot": { "0%,100%": { opacity: "1", transform: "scale(1)" }, "50%": { opacity: "0.6", transform: "scale(0.85)" } },
        slideIn:  { "0%": { transform: "translateX(16px)", opacity: "0" }, "100%": { transform: "translateX(0)", opacity: "1" } },
        fadeIn:   { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
      },
      boxShadow: {
        "glow-yellow": "0 0 20px rgba(255,212,0,0.15)",
        "glow-blue":   "0 0 20px rgba(0,175,255,0.12)",
        "glow-green":  "0 0 20px rgba(18,211,107,0.12)",
      },
    },
  },
  plugins: [],
}

export default config
