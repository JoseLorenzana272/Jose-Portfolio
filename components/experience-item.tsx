"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface ExperienceItemProps {
  title: string
  company: string
  period: string
  description: string
  color?: "cyan" | "pink"
}

export function ExperienceItem({ title, company, period, description, color = "cyan" }: ExperienceItemProps) {
  const colorStyles = {
    cyan: {
      border: "border-[#20f2ff]/20",
      hoverBorder: "hover:border-[#20f2ff]/50",
      title: "text-[#20f2ff]",
      badge: "bg-[#20f2ff]/10 border-[#20f2ff]/20 text-[#20f2ff]",
    },
    pink: {
      border: "border-[#ff2cf4]/20",
      hoverBorder: "hover:border-[#ff2cf4]/50",
      title: "text-[#ff2cf4]",
      badge: "bg-[#ff2cf4]/10 border-[#ff2cf4]/20 text-[#ff2cf4]",
    },
  }

  return (
    <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
      <Card
        className={cn(
          "bg-[#0a0a0f]/80 backdrop-blur-sm",
          colorStyles[color].border,
          colorStyles[color].hoverBorder,
          "transition-all duration-300 overflow-hidden",
        )}
      >
        <div className={cn("h-1 w-full", color === "cyan" ? "bg-[#20f2ff]" : "bg-[#ff2cf4]", "opacity-50")}></div>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
            <div>
              <h3 className={cn("text-xl font-semibold font-mono", colorStyles[color].title)}>{title}</h3>
              <p className="text-[#e0e0ff]/80 font-mono">{company}</p>
            </div>
            <div
              className={cn(
                "text-sm font-medium px-3 py-1 rounded-full self-start",
                colorStyles[color].badge,
                "font-mono",
              )}
            >
              {period}
            </div>
          </div>
          <p className="text-[#e0e0ff]/70">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  )
}
