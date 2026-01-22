"use client"

import { useRef, useState } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import type { ContentItem } from "@/lib/data"
import { cn } from "@/lib/utils"

interface TestimonialsRowProps {
  testimonials: ContentItem[]
}

function StarRating({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 >= 0.5
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

  return (
    <div className="flex items-center gap-0.5">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} className="h-4 w-4 text-amber-400 fill-amber-400" />
      ))}
      {hasHalfStar && (
        <div className="relative">
          <Star className="h-4 w-4 text-amber-400/30" />
          <div className="absolute inset-0 overflow-hidden w-[50%]">
            <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
          </div>
        </div>
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} className="h-4 w-4 text-amber-400/30" />
      ))}
      <span className="ml-1.5 text-xs font-medium text-white/70">{rating.toFixed(1)}</span>
    </div>
  )
}

function TestimonialCard({ testimonial, index }: { testimonial: ContentItem; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className="group relative flex-shrink-0 w-[340px] md:w-[400px] rounded-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 p-6 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06]"
    >
      {/* Rating */}
      <div className="mb-4">
        <StarRating rating={testimonial.rating || 5} />
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-white mb-3 line-clamp-2 leading-snug">{testimonial.title}</h3>

      {/* Quote */}
      <p className="text-sm text-gray-400 leading-relaxed mb-5 line-clamp-4">"{testimonial.shortDescription}"</p>

      {/* Divider */}
      <div className="border-t border-white/10 pt-4 mt-auto">
        {/* Project Info */}
        <div className="space-y-1.5">
          <p className="text-xs text-gray-500 uppercase tracking-wider">Project</p>
          <p className="text-sm font-medium text-white/90 line-clamp-1">{testimonial.projectName}</p>
          <p className="text-xs text-gray-500">{testimonial.dateRange}</p>
        </div>
      </div>

      {/* Tags */}
      {testimonial.tags && testimonial.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-4">
          {testimonial.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="px-2 py-0.5 text-xs rounded-full bg-white/5 text-gray-400 border border-white/5">
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Subtle hover glow */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5" />
    </motion.article>
  )
}

export function TestimonialsRow({ testimonials }: TestimonialsRowProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setCanScrollLeft(scrollLeft > 10)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 420
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  return (
    <section className="relative">
      {/* Header */}
      <div className="flex items-end justify-between mb-6 px-6 md:px-14 lg:px-16">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-white mb-1">What Clients Say</h2>
          <p className="text-sm text-gray-400">Real feedback from real projects</p>
        </div>

        {/* Navigation Arrows */}
        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={() => scroll("left")}
            className={cn(
              "p-2 rounded-full bg-white/5 border border-white/10 transition-all duration-200",
              canScrollLeft
                ? "text-white hover:bg-white/10 hover:border-white/20"
                : "text-gray-600 cursor-not-allowed opacity-50",
            )}
            disabled={!canScrollLeft}
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => scroll("right")}
            className={cn(
              "p-2 rounded-full bg-white/5 border border-white/10 transition-all duration-200",
              canScrollRight
                ? "text-white hover:bg-white/10 hover:border-white/20"
                : "text-gray-600 cursor-not-allowed opacity-50",
            )}
            disabled={!canScrollRight}
            aria-label="Scroll right"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Scrollable Cards Container */}
      <div className="relative">
        {/* Left fade gradient */}
        <div
          className={cn(
            "absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none transition-opacity duration-300",
            canScrollLeft ? "opacity-100" : "opacity-0",
          )}
        />

        {/* Cards */}
        <div
          ref={scrollContainerRef}
          onScroll={checkScrollButtons}
          className="flex gap-5 overflow-x-auto scrollbar-hide scroll-smooth px-6 md:px-14 lg:px-16 pb-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} index={index} />
          ))}
        </div>

        {/* Right fade gradient */}
        <div
          className={cn(
            "absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none transition-opacity duration-300",
            canScrollRight ? "opacity-100" : "opacity-0",
          )}
        />

        {/* Mobile scroll indicator */}
        {canScrollRight && (
          <div className="md:hidden absolute right-4 top-1/2 -translate-y-1/2 z-20 flex items-center gap-1 pointer-events-none">
            <div className="scroll-hint flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/10">
              <span className="text-xs text-white/70">Swipe</span>
              <ChevronRight className="h-3 w-3 text-white/70" />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
