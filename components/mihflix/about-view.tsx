"use client"

import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { workExperiences } from "@/lib/data"
import { Calendar, MapPin, ChevronDown } from "lucide-react"
import { useState, useRef } from "react"
import { cn } from "@/lib/utils"
import Image from "next/image"

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
      {/* Animated glow behind badge */}
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
      {/* Subtle outer glow - only for active */}
      {isActive && (
        <motion.div
          className="absolute w-5 h-5 rounded-full bg-white/20"
          animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.1, 0.3] }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
      )}
      {/* Core dot - smaller and cleaner */}
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
}: {
  exp: (typeof workExperiences)[0]
  index: number
  isExpanded: boolean
  onToggle: () => void
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardRef, { once: true, margin: "-100px" })

  // Alternating animation direction
  const slideDirection = index % 2 === 0 ? -60 : 60

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
        index % 2 === 0 ? "md:ml-0 md:pr-8" : "md:ml-auto md:pl-8",
      )}
    >
      {/* Timeline Dot */}
      <div
        className={cn(
          "absolute z-10",
          "left-[4px] top-6",
          index % 2 === 0 ? "md:left-auto md:right-[-8px]" : "md:left-[-8px] md:right-auto",
        )}
      >
        <TimelineDot isActive={exp.current || false} index={index} />
      </div>

      {/* Year Badge - Desktop only */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className={cn(
          "absolute top-5 hidden md:block text-white font-bold text-lg",
          index % 2 === 0 ? "right-[-90px]" : "left-[-90px]",
        )}
      >
        {exp.year}
      </motion.div>

      {/* Card */}
      <button onClick={onToggle} className="w-full text-left group">
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
          {/* Animated border gradient on hover */}
          <motion.div
            className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(255,255,255,0.1) 100%)",
            }}
          />

          {/* Header */}
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

          {/* Meta */}
          <div className="relative flex flex-col md:flex-row md:flex-wrap md:items-center gap-2 md:gap-4 text-sm text-gray-400 mb-4">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 flex-shrink-0" />
              <span>{exp.period}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 flex-shrink-0" />
              <span>{exp.location}</span>
            </div>
            <span className="hidden md:inline text-gray-500">•</span>
            <span className="text-gray-300 font-medium">{exp.duration}</span>
          </div>

          {/* Description */}
          <p className="relative text-gray-300 leading-relaxed text-sm md:text-base">{exp.description}</p>

          {/* Expanded Content */}
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
              {/* Key Contributions */}
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

              {/* Skills */}
              <div>
                <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {exp.skills.map((skill, i) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isExpanded ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                      transition={{ delay: 0.2 + i * 0.05, duration: 0.3 }}
                      className="px-3 py-1 bg-gray-800/50 text-gray-300 rounded-full text-xs md:text-sm border border-gray-700 hover:border-white/50 hover:bg-white/10 transition-all duration-300"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </button>
    </motion.div>
  )
}

