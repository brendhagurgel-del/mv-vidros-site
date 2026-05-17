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
      colors: {
        yellow: {
          300: "#FFE033",
          400: "#FFD400",
          500: "#FFB800",
        },
        blue: {
          300: "#33C4FF",
          400: "#00B2FF",
          500: "#0088CC",
          dark: "#0088CC",
        },
        dark: {
          base: "#0D0D0D",
          card: "#1A1A1A",
          "card-hover": "#222222",
          sidebar: "#111111",
        },
        border: {
          DEFAULT: "#2A2A2A",
          yellow: "#FFD400",
          blue: "#00B2FF",
        },
        rarity: {
          lendario: "#FFD400",
          raro: "#00B2FF",
          comum: "#555555",
          baixo: "#333333",
        },
      },
      fontFamily: {
        pixel: ["PixelCraft", "monospace"],
        display: ["Rajdhani", "sans-serif"],
        body: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      animation: {
        "pixel-fly": "pixelFly 0.8s ease-out forwards",
        "pulse-yellow": "pulseYellow 2s ease-in-out infinite",
        blink: "blink 1s step-end infinite",
        "slide-in": "slideIn 0.3s ease-out",
        "counter-up": "counterUp 0.6s ease-out",
        "spin-slow": "spin 8s linear infinite",
        "fade-in": "fadeIn 0.4s ease-out",
        "scale-in": "scaleIn 0.2s ease-out",
      },
      keyframes: {
        pixelFly: {
          "0%": { transform: "translateX(0) translateY(0)", opacity: "1" },
          "100%": {
            transform: "translateX(80px) translateY(-20px)",
            opacity: "0",
          },
        },
        pulseYellow: {
          "0%,100%": { boxShadow: "0 0 5px rgba(255,212,0,0.2)" },
          "50%": { boxShadow: "0 0 25px rgba(255,212,0,0.6)" },
        },
        blink: {
          "0%,100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        slideIn: {
          "0%": { transform: "translateX(100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        counterUp: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.9)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
      boxShadow: {
        "glow-yellow": "0 0 20px rgba(255,212,0,0.2)",
        "glow-yellow-lg": "0 0 40px rgba(255,212,0,0.35)",
        "glow-blue": "0 0 20px rgba(0,178,255,0.2)",
        "glow-blue-lg": "0 0 40px rgba(0,178,255,0.35)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config
