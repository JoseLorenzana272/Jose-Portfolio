"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export function Cursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isPointer, setIsPointer] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })

      const target = e.target as HTMLElement
      setIsPointer(window.getComputedStyle(target).cursor === "pointer")
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 rounded-full border-2 border-cyan-400 z-50 pointer-events-none mix-blend-difference"
        animate={{
          x: position.x - 12,
          y: position.y - 12,
          scale: isPointer ? 1.5 : 1,
        }}
        transition={{ type: "spring", mass: 0.1, stiffness: 500, damping: 20, restDelta: 0.1 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-purple-400 z-50 pointer-events-none mix-blend-difference"
        animate={{
          x: position.x - 4,
          y: position.y - 4,
        }}
        transition={{ type: "spring", mass: 0.05, stiffness: 250, damping: 15 }}
      />
    </>
  )
}
