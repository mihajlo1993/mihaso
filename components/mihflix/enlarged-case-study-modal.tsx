"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { X, Share2, ExternalLink, Check, ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { caseStudyThemes, type ThemeColors } from "@/lib/color-extractor"

interface EnlargedCaseStudySection {
  id: string
  title: string
  content: React.ReactNode
}

interface EnlargedCaseStudyProps {
  isOpen: boolean
  onClose: () => void
  title: string
  tags: string[]
  gradientType: string
  liveUrl?: string
  slug?: string
  sections: EnlargedCaseStudySection[]
  themeColors?: ThemeColors
}

export function EnlargedCaseStudyModal({
  isOpen,
  onClose,
  title,
  tags,
  gradientType,
  liveUrl,
  slug,
  sections,
  themeColors,
}: EnlargedCaseStudyProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [showCopiedToast, setShowCopiedToast] = useState(false)
  const [activeSection, setActiveSection] = useState<string>(sections[0]?.id || "")
  const [scrollProgress, setScrollProgress] = useState(0)
  const [openAccordions, setOpenAccordions] = useState<Set<string>>(new Set([sections[0]?.id || ""]))
  const [isMobile, setIsMobile] = useState(false)

  const theme = themeColors || caseStudyThemes[slug || "alvara"] || caseStudyThemes.alvara

  const isScrolled = scrollProgress > 0.1
  const isCollapsed = scrollProgress > 0.5

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
      if (scrollRef.current) {
        scrollRef.current.scrollTop = 0
      }
      setScrollProgress(0)
      setOpenAccordions(new Set([sections[0]?.id || ""]))
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen, sections])

  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    const handleScroll = () => {
      const scrollTop = container.scrollTop
      const progress = Math.min(scrollTop / 200, 1)
      setScrollProgress(progress)

      if (!isMobile) {
        const sectionElements = sections.map((s) => ({
          id: s.id,
          element: document.getElementById(s.id),
        }))

        for (let i = sectionElements.length - 1; i >= 0; i--) {
          const section = sectionElements[i]
          if (section.element) {
            const rect = section.element.getBoundingClientRect()
            if (rect.top <= 200) {
              setActiveSection(section.id)
              break
            }
          }
        }
      }
    }

    container.addEventListener("scroll", handleScroll)
    return () => container.removeEventListener("scroll", handleScroll)
  }, [sections, isMobile])

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleEsc)
    return () => window.removeEventListener("keydown", handleEsc)
  }, [onClose])

  const handleShare = async () => {
    const url = `${window.location.origin}/work/${slug || "alvara"}`

    try {
      await navigator.clipboard.writeText(url)
      setShowCopiedToast(true)
      setTimeout(() => setShowCopiedToast(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  const handleViewLiveProject = () => {
    if (liveUrl) {
      window.open(liveUrl, "_blank", "noopener,noreferrer")
    }
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element && scrollRef.current) {
      const container = scrollRef.current
      const elementTop = element.offsetTop - 140
      container.scrollTo({ top: elementTop, behavior: "smooth" })
    }
  }

  const toggleAccordion = (sectionId: string) => {
    setOpenAccordions((prev) => {
      const next = new Set(prev)
      if (next.has(sectionId)) {
        next.delete(sectionId)
      } else {
        next.add(sectionId)
      }
      return next
    })
  }

  const coverHeight = isMobile ? Math.max(60, 250 * (1 - scrollProgress)) : Math.max(80, 384 * (1 - scrollProgress))

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center md:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute inset-0 bg-black/90 backdrop-blur-xl"
              onClick={onClose}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className={cn(
                "relative flex flex-col overflow-hidden bg-black",
                "h-full w-full md:h-auto md:max-h-[92vh] md:w-full md:max-w-6xl md:rounded-2xl",
                "shadow-[0_24px_80px_rgba(0,0,0,0.8)] md:ring-1 md:ring-white/10",
              )}
              style={
                {
                  "--theme-primary": theme.primary,
                  "--theme-secondary": theme.secondary,
                  "--theme-accent": theme.accent,
                  "--theme-text": theme.text,
                } as React.CSSProperties
              }
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-30 rounded-full bg-black/80 p-2.5 text-white backdrop-blur-sm transition-all hover:bg-black hover:scale-110"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>

              <div ref={scrollRef} className="flex-1 overflow-y-auto scrollbar-premium">
                <motion.div style={{ height: coverHeight }} className="relative flex-shrink-0 overflow-hidden">
                  <Image
                    src="/images/alvara-cover-v2.jpg"
                    alt={title}
                    fill
                    className="object-cover object-center"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-transparent to-transparent" />

                  <motion.div
                    style={{ opacity: 1 - scrollProgress * 2 }}
                    className="absolute bottom-0 left-0 right-0 p-5 md:p-12"
                  >
                    <div className="mb-3 flex flex-wrap gap-1.5 md:mb-4 md:gap-2.5">
                      {tags.map((tag, index) => (
                        <motion.span
                          key={tag}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: 0.3 + index * 0.05, ease: "easeOut" }}
                          className="rounded-md border border-white/20 bg-white/10 px-2 py-1 text-[10px] font-semibold text-white shadow-lg backdrop-blur-sm md:rounded-full md:px-3.5 md:py-1.5 md:text-xs"
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </div>
                    <h2 className="text-balance text-2xl font-bold leading-tight text-white sm:text-3xl md:text-4xl lg:text-5xl">
                      {title}
                    </h2>
                  </motion.div>
                </motion.div>

                <div
                  className={cn(
                    "sticky top-0 z-20 border-b border-white/10 bg-black/95 backdrop-blur-md transition-all duration-300",
                  )}
                >
                  <motion.div
                    initial={false}
                    animate={{
                      height: isCollapsed ? "auto" : 0,
                      opacity: isCollapsed ? 1 : 0,
                    }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="overflow-hidden border-b border-white/5"
                  >
                    <div className="flex items-center gap-3 px-4 py-3 md:px-8">
                      <div className="hidden flex-wrap gap-2 sm:flex">
                        {tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[10px] font-semibold text-white"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h3 className="truncate text-base font-bold text-white md:text-lg">{title}</h3>
                    </div>
                  </motion.div>

                  <div className="hidden px-4 py-3 md:block md:px-8">
                    <div className="flex flex-wrap items-center justify-center gap-1.5 text-xs md:gap-2 md:text-sm lg:justify-start">
                      {sections.map((section, index) => (
                        <button
                          key={section.id}
                          onClick={() => scrollToSection(section.id)}
                          className={cn(
                            "relative whitespace-nowrap rounded-full px-3 py-1.5 font-medium transition-all duration-200 md:px-3.5 md:py-2",
                            activeSection === section.id ? "text-white" : "text-gray-400 hover:text-gray-200",
                          )}
                        >
                          {activeSection === section.id && (
                            <motion.div
                              layoutId="activeTab"
                              className="absolute inset-0 rounded-full bg-white/15"
                              transition={{ type: "spring", stiffness: 380, damping: 30 }}
                            />
                          )}
                          <span className="relative z-10">
                            {index + 1} {section.title}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mx-auto max-w-4xl px-5 py-8 md:px-12 md:py-14">
                  {isMobile ? (
                    <div className="space-y-3">
                      {sections.map((section, index) => (
                        <div key={section.id} className="border-b border-white/10">
                          <button
                            onClick={() => toggleAccordion(section.id)}
                            className="flex w-full items-center justify-between py-4 text-left"
                          >
                            <span className="text-base font-bold text-white">
                              <span style={{ color: theme.primary }}>{index + 1}.</span> {section.title}
                            </span>
                            <motion.div
                              animate={{ rotate: openAccordions.has(section.id) ? 180 : 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <ChevronDown className="h-5 w-5 text-gray-400" />
                            </motion.div>
                          </button>
                          <AnimatePresence>
                            {openAccordions.has(section.id) && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.25, ease: "easeOut" }}
                                className="overflow-hidden"
                              >
                                <div className="pb-6">{section.content}</div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ))}
                    </div>
                  ) : (
                    sections.map((section, index) => (
                      <motion.section
                        key={section.id}
                        id={section.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                        className="mb-16 scroll-mt-48"
                      >
                        {section.content}
                      </motion.section>
                    ))
                  )}

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className="mt-8 flex flex-col items-center gap-4 border-t border-white/10 pt-8 sm:flex-row sm:justify-center md:mt-12 md:pt-12"
                  >
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.14 }}
                      onClick={handleViewLiveProject}
                      disabled={!liveUrl}
                      className={cn(
                        "flex w-full items-center justify-center gap-2 rounded-lg px-8 py-3.5 text-sm font-bold shadow-lg transition-colors sm:w-auto md:px-10 md:py-4 md:text-base",
                        liveUrl
                          ? "bg-white text-black hover:bg-gray-200"
                          : "cursor-not-allowed bg-gray-800 text-gray-500",
                      )}
                    >
                      <ExternalLink className="h-4 w-4 md:h-5 md:w-5" />
                      View live project
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.14 }}
                      onClick={handleShare}
                      className="rounded-full bg-gray-900 p-3 text-white transition-colors hover:bg-gray-800 md:p-4"
                      aria-label="Share project"
                    >
                      <Share2 className="h-5 w-5 md:h-6 md:w-6" />
                    </motion.button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showCopiedToast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-8 left-1/2 z-[60] -translate-x-1/2"
          >
            <div className="flex items-center gap-3 rounded-lg bg-green-600/95 px-6 py-3 text-white shadow-2xl backdrop-blur-sm">
              <Check className="h-5 w-5" />
              <span className="font-medium">Link copied successfully</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export function SectionHeading({ children }: { children: React.ReactNode }) {
  return <h3 className="mb-4 text-xl font-bold text-white md:mb-6 md:text-2xl lg:text-3xl">{children}</h3>
}

export function SectionParagraph({ children }: { children: React.ReactNode }) {
  return <p className="mb-4 text-pretty text-sm leading-relaxed text-gray-300 md:text-base lg:text-lg">{children}</p>
}

export function SectionBullets({ items }: { items: string[] }) {
  return (
    <ul className="mb-6 space-y-2 md:space-y-3">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3 text-sm text-gray-300 md:text-base">
          <span
            className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full"
            style={{ backgroundColor: "var(--theme-primary, #E50914)" }}
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

export function SectionImage({ src, alt, priority }: { src: string; alt: string; priority?: boolean }) {
  return (
    <div className="my-6 overflow-hidden rounded-lg ring-1 ring-white/10 md:my-8 md:rounded-xl">
      <Image
        src={src || "/placeholder.svg"}
        alt={alt}
        width={1200}
        height={800}
        className="h-auto w-full"
        priority={priority}
      />
    </div>
  )
}

export function TwoColumnLayout({ left, right }: { left: React.ReactNode; right: React.ReactNode }) {
  return (
    <div className="grid gap-6 md:gap-8 md:grid-cols-2">
      <div>{left}</div>
      <div>{right}</div>
    </div>
  )
}
