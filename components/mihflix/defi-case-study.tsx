"use client"
import { useEffect, useRef, useState, useCallback } from "react"
import { cn } from "@/lib/utils"
import { X, ExternalLink, Target, Users, ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

interface DeFiCaseStudyProps {
  isOpen: boolean
  onClose: () => void
}

const sections = [
  { id: "overview", title: "Overview" },
  { id: "problem-goals", title: "Problem" },
  { id: "research", title: "Research" },
  { id: "key-flow", title: "Key Flow" },
  { id: "visual-system", title: "Visuals" },
  { id: "outcomes", title: "Outcome", isHighlighted: true },
]

export function DeFiCaseStudy({ isOpen, onClose }: DeFiCaseStudyProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const [activeSection, setActiveSection] = useState<string>("overview")
  const [scrollY, setScrollY] = useState(0)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

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

  const parallaxY = Math.min(scrollY * 0.3, 150)

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-8 lg:p-12">
          {/* Backdrop with blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal Container - centered popup with max dimensions */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-[1200px] h-[95vh] sm:h-[90vh] max-h-[900px] overflow-hidden bg-[#0a0a0a] rounded-xl sm:rounded-2xl shadow-2xl border border-white/10"
          >
            {/* Close button - positioned in top right corner */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 z-50 p-2 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200"
              aria-label="Close case study"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Main Scroll Container */}
            <div ref={scrollRef} className="h-full overflow-y-auto scroll-smooth" onScroll={handleScroll}>
              {/* HERO SECTION - adjusted height for popup */}
              <section ref={heroRef} className="relative min-h-[50vh] md:min-h-[60vh] overflow-hidden">
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
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/80 via-transparent to-[#0a0a0a]/40" />
                  <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/30 via-transparent to-transparent" />
                  {/* Soft blur at edges */}
                  <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#0a0a0a]/50 to-transparent backdrop-blur-[2px]" />
                  <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
                </div>

                {/* Hero Content */}
                <div className="relative z-10 flex min-h-[50vh] md:min-h-[60vh] flex-col justify-end px-6 pb-10 md:px-10 lg:px-14">
                  <div className="w-full max-w-[1000px]">
                    {/* Tags */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="mb-4 flex flex-wrap gap-2"
                    >
                      {["Product Design", "Token Distribution", "Web3"].map((tag, i) => (
                        <span
                          key={tag}
                          className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm"
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
                      className="mb-3 text-3xl font-bold leading-tight tracking-tight text-white md:text-4xl lg:text-5xl"
                    >
                      Empowering Users to Distribute
                      <br />
                      <span style={{ color: "#A855F7" }}>Tokens Effortlessly</span>
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      className="mb-6 max-w-2xl text-base text-white/70 md:text-lg"
                    >
                      Redesigning Alvara's token distribution platform to simplify complex DeFi operations
                    </motion.p>
                  </div>
                </div>
              </section>

              {/* Sticky Navigation - inside scroll container */}
              <div className="sticky top-0 z-40 bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-white/5">
                {/* Mobile Dropdown */}
                <div className="sm:hidden px-4 py-3">
                  <button
                    onClick={() => setMobileNavOpen(!mobileNavOpen)}
                    className="w-full flex items-center justify-between px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white"
                  >
                    <span className="text-sm font-medium">
                      {sections.find((s) => s.id === activeSection)?.title || "Overview"}
                    </span>
                    <ChevronDown
                      className={cn("h-4 w-4 transition-transform duration-200", mobileNavOpen && "rotate-180")}
                    />
                  </button>
                  <AnimatePresence>
                    {mobileNavOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.15 }}
                        className="absolute left-4 right-4 mt-2 rounded-lg bg-[#1a1a1a] border border-white/10 shadow-xl overflow-hidden z-50"
                      >
                        {sections.map((section) => (
                          <button
                            key={section.id}
                            onClick={() => {
                              scrollToSection(section.id)
                              setMobileNavOpen(false)
                            }}
                            className={cn(
                              "w-full px-4 py-3 text-left text-sm font-medium transition-colors flex items-center justify-between",
                              activeSection === section.id
                                ? "text-white bg-white/10"
                                : "text-white/60 hover:text-white hover:bg-white/5",
                            )}
                          >
                            {section.title}
                            {section.isHighlighted && (
                              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: "#A855F7" }} />
                            )}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden sm:flex items-center justify-center px-4 py-3">
                  <nav className="flex items-center gap-1 rounded-full bg-white/5 p-1 border border-white/10">
                    {sections.map((section) => (
                      <button
                        key={section.id}
                        onClick={() => scrollToSection(section.id)}
                        className={cn(
                          "relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full whitespace-nowrap",
                          activeSection === section.id ? "text-white bg-white/10" : "text-white/50 hover:text-white/80",
                        )}
                      >
                        {section.title}
                        {section.isHighlighted && (
                          <span
                            className="ml-1.5 inline-block h-1.5 w-1.5 rounded-full"
                            style={{ backgroundColor: "#A855F7" }}
                          />
                        )}
                      </button>
                    ))}
                  </nav>
                </div>
              </div>

              {/* Content sections - adjusted padding for popup */}
              <div className="px-4 sm:px-6 md:px-10 lg:px-14 py-8 sm:py-12 space-y-12 sm:space-y-20">
                {/* Overview Section */}
                <section id="overview" className="scroll-mt-24">
                  <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Overview</h2>
                    <p className="text-white/70 text-lg leading-relaxed mb-8">
                      Alvara is a DeFi platform that enables users to create and manage token baskets for diversified
                      crypto investments. I led the product design effort to simplify the complex token distribution
                      process, making it accessible to both crypto-native users and newcomers to Web3.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {[
                        { label: "Role", value: "Lead Product Designer" },
                        { label: "Timeline", value: "6 months" },
                        { label: "Platform", value: "Web Application" },
                      ].map((item) => (
                        <div key={item.label} className="p-5 rounded-xl bg-white/5 border border-white/10">
                          <p className="text-white/50 text-sm mb-1">{item.label}</p>
                          <p className="text-white font-semibold">{item.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                {/* Problem & Goals Section */}
                <section id="problem-goals" className="scroll-mt-24">
                  <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">The Challenge</h2>
                    <p className="text-white/70 text-lg leading-relaxed mb-8">
                      Token distribution in DeFi is inherently complex—users must navigate multiple protocols,
                      understand gas fees, and manage wallet connections. Our challenge was to abstract this complexity
                      without sacrificing the power and flexibility that advanced users need.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {[
                        {
                          icon: Target,
                          title: "High Drop-off Rates",
                          desc: "60% of users abandoned the distribution flow midway",
                        },
                        {
                          icon: Users,
                          title: "Support Burden",
                          desc: "40% of support tickets related to distribution confusion",
                        },
                      ].map((item, i) => (
                        <div key={i} className="p-6 rounded-xl bg-white/5 border border-white/10">
                          <item.icon className="h-8 w-8 mb-4" style={{ color: "#A855F7" }} />
                          <h3 className="text-white font-semibold text-lg mb-2">{item.title}</h3>
                          <p className="text-white/60">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                {/* Research Section */}
                <section id="research" className="scroll-mt-24">
                  <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Research Insights</h2>
                    <p className="text-white/70 text-lg leading-relaxed mb-8">
                      Through user interviews, analytics review, and competitive analysis, we identified key pain points
                      and opportunities for improvement.
                    </p>

                    <div className="space-y-4">
                      {[
                        "Users were overwhelmed by the number of steps in the distribution process",
                        "Technical jargon created barriers for non-crypto-native users",
                        "Lack of real-time feedback left users uncertain about transaction status",
                        "Mobile experience was significantly degraded compared to desktop",
                      ].map((insight, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-4 p-4 rounded-lg bg-white/5 border border-white/10"
                        >
                          <div
                            className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: "rgba(168, 85, 247, 0.2)" }}
                          >
                            <span className="text-sm font-bold" style={{ color: "#A855F7" }}>
                              {i + 1}
                            </span>
                          </div>
                          <p className="text-white/70">{insight}</p>
                        </div>
                      ))}
                    </div>

                    {/* User Voices & Research Analysis */}
                    <div className="mt-12">
                      <h3 className="text-xl font-semibold text-white mb-4">Turning fragmented frustrations into actionable UX priorities</h3>
                      <div className="rounded-xl overflow-hidden border border-white/10">
                        <Image
                          src="/images/turning-20fragmented-20frustrations-20into-20actionable-20ux-20priorities.png"
                          alt="User voices and research analysis board showing categorized user feedback"
                          width={1400}
                          height={800}
                          className="w-full h-auto"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                          quality={90}
                        />
                      </div>
                    </div>
                  </div>
                </section>

                {/* Key Flow Section */}
                <section id="key-flow" className="scroll-mt-24">
                  <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Streamlined Flow</h2>
                    <p className="text-white/70 text-lg leading-relaxed mb-8">
                      We reduced the distribution process from 8 steps to 4, with clear progress indication and
                      contextual help at each stage.
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {["Connect Wallet", "Select Tokens", "Set Distribution", "Confirm & Execute"].map((step, i) => (
                        <div key={i} className="text-center p-4 rounded-xl bg-white/5 border border-white/10">
                          <div
                            className="w-10 h-10 mx-auto mb-3 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: "#A855F7" }}
                          >
                            <span className="text-white font-bold">{i + 1}</span>
                          </div>
                          <p className="text-white text-sm font-medium">{step}</p>
                        </div>
                      ))}
                    </div>

                    {/* Process Visualization Comparison */}
                    <div className="mt-12">
                      <h3 className="text-xl font-semibold text-white mb-4">Process Visualization</h3>
                      <div className="rounded-xl overflow-hidden border border-white/10">
                        <Image
                          src="/images/streamlined-20flow-20-e2-80-93-20process-20visualization.png"
                          alt="Comparison of 8-step pre-launch flow vs streamlined 4-step launch flow"
                          width={1400}
                          height={800}
                          className="w-full h-auto"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                          quality={90}
                        />
                      </div>
                    </div>
                  </div>
                </section>

                {/* Visual System Section */}
                <section id="visual-system" className="scroll-mt-24">
                  <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Visual Design System</h2>
                    <p className="text-white/70 text-lg leading-relaxed mb-8">
                      The UI design blends a dark fintech aesthetic with crypto-native clarity. Key visual principles
                      included:
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {[
                        {
                          title: "Dark Theme",
                          desc: "Near-black interface to reduce glare and give a professional finance feel",
                        },
                        {
                          title: "Brand Accents",
                          desc: "Bright purple accent for primary actions, reinforcing brand identity",
                        },
                        {
                          title: "Bold Typography",
                          desc: "Large, legible typography for important metrics and section headers",
                        },
                        { title: "Color-Coded Context", desc: "Consistent color codes for categories and risk levels" },
                      ].map((item, i) => (
                        <div key={i} className="p-6 rounded-xl bg-white/5 border border-white/10">
                          <h3 className="text-white font-semibold text-lg mb-2">{item.title}</h3>
                          <p className="text-white/60">{item.desc}</p>
                        </div>
                      ))}
                    </div>

                    {/* UI Showcase */}
                    <div className="mt-12">
                      <h3 className="text-xl font-semibold text-white mb-4">Final UI</h3>
                      <div className="rounded-xl overflow-hidden border border-white/10">
                        <Image
                          src="/images/ui.png"
                          alt="Alvara platform UI showcasing BTS Factory, fund details, and mobile leaderboard"
                          width={1400}
                          height={1000}
                          className="w-full h-auto"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                          quality={90}
                        />
                      </div>
                    </div>
                  </div>
                </section>

                {/* Outcomes Section */}
                <section id="outcomes" className="scroll-mt-24">
                  <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Results & Impact</h2>
                    <p className="text-white/70 text-lg leading-relaxed mb-8">
                      The redesigned platform launched to positive user feedback and measurable business impact.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                      {[
                        { metric: "60%", label: "Reduction in drop-off rate" },
                        { metric: "40%", label: "Fewer support tickets" },
                        { metric: "4.6/5", label: "User satisfaction score" },
                      ].map((item, i) => (
                        <div
                          key={i}
                          className="text-center p-6 rounded-xl border border-white/10"
                          style={{ backgroundColor: "rgba(168, 85, 247, 0.1)" }}
                        >
                          <p className="text-4xl md:text-5xl font-bold mb-2" style={{ color: "#A855F7" }}>
                            {item.metric}
                          </p>
                          <p className="text-white/70">{item.label}</p>
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center pt-6">
                      <a
                        href="mailto:hello@mihasodja.com?subject=Let's work together"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold text-white transition-all hover:opacity-90"
                        style={{ backgroundColor: "#A855F7" }}
                      >
                        Get in touch
                      </a>
                      <a
                        href="https://alvara.xyz"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold text-white bg-white/10 border border-white/20 hover:bg-white/20 transition-all"
                      >
                        <ExternalLink className="h-4 w-4" />
                        View project
                      </a>
                    </div>
                  </div>
                </section>
              </div>

              {/* Footer spacer */}
              <div className="h-12" />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

// === SUBCOMPONENTS ===
// Removed as they are not part of the provided updates.
// If these were intended to be updated, they would require explicit instructions.
