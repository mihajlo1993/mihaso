"use client"

import React from "react"

import { motion, AnimatePresence, useInView } from "framer-motion"
import { useState, useRef, useEffect, useCallback } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { workExperiences } from "@/lib/data"
import { ChevronDown, MapPin } from "lucide-react"
import { GetInTouchButton } from "@/components/ui/get-in-touch-button"

// All skills that will rotate through - organized for visual interest
const allSkills = [
  "Product Design",
  "UI/UX",
  "Design Systems",
  "Prototyping",
  "Healthcare UX",
  "Fintech UI",
  "Mobile Apps",
  "Web Platforms",
  "User Research",
  "Wireframing",
  "Visual Design",
  "Interaction Design",
  "Figma",
  "Design Tokens",
  "Component Libraries",
  "Accessibility",
]

function RotatingSkills() {
  const [visibleSkills, setVisibleSkills] = useState<string[]>([])
  const [isInitialized, setIsInitialized] = useState(false)

  // Initialize with 4 random skills
  useEffect(() => {
    const shuffled = [...allSkills].sort(() => Math.random() - 0.5)
    setVisibleSkills(shuffled.slice(0, 4))
    setIsInitialized(true)
  }, [])

  // Rotate one skill at a time at random intervals
  useEffect(() => {
    if (!isInitialized) return

    const rotateRandomSkill = () => {
      setVisibleSkills((prev) => {
        const positionToChange = Math.floor(Math.random() * 4)
        const availableSkills = allSkills.filter((s) => !prev.includes(s))
        if (availableSkills.length === 0) return prev
        const newSkill = availableSkills[Math.floor(Math.random() * availableSkills.length)]
        const updated = [...prev]
        updated[positionToChange] = newSkill
        return updated
      })
    }

    // Rotate every 2-3 seconds with some randomness
    const interval = setInterval(rotateRandomSkill, 2000 + Math.random() * 1000)
    return () => clearInterval(interval)
  }, [isInitialized])

  if (!isInitialized) {
    return <div className="h-12" /> // Placeholder height
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.6 }}
      className="flex justify-center"
    >
      <div className="inline-grid grid-cols-2 sm:grid-cols-4 gap-3 place-items-center">
        {visibleSkills.map((skill, index) => (
          <div
            key={index}
            className="w-[140px] sm:w-[160px] h-10 flex items-center justify-center"
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0.8, filter: "blur(8px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.8, filter: "blur(8px)" }}
                transition={{
                  duration: 0.5,
                  ease: [0.25, 0.4, 0.25, 1],
                }}
                className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300 backdrop-blur-sm whitespace-nowrap"
              >
                {skill}
              </motion.span>
            </AnimatePresence>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

// Timeline particle system with white particles
function TimelineParticles({ scrollProgress }: { scrollProgress: number }) {
  return (
    <div className="absolute left-3 md:left-1/2 top-0 bottom-0 w-px pointer-events-none overflow-visible">
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            left: -3,
            width: 6,
            height: 6,
            top: `${(scrollProgress * 100) - 2 + i * 0.3}%`,
            boxShadow: "0 0 12px rgba(255, 255, 255, 0.8), 0 0 24px rgba(255, 255, 255, 0.4)",
          }}
          animate={{
            x: [0, i % 2 === 0 ? 15 : -15, 0],
            opacity: [0, 1, 0],
            scale: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            delay: i * 0.2,
            ease: "easeOut",
          }}
        />
      ))}
      {/* Trailing glow particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={`trail-${i}`}
          className="absolute rounded-full"
          style={{
            left: -1,
            width: 2,
            height: 2,
            top: `${Math.max(0, scrollProgress * 100 - 5 - i * 2)}%`,
            backgroundColor: "rgba(255, 255, 255, 0.6)",
            boxShadow: "0 0 6px rgba(255, 255, 255, 0.5)",
          }}
          animate={{
            opacity: [0.6, 0.2, 0.6],
            scale: [1, 0.5, 1],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            delay: i * 0.15,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}

function CurrentBadge() {
  return (
    <span className="relative inline-flex items-center">
      <span className="relative px-2.5 py-0.5 bg-emerald-500/20 text-emerald-400 text-xs font-medium rounded-full flex items-center gap-1.5 border border-emerald-500/30">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
        </span>
        Current
      </span>
    </span>
  )
}

function TimelineDot({ isActive, index }: { isActive: boolean; index: number }) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.5 + index * 0.15, duration: 0.4, type: "spring", stiffness: 200 }}
      className="relative flex items-center justify-center"
    >
      {isActive && (
        <motion.div
          className="absolute w-5 h-5 rounded-full bg-white/20"
          animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.1, 0.3] }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
      )}
      <div
        className={cn(
          "relative w-2.5 h-2.5 rounded-full z-10 transition-colors duration-300",
          isActive ? "bg-white" : "bg-gray-600",
        )}
      />
    </motion.div>
  )
}

function ExperienceCard({
  exp,
  index,
  isExpanded,
  onToggle,
  isEven,
}: {
  exp: (typeof workExperiences)[0]
  index: number
  isExpanded: boolean
  onToggle: () => void
  isEven: boolean
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardRef, { once: true, margin: "-100px" })
  const slideDirection = isEven ? -60 : 60

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, x: slideDirection, y: 20 }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: slideDirection, y: 20 }}
      transition={{
        duration: 0.7,
        delay: 0.1,
        ease: [0.25, 0.4, 0.25, 1],
      }}
      className={cn(
        "relative",
        "pl-10 md:pl-0",
        "md:w-[calc(50%-2rem)]",
        isEven ? "md:ml-0 md:pr-8" : "md:ml-auto md:pl-8",
      )}
    >
      <div
        className={cn(
          "absolute z-10",
          "left-[4px] top-6",
          isEven ? "md:left-auto md:right-[-8px]" : "md:left-[-8px] md:right-auto",
        )}
      >
        <TimelineDot isActive={exp.current || false} index={index} />
      </div>

      <motion.button
        onClick={onToggle}
        whileHover={{ scale: 1.01, y: -2 }}
        whileTap={{ scale: 0.99 }}
        transition={{ duration: 0.2 }}
        className={cn(
          "w-full text-left relative bg-gray-900/50 backdrop-blur-sm rounded-lg p-5 md:p-6 border border-gray-800 transition-all duration-300 cursor-pointer",
          "hover:bg-gray-900/70 hover:border-white/30 hover:shadow-xl hover:shadow-white/10",
          isExpanded && "border-white/40 bg-gray-900/70",
        )}
      >
        <div className="relative flex items-start justify-between gap-3 mb-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <h3 className="text-lg md:text-xl font-bold text-white transition-colors duration-300">
                {exp.role}
              </h3>
              {exp.current && <CurrentBadge />}
            </div>
            <p className="text-base md:text-lg text-gray-300">{exp.company}</p>
            <p className="text-sm text-white font-medium mt-1 md:hidden">{exp.year}</p>
          </div>
          <motion.div 
            animate={{ rotate: isExpanded ? 180 : 0 }} 
            transition={{ duration: 0.3 }}
            className="flex-shrink-0 mt-1"
          >
            <ChevronDown className="w-5 h-5 text-gray-400 hover:text-white transition-colors" />
          </motion.div>
        </div>

        <div className="relative flex items-center flex-wrap gap-2 text-sm text-white/80 mb-4">
          <span>{exp.period}</span>
          {exp.location && (
            <span className="flex items-center gap-1 px-2.5 py-0.5 border border-white/20 rounded-full text-xs text-white/85 bg-transparent">
              <MapPin className="w-3 h-3" />
              {exp.location}
            </span>
          )}
          <span className="text-gray-500">•</span>
          <span className="text-gray-300 font-medium">{exp.duration}</span>
        </div>

        <p className="relative text-gray-300 leading-relaxed text-sm md:text-base">{exp.description}</p>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
              className="overflow-hidden"
            >
              <div className="mt-6 pt-6 border-t border-gray-800">
                <div className="mb-6">
                  <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Key Contributions</h4>
                  <ul className="space-y-2">
                    {exp.keyContributions.map((contribution, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1, duration: 0.3 }}
                        className="flex items-start gap-3 text-gray-300 text-sm md:text-base"
                      >
                        <span className="text-white mt-1.5 flex-shrink-0">•</span>
                        <span className="leading-relaxed">{contribution}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {exp.skills.map((skill, i) => (
                      <motion.span
                        key={skill}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 + i * 0.05, duration: 0.3 }}
                        className="px-3 py-1 bg-gray-800/50 text-gray-300 rounded-full text-xs md:text-sm border border-gray-700 hover:border-white/50 hover:bg-white/10 transition-all duration-300 cursor-default"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </motion.div>
  )
}

// Impressive image display with floating effect and glow
function ProfileImageDisplay() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height
    setMousePosition({ x: x * 20, y: y * 20 })
  }, [])

  const handleMouseLeave = useCallback(() => {
    setMousePosition({ x: 0, y: 0 })
  }, [])

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
      className="relative order-2 md:order-1"
    >
      <div className="relative w-full max-w-[600px] mx-auto perspective-1000">
        {/* Ambient glow layers */}
        <div className="absolute inset-0 blur-3xl opacity-30">
          <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-white/10 rounded-full" />
        </div>
        
        {/* Floating particles around image */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/40"
            style={{
              width: 4 + (i % 3) * 2,
              height: 4 + (i % 3) * 2,
              left: `${15 + i * 12}%`,
              top: `${20 + (i % 3) * 25}%`,
              boxShadow: "0 0 10px rgba(255,255,255,0.5)",
            }}
            animate={{
              y: [0, -15, 0],
              opacity: [0.3, 0.7, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.4,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Main image with 3D tilt effect */}
        <motion.div
          className="relative pb-4 aspect-[4/5]"
          style={{
            transform: `perspective(1000px) rotateY(${mousePosition.x}deg) rotateX(${-mousePosition.y}deg)`,
            transition: "transform 0.15s ease-out",
          }}
        >
          {/* Soft edge glow */}
          <div className="absolute -inset-4 bg-gradient-to-b from-white/5 via-transparent to-transparent blur-2xl rounded-3xl" />
          
          {/* Image container with mask */}
          <div className="relative w-full h-full overflow-hidden rounded-3xl">
            <div 
              className="absolute inset-0"
              style={{
                maskImage: "linear-gradient(to bottom, white 70%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(to bottom, white 70%, transparent 100%)",
              }}
            >
              <Image
                src="/images/layer-201.png"
                alt="Miha Sodja - Lead Product Designer"
                fill
                priority
                className="object-contain object-center"
                sizes="(max-width: 768px) 100vw, 600px"
                quality={90}
              />
            </div>
            
            {/* Subtle inner glow */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/5 pointer-events-none" />
          </div>

          {/* Bottom reflection line */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        </motion.div>
      </div>
    </motion.div>
  )
}

export function AboutView() {
  const [expandedCards, setExpandedCards] = useState<{ [key: number]: boolean }>({})
  const heroRef = useRef<HTMLElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  const toggleCard = useCallback((index: number) => {
    setExpandedCards((prev) => ({
      ...prev,
      [index]: !prev[index],
    }))
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return
      const rect = timelineRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const timelineHeight = rect.height

      const scrolledPastTop = Math.max(0, -rect.top)
      const progress = Math.min(1, Math.max(0, scrolledPastTop / (timelineHeight - windowHeight + 200)))

      setScrollProgress(progress)
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="about"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        className="min-h-screen bg-black pt-32 pb-20"
      >
        <div className="px-6 md:px-12 lg:px-16 max-w-7xl mx-auto">
          <section ref={heroRef} className="about-hero relative mb-24">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
              className="grid md:grid-cols-2 gap-12 md:gap-16 items-center relative"
              style={{ zIndex: 3 }}
            >
              <ProfileImageDisplay />

              <div className="order-1 md:order-2 space-y-6" style={{ zIndex: 3 }}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-4 tracking-tight">
                    Miha Sodja
                  </h1>
                  <p className="text-xl md:text-2xl text-gray-400 font-light">Senior Product Designer</p>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="text-gray-300 text-lg leading-relaxed max-w-xl"
                >
                  Crafting engaging digital experiences for over 15 years. Specializing in product design, design
                  systems, and user experience across fintech, healthcare, and environmental technology sectors.
                </motion.p>

                <RotatingSkills />
              </div>
            </motion.div>
          </section>

          <div className="mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold text-white mb-4"
            >
              Experience
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="text-gray-400 text-lg"
            >
              A journey through product design leadership
            </motion.p>
          </div>

          <div ref={timelineRef} className="relative space-y-8">
            {/* Static background line */}
            <div className="absolute left-3 md:left-1/2 top-0 bottom-0 w-px bg-gray-800" style={{ zIndex: 1 }} />
            
            {/* Animated progress line with glow */}
            <motion.div
              className="absolute left-3 md:left-1/2 top-0 w-px bg-white origin-top timeline-line-glow"
              style={{
                height: `${scrollProgress * 100}%`,
                zIndex: 2,
              }}
            />

            <TimelineParticles scrollProgress={scrollProgress} />

            {workExperiences.map((exp, index) => (
              <ExperienceCard
                key={exp.id}
                exp={exp}
                index={index}
                isExpanded={expandedCards[index] || false}
                onToggle={() => toggleCard(index)}
                isEven={index % 2 === 0}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="mt-32 text-center relative"
          >
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1.5 h-1.5 rounded-full bg-white/40"
                  style={{
                    left: `${15 + i * 15}%`,
                    top: `${30 + (i % 3) * 20}%`,
                    boxShadow: "0 0 8px rgba(255,255,255,0.4)",
                  }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0.2, 0.6, 0.2],
                    scale: [0.8, 1.2, 0.8],
                  }}
                  transition={{
                    duration: 4 + i * 0.5,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: i * 0.8,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>

            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">{"Let's work together"}</h3>
            <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
              {"I'm always interested in new opportunities and collaborations."}
            </p>
            <GetInTouchButton />
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
