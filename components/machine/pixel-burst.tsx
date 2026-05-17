"use client"

import { useEffect, useRef, useState } from "react"
import dynamic from "next/dynamic"

const MotionDiv = dynamic(
  () => import("framer-motion").then((m) => m.motion.div),
  { ssr: false }
)

const AnimatePresenceDyn = dynamic(
  () => import("framer-motion").then((m) => m.AnimatePresence),
  { ssr: false }
)

interface Particle {
  id: number
  x: number
  y: number
  color: string
}

interface PixelBurstProps {
  active: boolean
  onComplete?: () => void
  count?: number
  className?: string
}

export function PixelBurst({ active, onComplete, count = 12, className }: PixelBurstProps) {
  const [particles, setParticles] = useState<Particle[]>([])
  const hasTriggered = useRef(false)

  useEffect(() => {
    if (active && !hasTriggered.current) {
      hasTriggered.current = true
      const newParticles: Particle[] = Array.from({ length: count }, (_, i) => ({
        id: i,
        x: (Math.random() - 0.5) * 140,
        y: (Math.random() - 0.5) * 100,
        color: i % 3 === 0 ? "#FFD400" : i % 3 === 1 ? "#00B2FF" : "#FFFFFF",
      }))
      setParticles(newParticles)
      const t = setTimeout(() => {
        setParticles([])
        hasTriggered.current = false
        onComplete?.()
      }, 900)
      return () => clearTimeout(t)
    }
    if (!active) hasTriggered.current = false
  }, [active, count, onComplete])

  if (!AnimatePresenceDyn || !MotionDiv) return null

  return (
    <AnimatePresenceDyn>
      {particles.map((p) => (
        <MotionDiv
          key={p.id}
          className={`absolute w-1.5 h-1.5 pointer-events-none rounded-none ${className ?? ""}`}
          style={{ backgroundColor: p.color }}
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{ x: p.x, y: p.y, opacity: 0, scale: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, delay: p.id * 0.04, ease: "easeOut" }}
          aria-hidden="true"
        />
      ))}
    </AnimatePresenceDyn>
  )
}
