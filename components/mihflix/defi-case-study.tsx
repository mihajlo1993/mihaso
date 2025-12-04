"use client"

import type React from "react"
import { useEffect, useRef, useState, useCallback } from "react"
import { cn } from "@/lib/utils"
import { X, ExternalLink, Mail, Target, Users, TrendingUp, Quote, Sparkles, Layers, Eye, Rocket } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

interface DeFiCaseStudyProps {
  isOpen: boolean
  onClose: () => void
}

const sections = [
  { id: "overview", title: "Overview" },
  { id: "problem-goals", title: "Problem" },
  { id: "information-architecture", title: "IA" },
  { id: "key-flow", title: "Key Flow" },
  { id: "visual-system", title: "Visuals" },
  { id: "outcomes", title: "Outcome", isHighlighted: true },
]

export function DeFiCaseStudy({ isOpen, onClose }: DeFiCaseStudyProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const [activeSection, setActiveSection] = useState<string>("overview")
  const [scrollY, setScrollY] = useState(0)

  // Track scroll for parallax and sticky header
  const handleScroll = () => {
    if (!scrollRef.current) return

    setScrollY(scrollRef.current.scrollTop)

    // Find active section
    for (let i = sections.length - 1; i >= 0; i--) {
      const el = document.getElementById(sections[i].id)
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
    const el = document.getElementById(sectionId)
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

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="relative h-full w-full overflow-hidden bg-[#050505]"
          >
            {/* Main Scroll Container */}
            <div ref={scrollRef} className="h-full overflow-y-auto scroll-smooth" onScroll={handleScroll}>
              {/* HERO SECTION */}
              <section ref={heroRef} className="relative min-h-[85vh] md:min-h-[90vh] overflow-hidden">
                {/* Hero Image with Parallax */}
                <div className="absolute inset-0" style={{ transform: `translateY(${parallaxY}px)` }}>
                  <Image
                    src="/images/alvara-cover-v2.jpg"
                    alt="DeFi Token Platform"
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
                      {["DeFi", "Crypto", "UX/UI"].map((tag, i) => (
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
                      DeFi Token Platform:
                      <br />
                      <span className="bg-gradient-to-r from-white via-white/90 to-white/70 bg-clip-text text-transparent">
                        Simplifying Pooled Crypto Strategies
                      </span>
                    </motion.h1>

                    {/* Subline */}
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                      className="mb-8 max-w-3xl text-lg leading-relaxed text-gray-300 md:text-xl lg:text-2xl"
                    >
                      Designing a dashboard for users to create, track, and launch blockchain token portfolios with
                      clarity and trust.
                    </motion.p>

                    {/* Role/Team/Duration Pills */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                      className="flex flex-wrap gap-3 md:gap-4"
                    >
                      <div className="flex items-center gap-2 rounded-lg bg-white/5 px-4 py-2 ring-1 ring-white/10 backdrop-blur-sm">
                        <Users className="h-4 w-4 text-purple-400" />
                        <span className="text-sm text-gray-300">
                          <span className="font-semibold text-white">Role:</span> Product Designer (UX/UI)
                        </span>
                      </div>
                      <div className="flex items-center gap-2 rounded-lg bg-white/5 px-4 py-2 ring-1 ring-white/10 backdrop-blur-sm">
                        <Layers className="h-4 w-4 text-purple-400" />
                        <span className="text-sm text-gray-300">
                          <span className="font-semibold text-white">Team:</span> 1 Designer, 1 PM, 3 Engineers
                        </span>
                      </div>
                      <div className="flex items-center gap-2 rounded-lg bg-white/5 px-4 py-2 ring-1 ring-white/10 backdrop-blur-sm">
                        <Rocket className="h-4 w-4 text-purple-400" />
                        <span className="text-sm text-gray-300">
                          <span className="font-semibold text-white">Duration:</span> 8 weeks
                        </span>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </section>

              {/* STICKY TAB NAVIGATION */}
              <div className="sticky top-0 z-40 border-b border-white/[0.08] bg-[#050505]/95 backdrop-blur-xl">
                <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 md:px-12 lg:px-20">
                  <nav className="flex items-center gap-1 overflow-x-auto py-4 scrollbar-hide md:gap-2">
                    {sections.map((section) => (
                      <button
                        key={section.id}
                        onClick={() => scrollToSection(section.id)}
                        className={cn(
                          "relative whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 md:px-5 md:text-base",
                          activeSection === section.id ? "text-white" : "text-gray-500 hover:text-gray-300",
                          section.isHighlighted &&
                            activeSection !== section.id &&
                            "text-purple-400 hover:text-purple-300",
                        )}
                      >
                        {activeSection === section.id && (
                          <motion.div
                            layoutId="activeTabDefi"
                            className={cn(
                              "absolute inset-0 rounded-full ring-1",
                              section.isHighlighted
                                ? "bg-purple-500/20 ring-purple-500/40"
                                : "bg-white/10 ring-white/20",
                            )}
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                          />
                        )}
                        {/* Glowing underline */}
                        {activeSection === section.id && (
                          <motion.div
                            layoutId="glowUnderline"
                            className="absolute -bottom-4 left-1/2 h-[2px] w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-purple-500 to-transparent"
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                          />
                        )}
                        <span className="relative z-10">{section.title}</span>
                        {section.isHighlighted && (
                          <span className="relative z-10 ml-1.5 inline-block h-1.5 w-1.5 rounded-full bg-purple-500" />
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

              {/* MAIN CONTENT */}
              <div className="mx-auto max-w-[1200px] px-6 md:px-12 lg:px-20">
                {/* OVERVIEW / THE CHALLENGE */}
                <Section id="overview">
                  <SectionHeader>The Challenge</SectionHeader>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-8 text-lg leading-[1.7] text-gray-300 md:text-xl"
                  >
                    Alvara is a DeFi platform that empowers users to invest in pooled blockchain token sets (the "BTS
                    Factory"). While powerful, the system's complexity was discouraging adoption. Users struggled to
                    understand their token allocations, performance metrics, and overall trust in the system—resulting
                    in drop-offs, confusion, and frequent support tickets.
                  </motion.p>

                  <CalloutBlock
                    icon={<Target className="h-5 w-5" />}
                    title="Key Problems"
                    items={[
                      "Lack of transparency in each pool's token composition.",
                      "High cognitive load when building custom token pools.",
                      "UX mismatches for traditional finance users vs. crypto-native users.",
                    ]}
                    accentColor="#A855F7"
                  />
                </Section>

                <Divider />

                {/* PROBLEM & GOALS */}
                <Section id="problem-goals">
                  <SectionHeader>Product & UX Goals</SectionHeader>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-10 text-lg leading-[1.7] text-gray-300 md:text-xl"
                  >
                    We defined clear business and user experience goals to guide the redesign:
                  </motion.p>

                  <div className="grid gap-8 md:grid-cols-2">
                    <CalloutBlock
                      icon={<TrendingUp className="h-5 w-5" />}
                      title="Business Goals"
                      items={[
                        "Improve user comprehension of BTS performance and composition.",
                        "Reduce user churn and abandonment during the investment process.",
                        "Build trust through greater transparency and clarity.",
                      ]}
                      accentColor="#3B82F6"
                    />
                    <CalloutBlock
                      icon={<Eye className="h-5 w-5" />}
                      title="UX Goals"
                      items={[
                        "Create data-driven interfaces that enable quick scanning of information.",
                        "Design onboarding and workflows that instill confidence from the start.",
                        "Accommodate both advanced crypto users and novice investors seamlessly.",
                      ]}
                      accentColor="#10B981"
                    />
                  </div>
                </Section>

                <Divider />

                {/* INFORMATION ARCHITECTURE */}
                <Section id="information-architecture">
                  <SectionHeader>Design Principles & Key Decisions</SectionHeader>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-10 text-lg leading-[1.7] text-gray-300 md:text-xl"
                  >
                    To address user friction, I designed a visual system that balanced clarity, information hierarchy,
                    and the platform's bold brand tone. Key decisions included:
                  </motion.p>

                  <div className="grid gap-6 md:grid-cols-2">
                    <PrincipleCard
                      title="Atomic Layouts"
                      description="Structured the dashboard in modular sections (portfolio overview, individual pool, asset details) aligning with user mental models."
                      icon={<Layers className="h-6 w-6" />}
                    />
                    <PrincipleCard
                      title="Data-First Hierarchy"
                      description="Emphasized critical numbers (totals, ROI) with high-contrast text and visual charts (e.g., donut charts for allocation) accompanied by clear labels."
                      icon={<TrendingUp className="h-6 w-6" />}
                    />
                    <PrincipleCard
                      title="Consistent Color Roles"
                      description="Applied the signature purple as a highlight for interactive elements and call-to-action buttons, and used neutral grays for data display to keep focus on content."
                      icon={<Sparkles className="h-6 w-6" />}
                    />
                    <PrincipleCard
                      title="Risk Indicators"
                      description="Incorporated subtle color-coded bars and volatility icons to signal risk levels, helping users make informed decisions at a glance."
                      icon={<Target className="h-6 w-6" />}
                    />
                  </div>

                  {/* Image placeholder */}
                  <ImageBlock src="/images/alvara-cover-v2.jpg" alt="Information Architecture Overview" />
                </Section>

                <Divider />

                {/* KEY FLOW */}
                <Section id="key-flow">
                  <SectionHeader>Designing the "Create a Pool" Journey</SectionHeader>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-10 text-lg leading-[1.7] text-gray-300 md:text-xl"
                  >
                    This is the platform's most important user flow. It enables users to create a new basket pool in
                    under a minute. I broke the process into three guided steps for progressive clarity:
                  </motion.p>

                  <div className="space-y-8">
                    <FlowStep
                      number={1}
                      title="Add Tokens"
                      description="The user searches and selects tokens from a searchable list. The UI displays each token's icon and the user's current holdings for easy reference, helping users pick familiar assets quickly."
                      bullets={[
                        "Search and filter with clear token icons and names",
                        "Show common tokens first to reduce scrolling",
                        "Display current holdings for quick reference",
                      ]}
                    />
                    <FlowStep
                      number={2}
                      title="Set Allocations"
                      description="The user assigns percentages to each chosen token via intuitive sliders. As allocations are adjusted, the interface calculates totals and highlights any risk warnings in real time (e.g., flags volatile combinations)."
                      bullets={[
                        "Visual sliders with live percentage updates",
                        "Total allocation shown prominently (must equal 100%)",
                        "Risk level indicators based on asset volatility",
                      ]}
                    />
                    <FlowStep
                      number={3}
                      title="Review and launch"
                      description="The user reviews a summary with a clear breakdown of the new pool's composition and a simple performance forecast. Once everything looks good, launching the pool is a one-click confirmation."
                      bullets={[
                        "Summary view with clear preview of pool composition",
                        "Estimated gas fees surfaced upfront",
                        "One-click deploy with loading states and confirmation",
                      ]}
                    />
                  </div>

                  <ImageBlock src="/images/alvara-cover-v2.jpg" alt="Create a Pool Flow" />
                </Section>

                <Divider />

                {/* VISUAL SYSTEM */}
                <Section id="visual-system">
                  <SectionHeader>Visual System Overview</SectionHeader>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-10 text-lg leading-[1.7] text-gray-300 md:text-xl"
                  >
                    The UI design blends a dark fintech aesthetic with crypto-native clarity. Key visual principles
                    included:
                  </motion.p>

                  <div className="grid gap-6 md:grid-cols-2">
                    <VisualPrincipleCard
                      title="Dark Theme"
                      description="Embraced a near-black interface to reduce glare and give a professional finance feel, allowing colored data visualizations to pop."
                    />
                    <VisualPrincipleCard
                      title="Brand Accents"
                      description="Used Alvara's bright purple accent for primary actions and highlights, reinforcing brand identity and drawing attention to key interactive elements."
                    />
                    <VisualPrincipleCard
                      title="Bold Typography"
                      description="Employed large, legible typography for important metrics and section headers, ensuring that critical data (like total portfolio value or ROI) stands out at a glance."
                    />
                    <VisualPrincipleCard
                      title="Color-Coded Context"
                      description="Designed UI cards and tags with consistent color codes for categories and risk levels (e.g., green for stable pools, red for high-volatility alerts), making the status of assets immediately apparent."
                    />
                  </div>

                  <ImageBlock src="/images/alvara-cover-v2.jpg" alt="Visual System Components" />
                </Section>

                <Divider />

                {/* OUTCOMES */}
                <Section id="outcomes">
                  <SectionHeader>Results & Learnings</SectionHeader>

                  {/* Stats Cards */}
                  <div className="mb-12 grid gap-6 md:grid-cols-3">
                    <StatCard
                      value="2.3×"
                      label="faster pool creation"
                      description="The streamlined flow reduced the average time to create a token pool dramatically, improving user throughput."
                    />
                    <StatCard
                      value="5/6"
                      label="users preferred new layout"
                      description="Post-launch interviews showed higher user confidence, citing better understanding of their portfolios."
                    />
                    <StatCard
                      value="40%"
                      label="fewer support tickets"
                      description="Confusion-related support requests dropped by nearly half after launch, indicating users can now find answers within the UI itself."
                    />
                  </div>

                  {/* Testimonial */}
                  <TestimonialBlock
                    quote="The new design makes a complex concept feel simple. Our users are much more confident and engaged now."
                    author="Product Manager, Alvara"
                  />

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mt-10 text-lg leading-[1.7] text-gray-300 md:text-xl"
                  >
                    This project deepened my ability to design data-heavy interfaces that build trust through
                    transparency. <span className="text-white font-medium">Reflection:</span> If I were to continue
                    iterating, I would focus on expanding the onboarding for first-time crypto investors to further
                    reduce the learning curve.
                  </motion.p>
                </Section>

                {/* FOOTER CTA */}
                <motion.section
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="border-t border-white/[0.08] py-20 text-center md:py-28"
                >
                  <p className="mb-8 text-lg text-gray-400 md:text-xl">
                    Want to dive deeper into this project or discuss similar fintech design challenges? Let's talk.
                  </p>
                  <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                    <a
                      href="https://alvara.xyz"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-lg bg-white px-8 py-4 text-base font-bold text-black transition-all hover:bg-gray-200 hover:scale-105"
                    >
                      <ExternalLink className="h-5 w-5" />
                      View Prototype
                    </a>
                    <a
                      href="/contact"
                      className="flex items-center gap-2 rounded-lg bg-white/10 px-8 py-4 text-base font-bold text-white ring-1 ring-white/20 transition-all hover:bg-white/20 hover:scale-105"
                    >
                      <Mail className="h-5 w-5" />
                      Contact Me
                    </a>
                  </div>
                </motion.section>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

// === SUBCOMPONENTS ===

function Section({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-32 py-16 md:py-24">
      {children}
    </section>
  )
}

function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mb-8 text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl"
    >
      <span className="bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent">
        {children}
      </span>
    </motion.h2>
  )
}

function Divider() {
  return <div className="h-px w-full bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
}

function CalloutBlock({
  icon,
  title,
  items,
  accentColor,
}: {
  icon: React.ReactNode
  title: string
  items: string[]
  accentColor: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-2xl bg-white/[0.03] p-6 ring-1 ring-white/[0.08] md:p-8"
    >
      {/* Gradient accent line */}
      <div
        className="absolute left-0 top-0 h-full w-1 rounded-l-2xl"
        style={{ background: `linear-gradient(180deg, ${accentColor}, ${accentColor}40)` }}
      />

      <div className="mb-4 flex items-center gap-3">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-lg"
          style={{ backgroundColor: `${accentColor}20`, color: accentColor }}
        >
          {icon}
        </div>
        <h3 className="text-lg font-bold text-white md:text-xl">{title}</h3>
      </div>

      <ul className="space-y-3">
        {items.map((item, i) => (
          <li key={i} className="flex gap-3 text-base text-gray-300">
            <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full" style={{ backgroundColor: accentColor }} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

function PrincipleCard({
  title,
  description,
  icon,
}: {
  title: string
  description: string
  icon: React.ReactNode
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -4, scale: 1.01 }}
      className="group relative overflow-hidden rounded-2xl bg-white/[0.03] p-6 ring-1 ring-white/[0.08] transition-all duration-300 hover:bg-white/[0.05] hover:ring-white/[0.15] md:p-8"
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/20 text-purple-400 transition-colors group-hover:bg-purple-500/30">
        {icon}
      </div>
      <h3 className="mb-2 text-lg font-bold text-white">{title}</h3>
      <p className="text-base leading-relaxed text-gray-400">{description}</p>
    </motion.div>
  )
}

function FlowStep({
  number,
  title,
  description,
  bullets,
}: {
  number: number
  title: string
  description: string
  bullets: string[]
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: number * 0.1 }}
      className="relative pl-16 md:pl-20"
    >
      {/* Number circle */}
      <div className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-full bg-purple-500 text-xl font-bold text-white shadow-lg shadow-purple-500/30 md:h-14 md:w-14 md:text-2xl">
        {number}
      </div>

      {/* Connecting line */}
      {number < 3 && (
        <div className="absolute left-[23px] top-14 h-[calc(100%+2rem)] w-0.5 bg-gradient-to-b from-purple-500/50 to-transparent md:left-[27px]" />
      )}

      <h3 className="mb-3 text-xl font-bold text-white md:text-2xl">{title}</h3>
      <p className="mb-4 text-base leading-relaxed text-gray-300 md:text-lg">{description}</p>

      <ul className="space-y-2">
        {bullets.map((bullet, i) => (
          <li key={i} className="flex gap-3 text-base text-gray-400">
            <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-purple-400" />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

function VisualPrincipleCard({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="rounded-2xl bg-gradient-to-br from-white/[0.05] to-transparent p-6 ring-1 ring-white/[0.08] md:p-8"
    >
      <h3 className="mb-3 text-lg font-bold text-white">{title}</h3>
      <p className="text-base leading-relaxed text-gray-400">{description}</p>
    </motion.div>
  )
}

function ImageBlock({ src, alt }: { src: string; alt: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      whileHover={{ scale: 1.02 }}
      className="group relative mt-12 overflow-hidden rounded-2xl ring-1 ring-white/[0.1] transition-all duration-500 hover:ring-white/[0.2]"
    >
      <div className="aspect-[21/9] relative">
        <Image
          src={src || "/placeholder.svg"}
          alt={alt}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
      </div>
      {/* Soft glow on hover */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
    </motion.div>
  )
}

function StatCard({
  value,
  label,
  description,
}: {
  value: string
  label: string
  description: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-500/10 to-transparent p-6 ring-1 ring-purple-500/20 md:p-8"
    >
      <div className="mb-2 text-4xl font-bold text-white md:text-5xl">{value}</div>
      <div className="mb-3 text-lg font-semibold text-purple-400">{label}</div>
      <p className="text-sm leading-relaxed text-gray-400">{description}</p>
    </motion.div>
  )
}

function TestimonialBlock({
  quote,
  author,
}: {
  quote: string
  author: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10 p-8 ring-1 ring-white/[0.1] md:p-12"
    >
      <Quote className="absolute top-6 left-6 h-12 w-12 text-purple-500/30 md:h-16 md:w-16" />
      <blockquote className="relative z-10 mb-6 text-xl italic leading-relaxed text-white md:text-2xl lg:text-3xl">
        "{quote}"
      </blockquote>
      <cite className="text-base font-medium text-gray-400 not-italic">— {author}</cite>
    </motion.div>
  )
}
