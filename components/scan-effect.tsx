"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export function ScanEffect() {
  const [scanning, setScanning] = useState(false)

  useEffect(() => {
    // Start scanning effect after a delay
    const timer = setTimeout(() => {
      setScanning(true)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {scanning && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.5, 0],
            y: ["0%", "100%"],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            repeatDelay: 5,
          }}
          className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#20f2ff] to-transparent z-10 pointer-events-none"
        />
      )}
    </>
  )
}
