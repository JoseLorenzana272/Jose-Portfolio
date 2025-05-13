"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface GlitchTextProps {
  children: React.ReactNode
  className?: string
  intensity?: "low" | "medium" | "high"
}

export function GlitchText({ children, className, intensity = "medium" }: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(false)

  // Set glitch intensity parameters
  const glitchParams = {
    low: { interval: 5000, duration: 1000, probability: 0.3 },
    medium: { interval: 3000, duration: 1500, probability: 0.5 },
    high: { interval: 2000, duration: 2000, probability: 0.7 },
  }[intensity]

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      if (Math.random() < glitchParams.probability) {
        setIsGlitching(true)
        setTimeout(() => setIsGlitching(false), glitchParams.duration)
      }
    }, glitchParams.interval)

    return () => clearInterval(glitchInterval)
  }, [glitchParams])

  return (
    <span className={cn("relative inline-block", className)}>
      <span className={cn("relative z-10", isGlitching ? "opacity-90" : "opacity-100")}>{children}</span>

      {isGlitching && (
        <>
          <motion.span
            className="absolute left-0 top-0 text-[#ff2cf4] z-0"
            animate={{
              x: [0, -2, 1, -1, 0],
              opacity: [0, 1, 0.5, 1, 0],
            }}
            transition={{ duration: 0.5, repeat: 2 }}
          >
            {children}
          </motion.span>
          <motion.span
            className="absolute left-0 top-0 text-[#20f2ff] z-0"
            animate={{
              x: [0, 2, -1, 1, 0],
              opacity: [0, 0.5, 1, 0.5, 0],
            }}
            transition={{ duration: 0.5, repeat: 2 }}
          >
            {children}
          </motion.span>
        </>
      )}
    </span>
  )
}
