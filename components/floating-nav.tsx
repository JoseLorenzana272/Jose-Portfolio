"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Github, Linkedin, Mail } from "lucide-react"

export function FloatingNav() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShow(true)
      } else {
        setShow(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50"
        >
          <div className="flex items-center gap-1 bg-black/80 backdrop-blur-md border border-white/10 rounded-full p-1.5 shadow-lg">
            {["About", "Projects", "Skills", "Experience", "Contact"].map((item) => (
              <Link
                key={item}
                href={`#${item.toLowerCase()}`}
                className="px-3 py-1.5 text-sm font-medium text-white/70 hover:text-white rounded-full hover:bg-white/10 transition-colors"
              >
                {item}
              </Link>
            ))}

            <div className="h-6 w-px bg-white/20 mx-1"></div>

            <a
              href="https://github.com/JoseLorenzana272"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-white/70 hover:text-white rounded-full hover:bg-white/10 transition-colors"
            >
              <Github className="h-4 w-4" />
              <span className="sr-only">GitHub</span>
            </a>
            <a
              href="https://linkedin.com/in/josé-lorenzana-37948531a/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-white/70 hover:text-white rounded-full hover:bg-white/10 transition-colors"
            >
              <Linkedin className="h-4 w-4" />
              <span className="sr-only">LinkedIn</span>
            </a>
            <a
              href="mailto:jodanielorenzana@gmail.com"
              className="p-1.5 text-white/70 hover:text-white rounded-full hover:bg-white/10 transition-colors"
            >
              <Mail className="h-4 w-4" />
              <span className="sr-only">Email</span>
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
