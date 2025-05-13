"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import {
  ArrowRight,
  ChevronRight,
  Code,
  Download,
  ExternalLink,
  Github,
  Grid,
  Hexagon,
  Layers,
  Linkedin,
  Mail,
  Menu,
  Terminal,
  X,
  Zap,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ProjectCard } from "@/components/project-card"
import { SkillItem } from "@/components/skill-item"
import { ExperienceItem } from "@/components/experience-item"
import { useMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"
import { HexGrid } from "@/components/hex-grid"
import { GlitchText } from "@/components/glitch-text"
import { TerminalText } from "@/components/terminal-text"
import { NeonButton } from "@/components/neon-button"
import { CircuitLines } from "@/components/circuit-lines"
import { ScanEffect } from "@/components/scan-effect"
import { features } from "process"

export default function Home() {
  const isMobile = useMobile()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [terminalVisible, setTerminalVisible] = useState(true)
  const { scrollYProgress } = useScroll()
  const mainRef = useRef<HTMLDivElement>(null)

  // Parallax effects
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])

  // Handle section detection for navigation
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]")

      sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top
        const sectionId = section.getAttribute("id") || ""

        if (sectionTop < window.innerHeight / 2 && sectionTop > -window.innerHeight / 2) {
          setActiveSection(sectionId)
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Terminal effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setTerminalVisible(false)
    }, 4000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative min-h-screen bg-[#0a0a0f] text-[#e0e0ff] overflow-hidden">
      {/* Background grid */}
      <div className="fixed inset-0 z-0 opacity-20">
        <HexGrid />
      </div>

      {/* Circuit lines */}
      <div className="fixed inset-0 z-0 opacity-10">
        <CircuitLines />
      </div>

      {/* Terminal intro overlay */}
      <AnimatePresence>
        {terminalVisible && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 bg-[#0a0a0f] z-50 flex items-center justify-center"
          >
            <div className="w-full max-w-2xl p-4">
              <TerminalText onComplete={() => setTerminalVisible(false)} className="text-[#00ff9d]" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation sidebar */}
      <motion.nav
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 4.5, duration: 0.5 }}
        className={cn(
          "fixed left-0 top-0 bottom-0 w-20 z-40 hidden md:flex flex-col items-center justify-center",
          "bg-[#0a0a0f]/80 backdrop-blur-md border-r border-[#20f2ff]/20",
        )}
      >
        <div className="flex flex-col items-center gap-10">
          {[
            { id: "home", icon: <Hexagon className="h-6 w-6" />, label: "Home" },
            { id: "about", icon: <Terminal className="h-6 w-6" />, label: "About" },
            { id: "projects", icon: <Layers className="h-6 w-6" />, label: "Projects" },
            { id: "skills", icon: <Grid className="h-6 w-6" />, label: "Skills" },
            { id: "experience", icon: <Code className="h-6 w-6" />, label: "Experience" },
            { id: "contact", icon: <Mail className="h-6 w-6" />, label: "Contact" },
          ].map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={cn(
                "group relative flex flex-col items-center justify-center w-12 h-12 rounded-md transition-all duration-300",
                activeSection === item.id
                  ? "text-[#20f2ff] bg-[#20f2ff]/10"
                  : "text-[#e0e0ff]/50 hover:text-[#20f2ff] hover:bg-[#20f2ff]/5",
              )}
            >
              {item.icon}
              <span className="absolute left-full ml-2 px-2 py-1 rounded bg-[#0a0a0f]/90 text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {item.label}
              </span>
              {activeSection === item.id && (
                <motion.div layoutId="nav-indicator" className="absolute right-0 w-1 h-8 bg-[#20f2ff] rounded-l-md" />
              )}
            </a>
          ))}
        </div>
      </motion.nav>

      {/* Mobile header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 4.5, duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-40 md:hidden border-b border-[#20f2ff]/20 bg-[#0a0a0f]/80 backdrop-blur-md"
      >
        <div className="container flex h-16 items-center justify-between">
          <a href="#home" className="text-[#20f2ff] font-mono text-xl font-bold flex items-center gap-2">
            <Hexagon className="h-5 w-5" />
            <span>JOSÉ</span>
          </a>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#e0e0ff]/70 hover:text-[#20f2ff]"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-30 pt-16 bg-[#0a0a0f]/95 backdrop-blur-md md:hidden"
          >
            <div className="container py-8">
              <nav className="flex flex-col gap-4">
                {[
                  { id: "home", label: "Home", icon: <Hexagon className="h-5 w-5" /> },
                  { id: "about", label: "About", icon: <Terminal className="h-5 w-5" /> },
                  { id: "projects", label: "Projects", icon: <Layers className="h-5 w-5" /> },
                  { id: "skills", label: "Skills", icon: <Grid className="h-5 w-5" /> },
                  { id: "experience", label: "Experience", icon: <Code className="h-5 w-5" /> },
                  { id: "contact", label: "Contact", icon: <Mail className="h-5 w-5" /> },
                ].map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-md border border-transparent",
                      activeSection === item.id
                        ? "text-[#20f2ff] border-[#20f2ff]/30 bg-[#20f2ff]/5"
                        : "text-[#e0e0ff]/70 hover:text-[#20f2ff] hover:bg-[#20f2ff]/5",
                    )}
                  >
                    {item.icon}
                    <span className="font-mono">{item.label}</span>
                    {activeSection === item.id && <ChevronRight className="ml-auto h-4 w-4" />}
                  </a>
                ))}
              </nav>

              <div className="mt-8 flex justify-center gap-6">
                <a
                  href="https://github.com/JoseLorenzana272"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-[#e0e0ff]/70 hover:text-[#20f2ff] transition-colors"
                >
                  <Github className="h-6 w-6" />
                </a>
                <a
                  href="https://www.linkedin.com/in/jos%C3%A9-lorenzana-37948531a/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-[#e0e0ff]/70 hover:text-[#20f2ff] transition-colors"
                >
                  <Linkedin className="h-6 w-6" />
                </a>
                <a
                  href="mailto:jodanielorenzana@gmail.com"
                  className="p-2 text-[#e0e0ff]/70 hover:text-[#20f2ff] transition-colors"
                >
                  <Mail className="h-6 w-6" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Social links sidebar */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 4.5, duration: 0.5 }}
        className="fixed right-0 top-0 bottom-0 w-20 z-30 hidden md:flex flex-col items-center justify-center"
      >
        <div className="flex flex-col items-center gap-6">
          <a
            href="https://github.com/JoseLorenzana272"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-[#e0e0ff]/50 hover:text-[#20f2ff] transition-colors"
          >
            <Github className="h-5 w-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/jos%C3%A9-lorenzana-37948531a/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-[#e0e0ff]/50 hover:text-[#20f2ff] transition-colors"
          >
            <Linkedin className="h-5 w-5" />
          </a>
          <a href="mailto:jodanielorenzana@gmail.com" className="p-2 text-[#e0e0ff]/50 hover:text-[#20f2ff] transition-colors">
            <Mail className="h-5 w-5" />
          </a>

          <div className="mt-6 h-24 w-px bg-gradient-to-b from-transparent via-[#20f2ff]/30 to-transparent"></div>
        </div>
      </motion.div>

      <main ref={mainRef} className="relative z-10 md:ml-20 md:mr-20">
        {/* Hero Section */}
        <section id="home" className="relative min-h-screen flex items-center">
          <ScanEffect />

          <div className="container py-20 md:py-0">
            <div className="grid gap-8 lg:grid-cols-2 items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 4.7, duration: 0.8 }}
                className="space-y-6"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#20f2ff]/10 border border-[#20f2ff]/20 text-[#20f2ff] text-sm font-mono">
                  <Zap className="h-3.5 w-3.5" />
                  <span>Systems Engineering Student</span>
                </div>

                <h1 className="text-5xl md:text-7xl font-bold tracking-tighter font-mono">
                  <span className="text-[#e0e0ff]">I'm </span>
                  <GlitchText className="text-[#20f2ff]">JOSÉ</GlitchText>
                </h1>

                <h2 className="text-xl md:text-2xl text-[#e0e0ff]/70 font-mono">
                  DevOps & Cloud Enthusiast
                </h2>

                <p className="text-[#e0e0ff]/60 max-w-lg">
                  Systems Engineering student at USAC with passion for cloud technologies, 
                  containerization, and building scalable systems. Currently mastering 
                  Docker, Kubernetes, and GCP.
                </p>

                <div className="flex flex-wrap gap-4 pt-4">
                  <NeonButton asChild color="cyan">
                    <a href="#contact" className="flex items-center gap-2">
                      <span>Initialize Contact</span>
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </NeonButton>

                  <Button
                    variant="outline"
                    asChild
                    className="border-[#ff2cf4]/30 text-[#ff2cf4] hover:bg-[#ff2cf4]/10 hover:text-[#ff2cf4]"
                  >
                    <a href="#projects" className="flex items-center gap-2">
                      <span>View Projects</span>
                      <Layers className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 4.9, duration: 0.8 }}
                className="relative mx-auto max-w-md"
              >
                <div className="relative aspect-square">
                  {/* Hexagon frame */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg
                      width="100%"
                      height="100%"
                      viewBox="0 0 100 100"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M50 0L93.3 25V75L50 100L6.7 75V25L50 0Z"
                        stroke="#20f2ff"
                        strokeWidth="0.5"
                        className="animate-pulse"
                      />
                    </svg>
                  </div>

                  {/* Image with mask */}
                  <div className="absolute inset-[10%] overflow-hidden">
                    <div className="w-full h-full bg-[#20f2ff]/10 backdrop-blur-sm rounded-lg border border-[#20f2ff]/30 p-1">
                      <div className="w-full h-full overflow-hidden rounded-lg">
                        <img
                          src="/placeholder.svg?height=400&width=400"
                          alt="NOVA"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Decorative elements */}
                  <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-[#ff2cf4] rounded-tr-lg"></div>
                  <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-[#ff2cf4] rounded-bl-lg"></div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="relative min-h-screen flex items-center py-20">
          <div className="absolute inset-0 bg-gradient-to-b from-[#20f2ff]/5 to-transparent opacity-30 pointer-events-none"></div>

          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
              className="flex flex-col gap-2 mb-12"
            >
              <div className="flex items-center gap-3">
                <Terminal className="h-6 w-6 text-[#20f2ff]" />
                <h2 className="text-3xl md:text-4xl font-bold tracking-tighter font-mono">
                  <span className="text-[#20f2ff]">01.</span> <span className="text-[#e0e0ff]">About</span>
                </h2>
              </div>
              <div className="h-px w-full bg-gradient-to-r from-[#20f2ff]/50 to-transparent"></div>
            </motion.div>

            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, margin: "-100px" }}
                className="relative"
              >
                <div className="aspect-square max-w-md mx-auto overflow-hidden rounded-lg border border-[#20f2ff]/20 p-1 bg-[#0a0a0f]">
                  <div className="w-full h-full overflow-hidden rounded-lg relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#20f2ff]/20 to-[#ff2cf4]/20 z-10"></div>
                    <img
                      src="/code-b.png"
                      alt="JOSE"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute -top-4 -left-4 w-24 h-24 border border-[#20f2ff]/30 rounded-lg -rotate-6"></div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 border border-[#ff2cf4]/30 rounded-lg rotate-6"></div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, margin: "-100px" }}
                className="space-y-6"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ff2cf4]/10 border border-[#ff2cf4]/20 text-[#ff2cf4] text-sm font-mono">
                  <Terminal className="h-3.5 w-3.5" />
                  <span>System.out.println("Hello World");</span>
                </div>

                <p className="text-[#e0e0ff]/80 text-lg">
                  <span className="text-[#20f2ff] font-semibold">Hello there!</span> I'm José Lorenzana, a
                  Systems Engineering student at Universidad de San Carlos de Guatemala.
                </p>

                <p className="text-[#e0e0ff]/70">
                  Passionate about software development, cloud technologies, and DevOps tools. 
                  Skilled in both backend and frontend development with hands-on experience 
                  in Docker, Kubernetes, and Google Cloud Platform.
                </p>

                <p className="text-[#e0e0ff]/70">
                  When I'm not coding, you'll find me exploring emerging technologies, contributing to
                  open-source projects, or playing piano to unwind and stay creative.
                </p>

                <div className="pt-4 grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <h3 className="text-[#20f2ff] font-mono text-sm">Location</h3>
                    <p className="text-[#e0e0ff]/70">Guatemala, Guatemala</p>
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-[#20f2ff] font-mono text-sm">Education</h3>
                    <p className="text-[#e0e0ff]/70">BSc Systems Engineering @ USAC</p>
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-[#20f2ff] font-mono text-sm">Specialty</h3>
                    <p className="text-[#e0e0ff]/70">Cloud & DevOps</p>
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-[#20f2ff] font-mono text-sm">Languages</h3>
                    <p className="text-[#e0e0ff]/70">Spanish, English (B2-C1)</p>
                  </div>
                </div>

                <div className="pt-4">
                  <Button
                    variant="outline"
                    className="border-[#20f2ff]/30 text-[#20f2ff] hover:bg-[#20f2ff]/10 hover:text-[#20f2ff] gap-2"
                    asChild
                  >
                    <a 
                      href="/Resumé - José Lorenzana.pdf" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      aria-label="Download resume (opens in new tab)"
                    >
                      <Download className="h-4 w-4" />
                      Download Resume
                    </a>
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="relative min-h-screen flex items-center py-20">
          <div className="absolute inset-0 bg-gradient-to-b from-[#ff2cf4]/5 to-transparent opacity-30 pointer-events-none"></div>

          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
              className="flex flex-col gap-2 mb-12"
            >
              <div className="flex items-center gap-3">
                <Layers className="h-6 w-6 text-[#ff2cf4]" />
                <h2 className="text-3xl md:text-4xl font-bold tracking-tighter font-mono">
                  <span className="text-[#ff2cf4]">02.</span> <span className="text-[#e0e0ff]">Projects</span>
                </h2>
              </div>
              <div className="h-px w-full bg-gradient-to-r from-[#ff2cf4]/50 to-transparent"></div>
              <p className="text-[#e0e0ff]/70 md:text-lg max-w-2xl mt-4">
                Some of my projects showcasing my skills and creativity in software development - Also showing future project ideas :).
              </p>
            </motion.div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "RiscV Compiler",
                  description:
                    "A custom compiler toolchain for RISC-V architecture, translating high-level code to optimized RISC-V assembly with register allocation and instruction scheduling.",
                  tags: ["Javascript", "Html", "PEG.js", "RISCV"],
                  imageUrl: "/risc.jpeg",
                  projectUrl: "https://github.com/JoseLorenzana272/OakLand-Compiler-RISCV",
                  featured: true,
                  color: "cyan",
                },
                {
                  title: "Mini Interpreter",
                  description:
                    "Basic interpreter for a high level language.",
                  tags: ["Javascript", "Html", "PEG.js", "CSS"],
                  imageUrl: "/interpreter.jpeg",
                  projectUrl: "https://github.com/JoseLorenzana272/OakLand-Interpreter",
                  color: "pink",
                },
                {
                  title: "Weather Tweets-K8s-GCP",
                  description:
                    "A strong project focused on the use of Kubernetes, Google Cloud Platform (GCP) and the deployment of the project",
                  tags: ["K8s", "Docker", "GCP", "Go", "Kafka", "Redis", "Rust", "rabbitMQ", "valkey", "Grafana"],
                  imageUrl: "/tweet.png",
                  projectUrl: "https://github.com/JoseLorenzana272/Weather-Tweets-K8s-GCP",
                  color: "cyan",
                  featured: true, 
                },
                {
                  title: "Personal Chatbot",
                  description:
                    "A personal chatbot that uses a model to provide personalized responses and assistance.",
                  tags: ["To be Defined"],
                  imageUrl: "/chatbot.png",
                  color: "pink",
                  future_project: true,
                },
                
              ].map((project, i) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <ProjectCard
                    title={project.title}
                    description={project.description}
                    tags={project.tags}
                    imageUrl={project.imageUrl}
                    projectUrl={project.projectUrl}
                    featured={project.featured}
                    future_project={project.future_project}
                    color={project.color}
                  />
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true, margin: "-100px" }}
              className="flex justify-center mt-12"
            >
              <Button
                variant="outline"
                asChild
                className="border-[#e0e0ff]/20 text-[#e0e0ff]/70 hover:bg-[#e0e0ff]/5 hover:text-[#e0e0ff] transition-all duration-300 gap-2"
              >
                <a href="https://github.com/JoseLorenzana272">
                  View All Projects
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="relative min-h-screen flex items-center py-20">
          <div className="absolute inset-0 bg-gradient-to-b from-[#20f2ff]/5 to-transparent opacity-30 pointer-events-none"></div>

          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
              className="flex flex-col gap-2 mb-12"
            >
              <div className="flex items-center gap-3">
                <Grid className="h-6 w-6 text-[#20f2ff]" />
                <h2 className="text-3xl md:text-4xl font-bold tracking-tighter font-mono">
                  <span className="text-[#20f2ff]">03.</span> <span className="text-[#e0e0ff]">Skills</span>
                </h2>
              </div>
              <div className="h-px w-full bg-gradient-to-r from-[#20f2ff]/50 to-transparent"></div>
              <p className="text-[#e0e0ff]/70 md:text-lg max-w-2xl mt-4">
                Technical capabilities and digital expertise.
              </p>
            </motion.div>

            <div className="grid gap-8 md:grid-cols-2">
              {[
                {
                  title: "Frontend Development",
                  description: "Creating responsive and interactive user interfaces",
                  skills: [
                    { name: "React", level: 75 },
                    { name: "Javascript", level: 80 },
                    { name: "TypeScript", level: 65 },
                    { name: "HTML/CSS", level: 85 },
                    { name: "Next.js", level: 65 },
                  ],
                  color: "cyan",
                },
                {
                  title: "DevOps & Cloud",
                  description: "Containerization and cloud infrastructure",
                  skills: [
                    { name: "Docker", level: 80 },
                    { name: "Kubernetes", level: 75 },
                    { name: "GCP", level: 70 },
                    { name: "Git", level: 85 },
                    { name: "Linux", level: 85 },
                  ],
                  color: "pink",
                },
                {
                  title: "Backend Systems",
                  description: "Building robust server-side applications",
                  skills: [
                    { name: "Python", level: 85 },
                    { name: "Node.js", level: 75 },
                    { name: "Java", level: 70 },
                    { name: "Go", level: 65 },
                    { name: "C++", level: 60 },
                    { name: "rust", level: 60 },
                    { name: "SQL", level: 60 },
                  ],
                  color: "cyan",
                },
                
              ].map((category, i) => (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <SkillItem
                    title={category.title}
                    description={category.description}
                    skills={category.skills}
                    color={category.color}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="relative min-h-screen flex items-center py-20">
          <div className="absolute inset-0 bg-gradient-to-b from-[#ff2cf4]/5 to-transparent opacity-30 pointer-events-none"></div>

          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
              className="flex flex-col gap-2 mb-12"
            >
              <div className="flex items-center gap-3">
                <Code className="h-6 w-6 text-[#ff2cf4]" />
                <h2 className="text-3xl md:text-4xl font-bold tracking-tighter font-mono">
                  <span className="text-[#ff2cf4]">04.</span> <span className="text-[#e0e0ff]">Experience</span>
                </h2>
              </div>
              <div className="h-px w-full bg-gradient-to-r from-[#ff2cf4]/50 to-transparent"></div>
              <p className="text-[#e0e0ff]/70 md:text-lg max-w-2xl mt-4">
                Professional journey through the digital landscape.
              </p>
            </motion.div>

            <div className="space-y-12">
              {[
                {
                  title: "Customer Service Representative",
                  company: "Alorica (Walmart USA)",
                  period: "Oct 2021 - Dec 2021",
                  description:
                    "Provided assistance to Walmart customers in the United States, efficiently resolving their questions and issues. Developed effective communication and complaint handling skills.",
                  color: "cyan",
                },
                {
                  title: "Systems Engineering Student",
                  company: "Universidad de San Carlos de Guatemala",
                  period: "2022 - Present",
                  description:
                    "Currently in 7th semester with focus on software development, cloud technologies, and DevOps practices. Gaining hands-on experience in various programming languages and frameworks.",
                  color: "pink",
                },
                
              ].map((experience, i) => (
                <motion.div
                  key={experience.company}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <ExperienceItem
                    title={experience.title}
                    company={experience.company}
                    period={experience.period}
                    description={experience.description}
                    color={experience.color}
                  />
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true, margin: "-100px" }}
              className="flex justify-center mt-12"
            >
              <Button
                variant="outline"
                className="border-[#e0e0ff]/20 text-[#e0e0ff]/70 hover:bg-[#e0e0ff]/5 hover:text-[#e0e0ff] transition-all duration-300 gap-2"
                asChild
              >
                <a 
                  href="/Resumé - José Lorenzana.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="Download resume (opens in new tab)"
                >
                  <Download className="h-4 w-4" />
                  Download Full Resume
                </a>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="relative min-h-screen flex items-center py-20">
          <div className="absolute inset-0 bg-gradient-to-b from-[#20f2ff]/5 to-transparent opacity-30 pointer-events-none"></div>

          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
              className="flex flex-col gap-2 mb-12"
            >
              <div className="flex items-center gap-3">
                <Mail className="h-6 w-6 text-[#20f2ff]" />
                <h2 className="text-3xl md:text-4xl font-bold tracking-tighter font-mono">
                  <span className="text-[#20f2ff]">05.</span> <span className="text-[#e0e0ff]">Contact</span>
                </h2>
              </div>
              <div className="h-px w-full bg-gradient-to-r from-[#20f2ff]/50 to-transparent"></div>
              <p className="text-[#e0e0ff]/70 md:text-lg max-w-2xl mt-4">
                Initiate a connection. Let's create something extraordinary together.
              </p>
            </motion.div>

            <div className="grid gap-12 lg:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, margin: "-100px" }}
                className="space-y-6"
              >
                <p className="text-[#e0e0ff]/80 text-lg">
                  I'm always open to discussing new projects, creative collaborations, or opportunities to be part of
                  your vision.
                </p>

                <div className="space-y-6 mt-8">
                  <div className="flex items-start gap-4 group">
                    <div className="w-12 h-12 rounded-md bg-[#20f2ff]/10 border border-[#20f2ff]/20 flex items-center justify-center group-hover:bg-[#20f2ff]/20 transition-colors duration-300">
                      <Mail className="h-5 w-5 text-[#20f2ff]" />
                    </div>
                    <div>
                      <h3 className="text-[#e0e0ff] font-mono">Email</h3>
                      <a
                        href="mailto:jodanielorenzana@gmail.com"
                        className="text-[#e0e0ff]/70 hover:text-[#20f2ff] transition-colors"
                      >
                        jodanielorenzana@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 group">
                    <div className="w-12 h-12 rounded-md bg-[#ff2cf4]/10 border border-[#ff2cf4]/20 flex items-center justify-center group-hover:bg-[#ff2cf4]/20 transition-colors duration-300">
                      <Linkedin className="h-5 w-5 text-[#ff2cf4]" />
                    </div>
                    <div>
                      <h3 className="text-[#e0e0ff] font-mono">LinkedIn</h3>
                      <a
                        href="https://linkedin.com/in/josé-lorenzana-37948531a/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#e0e0ff]/70 hover:text-[#ff2cf4] transition-colors"
                      >
                        linkedin.com/in/josé-lorenzana
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 group">
                    <div className="w-12 h-12 rounded-md bg-[#20f2ff]/10 border border-[#20f2ff]/20 flex items-center justify-center group-hover:bg-[#20f2ff]/20 transition-colors duration-300">
                      <Github className="h-5 w-5 text-[#20f2ff]" />
                    </div>
                    <div>
                      <h3 className="text-[#e0e0ff] font-mono">GitHub</h3>
                      <a
                        href="https://github.com/JoseLorenzana272"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#e0e0ff]/70 hover:text-[#20f2ff] transition-colors"
                      >
                        github.com/JoseLorenzana272
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <form className="space-y-4 bg-[#0a0a0f]/80 backdrop-blur-sm p-6 rounded-lg border border-[#20f2ff]/20">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-mono text-[#e0e0ff]/80">
                        Name
                      </label>
                      <input
                        id="name"
                        className="w-full px-4 py-3 rounded-md bg-[#0a0a0f]/80 border border-[#20f2ff]/20 text-[#e0e0ff] placeholder:text-[#e0e0ff]/30 focus:outline-none focus:ring-2 focus:ring-[#20f2ff]/50 focus:border-transparent transition-all duration-300"
                        placeholder="Your name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-mono text-[#e0e0ff]/80">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        className="w-full px-4 py-3 rounded-md bg-[#0a0a0f]/80 border border-[#20f2ff]/20 text-[#e0e0ff] placeholder:text-[#e0e0ff]/30 focus:outline-none focus:ring-2 focus:ring-[#20f2ff]/50 focus:border-transparent transition-all duration-300"
                        placeholder="Your email"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-mono text-[#e0e0ff]/80">
                      Subject
                    </label>
                    <input
                      id="subject"
                      className="w-full px-4 py-3 rounded-md bg-[#0a0a0f]/80 border border-[#20f2ff]/20 text-[#e0e0ff] placeholder:text-[#e0e0ff]/30 focus:outline-none focus:ring-2 focus:ring-[#20f2ff]/50 focus:border-transparent transition-all duration-300"
                      placeholder="Subject"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-mono text-[#e0e0ff]/80">
                      Message
                    </label>
                    <textarea
                      id="message"
                      className="w-full px-4 py-3 rounded-md bg-[#0a0a0f]/80 border border-[#20f2ff]/20 text-[#e0e0ff] placeholder:text-[#e0e0ff]/30 focus:outline-none focus:ring-2 focus:ring-[#20f2ff]/50 focus:border-transparent transition-all duration-300 min-h-[120px]"
                      placeholder="Your message"
                    />
                  </div>
                  <NeonButton type="submit" className="w-full" color="cyan">
                    Send Transmission
                  </NeonButton>
                </form>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-10 md:ml-20 md:mr-20 border-t border-[#20f2ff]/20 py-12">
        <div className="container flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex flex-col items-center md:items-start gap-2">
            <a href="#home" className="text-[#20f2ff] font-mono text-xl font-bold flex items-center gap-2">
              <Hexagon className="h-5 w-5" />
              <span>JL</span>
            </a>
            <p className="text-center text-sm text-[#e0e0ff]/50 md:text-left font-mono">
              © {new Date().getFullYear()} José Lorenzana. Systems Engineer.
            </p>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://github.com/JoseLorenzana272"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#e0e0ff]/50 hover:text-[#20f2ff] transition-colors"
            >
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </a>
            <a
              href="https://linkedin.com/in/josé-lorenzana-37948531a/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#e0e0ff]/50 hover:text-[#ff2cf4] transition-colors"
            >
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </a>
            <a href="mailto:jodanielorenzana@gmail.com" className="text-[#e0e0ff]/50 hover:text-[#20f2ff] transition-colors">
              <Mail className="h-5 w-5" />
              <span className="sr-only">Email</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
