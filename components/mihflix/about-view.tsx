"use client"

import { motion, AnimatePresence, useInView } from "framer-motion"
import { useState, useRef, useMemo } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { workExperiences } from "@/lib/data"
import { ChevronDown } from "lucide-react"

interface Particle {
  id: number
  x: number
  y: number
  size: number
  color: string
  blur: number
  duration: number
  delay: number
}

interface OrbitalParticle {
  id: string
  angle: number
  orbitRadius: number
  size: number
  duration: number
  blur: number
  color: string
}

interface FloatingParticle {
  id: string
  x: number
  y: number
  size: number
  color: string
  animationType: number
  delay: number
  blur: number
}

interface EdgeParticle {
  id: string
  startX: number
  startY: number
  size: number
  color: string
  delay: number
  blur: number
}

interface BackgroundParticle {
  id: string
  x: number
  y: number
  size: number
  color: string
  blur: number
  duration: number
  delay: number
  isLensDust?: boolean
  rotation?: number
}

interface MidgroundParticle {
  id: string
  x: number
  y: number
  size: number
  color: string
  blur: number
  duration: number
  delay: number
  hasTwinkle?: boolean
}

interface ForegroundParticle {
  id: string
  x: number
  y: number
  size: number
  color: string
  blur: number
  duration: number
  delay: number
}

function generateBackgroundParticles(): Particle[] {
  const particles: Particle[] = []
  const colors = ["rgba(255,255,255,0.10)", "rgba(130,170,255,0.20)", "rgba(209,58,255,0.22)"]

  for (let i = 0; i < 24; i++) {
    let x = Math.random() * 100
    const y = Math.random() * 100

    if (x > 30 && x < 70 && y > 15 && y < 55) {
      x = x < 50 ? x - 20 : x + 20
    }

    particles.push({
      id: i,
      x: Math.max(0, Math.min(100, x)),
      y: Math.max(0, Math.min(100, y)),
      size: 2.5 + Math.random() * 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      blur: 0,
      duration: 18 + Math.random() * 14,
      delay: Math.random() * 10,
    })
  }
  return particles
}

function generateMidgroundParticles(): Particle[] {
  const particles: Particle[] = []
  const colors = ["rgba(255,255,255,0.25)", "rgba(209,58,255,0.30)"]

  for (let i = 0; i < 14; i++) {
    const isLeftSide = i % 2 === 0
    const x = isLeftSide ? 5 + Math.random() * 22 : 73 + Math.random() * 22
    const y = 20 + Math.random() * 65

    particles.push({
      id: i,
      x,
      y,
      size: 3 + Math.random() * 7,
      color: colors[Math.floor(Math.random() * colors.length)],
      blur: Math.random() > 0.5 ? 1.5 : 2.5,
      duration: 12 + Math.random() * 10,
      delay: Math.random() * 8,
    })
  }
  return particles
}

function generateForegroundParticles(): Particle[] {
  const particles: Particle[] = []

  for (let i = 0; i < 10; i++) {
    let x: number
    let y: number

    if (i < 4) {
      x = i % 2 === 0 ? 5 + Math.random() * 15 : 80 + Math.random() * 15
      y = 35 + Math.random() * 30
    } else {
      x = 20 + Math.random() * 60
      y = 70 + Math.random() * 25
    }

    particles.push({
      id: i,
      x,
      y,
      size: 2 + Math.random() * 2.5,
      color: "rgba(255,255,255,0.22)",
      blur: 1,
      duration: 14 + Math.random() * 10,
      delay: Math.random() * 6,
    })
  }
  return particles
}