export function AboutView() {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"],
  })

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
  const lineOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1])

  const [scrollValue, setScrollValue] = useState(0)
  scrollYProgress.on("change", (v) => setScrollValue(v))

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      className="min-h-screen bg-black pt-32 pb-20"
    >
      <div className="px-6 md:px-12 lg:px-16 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
          className="mb-24 grid md:grid-cols-2 gap-12 md:gap-16 items-center"
        >
          {/* Large portrait with premium effects */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
            className="relative order-2 md:order-1"
          >
            {/* Animated glow border */}
            <motion.div
              className="absolute -inset-3 rounded-2xl opacity-50 blur-xl"
              style={{
                background: "linear-gradient(135deg, #FFFFFF 0%, rgba(255,255,255,0.85) 50%, #FFFFFF 100%)",
              }}
              animate={{
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />

            {/* Portrait container */}
            <div className="relative rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-2xl">
              <div className="aspect-[4/5] relative">
                <Image
                  src="/images/miha-portrait.png"
                  alt="Miha Sodja - Lead Product Designer"
                  fill
                  priority
                  className="object-cover"
                />

                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 rounded-full bg-white/40"
                      style={{
                        left: `${15 + (i % 4) * 25}%`,
                        top: `${20 + Math.floor(i / 4) * 40}%`,
                      }}
                      animate={{
                        y: [0, -60, 0],
                        x: [i % 2 === 0 ? -10 : 10, 0, i % 2 === 0 ? -10 : 10],
                        opacity: [0, 0.5, 0],
                        scale: [0.3, 1, 0.3],
                      }}
                      transition={{
                        duration: 6 + i * 0.5,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: i * 0.8,
                        ease: "easeOut",
                      }}
                    />
                  ))}
                </div>

                {/* Subtle vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              </div>
            </div>
          </motion.div>

          {/* Profile info */}
          <div className="order-1 md:order-2">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
            >
              Miha Sodja
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-2xl md:text-3xl mb-8 text-transparent bg-clip-text bg-gradient-to-r from-gray-200 via-gray-400 to-gray-300 font-medium leading-relaxed"
            >
              Lead Designer | Crafting Engaging User Experiences | Utilising AI
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-lg text-gray-400 mb-8 text-pretty leading-relaxed"
            >
              Senior product designer with 15+ years of experience transforming complex products into intuitive,
              conversion-focused experiences across SaaS, healthcare, self-scheduling platforms, and high-growth
              marketplaces.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex flex-wrap gap-3"
            >
              {["Product Design", "UI/UX", "Design Systems", "Digital Health"].map((skill, i) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + i * 0.1, duration: 0.3 }}
                  whileHover={{ scale: 1.05, borderColor: "rgba(255, 255, 255, 0.5)" }}
                  className="px-4 py-1.5 bg-transparent border border-gray-600 text-gray-300 rounded-full text-sm hover:border-white/50 hover:text-white transition-colors cursor-default"
                >
                  {skill}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Experience section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3">
            <h2 className="text-2xl md:text-3xl font-bold text-white">Experience</h2>
            <PulsatingDot />
          </div>
          <p className="text-gray-400 mt-2">Professional journey across healthcare, fintech, and digital products</p>
        </motion.div>

        <div ref={timelineRef} className="relative">
          {/* Background line - more subtle */}
          <div className="absolute left-3 md:left-1/2 top-0 bottom-0 w-px bg-gray-800/30" />

          <motion.div
            className="absolute left-3 md:left-1/2 top-0 w-px"
            style={{
              height: lineHeight,
              opacity: lineOpacity,
              background: "linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 90%, transparent 100%)",
            }}
          >
            {/* Subtle glow effect */}
            <div
              className="absolute inset-0 w-px"
              style={{
                boxShadow: "0 0 8px rgba(255,255,255,0.4), 0 0 16px rgba(255,255,255,0.2)",
              }}
            />
            {/* Leading edge glow dot */}
            <motion.div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-white"
              style={{
                boxShadow: "0 0 12px rgba(255,255,255,0.8), 0 0 24px rgba(255,255,255,0.4)",
              }}
            />
          </motion.div>

          <TimelineParticles scrollProgress={scrollValue} />

          {/* Experience Items */}
          <div className="space-y-8 md:space-y-12">
            {workExperiences.map((exp, index) => (
              <ExperienceCard
                key={exp.id}
                exp={exp}
                index={index}
                isExpanded={expandedId === exp.id}
                onToggle={() => setExpandedId(expandedId === exp.id ? null : exp.id)}
              />
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
          className="mt-20 text-center"
        >
          <motion.div
            whileHover={{ scale: 1.02, y: -4 }}
            transition={{ duration: 0.3 }}
            className="inline-block p-8 bg-gradient-to-br from-gray-900/80 to-gray-900/40 backdrop-blur rounded-2xl border border-gray-800 relative overflow-hidden group hover:border-white/30"
          >
            {/* Subtle top accent line */}
            <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />

            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-0.5 h-0.5 rounded-full bg-[#D13AFF]/60"
                  style={{
                    left: `${15 + i * 25}%`,
                    bottom: "10%",
                  }}
                  animate={{
                    y: [0, -40, 0],
                    opacity: [0, 0.6, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: i * 0.8,
                    ease: "easeOut",
                  }}
                />
              ))}
            </div>

            <h3 className="text-2xl font-bold text-white mb-3 relative">Want to work together?</h3>
            <p className="text-gray-400 mb-6 max-w-md mx-auto relative">
              I'm available for freelance projects and full-time opportunities in product design and UX leadership.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center relative">
              <motion.a
                href="mailto:miha.sodja@gmail.com"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-white text-black rounded-lg font-semibold hover:bg-white/85 transition-all shadow-lg shadow-white/20"
              >
                Email me
              </motion.a>
              <motion.a
                href="/#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-transparent text-white rounded-lg font-semibold border border-white/25 hover:bg-white/8 hover:border-white/50 transition-all"
              >
                View contact page
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}
