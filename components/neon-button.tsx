"use client"

import { forwardRef } from "react"
import { motion } from "framer-motion"
import { Button, type ButtonProps } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface NeonButtonProps extends ButtonProps {
  color?: "cyan" | "pink"
}

export const NeonButton = forwardRef<HTMLButtonElement, NeonButtonProps>(
  ({ className, children, color = "cyan", ...props }, ref) => {
    const colorStyles = {
      cyan: {
        glow: "from-[#20f2ff] to-[#20f2ff]",
        text: "text-[#20f2ff]",
        border: "border-[#20f2ff]",
        shadow: "shadow-[0_0_15px_rgba(32,242,255,0.5)]",
        hover: "hover:bg-[#20f2ff]/10",
      },
      pink: {
        glow: "from-[#ff2cf4] to-[#ff2cf4]",
        text: "text-[#ff2cf4]",
        border: "border-[#ff2cf4]",
        shadow: "shadow-[0_0_15px_rgba(255,44,244,0.5)]",
        hover: "hover:bg-[#ff2cf4]/10",
      },
    }

    return (
      <div className="relative group">
        <motion.div
          className={cn(
            "absolute -inset-0.5 rounded-md bg-gradient-to-r opacity-70 blur-sm group-hover:opacity-100 transition duration-1000 group-hover:duration-200",
            colorStyles[color].glow,
          )}
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
          variant="outline"
          className={cn(
            "relative bg-[#0a0a0f] border z-10",
            colorStyles[color].text,
            colorStyles[color].border,
            colorStyles[color].hover,
            "transition-all duration-300 font-mono",
            className,
          )}
          {...props}
        >
          <span className="relative z-10">{children}</span>
        </Button>
      </div>
    )
  },
)
NeonButton.displayName = "NeonButton"
