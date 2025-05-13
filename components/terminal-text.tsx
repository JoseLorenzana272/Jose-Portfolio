"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface TerminalTextProps {
  onComplete?: () => void
  className?: string
}

export function TerminalText({ onComplete, className }: TerminalTextProps) {
  const [text, setText] = useState("")
  const [currentLine, setCurrentLine] = useState(0)
  const [cursorVisible, setCursorVisible] = useState(true)

  const lines = [
    "$ initializing system...",
    "$ loading modules...",
    "$ establishing connection...",
    "$ decrypting portfolio data...",
    "$ rendering interface...",
    "$ system ready. welcome to jose's portfolio.",
  ]

  useEffect(() => {
    // Cursor blinking effect
    const cursorInterval = setInterval(() => {
      setCursorVisible((prev) => !prev)
    }, 500)

    // Typing effect
    let timeout: NodeJS.Timeout

    if (currentLine < lines.length) {
      const line = lines[currentLine]
      const typingSpeed = 50 // ms per character

      if (text.length < line.length) {
        timeout = setTimeout(() => {
          setText(line.substring(0, text.length + 1))
        }, typingSpeed)
      } else {
        timeout = setTimeout(() => {
          setText("")
          setCurrentLine((prev) => prev + 1)
        }, 1000)
      }
    } else if (onComplete) {
      timeout = setTimeout(() => {
        onComplete()
      }, 1000)
    }

    return () => {
      clearInterval(cursorInterval)
      clearTimeout(timeout)
    }
  }, [text, currentLine, lines, onComplete])

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-mono text-sm md:text-base">
      <div className="bg-[#0a0a0f] border border-[#20f2ff]/30 rounded-lg p-4 overflow-hidden">
        <div className="flex items-center gap-2 mb-4 border-b border-[#20f2ff]/20 pb-2">
          <div className="w-3 h-3 rounded-full bg-[#ff2cf4]/70"></div>
          <div className="w-3 h-3 rounded-full bg-[#fffa2c]/70"></div>
          <div className="w-3 h-3 rounded-full bg-[#20f2ff]/70"></div>
          <span className="text-[#e0e0ff]/50 text-xs ml-2">terminal@jose</span>
        </div>

        <div className="h-60 overflow-y-auto">
          {lines.slice(0, currentLine).map((line, index) => (
            <div key={index} className={cn("mb-2", className)}>
              {line}
            </div>
          ))}

          <div className={cn("flex", className)}>
            <span>{text}</span>
            <span className={cursorVisible ? "opacity-100" : "opacity-0"}>_</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
