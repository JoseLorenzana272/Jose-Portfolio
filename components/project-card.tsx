"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowUpRight, Star } from "lucide-react"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface ProjectCardProps {
  title: string
  description: string
  tags: string[]
  imageUrl: string
  projectUrl?: string
  featured?: boolean
  future_project?: boolean
  color?: "cyan" | "pink"
}

export function ProjectCard({
  title,
  description,
  tags,
  imageUrl,
  projectUrl,
  featured = false,
  future_project = false,
  color = "cyan",
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const colorStyles = {
    cyan: {
      border: "border-[#20f2ff]/20",
      hoverBorder: "group-hover:border-[#20f2ff]/50",
      badge: "bg-[#20f2ff]/10 border-[#20f2ff]/20 text-[#20f2ff]",
      title: "group-hover:text-[#20f2ff]",
      overlay: "from-[#20f2ff]/10 to-transparent",
      icon: "text-[#20f2ff]",
    },
    pink: {
      border: "border-[#ff2cf4]/20",
      hoverBorder: "group-hover:border-[#ff2cf4]/50",
      badge: "bg-[#ff2cf4]/10 border-[#ff2cf4]/20 text-[#ff2cf4]",
      title: "group-hover:text-[#ff2cf4]",
      overlay: "from-[#ff2cf4]/10 to-transparent",
      icon: "text-[#ff2cf4]",
    },
  }

const Wrapper: React.ElementType = projectUrl ? 'a' : 'div'


  return (
    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.3 }} className="h-full">
      <Wrapper
        href={projectUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full"
        onClick={(e) => {
          console.log("Card clicked!", projectUrl);
          // Ensure default behavior isn't prevented
          if (projectUrl) {
            window.open(projectUrl, '_blank', 'noopener,noreferrer');
          }
        }}
      >
        <Card
          className={cn(
            "overflow-hidden bg-[#0a0a0f]/80 backdrop-blur-sm group h-full",
            colorStyles[color].border,
            colorStyles[color].hoverBorder,
            "transition-all duration-300",
            "cursor-pointer"
          )}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Rest of your card content remains exactly the same */}
          <div className="aspect-video overflow-hidden relative">
            {featured && (
              <div className="absolute top-2 right-2 z-10 bg-[#0a0a0f]/80 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1 border border-[#e0e0ff]/10">
                <Star className="h-3 w-3 text-[#e0e0ff] fill-[#e0e0ff]" />
                <span className="text-xs font-mono text-[#e0e0ff]">Featured</span>
              </div>
            )}
            {future_project && (
              <div className="absolute top-2 left-2 z-10 bg-[#0a0a0f]/80 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1 border border-[#e0e0ff]/10">
                <span className="text-xs font-mono text-[#e0e0ff]">Future Project</span>
              </div>
            )}
            <div className={cn("absolute inset-0 bg-gradient-to-t", colorStyles[color].overlay, "opacity-60 z-10")}></div>
            <motion.img
              src={imageUrl || "/placeholder.svg"}
              alt={title}
              className="object-cover w-full h-full"
              animate={{ scale: isHovered ? 1.05 : 1 }}
              transition={{ duration: 0.5 }}
            />
            <motion.div
              className={cn(
                "absolute inset-0 bg-gradient-to-r",
                color === "cyan" ? "from-[#20f2ff]/10 to-transparent" : "from-[#ff2cf4]/10 to-transparent",
                "z-0 opacity-0",
              )}
              animate={{ opacity: isHovered ? 0.5 : 0 }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <div className="p-5">
            <div className="flex items-center justify-between mb-2">
              <h3
                className={cn(
                  "text-xl font-semibold font-mono text-[#e0e0ff]",
                  colorStyles[color].title,
                  "transition-colors duration-300",
                )}
              >
                {title}
              </h3>
              <div className={cn(colorStyles[color].icon)}>
                <ArrowUpRight className="h-5 w-5" />
                <span className="sr-only">View project on GitHub</span>
              </div>
            </div>
            <p className="text-[#e0e0ff]/70 mb-4 text-sm">{description}</p>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className={cn(
                    "bg-[#0a0a0f]/80 text-[#e0e0ff]/70 border-[#e0e0ff]/20 hover:bg-[#0a0a0f]",
                    "text-xs font-mono",
                  )}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </Card>
      </Wrapper>
    </motion.div>
  )
}