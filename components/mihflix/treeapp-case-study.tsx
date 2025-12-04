"use client"

import type React from "react"
import { useEffect, useRef, useState, useCallback } from "react"
import { cn } from "@/lib/utils"
import {
  X,
  Users,
  Layers,
  Rocket,
  Leaf,
  Target,
  Lightbulb,
  CheckCircle2,
  BarChart3,
  Quote,
  ArrowUpRight,
  Mail,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

interface TreeAppCaseStudyProps {
  isOpen: boolean
  onClose: () => void
}

const sections = [
  { id: "overview", title: "Overview" },
  { id: "research", title: "Research" },
  { id: "strategy", title: "Strategy" },
  { id: "design", title: "Design" },
  { id: "outcomes", title: "Outcome", isHighlighted: true },
]

const THEME_COLOR = "#22C55E"
const THEME_COLOR_LIGHT = "#4ADE80"

export function TreeAppCaseStudy({ isOpen, onClose }: TreeAppCaseStudyProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const [activeSection, setActiveSection] = useState<string>("overview")
  const [scrollY, setScrollY] = useState(0)

  const handleScroll = () => {
    setScrollY(scrollRef.current?.scrollTop || 0)

    // Find active section
    for (let i = sections.length - 1; i >= 0; i--) {
      const el = document.getElementById(`treeapp-${sections[i].id}`)
      if (el) {
        const rect = el.getBoundingClientRect()
        if (rect.top <= 200) {
          setActiveSection(sections[i].id)
          break
        }
      }
    }
  }

  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    container.addEventListener("scroll", handleScroll)
    return () => container.removeEventListener("scroll", handleScroll)
  }, [])

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
      scrollRef.current?.scrollTo(0, 0)
      setScrollY(0)
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  // ESC to close
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleEsc)
    return () => window.removeEventListener("keydown", handleEsc)
  }, [onClose])

  const scrollToSection = useCallback((sectionId: string) => {
    const el = document.getElementById(`treeapp-${sectionId}`)
    if (el && scrollRef.current) {
      const top = el.offsetTop - 120
      scrollRef.current.scrollTo({ top, behavior: "smooth" })
    }
  }, [])

  const parallaxY = Math.min(scrollY * 0.4, 200)

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black"
            onClick={onClose}
          />

          {/* Modal Container - fullscreen like DeFi */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="relative h-full w-full overflow-hidden bg-[#050505]"
          >
            {/* Main Scroll Container */}
            <div ref={scrollRef} className="h-full overflow-y-auto scroll-smooth" onScroll={handleScroll}>
              {/* HERO SECTION - matching DeFi structure */}
              <section ref={heroRef} className="relative min-h-[85vh] md:min-h-[90vh] overflow-hidden">
                {/* Hero Image with Parallax */}
                <div className="absolute inset-0" style={{ transform: `translateY(${parallaxY}px)` }}>
                  <Image
                    src="/images/treeapp-cover.png"
                    alt="TreeApp Forest Background"
                    fill
                    className="object-cover object-center scale-110"
                    priority
                  />
                  {/* Vignette overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/80 via-transparent to-[#050505]/40" />
                  <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/30 via-transparent to-transparent" />
                  {/* Soft blur at edges */}
                  <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#050505]/50 to-transparent backdrop-blur-[2px]" />
                  <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[#050505] to-transparent" />
                </div>

                {/* Hero Content */}
                <div className="relative z-10 flex min-h-[85vh] md:min-h-[90vh] flex-col justify-end px-6 pb-16 md:px-12 lg:px-20">
                  <div className="mx-auto w-full max-w-[1200px]">
                    {/* Tags */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="mb-6 flex flex-wrap gap-2 md:gap-3"
                    >
                      {["Mobile App", "UX Redesign", "Accessibility"].map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold text-white backdrop-blur-sm md:px-5 md:py-2 md:text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </motion.div>

                    {/* Title */}
                    <motion.h1
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.7, delay: 0.3 }}
                      className="mb-6 text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl xl:text-[88px]"
                    >
                      TreeApp Redesign:
                      <br />
                      <span className="bg-gradient-to-r from-white via-white/90 to-white/70 bg-clip-text text-transparent">
                        Planting Trees Through Better UX
                      </span>
                    </motion.h1>

                    {/* Subline */}
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                      className="mb-8 max-w-3xl text-lg leading-relaxed text-gray-300 md:text-xl lg:text-2xl"
                    >
                      Redefining the way people navigate and use TreeApp — a complete UX overhaul to increase
                      accessibility, clarity, and engagement.
                    </motion.p>

                    {/* Role/Team/Duration Pills - with green theme */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                      className="flex flex-wrap gap-3 md:gap-4"
                    >
                      <div className="flex items-center gap-2 rounded-lg bg-white/5 px-4 py-2 ring-1 ring-white/10 backdrop-blur-sm">
                        <Users className="h-4 w-4 text-green-400" />
                        <span className="text-sm text-gray-300">
                          <span className="font-semibold text-white">Role:</span> Lead Product Designer
                        </span>
                      </div>
                      <div className="flex items-center gap-2 rounded-lg bg-white/5 px-4 py-2 ring-1 ring-white/10 backdrop-blur-sm">
                        <Layers className="h-4 w-4 text-green-400" />
                        <span className="text-sm text-gray-300">
                          <span className="font-semibold text-white">Team:</span> Design Lead + PM + Engineers
                        </span>
                      </div>
                      <div className="flex items-center gap-2 rounded-lg bg-white/5 px-4 py-2 ring-1 ring-white/10 backdrop-blur-sm">
                        <Rocket className="h-4 w-4 text-green-400" />
                        <span className="text-sm text-gray-300">
                          <span className="font-semibold text-white">Duration:</span> 12 weeks
                        </span>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </section>

              {/* STICKY TAB NAVIGATION - matching DeFi with green theme */}
              <div className="sticky top-0 z-40 border-b border-white/[0.08] bg-[#050505]/95 backdrop-blur-xl">
                <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 md:px-12 lg:px-20">
                  <nav className="flex items-center gap-1 py-4 md:gap-2">
                    {sections.map((section) => (
                      <button
                        key={section.id}
                        onClick={() => scrollToSection(section.id)}
                        className={cn(
                          "relative flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 md:px-5",
                          activeSection === section.id
                            ? section.isHighlighted
                              ? "bg-green-500/20 text-green-400 ring-1 ring-green-500/40"
                              : "bg-white/10 text-white"
                            : section.isHighlighted
                              ? "text-green-400 hover:bg-green-500/10"
                              : "text-gray-400 hover:bg-white/5 hover:text-white",
                        )}
                      >
                        {section.title}
                        {section.isHighlighted && <span className="h-1.5 w-1.5 rounded-full bg-green-400" />}
                        {activeSection === section.id && !section.isHighlighted && (
                          <motion.div
                            layoutId="treeapp-activeTab"
                            className="absolute -bottom-4 left-1/2 h-0.5 w-8 -translate-x-1/2 rounded-full bg-green-500"
                          />
                        )}
                      </button>
                    ))}
                  </nav>
                  {/* Close Button - now aligned with tabs */}
                  <button
                    onClick={onClose}
                    className="ml-4 flex-shrink-0 rounded-full bg-black/60 p-2.5 text-white backdrop-blur-md transition-all hover:bg-black/80 hover:scale-110 ring-1 ring-white/10"
                    aria-label="Close"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* CONTENT SECTIONS */}
              <div className="mx-auto max-w-[1200px] px-6 py-16 md:px-12 md:py-24 lg:px-20">
                {/* OVERVIEW */}
                <section id="treeapp-overview" className="mb-24 scroll-mt-32 md:mb-32">
                  <SectionHeader title="Overview" icon={<Leaf className="h-5 w-5" />} />
                  <div className="mt-8 grid gap-8 md:grid-cols-2 md:gap-12">
                    <div className="space-y-6">
                      <p className="text-lg leading-relaxed text-gray-300 md:text-xl">
                        TreeApp is a sustainability-focused mobile application that enables users to plant real trees by
                        engaging with eco-friendly content and taking green actions. Despite its noble mission, the app
                        faced significant usability challenges that hindered user engagement and retention.
                      </p>
                      <p className="text-lg leading-relaxed text-gray-300 md:text-xl">
                        I was brought in as Lead Product Designer to conduct a comprehensive UX audit and lead a
                        complete redesign, focusing on improving navigation, accessibility, and the overall user
                        experience.
                      </p>
                    </div>
                    <CalloutBlock
                      icon={<Target className="h-5 w-5" />}
                      title="Design Challenge"
                      description="How might we simplify TreeApp's user experience to increase daily engagement while maintaining the app's educational and environmental mission?"
                      themeColor="green"
                    />
                  </div>
                </section>

                {/* RESEARCH */}
                <section id="treeapp-research" className="mb-24 scroll-mt-32 md:mb-32">
                  <SectionHeader title="Research & Discovery" icon={<Target className="h-5 w-5" />} />
                  <div className="mt-8 space-y-12">
                    <div className="grid gap-8 md:grid-cols-2">
                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-white">User Research Findings</h3>
                        <ul className="space-y-3">
                          {[
                            "Users struggled to understand the app's core value proposition",
                            "Navigation was confusing with too many entry points",
                            "Progress tracking was buried and hard to find",
                            "Accessibility issues affected 23% of users",
                          ].map((item, i) => (
                            <li key={i} className="flex items-start gap-3 text-gray-300">
                              <span className="mt-1.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-500/20 text-xs font-bold text-green-400">
                                {i + 1}
                              </span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-white">Competitive Analysis</h3>
                        <p className="text-gray-300">
                          Analyzed leading sustainability apps including Ecosia, JouleBug, and Oroeco to identify best
                          practices in gamification, progress visualization, and user engagement patterns.
                        </p>
                      </div>
                    </div>

                    <ImagePlaceholder
                      description="Slide 6-7: User interview sessions and research synthesis"
                      aspectRatio="16/9"
                    />
                  </div>
                </section>

                {/* STRATEGY */}
                <section id="treeapp-strategy" className="mb-24 scroll-mt-32 md:mb-32">
                  <SectionHeader title="Strategy & Approach" icon={<Lightbulb className="h-5 w-5" />} />
                  <div className="mt-8 space-y-12">
                    <div className="grid gap-6 md:grid-cols-3">
                      {[
                        {
                          title: "Simplify Navigation",
                          description:
                            "Reduce cognitive load by consolidating menu items and creating clear information hierarchy",
                          icon: <Layers className="h-6 w-6" />,
                        },
                        {
                          title: "Enhance Accessibility",
                          description:
                            "Implement WCAG 2.1 AA standards throughout the app with improved contrast and screen reader support",
                          icon: <Users className="h-6 w-6" />,
                        },
                        {
                          title: "Gamify Progress",
                          description:
                            "Create compelling progress visualizations that celebrate user achievements and environmental impact",
                          icon: <BarChart3 className="h-6 w-6" />,
                        },
                      ].map((item, i) => (
                        <div
                          key={i}
                          className="group rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-all hover:border-green-500/30 hover:bg-white/[0.04]"
                        >
                          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/10 text-green-400 transition-colors group-hover:bg-green-500/20">
                            {item.icon}
                          </div>
                          <h3 className="mb-2 text-lg font-semibold text-white">{item.title}</h3>
                          <p className="text-sm leading-relaxed text-gray-400">{item.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                {/* DESIGN */}
                <section id="treeapp-design" className="mb-24 scroll-mt-32 md:mb-32">
                  <SectionHeader title="Design Solutions" icon={<CheckCircle2 className="h-5 w-5" />} />
                  <div className="mt-8 space-y-16">
                    <div>
                      <h3 className="mb-6 text-2xl font-semibold text-white">Before & After</h3>
                      <ImagePlaceholder
                        description="Slide 17: Before & After comparison showing navigation improvements"
                        aspectRatio="16/9"
                      />
                    </div>

                    <div>
                      <h3 className="mb-6 text-2xl font-semibold text-white">Key Design Decisions</h3>
                      <div className="grid gap-6 md:grid-cols-2">
                        {[
                          "Consolidated 7 navigation tabs into 4 clear sections",
                          "Introduced persistent progress indicator on home screen",
                          "Created tree growth animation to visualize impact",
                          "Implemented high-contrast mode for accessibility",
                        ].map((item, i) => (
                          <div
                            key={i}
                            className="flex items-start gap-4 rounded-xl border border-white/10 bg-white/[0.02] p-5"
                          >
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-500/20 text-sm font-bold text-green-400">
                              {i + 1}
                            </div>
                            <p className="text-gray-300">{item}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>

                {/* OUTCOMES */}
                <section id="treeapp-outcomes" className="scroll-mt-32">
                  <SectionHeader title="Outcome & Impact" icon={<BarChart3 className="h-5 w-5" />} isHighlighted />

                  {/* Stats Grid */}
                  <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {[
                      { value: "+47%", label: "Daily Active Users" },
                      { value: "+62%", label: "Session Duration" },
                      { value: "-35%", label: "Support Tickets" },
                      { value: "4.8★", label: "App Store Rating" },
                    ].map((stat, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-6 text-center transition-all hover:border-green-500/30"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                        <div className="relative">
                          <div className="mb-1 text-3xl font-bold text-green-400 md:text-4xl">{stat.value}</div>
                          <div className="text-sm text-gray-400">{stat.label}</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Testimonial */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-12 relative overflow-hidden rounded-2xl border border-green-500/20 bg-gradient-to-br from-green-500/10 via-green-500/5 to-transparent p-8 md:p-10"
                  >
                    <Quote className="absolute top-6 right-6 h-12 w-12 text-green-500/20" />
                    <blockquote className="relative text-xl leading-relaxed text-white md:text-2xl">
                      "The redesign transformed how our users interact with TreeApp. We've seen unprecedented engagement
                      and our community has planted over 2 million additional trees since launch."
                    </blockquote>
                    <div className="mt-6 flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-green-500/20" />
                      <div>
                        <div className="font-semibold text-white">Product Lead</div>
                        <div className="text-sm text-gray-400">TreeApp</div>
                      </div>
                    </div>
                  </motion.div>

                  {/* CTA Section */}
                  <div className="mt-16 flex flex-col items-center justify-center gap-6 rounded-2xl border border-white/10 bg-white/[0.02] p-10 text-center md:flex-row md:justify-between md:text-left">
                    <div>
                      <h3 className="text-2xl font-bold text-white">Interested in working together?</h3>
                      <p className="mt-2 text-gray-400">Let's discuss how I can help with your next project.</p>
                    </div>
                    <div className="flex gap-3">
                      <a
                        href="#"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-black transition-all hover:bg-gray-200"
                      >
                        View Prototype
                        <ArrowUpRight className="h-4 w-4" />
                      </a>
                      <button
                        onClick={onClose}
                        className="inline-flex items-center gap-2 rounded-full bg-green-500 px-6 py-3 font-semibold text-white transition-all hover:bg-green-600"
                      >
                        <Mail className="h-4 w-4" />
                        Contact Me
                      </button>
                    </div>
                  </div>
                </section>
              </div>

              {/* Footer spacing */}
              <div className="h-24" />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

// Helper Components
function SectionHeader({
  title,
  icon,
  isHighlighted,
}: { title: string; icon: React.ReactNode; isHighlighted?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="flex items-center gap-3"
    >
      <div
        className={cn(
          "flex h-10 w-10 items-center justify-center rounded-xl",
          isHighlighted ? "bg-green-500/20 text-green-400" : "bg-white/10 text-white",
        )}
      >
        {icon}
      </div>
      <h2 className={cn("text-2xl font-bold md:text-3xl", isHighlighted ? "text-green-400" : "text-white")}>{title}</h2>
    </motion.div>
  )
}

function CalloutBlock({
  icon,
  title,
  description,
  themeColor = "green",
}: {
  icon: React.ReactNode
  title: string
  description: string
  themeColor?: "green" | "purple"
}) {
  const colors = {
    green: {
      border: "border-green-500/30",
      bg: "from-green-500/10",
      icon: "bg-green-500/20 text-green-400",
      line: "bg-green-500",
    },
    purple: {
      border: "border-purple-500/30",
      bg: "from-purple-500/10",
      icon: "bg-purple-500/20 text-purple-400",
      line: "bg-purple-500",
    },
  }
  const c = colors[themeColor]

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border p-6 md:p-8",
        c.border,
        `bg-gradient-to-br ${c.bg} to-transparent`,
      )}
    >
      <div className={cn("absolute left-0 top-0 h-full w-1 rounded-full", c.line)} />
      <div className={cn("mb-4 flex h-10 w-10 items-center justify-center rounded-xl", c.icon)}>{icon}</div>
      <h3 className="mb-2 text-lg font-semibold text-white">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  )
}

function ImagePlaceholder({ description, aspectRatio = "16/9" }: { description: string; aspectRatio?: string }) {
  return (
    <div
      className="flex items-center justify-center rounded-2xl border border-dashed border-white/20 bg-white/[0.02] p-8 text-center"
      style={{ aspectRatio }}
    >
      <div className="max-w-md">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10">
          <Leaf className="h-6 w-6 text-green-400" />
        </div>
        <p className="text-sm text-gray-400">{description}</p>
      </div>
    </div>
  )
}
