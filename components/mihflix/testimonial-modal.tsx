"use client"

import { useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronLeft, ChevronRight, Star } from "lucide-react"
import type { ContentItem } from "@/lib/data"
import { cn } from "@/lib/utils"

interface TestimonialModalProps {
  testimonials: ContentItem[]
  currentIndex: number
  isOpen: boolean
  onClose: () => void
  onNavigate: (index: number) => void
}

function StarRating({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 >= 0.5
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

  return (
    <div className="flex items-center gap-1">
      {/* Full stars */}
      {[...Array(fullStars)].map((_, i) => (
        <div key={`full-${i}`} className="relative">
          <Star className="h-5 w-5 text-amber-400 fill-amber-400 drop-shadow-[0_0_3px_rgba(251,191,36,0.5)]" />
        </div>
      ))}
      {/* Half star */}
      {hasHalfStar && (
        <div className="relative">
          <Star className="h-5 w-5 text-amber-400/30" />
          <div className="absolute inset-0 overflow-hidden w-[50%]">
            <Star className="h-5 w-5 text-amber-400 fill-amber-400 drop-shadow-[0_0_3px_rgba(251,191,36,0.5)]" />
          </div>
        </div>
      )}
      {/* Empty stars */}
      {[...Array(emptyStars)].map((_, i) => (
        <div key={`empty-${i}`} className="relative">
          <Star className="h-5 w-5 text-amber-400/30" />
        </div>
      ))}
      <span className="ml-2 text-sm font-semibold text-white">{rating.toFixed(1)}</span>
    </div>
  )
}

export function TestimonialModal({ testimonials, currentIndex, isOpen, onClose, onNavigate }: TestimonialModalProps) {
  const testimonial = testimonials[currentIndex]
  const isFirst = currentIndex === 0
  const isLast = currentIndex === testimonials.length - 1

  const handlePrev = useCallback(() => {
    if (!isFirst) {
      onNavigate(currentIndex - 1)
    }
  }, [currentIndex, isFirst, onNavigate])

  const handleNext = useCallback(() => {
    if (!isLast) {
      onNavigate(currentIndex + 1)
    }
  }, [currentIndex, isLast, onNavigate])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowLeft") handlePrev()
      if (e.key === "ArrowRight") handleNext()
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, onClose, handlePrev, handleNext])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  if (!testimonial) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

          <div className="relative z-50 flex items-center gap-4 md:gap-6">
            {/* Navigation Arrow - Left */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                handlePrev()
              }}
              className={cn(
                "flex-shrink-0 rounded-full bg-black/60 p-3 text-white backdrop-blur-sm transition-all duration-150 hover:bg-black/80 hover:scale-110",
                isFirst ? "opacity-0 pointer-events-none" : "opacity-100",
              )}
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            {/* Modal Content */}
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="relative w-full max-w-2xl max-h-[70vh] overflow-y-auto rounded-3xl bg-[#0a0a0a] shadow-2xl border border-white/20"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute right-4 top-4 z-20 rounded-full bg-black/60 p-2 text-white backdrop-blur-sm transition-all hover:bg-black/80 hover:scale-110"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="relative h-28 overflow-hidden">
                <div
                  className="absolute inset-0 animate-gradient-shift"
                  style={{
                    background:
                      "linear-gradient(135deg, #000000 0%, #0a1628 25%, #1e3a5f 50%, #0a1628 75%, #000000 100%)",
                    backgroundSize: "400% 400%",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
                {/* Subtle shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-blue-500/10 opacity-60" />
              </div>

              {/* Content - reduced top spacing */}
              <div className="relative px-8 pb-8 -mt-8">
                <div className="mb-3">
                  <StarRating rating={testimonial.rating || 5} />
                </div>

                {/* Title */}
                <h2 className="text-2xl font-bold text-white mb-4">{testimonial.title}</h2>

                {/* Full Comment */}
                <p className="text-gray-300 text-base leading-[1.7] mb-6">"{testimonial.shortDescription}"</p>

                {/* Project Info - removed share button */}
                <div className="space-y-3 border-t border-white/10 pt-5">
                  <div>
                    <p className="text-sm text-gray-500">Project</p>
                    <p className="text-sm font-medium text-white">{testimonial.projectName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Date</p>
                    <p className="text-sm font-medium text-white">{testimonial.dateRange}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Navigation Arrow - Right */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleNext()
              }}
              className={cn(
                "flex-shrink-0 rounded-full bg-black/60 p-3 text-white backdrop-blur-sm transition-all duration-150 hover:bg-black/80 hover:scale-110",
                isLast ? "opacity-0 pointer-events-none" : "opacity-100",
              )}
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
