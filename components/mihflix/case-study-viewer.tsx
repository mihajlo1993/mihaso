"use client"

import type React from "react"

import { useEffect, useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { GradientBackground } from "./gradient-background"
import type { CaseStudyViewerContent } from "@/lib/data"

interface CaseStudyViewerProps {
  content: CaseStudyViewerContent
  isOpen: boolean
  onClose: () => void
}

const PAGE_LABELS = ["Overview", "Problem", "Research", "Decisions", "Final", "Impact"]

function ImagePlaceholder({ label, gradient }: { label: string; gradient: string }) {
  return (
    <div className="relative aspect-video overflow-hidden rounded-xl">
      <GradientBackground type={gradient as any} className="absolute inset-0" overlay={false} />
      <div className="absolute inset-0 bg-black/30" />
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent" />
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <p className="text-center text-sm font-medium text-white/80">{label}</p>
      </div>
    </div>
  )
}

function Page({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("flex min-h-full flex-col justify-center px-8 py-16 md:px-16 lg:px-24", className)}>
      {children}
    </div>
  )
}

export function CaseStudyViewer({ content, isOpen, onClose }: CaseStudyViewerProps) {
  const [currentPage, setCurrentPage] = useState(0)
  const totalPages = 6

  const goToPage = useCallback((index: number) => {
    if (index >= 0 && index < totalPages) {
      setCurrentPage(index)
    }
  }, [])

  const nextPage = useCallback(() => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1)
    }
  }, [currentPage])

  const prevPage = useCallback(() => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1)
    }
  }, [currentPage])

  useEffect(() => {
    if (!isOpen) {
      setCurrentPage(0)
      return
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        prevPage()
      } else if (e.key === "ArrowLeft") {
        prevPage()
      } else if (e.key === "ArrowRight") {
        nextPage()
      }
    }

    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", handleKeyDown)

    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen, onClose, nextPage, prevPage])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[60] flex flex-col bg-black">
      {/* Top Bar */}
      <div className="relative z-10 flex items-center justify-between border-b border-white/10 bg-black/80 px-8 py-6 backdrop-blur-lg">
        <div className="flex items-center gap-4">
          <h1 className="text-balance text-xl font-bold text-white md:text-2xl">{content.title}</h1>
          {content.tags && content.tags.length > 0 && (
            <div className="hidden items-center gap-2 md:flex">
              {content.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="rounded-full bg-white/10 px-3 py-1 text-xs text-gray-300">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
        <button
          onClick={onClose}
          className="rounded-full bg-white/10 p-2.5 text-white transition-all hover:bg-white/20 hover:rotate-90"
          aria-label="Close viewer"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Main Content Area */}
      <div className="relative flex-1 overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute inset-0 overflow-y-auto"
          >
            {currentPage === 0 && (
              <Page>
                <div className="mx-auto max-w-4xl space-y-8">
                  <div className="space-y-4">
                    <h2 className="text-4xl font-bold text-white md:text-5xl lg:text-6xl">Overview & Outcomes</h2>
                    <p className="text-pretty text-xl text-gray-300 md:text-2xl">{content.pages.overview.hook}</p>
                  </div>

                  <div className="space-y-3 text-lg text-gray-300">
                    {content.pages.overview.bullets.map((bullet, i) => (
                      <div key={i} className="flex gap-3">
                        <span className="text-[#E50914]">•</span>
                        <span>{bullet}</span>
                      </div>
                    ))}
                  </div>

                  {content.pages.overview.outcomes && (
                    <div className="space-y-4 rounded-2xl bg-white/5 p-8">
                      <h3 className="text-2xl font-bold text-white">Key Outcomes</h3>
                      <div className="space-y-3 text-lg text-gray-300">
                        {content.pages.overview.outcomes.map((outcome, i) => (
                          <div key={i} className="flex gap-3">
                            <span className="text-green-500">✓</span>
                            <span>{outcome}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {content.pages.overview.heroImage && (
                    <ImagePlaceholder label={content.pages.overview.heroImage} gradient={content.gradientType} />
                  )}
                </div>
              </Page>
            )}

            {currentPage === 1 && (
              <Page>
                <div className="mx-auto max-w-4xl space-y-8">
                  <h2 className="text-4xl font-bold text-white md:text-5xl lg:text-6xl">Problem & Context</h2>

                  <div className="space-y-6 text-lg text-gray-300">
                    <div>
                      <h3 className="mb-3 text-xl font-bold text-white">What Was Broken</h3>
                      <p className="whitespace-pre-line leading-relaxed">{content.pages.problem.broken}</p>
                    </div>

                    <div>
                      <h3 className="mb-3 text-xl font-bold text-white">Business Context</h3>
                      <p className="whitespace-pre-line leading-relaxed">{content.pages.problem.context}</p>
                    </div>

                    <div>
                      <h3 className="mb-3 text-xl font-bold text-white">User Needs</h3>
                      <p className="whitespace-pre-line leading-relaxed">{content.pages.problem.userNeeds}</p>
                    </div>
                  </div>
                </div>
              </Page>
            )}

            {currentPage === 2 && (
              <Page>
                <div className="mx-auto max-w-4xl space-y-8">
                  <h2 className="text-4xl font-bold text-white md:text-5xl lg:text-6xl">Approach & Research</h2>

                  <div className="space-y-6 text-lg text-gray-300">
                    <div>
                      <h3 className="mb-3 text-xl font-bold text-white">Research Methods</h3>
                      <p className="whitespace-pre-line leading-relaxed">{content.pages.research.methods}</p>
                    </div>

                    {content.pages.research.insights && (
                      <div className="space-y-4 rounded-2xl bg-white/5 p-8">
                        <h3 className="text-xl font-bold text-white">Key Insights</h3>
                        <div className="space-y-3">
                          {content.pages.research.insights.map((insight, i) => (
                            <div key={i} className="flex gap-3">
                              <span className="text-[#E50914]">{i + 1}.</span>
                              <span>{insight}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Page>
            )}

            {currentPage === 3 && (
              <Page>
                <div className="mx-auto max-w-4xl space-y-8">
                  <h2 className="text-4xl font-bold text-white md:text-5xl lg:text-6xl">Exploration & Decisions</h2>

                  {content.pages.decisions.map((decision, i) => (
                    <div key={i} className="space-y-4 rounded-2xl bg-white/5 p-8">
                      <h3 className="text-2xl font-bold text-white">{decision.title}</h3>
                      <div className="space-y-3 text-lg text-gray-300">
                        <div>
                          <span className="font-semibold text-white">Trade-off: </span>
                          {decision.tradeoff}
                        </div>
                        <div>
                          <span className="font-semibold text-white">Why this won: </span>
                          {decision.why}
                        </div>
                        <div>
                          <span className="font-semibold text-white">Impact: </span>
                          {decision.impact}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Page>
            )}

            {currentPage === 4 && (
              <Page>
                <div className="mx-auto max-w-4xl space-y-8">
                  <h2 className="text-4xl font-bold text-white md:text-5xl lg:text-6xl">Final Experience</h2>

                  <p className="text-xl text-gray-300">{content.pages.final.description}</p>

                  {content.pages.final.screens && (
                    <div className="grid gap-6 md:grid-cols-2">
                      {content.pages.final.screens.map((screen, i) => (
                        <ImagePlaceholder key={i} label={screen} gradient={content.gradientType} />
                      ))}
                    </div>
                  )}

                  {content.pages.final.craftDetails && (
                    <div className="space-y-4 rounded-2xl bg-white/5 p-8">
                      <h3 className="text-2xl font-bold text-white">Craft & Details</h3>
                      <div className="space-y-3 text-lg text-gray-300">
                        {content.pages.final.craftDetails.map((detail, i) => (
                          <div key={i} className="flex gap-3">
                            <span className="text-[#E50914]">•</span>
                            <span>{detail}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </Page>
            )}

            {currentPage === 5 && (
              <Page>
                <div className="mx-auto max-w-4xl space-y-8">
                  <h2 className="text-4xl font-bold text-white md:text-5xl lg:text-6xl">Impact & Reflection</h2>

                  <div className="space-y-6">
                    {content.pages.impact.metrics && (
                      <div className="space-y-4 rounded-2xl bg-white/5 p-8">
                        <h3 className="text-2xl font-bold text-white">Measured Impact</h3>
                        <div className="space-y-3 text-lg text-gray-300">
                          {content.pages.impact.metrics.map((metric, i) => (
                            <div key={i} className="flex gap-3">
                              <span className="text-green-500">✓</span>
                              <span>{metric}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {content.pages.impact.feedback && (
                      <div className="rounded-2xl bg-gradient-to-br from-[#E50914]/20 to-purple-900/20 p-8">
                        <blockquote className="text-xl italic text-gray-200">
                          "{content.pages.impact.feedback.quote}"
                        </blockquote>
                        <p className="mt-3 text-sm text-gray-400">— {content.pages.impact.feedback.source}</p>
                      </div>
                    )}

                    <div className="space-y-4 text-lg text-gray-300">
                      <div>
                        <h3 className="mb-3 text-xl font-bold text-white">What's Next</h3>
                        <p className="leading-relaxed">{content.pages.impact.next}</p>
                      </div>

                      <div>
                        <h3 className="mb-3 text-xl font-bold text-white">What I Learned</h3>
                        <p className="leading-relaxed">{content.pages.impact.learned}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Page>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Navigation - Case Study Player */}
      <div className="relative z-10 border-t border-white/10 bg-black/80 px-8 py-6 backdrop-blur-lg">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-8">
          {/* Previous Button */}
          <button
            onClick={prevPage}
            disabled={currentPage === 0}
            className={cn(
              "rounded-full p-3 transition-all",
              currentPage === 0
                ? "cursor-not-allowed bg-white/5 text-gray-600"
                : "bg-white/10 text-white hover:bg-white/20 hover:scale-110",
            )}
            aria-label="Previous page"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          {/* Progress Bar */}
          <div className="flex flex-1 flex-col items-center gap-3">
            <div className="flex w-full max-w-3xl items-center gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToPage(i)}
                  className="group relative flex-1"
                  aria-label={`Go to ${PAGE_LABELS[i]}`}
                >
                  <div
                    className={cn(
                      "h-1.5 rounded-full transition-all duration-200",
                      i === currentPage
                        ? "bg-[#E50914] shadow-[0_0_12px_rgba(229,9,20,0.6)]"
                        : i < currentPage
                          ? "bg-white/40"
                          : "bg-white/20 group-hover:bg-white/30",
                    )}
                  />
                </button>
              ))}
            </div>

            {/* Labels */}
            <div className="hidden w-full max-w-3xl md:flex">
              {PAGE_LABELS.map((label, i) => (
                <button
                  key={i}
                  onClick={() => goToPage(i)}
                  className={cn(
                    "flex-1 text-center text-xs transition-colors",
                    i === currentPage ? "font-bold text-white" : "text-gray-500 hover:text-gray-300",
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Next Button */}
          <div className="flex items-center gap-4">
            <button
              onClick={nextPage}
              disabled={currentPage === totalPages - 1}
              className={cn(
                "rounded-full p-3 transition-all",
                currentPage === totalPages - 1
                  ? "cursor-not-allowed bg-white/5 text-gray-600"
                  : "bg-white/10 text-white hover:bg-white/20 hover:scale-110",
              )}
              aria-label="Next page"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            <span className="hidden text-xs text-gray-500 lg:block">Use ← → to navigate</span>
          </div>
        </div>
      </div>
    </div>
  )
}
