"use client"

import { motion } from "framer-motion"

interface SkillBadgeProps {
  name: string
}

export function SkillBadge({ name }: SkillBadgeProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-gradient-to-r from-purple-500/20 to-cyan-500/20 text-white hover:from-purple-500/30 hover:to-cyan-500/30 border border-white/10"
    >
      {name}
    </motion.div>
  )
}
