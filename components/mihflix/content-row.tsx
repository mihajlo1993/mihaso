"use client"

import { useRef, useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { ContentCard } from "./content-card"
import type { ContentItem, ContentRow as ContentRowType } from "@/lib/data"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface ContentRowProps {
  row: ContentRowType
  onItemHover?: (item: ContentItem | null) => void
  onItemClick?: (item: ContentItem) => void
  activeItemId?: string | null
  isHeroRow?: boolean
}

export function ContentRow({ row, onItemHover, onItemClick, activeItemId, isHeroRow }: ContentRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(false)
  const [hasOverflow, setHasOverflow] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const checkOverflow = () => {
      if (!scrollRef.current) return

      requestAnimationFrame(() => {
        if (!scrollRef.current) return
        const { scrollWidth, clientWidth, scrollLeft } = scrollRef.current
        const overflow = scrollWidth > clientWidth + 5

        setHasOverflow(overflow)
        setShowRightArrow(overflow && scrollLeft < scrollWidth - clientWidth - 5)
        setShowLeftArrow(scrollLeft > 5)
      })
    }

    checkOverflow()
    const timer = setTimeout(checkOverflow, 100)

    window.addEventListener("resize", checkOverflow)
    return () => {
      clearTimeout(timer)
      window.removeEventListener("resize", checkOverflow)
    }
  }, [row.items])

  const handleScroll = () => {
    if (!scrollRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
    setShowLeftArrow(scrollLeft > 5)
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 5)

    const itemWidth = scrollRef.current.scrollWidth / row.items.length
    const newIndex = Math.round(scrollLeft / itemWidth)
    setActiveIndex(Math.min(newIndex, row.items.length - 1))
  }

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return
    const scrollAmount = scrollRef.current.clientWidth * 0.75
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    })
  }

  const scrollToItem = (index: number) => {
    if (!scrollRef.current) return
    const itemWidth = scrollRef.current.scrollWidth / row.items.length
    scrollRef.current.scrollTo({
      left: itemWidth * index,
      behavior: "smooth",
    })
  }

  return (
    <div className="group/row relative py-0">
      <div className="mb-6 flex flex-col gap-1.5 px-6 md:mb-8 md:px-14 lg:px-16">
        <h2 className="text-2xl font-bold tracking-tight text-white md:text-3xl">{row.title}</h2>
        {row.subtitle && <span className="text-sm text-gray-400 md:text-base">{row.subtitle}</span>}
      </div>

      {/* Scroll Container */}
      <div className="relative flex items-center">
        {/* Desktop arrow left */}
        {hasOverflow && (
          <button
            onClick={() => scroll("left")}
            className={cn(
              "absolute left-0 z-20 hidden h-full w-12 items-center justify-center bg-gradient-to-r from-black via-black/90 to-transparent transition-all duration-200 md:flex md:w-16",
              showLeftArrow ? "opacity-100" : "pointer-events-none opacity-0",
            )}
            aria-label="Scroll left"
          >
            <div className="rounded-full bg-black/60 p-2 backdrop-blur-sm transition-transform hover:scale-110">
              <ChevronLeft className="h-6 w-6 text-white" />
            </div>
          </button>
        )}

        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="scrollbar-hide flex gap-4 overflow-x-auto px-5 pb-4 md:gap-6 md:px-14 md:pb-6 lg:px-16"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {row.items.map((item, index) => (
            <div key={item.id} style={{ scrollSnapAlign: "start" }}>
              <ContentCard
                item={item}
                isActive={activeItemId === item.id}
                onHover={() => onItemHover?.(item)}
                onLeave={() => onItemHover?.(null)}
                onClick={() => onItemClick?.(item)}
                size={isHeroRow ? "lg" : "md"}
                index={index}
              />
            </div>
          ))}
        </div>

        {/* Desktop arrow right */}
        {hasOverflow && (
          <button
            onClick={() => scroll("right")}
            className={cn(
              "absolute right-0 z-20 hidden h-full w-12 items-center justify-center bg-gradient-to-l from-black via-black/90 to-transparent transition-all duration-200 md:flex md:w-16",
              showRightArrow ? "opacity-100" : "pointer-events-none opacity-0",
            )}
            aria-label="Scroll right"
          >
            <div className="rounded-full bg-black/60 p-2 backdrop-blur-sm transition-transform hover:scale-110">
              <ChevronRight className="h-6 w-6 text-white" />
            </div>
          </button>
        )}
      </div>

      {hasOverflow && row.items.length > 1 && (
        <div className="mt-6 flex justify-center gap-1.5 pb-8 md:hidden md:pb-0">
          {row.items.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToItem(index)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                index === activeIndex ? "w-4 bg-[#E50914]" : "w-1.5 bg-white/30 hover:bg-white/50",
              )}
              aria-label={`Go to item ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
