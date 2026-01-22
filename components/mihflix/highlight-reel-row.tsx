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
  title?: string
  subtitle?: string
  showHeader?: boolean
  mobileThumbnails?: Record<string, string>
  isWorkPage?: boolean
}

export function HighlightReelRow({
  items,
  onItemClick,
  size = "default",
  title = "Highlight Reel",
  subtitle = "Featured case studies",
  showHeader = true,
  mobileThumbnails = {},
  isWorkPage = false,
}: HighlightReelRowProps) {
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
      if (typeof window !== "undefined" && window.innerWidth < 768) {
        onItemClick(item)
      } else {
        if (item.id === activeId) {
          onItemClick(item)
        } else {
          setActiveId(item.id)
        }
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
      {showHeader && (
        <div className="px-6 md:px-14 lg:px-16 mb-6 md:mb-10 text-left">
          <h2 className="text-xl md:text-2xl font-bold text-white">{title}</h2>
          {subtitle && <p className="text-sm text-gray-400 mt-1">{subtitle}</p>}
        </div>
      )}

      <div
        className={cn(
          "flex flex-col gap-4 md:flex md:flex-row md:gap-4 md:overflow-x-auto scrollbar-hide pb-4",
          isWorkPage ? "px-0" : "px-4 md:px-14 lg:px-16",
        )}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {items.map((item, index) => {
          const isActive = item.id === activeId

          return (
            <motion.button
              key={item.id}
              layout="position"
              onClick={() => handleCardClick(item)}
              onKeyDown={(e) => handleKeyDown(e, item)}
              initial={false}
              className={cn(
                "highlight-card relative flex-shrink-0 rounded-xl overflow-hidden cursor-pointer",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black",
                "transition-[filter,box-shadow] duration-200",
                "aspect-[16/9] w-full md:aspect-auto md:w-auto",
                isActive
                  ? "shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
                  : "hover:brightness-110 hover:ring-1 hover:ring-white/20",
              )}
              style={{
                height: typeof window !== "undefined" && window.innerWidth >= 768 ? config.height : undefined,
              }}
              {...(typeof window !== "undefined" &&
                window.innerWidth >= 768 && {
                  animate: {
                    width: isActive ? config.activeWidth : config.inactiveWidth,
                  },
                  transition: {
                    duration: 0.5,
                    ease: [0.32, 0.72, 0, 1],
                  },
                })}
              aria-label={isActive ? `View ${item.title} case study` : `Select ${item.title}`}
              aria-pressed={isActive}
            >
              <div className="absolute inset-0 overflow-hidden">
                {item.thumbnailUrl ? (
                  <>
                    {/* Mobile thumbnail (only if mobileThumbnails provided) */}
                    {mobileThumbnails[item.id] && (
                      <Image
                        src={mobileThumbnails[item.id] || "/placeholder.svg"}
                        alt={item.title}
                        fill
                        className="highlight-card-image object-cover md:hidden"
                        sizes="100vw"
                        priority={index < 2}
                      />
                    )}
                    {/* Desktop thumbnail (or mobile fallback) */}
                    <Image
                      src={item.thumbnailUrl || "/placeholder.svg"}
                      alt={item.title}
                      fill
                      className={cn("highlight-card-image object-cover", mobileThumbnails[item.id] ? "hidden md:block" : "")}
                      sizes="(max-width: 768px) 100vw, 760px"
                      priority={index < 2}
                    />
                  </>
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900" />
                )}
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />

              <div
                className={cn(
                  "absolute inset-0 flex flex-col justify-end items-start text-left",
                  "p-3 md:px-6 md:pb-6 md:pt-0",
                  "transition-opacity duration-300 delay-150",
                  "opacity-100 md:opacity-0 md:pointer-events-none",
                  isActive && "md:opacity-100 md:pointer-events-auto",
                )}
              >
                <div className="max-w-full md:max-w-[70%]">
                  {item.tags && item.tags.length > 0 && (
                    <div className="flex gap-1.5 md:gap-2 mb-2 md:mb-3 flex-wrap">
                      {item.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-1.5 py-0.5 md:px-2.5 md:py-1 bg-white/15 backdrop-blur-sm rounded-full text-[10px] md:text-xs text-white/90 font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <h3 className="text-base md:text-2xl lg:text-3xl font-bold text-white mb-1 md:mb-2 text-left leading-tight">
                    {item.title}
                  </h3>

                  {item.shortDescription && (
                    <p className="text-xs md:text-base text-gray-300 mb-2 md:mb-4 line-clamp-2 text-left">
                      {item.shortDescription}
                    </p>
                  )}

                  <div className="hidden md:block mt-4 pointer-events-auto">
                    <button
                      onClick={(e) => handleViewCaseStudy(e, item)}
                      className="flex items-center gap-2 px-5 py-2.5 bg-white text-black rounded-lg font-semibold text-sm hover:bg-gray-100 transition-colors"
                    >
                      <Play className="w-4 h-4 fill-current" />
                      View case study
                    </button>
                  </div>
                </div>
              </div>

              <div
                className={cn(
                  "absolute inset-0 flex flex-col justify-end items-start p-4 text-left",
                  "transition-opacity duration-200",
                  "hidden md:flex",
                  isActive ? "md:opacity-0 md:pointer-events-none" : "md:opacity-100",
                )}
              >
                <h3 className="text-sm font-semibold text-white text-left leading-tight">{item.title}</h3>
              </div>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
