"use client"

import { useState } from "react"
import { highlightReel, type ContentItem } from "@/lib/data"
import { GradientBackground } from "./gradient-background"
import { CaseStudyModal } from "./case-study-modal"
import { Footer } from "./footer"

function HighlightCard({ item, onClick }: { item: ContentItem; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="group relative aspect-video overflow-hidden rounded-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
    >
      <GradientBackground type={item.gradientType} className="absolute inset-0" overlay={false} />

      {/* Diagonal sheen */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Noise texture simulation */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
        <p className="text-sm font-medium text-white/90 drop-shadow-lg md:text-base">{item.title}</p>
        <p className="mt-1 text-xs text-white/60">{item.shortDescription}</p>
      </div>

      {/* Tag */}
      {item.tags[0] && (
        <span className="absolute top-3 left-3 rounded bg-white/20 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm">
          {item.tags[0]}
        </span>
      )}
    </button>
  )
}

export function HighlightReelView() {
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleItemClick = (item: ContentItem) => {
    setSelectedItem(item)
    setIsModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-black pt-24 md:pt-28">
      <div className="px-6 md:px-12 lg:px-16">
        {/* Header */}
        <div className="mb-8 md:mb-12">
          <h1 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">Highlight Reel</h1>
          <p className="mt-3 max-w-2xl text-gray-400">
            Visual showcase of key project moments, UI previews, and design system components.
          </p>
        </div>

        {/* Grid of highlights */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {highlightReel.map((item) => (
            <HighlightCard key={item.id} item={item} onClick={() => handleItemClick(item)} />
          ))}
        </div>
      </div>

      <div className="mt-16">
        <Footer />
      </div>

      <CaseStudyModal item={selectedItem} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}
