"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface Skill {
  name: string
  level: number
}

interface SkillItemProps {
  title: string
  description: string
  skills: Skill[]
  color?: "cyan" | "pink"
}

export function SkillItem({ title, description, skills, color = "cyan" }: SkillItemProps) {
  const colorStyles = {
    cyan: {
      border: "border-[#20f2ff]/20",
      hoverBorder: "hover:border-[#20f2ff]/50",
      title: "text-[#20f2ff]",
      bar: "bg-[#20f2ff]",
      barBg: "bg-[#20f2ff]/10",
    },
    pink: {
      border: "border-[#ff2cf4]/20",
      hoverBorder: "hover:border-[#ff2cf4]/50",
      title: "text-[#ff2cf4]",
      bar: "bg-[#ff2cf4]",
      barBg: "bg-[#ff2cf4]/10",
    },
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "bg-[#0a0a0f]/80 backdrop-blur-sm border rounded-lg p-6",
        colorStyles[color].border,
        colorStyles[color].hoverBorder,
        "transition-all duration-300",
      )}
    >
      <h3 className={cn("text-xl font-semibold mb-2 font-mono", colorStyles[color].title)}>{title}</h3>
      <p className="text-[#e0e0ff]/70 mb-6 text-sm">{description}</p>

      <div className="space-y-4">
        {skills.map((skill) => (
          <div key={skill.name} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-[#e0e0ff]/80 text-sm font-mono">{skill.name}</span>
              <span className="text-[#e0e0ff]/60 text-xs font-mono">{skill.level}%</span>
            </div>
            <div className={cn("h-1.5 w-full rounded-full overflow-hidden", colorStyles[color].barBg)}>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.level}%` }}
                transition={{ duration: 1, delay: 0.2 }}
                viewport={{ once: true }}
                className={cn("h-full rounded-full", colorStyles[color].bar)}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
