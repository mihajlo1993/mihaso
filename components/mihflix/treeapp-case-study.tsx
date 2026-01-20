"use client"
import { useEffect, useRef, useState, useCallback } from "react"
import { cn } from "@/lib/utils"
import { X, Layers, Eye, Accessibility, ExternalLink } from "lucide-react"
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
              <section ref={heroRef} className="relative min-h-[40vh] sm:min-h-[50vh] md:min-h-[60vh] overflow-hidden">
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
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/80 via-transparent to-[#0a0a0a]/40" />
                  <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/30 via-transparent to-transparent" />
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
                      {["Mobile App", "UX Design", "Sustainability"].map((tag) => (
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
                      Users Spend
                      <br />
                      <span style={{ color: THEME_COLOR }}>33% Longer</span> in App
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      className="mb-6 max-w-2xl text-base text-white/70 md:text-lg"
                    >
                      Boosting mobile engagement through accessibility improvements and navigation redesign
                    </motion.p>
                  </div>
                </div>
              </section>

              {/* Sticky Navigation */}
              <div className="sticky top-0 z-40 bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-white/5">
                <div className="flex items-center justify-start sm:justify-center px-3 sm:px-4 py-2 sm:py-3 overflow-x-auto scrollbar-hide">
                  <nav className="flex items-center gap-0.5 sm:gap-1 rounded-full bg-white/5 p-0.5 sm:p-1 border border-white/10 min-w-max">
                    {sections.map((section) => (
                      <button
                        key={section.id}
                        onClick={() => scrollToSection(section.id)}
                        className={cn(
                          "relative px-2.5 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium transition-all duration-300 rounded-full whitespace-nowrap",
                          activeSection === section.id ? "text-white bg-white/10" : "text-white/50 hover:text-white/80",
                        )}
                      >
                        {section.title}
                        {section.isHighlighted && (
                          <span
                            className="ml-1 sm:ml-1.5 inline-block h-1 sm:h-1.5 w-1 sm:w-1.5 rounded-full"
                            style={{ backgroundColor: THEME_COLOR }}
                          />
                        )}
                      </button>
                    ))}
                  </nav>
                </div>
              </div>

              {/* Content sections */}
              <div className="px-4 sm:px-6 md:px-10 lg:px-14 py-8 sm:py-12 space-y-12 sm:space-y-20">
                {/* Overview Section */}
                <section id="treeapp-overview" className="scroll-mt-24">
                  <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Overview</h2>
                    <p className="text-white/70 text-lg leading-relaxed mb-8">
                      TreeApp is an environmental impact app that plants trees when users make eco-friendly choices. As
                      Design Lead, I overhauled the mobile experience to improve accessibility, streamline navigation,
                      and increase user engagement with the tree-planting mission.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {[
                        { label: "Role", value: "Design Lead" },
                        { label: "Timeline", value: "1 year 11 months" },
                        { label: "Platform", value: "iOS & Android" },
                      ].map((item) => (
                        <div key={item.label} className="p-5 rounded-xl bg-white/5 border border-white/10">
                          <p className="text-white/50 text-sm mb-1">{item.label}</p>
                          <p className="text-white font-semibold">{item.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                {/* Research Section */}
                <section id="treeapp-research" className="scroll-mt-24">
                  <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Research Findings</h2>
                    <p className="text-white/70 text-lg leading-relaxed mb-8">
                      User testing and analytics revealed critical usability issues that were impacting engagement and
                      retention.
                    </p>

                    <div className="space-y-4">
                      {[
                        "80% of users couldn't find key settings within the hamburger menu",
                        "WCAG accessibility failures identified in 12 areas",
                        "Tree-planting progress was buried 3 taps deep",
                        "Session duration averaged only 45 seconds",
                      ].map((insight, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-4 p-4 rounded-lg bg-white/5 border border-white/10"
                        >
                          <div
                            className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: `${THEME_COLOR}33` }}
                          >
                            <span className="text-sm font-bold" style={{ color: THEME_COLOR }}>
                              {i + 1}
                            </span>
                          </div>
                          <p className="text-white/70">{insight}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                {/* Strategy Section */}
                <section id="treeapp-strategy" className="scroll-mt-24">
                  <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Design Strategy</h2>
                    <p className="text-white/70 text-lg leading-relaxed mb-8">
                      Our approach focused on three key pillars to transform the user experience.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {[
                        {
                          icon: Accessibility,
                          title: "Accessibility First",
                          desc: "WCAG 2.1 AA compliance across all screens",
                        },
                        { icon: Layers, title: "Simplified IA", desc: "Flattened navigation from 4 levels to 2" },
                        { icon: Eye, title: "Progress Visibility", desc: "Impact metrics front and center" },
                      ].map((item, i) => (
                        <div key={i} className="p-6 rounded-xl bg-white/5 border border-white/10">
                          <item.icon className="h-8 w-8 mb-4" style={{ color: THEME_COLOR }} />
                          <h3 className="text-white font-semibold text-lg mb-2">{item.title}</h3>
                          <p className="text-white/60">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                {/* Design Section */}
                <section id="treeapp-design" className="scroll-mt-24">
                  <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Key Design Decisions</h2>
                    <p className="text-white/70 text-lg leading-relaxed mb-8">
                      Every change was validated through user testing before implementation.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {[
                        {
                          title: "Tab Bar Navigation",
                          desc: "Replaced hamburger menu with persistent tab bar showing 5 core sections",
                        },
                        {
                          title: "Icon + Label Pattern",
                          desc: "All navigation items include both icon and label for clarity",
                        },
                        {
                          title: "Impact Dashboard",
                          desc: "New home screen showing trees planted, CO2 offset, and streak",
                        },
                        { title: "High Contrast Mode", desc: "Optional high contrast theme for vision-impaired users" },
                      ].map((item, i) => (
                        <div key={i} className="p-6 rounded-xl bg-white/5 border border-white/10">
                          <h3 className="text-white font-semibold text-lg mb-2">{item.title}</h3>
                          <p className="text-white/60">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                {/* Outcomes Section */}
                <section id="treeapp-outcomes" className="scroll-mt-24">
                  <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Results & Impact</h2>
                    <p className="text-white/70 text-lg leading-relaxed mb-8">
                      The redesigned app launched to overwhelmingly positive feedback from users and stakeholders.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                      {[
                        { metric: "+33%", label: "Session duration increase" },
                        { metric: "100%", label: "WCAG 2.1 AA compliance" },
                        { metric: "+28%", label: "Daily active users" },
                      ].map((item, i) => (
                        <div
                          key={i}
                          className="text-center p-6 rounded-xl border border-white/10"
                          style={{ backgroundColor: `${THEME_COLOR}1a` }}
                        >
                          <p className="text-4xl md:text-5xl font-bold mb-2" style={{ color: THEME_COLOR }}>
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
                        style={{ backgroundColor: THEME_COLOR }}
                      >
                        Get in touch
                      </a>
                      <a
                        href="https://www.thetreeapp.org"
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
