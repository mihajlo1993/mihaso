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
  size?: "default" | "large"
}

export function HighlightReelRow({ items, onItemClick, size = "default" }: HighlightReelRowProps) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id || "")

  const sizeConfig = {
    default: {
      height: "clamp(250px, 45vh, 425px)",
      activeWidth: "760px",
      inactiveWidth: "240px",
    },
    large: {
      height: "clamp(288px, 52vh, 489px)",
      activeWidth: "874px",
      inactiveWidth: "276px",
    },
  }

  const config = sizeConfig[size]

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
      <div
        className="flex gap-4 overflow-x-auto scrollbar-hide pb-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {items.map((item, index) => {
          const isActive = item.id === activeId

          return (
            <motion.button
              key={item.id}
              onClick={() => handleCardClick(item)}
              onKeyDown={(e) => handleKeyDown(e, item)}
              animate={{
                width: isActive ? config.activeWidth : config.inactiveWidth,
              }}
              transition={{
                duration: 0.5,
                ease: [0.32, 0.72, 0, 1],
              }}
              className={cn(
                "relative flex-shrink-0 rounded-xl overflow-hidden cursor-pointer",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black",
                "transition-[filter,box-shadow] duration-200",
                isActive
                  ? "shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
                  : "hover:brightness-110 hover:ring-1 hover:ring-white/20",
              )}
              style={{ height: config.height }}
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
                    sizes={isActive ? config.activeWidth : config.inactiveWidth}
                    priority={index < 2}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900" />
                )}
              </div>

              {/* Gradient overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />

              {/* Active state content - always rendered, visibility controlled by CSS */}
              <div
                className={cn(
                  "absolute inset-0 flex flex-col justify-end p-6 md:p-8",
                  "transition-opacity duration-300 delay-150",
                  isActive ? "opacity-100" : "opacity-0 pointer-events-none",
                )}
              >
                {/* Tags */}
                {item.tags && item.tags.length > 0 && (
                  <div className="flex gap-2 mb-3 flex-wrap">
                    {item.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 bg-white/15 backdrop-blur-sm rounded-full text-xs text-white/90 font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Title */}
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 text-balance leading-tight">
                  {item.title}
                </h3>

                {/* Description */}
                {item.shortDescription && (
                  <p className="text-sm md:text-base text-gray-300 mb-4 line-clamp-2 max-w-lg">
                    {item.shortDescription}
                  </p>
                )}

                {/* CTA Button */}
                <button
                  onClick={(e) => handleViewCaseStudy(e, item)}
                  className="flex items-center gap-2 px-5 py-2.5 bg-white text-black rounded-lg font-semibold text-sm hover:bg-gray-100 transition-colors w-fit"
                >
                  <Play className="w-4 h-4 fill-current" />
                  View case study
                </button>
              </div>

              {/* Inactive state content - always rendered, visibility controlled by CSS */}
              <div
                className={cn(
                  "absolute inset-0 flex flex-col justify-end p-4",
                  "transition-opacity duration-200",
                  isActive ? "opacity-0 pointer-events-none" : "opacity-100",
                )}
              >
                <h3 className="text-sm font-semibold text-white text-center leading-tight">{item.title}</h3>
              </div>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