function ParticlesBack({ mouseOffset }: { mouseOffset: { x: number; y: number } }) {
  const particles = useMemo(() => generateBackgroundParticles(), [])

  return (
    <div
      className="particles-back"
      style={{
        transform: `translate3d(${mouseOffset.x * 0.02}px, ${mouseOffset.y * 0.02}px, 0)`,
        transition: "transform 0.3s ease-out",
      }}
    >
      {particles.map((p) => (
        <span
          key={p.id}
          className="particle particle-bg"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  )
}

function ParticlesMid({ mouseOffset }: { mouseOffset: { x: number; y: number } }) {
  const particles = useMemo(() => generateMidgroundParticles(), [])

  return (
    <div
      className="particles-mid"
      style={{
        transform: `translate3d(${mouseOffset.x * 0.04}px, ${mouseOffset.y * 0.04}px, 0)`,
        transition: "transform 0.3s ease-out",
      }}
    >
      {particles.map((p) => (
        <span
          key={p.id}
          className="particle particle-mid"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            filter: p.blur > 0 ? `blur(${p.blur}px)` : undefined,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  )
}

function ParticlesFront({ mouseOffset }: { mouseOffset: { x: number; y: number } }) {
  const particles = useMemo(() => generateForegroundParticles(), [])

  return (
    <div
      className="particles-front"
      style={{
        transform: `translate3d(${mouseOffset.x * 0.06}px, ${mouseOffset.y * 0.06}px, 0)`,
        transition: "transform 0.3s ease-out",
      }}
    >
      {particles.map((p) => (
        <span
          key={p.id}
          className="particle particle-front"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            filter: `blur(${p.blur}px)`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  )
}

function CinematicParticles() {
  const backgroundParticles = useMemo<BackgroundParticle[]>(() => {
    const particles: BackgroundParticle[] = []
    for (let i = 0; i < 14; i++) {
      const isLeftEdge = i < 4
      const isRightEdge = i >= 4 && i < 8
      particles.push({
        id: `bg-circle-${i}`,
        x: isLeftEdge ? 5 + Math.random() * 20 : isRightEdge ? 75 + Math.random() * 20 : 25 + Math.random() * 50,
        y: 10 + Math.random() * 80,
        size: 2 + Math.random() * 3,
        color:
          i % 3 === 0
            ? "rgba(255, 255, 255, 0.35)"
            : i % 3 === 1
              ? "rgba(200, 190, 220, 0.3)"
              : "rgba(180, 170, 200, 0.25)",
        blur: 2 + Math.random() * 2,
        duration: 18 + Math.random() * 8,
        delay: Math.random() * 5,
      })
    }
    for (let i = 0; i < 6; i++) {
      particles.push({
        id: `bg-dust-${i}`,
        x: 10 + Math.random() * 80,
        y: 20 + Math.random() * 60,
        size: 1.5 + Math.random() * 2,
        color: "rgba(255, 255, 255, 0.2)",
        blur: 1.5,
        duration: 20 + Math.random() * 10,
        delay: Math.random() * 8,
        isLensDust: true,
        rotation: Math.random() * 45,
      })
    }
    return particles
  }, [])

  const midgroundParticles = useMemo<MidgroundParticle[]>(() => {
    return Array.from({ length: 10 }, (_, i) => ({
      id: `mid-${i}`,
      x: 15 + Math.random() * 70,
      y: 15 + Math.random() * 70,
      size: 3 + Math.random() * 4,
      color:
        i % 3 === 0
          ? "rgba(255, 255, 255, 0.4)"
          : i % 3 === 1
            ? "rgba(210, 200, 230, 0.35)"
            : "rgba(190, 180, 210, 0.3)",
      blur: 1 + Math.random(),
      duration: 12 + Math.random() * 6,
      delay: Math.random() * 4,
      hasTwinkle: i % 3 === 0,
    }))
  }, [])

  const foregroundParticles = useMemo<ForegroundParticle[]>(() => {
    const safeZones = [
      { xMin: 5, xMax: 25, yMin: 40, yMax: 95 },
      { xMin: 75, xMax: 95, yMin: 40, yMax: 95 },
      { xMin: 20, xMax: 80, yMin: 75, yMax: 95 },
    ]
    return Array.from({ length: 8 }, (_, i) => {
      const zone = safeZones[i % safeZones.length]
      return {
        id: `front-${i}`,
        x: zone.xMin + Math.random() * (zone.xMax - zone.xMin),
        y: zone.yMin + Math.random() * (zone.yMax - zone.yMin),
        size: 1.5 + Math.random() * 2,
        color: i % 2 === 0 ? "rgba(255, 255, 255, 0.5)" : "rgba(220, 210, 240, 0.4)",
        blur: 0.5 + Math.random() * 0.5,
        duration: 8 + Math.random() * 4,
        delay: Math.random() * 3,
      }
    })
  }, [])

  return (
    <>
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl" style={{ zIndex: 0 }}>
        {backgroundParticles.map((p) => (
          <div
            key={p.id}
            className="absolute"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.isLensDust ? p.size * 3 : p.size,
              height: p.size,
              backgroundColor: p.color,
              borderRadius: p.isLensDust ? "50% / 25%" : "50%",
              filter: `blur(${p.blur}px)`,
              boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
              transform: p.isLensDust ? `rotate(${p.rotation}deg)` : undefined,
              animationName: p.isLensDust ? "lensDust" : "cinematicDriftBg",
              animationDuration: `${p.duration}s`,
              animationTimingFunction: "ease-in-out",
              animationIterationCount: "infinite",
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl" style={{ zIndex: 5 }}>
        {midgroundParticles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
              filter: `blur(${p.blur}px)`,
              boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
              animationName: p.hasTwinkle ? "twinkle" : "cinematicDriftMid",
              animationDuration: `${p.duration}s`,
              animationTimingFunction: "ease-in-out",
              animationIterationCount: "infinite",
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl" style={{ zIndex: 20 }}>
        {foregroundParticles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
              filter: `blur(${p.blur}px)`,
              boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
              animationName: "cinematicFloatFront",
              animationDuration: `${p.duration}s`,
              animationTimingFunction: "ease-in-out",
              animationIterationCount: "infinite",
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>
    </>
  )
}

function PulsatingDot({ className, delay = 0 }: { className?: string; delay?: number }) {
  return (
    <span className={cn("relative inline-flex items-center justify-center", className)}>
      <motion.span
        className="absolute h-2 w-2 rounded-full bg-white/40"
        animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
        transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: delay / 1000 }}
      />
      <span className="relative h-1.5 w-1.5 rounded-full bg-white" />
    </span>
  )
}

function CurrentBadge() {
  return (
    <span className="relative inline-flex items-center">
      <span className="absolute inset-0 bg-white rounded-full blur-md opacity-50 animate-pulse" />
      <span className="relative px-2.5 py-0.5 bg-white text-black text-xs font-medium rounded-full flex items-center gap-1.5 shadow-lg shadow-white/30">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full rounded-full bg-black opacity-75 animate-ping" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-black" />
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

function TimelineParticles({ scrollProgress }: { scrollProgress: number }) {
  return (
    <div className="absolute left-3 md:left-1/2 top-0 bottom-0 w-px pointer-events-none overflow-visible">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-[#D13AFF]"
          style={{
            left: -2,
            top: `${(scrollProgress * 100) - 2 + i * 0.5}%`,
          }}
          animate={{
            x: [0, i % 2 === 0 ? 8 : -8, 0],
            opacity: [0, 0.8, 0],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            delay: i * 0.4,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
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

      <motion.div
        whileHover={{ scale: 1.02, y: -4 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2 }}
        className={cn(
          "relative bg-gray-900/50 backdrop-blur-sm rounded-lg p-5 md:p-6 border border-gray-800 transition-all duration-300",
          "hover:bg-gray-900/70 hover:border-white/30 hover:shadow-xl hover:shadow-white/10",
          isExpanded && "border-white/40 bg-gray-900/70",
        )}
      >
        <motion.div
          className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(255,255,255,0.1) 100%)",
          }}
        />

        <div className="relative flex items-start justify-between gap-3 mb-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 mb-1 flex-wrap">
              <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-white transition-colors duration-300">
                {exp.role}
              </h3>
              {exp.current && <CurrentBadge />}
            </div>
            <p className="text-base md:text-lg text-gray-300">{exp.company}</p>
            <p className="text-sm text-white font-medium mt-1 md:hidden">{exp.year}</p>
          </div>
          <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.3 }}>
            <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors flex-shrink-0 mt-1" />
          </motion.div>
        </div>

        <div className="relative flex items-center flex-wrap gap-2 text-sm text-white/80 mb-4">
          <span>{exp.period}</span>
          {/* Location chip - render if location exists */}
          {exp.location && (
            <span className="px-2.5 py-0.5 border border-white/20 rounded-full text-xs text-white/85 bg-transparent">
              {exp.location}
            </span>
          )}
          {/* Remote chip - only show if location is "Remote" */}
          {exp.location === "Remote"
            ? null
            : // For non-remote locations, we don't add a separate Remote chip
              // If the data had a separate remote field, we would check it here
              null}
          <span className="text-gray-500">•</span>
          <span className="text-gray-300 font-medium">{exp.duration}</span>
        </div>

        <p className="relative text-gray-300 leading-relaxed text-sm md:text-base">{exp.description}</p>

        <motion.div
          initial={false}
          animate={{
            height: isExpanded ? "auto" : 0,
            opacity: isExpanded ? 1 : 0,
          }}
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
                    animate={isExpanded ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
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
                    animate={isExpanded ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                    transition={{ delay: 0.2 + i * 0.05, duration: 0.3 }}
                    whileHover={{ scale: 1.05, borderColor: "rgba(255, 255, 255, 0.5)" }}
                    className="px-3 py-1 bg-gray-800/50 text-gray-300 rounded-full text-xs md:text-sm border border-gray-700 hover:border-white/50 hover:bg-white/10 transition-all duration-300 cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export function AboutView() {
  const [expandedCards, setExpandedCards] = useState<{ [key: number]: boolean }>({})
  const heroRef = useRef<HTMLElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  const toggleCard = (index: number) => {
    setExpandedCards((prev) => ({
      ...prev,
      [index]: !prev[index],
    }))
  }

  useState(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return
      const rect = timelineRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const timelineHeight = rect.height

      const scrolledPastTop = Math.max(0, -rect.top)
      const visibleHeight = Math.min(timelineHeight, windowHeight - Math.max(0, rect.top))
      const progress = Math.min(1, Math.max(0, scrolledPastTop / (timelineHeight - windowHeight + 200)))

      setScrollProgress(progress)
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  })

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
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
                className="relative order-2 md:order-1"
              >
                <div className="relative w-full max-w-[600px] mx-auto">
                  <CinematicParticles />

                  <div className="relative pb-4 image-soft-mask aspect-[4/5]" style={{ zIndex: 10 }}>
                    <Image
                      src="/images/layer-201.png"
                      alt="Miha Sodja - Lead Product Designer"
                      fill
                      priority
                      className="object-contain object-center"
                    />
                  </div>
                </div>
              </motion.div>

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

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="flex flex-wrap gap-3"
                >
                  {["Product Design", "UI/UX", "Design Systems", "Prototyping"].map((skill) => (
                    <span
                      key={skill}
                      className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300"
                    >
                      {skill}
                    </span>
                  ))}
                </motion.div>
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

          <div ref={timelineRef} className="relative space-y-0">
            <div className="absolute left-3 md:left-1/2 top-0 bottom-0 w-px bg-gray-800" style={{ zIndex: 1 }} />
            <motion.div
              className="absolute left-3 md:left-1/2 top-0 w-px bg-white origin-top"
              style={{
                height: `${scrollProgress * 100}%`,
                boxShadow: "0 0 8px rgba(255,255,255,0.6)",
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
                  className="absolute w-1 h-1 rounded-full bg-[#D13AFF]/40"
                  style={{
                    left: `${15 + i * 15}%`,
                    top: `${30 + (i % 3) * 20}%`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0.2, 0.5, 0.2],
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
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => (window.location.hash = "contact")}
              className="px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-gray-100 transition-all duration-300 shadow-lg shadow-white/20"
            >
              Get in touch
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
