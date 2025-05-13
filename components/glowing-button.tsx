"use client"

import { forwardRef } from "react"
import { motion } from "framer-motion"
import { Button, type ButtonProps } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export const GlowingButton = forwardRef<HTMLButtonElement, ButtonProps>(({ className, children, ...props }, ref) => {
  return (
    <div className="relative group">
      <motion.div
        className="absolute -inset-1 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-600 opacity-70 blur-lg group-hover:opacity-100 transition duration-1000 group-hover:duration-200"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />
      <Button
        ref={ref}
        className={cn("relative bg-black text-white border-0 z-10 overflow-hidden", className)}
        {...props}
      >
        <span className="relative z-10">{children}</span>
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ mixBlendMode: "overlay" }}
        />
      </Button>
    </div>
  )
})
GlowingButton.displayName = "GlowingButton"
