"use client"

import type React from "react"

import { useState, useCallback } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Play } from "lucide-react"
import { motion } from "framer-motion"
import type { ContentItem } from "@/lib/data"

interface HighlightReelRowProps {
  items: ContentItem[]
  onItemClick: (item: ContentItem) => void
}

export function HighlightReelRow({ items, onItemClick }: HighlightReelRowProps) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id || "")

  const handleCardClick = useCallback(
    (item: ContentItem) => {
      if (item.id === activeId) {
        onItemClick(item)
      } else {
        setActiveId(item.id)
      }
    },
    [activeId, onItemClick],
  )

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, item: ContentItem) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault()
        handleCardClick(item)
      }
    },
    [handleCardClick],
  )

  const handleViewCaseStudy = useCallback(
    (e: React.MouseEvent, item: ContentItem) => {
      e.stopPropagation()
      onItemClick(item)
    },
    [onItemClick],
  )

  return (
    <div className="relative py-0">
      {/* Section Header */}
      <div className="mb-6 flex flex-col gap-1.5 px-6 md:mb-8 md:px-14 lg:px-16">
        <h2 className="text-2xl font-bold tracking-tight text-white md:text-3xl">Highlight Reel</h2>
        <span className="text-sm text-gray-400 md:text-base">Visual showcase</span>
      </div>

      {/* Cards Container */}
      <div className="scrollbar-hide flex items-start gap-3 overflow-x-auto px-6 pb-4 md:gap-4 md:px-14 md:pb-6 lg:gap-5 lg:px-16">
        {items.map((item) => {
          const isActive = item.id === activeId

          return (
            <motion.div
              key={item.id}
              initial={false}
              animate={{
                width: isActive ? "min(760px, 85vw)" : "min(240px, 40vw)",
              }}
              transition={{
                width: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
              }}
              className="relative flex-shrink-0"
              style={{
                height: "clamp(250px, 45vh, 425px)",
              }}
            >
              <div
                className={cn(
                  "group relative h-full w-full cursor-pointer overflow-hidden rounded-xl",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50",
                  "transition-shadow duration-300",
                  isActive && "shadow-2xl shadow-black/60",
                  !isActive && "hover:shadow-lg hover:shadow-black/40",
                )}
                onClick={() => handleCardClick(item)}
                onKeyDown={(e) => handleKeyDown(e, item)}
                tabIndex={0}
                role="button"
                aria-label={isActive ? `View ${item.title} case study` : `Select ${item.title}`}
                aria-pressed={isActive}
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  {item.thumbnailUrl ? (
                    <Image
                      src={item.thumbnailUrl || "/placeholder.svg"}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 85vw, 760px"
                      priority={isActive}
                    />
                  ) : (
                    <div
                      className={cn(
                        "h-full w-full",
                        item.gradientType === "blue-purple"
                          ? "bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800"
                          : "bg-gradient-to-br from-green-600 via-emerald-700 to-teal-800",
                      )}
                    />
                  )}
                </div>

                {/* Vignette Gradient */}
                <div
                  className={cn(
                    "absolute inset-0 transition-opacity duration-300",
                    isActive
                      ? "bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-100"
                      : "bg-gradient-to-t from-black/70 via-black/10 to-black/5 opacity-100",
                  )}
                />

                {/* Active Content - Uses CSS opacity transition, always rendered but hidden when inactive */}
                <div
                  className={cn(
                    "absolute inset-x-0 bottom-0 p-5 md:p-6 lg:p-8",
                    "transition-opacity duration-200",
                    isActive ? "opacity-100 delay-150" : "opacity-0 pointer-events-none",
                  )}
                >
                  {/* Tags */}
                  <div className="mb-2 flex flex-wrap gap-2 md:mb-3">
                    {item.tags?.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-white/15 px-2.5 py-0.5 text-[11px] font-medium text-white/90 backdrop-blur-sm md:px-3 md:py-1 md:text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Title */}
                  <h3 className="mb-1.5 text-xl font-bold tracking-tight text-white drop-shadow-lg md:mb-2 md:text-2xl lg:text-3xl">
                    {item.title}
                  </h3>

                  {/* Short Description */}
                  {item.shortDescription && (
                    <p className="mb-4 line-clamp-2 text-sm text-gray-200/90 md:mb-5 md:text-base">
                      {item.shortDescription}
                    </p>
                  )}

                  {/* View Case Study CTA */}
                  <button
                    onClick={(e) => handleViewCaseStudy(e, item)}
                    className="inline-flex items-center gap-2 rounded-md bg-white px-4 py-2.5 text-sm font-semibold text-black transition-colors duration-200 hover:bg-white/90 md:px-5 md:py-3 md:text-base"
                    aria-label={`View ${item.title} case study`}
                  >
                    <Play className="h-4 w-4 fill-current md:h-5 md:w-5" />
                    View case study
                  </button>
                </div>

                <div
                  className={cn(
                    "absolute inset-x-0 bottom-0 p-4 md:p-5",
                    "transition-opacity duration-150",
                    !isActive ? "opacity-100" : "opacity-0 pointer-events-none",
                  )}
                >
                  <p className="text-center text-sm font-semibold text-white drop-shadow-md md:text-base">
                    {item.title}
                  </p>
                </div>

                {/* Hover Ring for Inactive Cards */}
                {!isActive && (
                  <div
                    className={cn(
                      "pointer-events-none absolute inset-0 rounded-xl",
                      "ring-1 ring-white/0 transition-all duration-200",
                      "group-hover:ring-white/25 group-hover:bg-white/5",
                    )}
                  />
                )}

                {/* Active Card Border */}
                {isActive && <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-white/20" />}
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
