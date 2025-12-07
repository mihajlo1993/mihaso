"use client"

import { cn } from "@/lib/utils"
import { GradientBackground } from "./gradient-background"
import type { ContentItem } from "@/lib/data"
import { Play, Info, Download, ChevronRight } from "lucide-react"

interface BillboardProps {
  item: ContentItem | null
  isVisible: boolean
}

const defaultBillboard = {
  title: "Miha Sodja",
  subtitle: "Senior Product Designer",
  description:
    "Product designer with 11+ years shaping complex products into intuitive, conversion-focused experiences across SaaS, healthcare, self-scheduling platforms, and high-growth marketplaces.",
  bullets: [
    "11+ years designing digital products",
    "Deep focus on complex flows, dashboards, self-scheduling",
    "From MVPs to full redesigns and design systems",
  ],
}

export function Billboard({ item, isVisible }: BillboardProps) {
  const showDefault = !item

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden transition-all duration-500 ease-out",
        isVisible ? "h-[60vh] min-h-[500px] opacity-100 md:h-[65vh]" : "h-0 opacity-0",
      )}
    >
      {/* Background */}
      {item ? (
        <GradientBackground type={item.gradientType} className="absolute inset-0" overlay={false} />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900" />
      )}

      {/* Overlays for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent" />
      {/* Subtle diagonal sheen */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 flex items-end pb-32 md:pb-40">
        <div className="w-full max-w-2xl px-6 md:px-12 lg:px-16">
          {showDefault ? (
            <>
              {/* Default hero content - more cinematic spacing */}
              <p className="mb-3 text-sm font-semibold tracking-[0.2em] text-[#D13AFF] uppercase">Portfolio</p>
              <h1 className="mb-2 text-5xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl">
                {defaultBillboard.title}
              </h1>
              <h2 className="mb-6 text-xl font-medium text-gray-300 md:text-2xl">{defaultBillboard.subtitle}</h2>
              <p className="mb-8 max-w-xl text-base leading-relaxed text-gray-400 md:text-lg">
                {defaultBillboard.description}
              </p>

              {/* Bullets */}
              <ul className="mb-10 space-y-3">
                {defaultBillboard.bullets.map((bullet, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-gray-300 md:text-base">
                    <ChevronRight className="h-4 w-4 flex-shrink-0 text-[#D13AFF]" />
                    {bullet}
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <>
              {/* Selected case study content */}
              {item.badge && (
                <span className="mb-4 inline-block rounded bg-[#D13AFF] px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                  {item.badge}
                </span>
              )}
              <h1 className="mb-4 text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
                {item.title}
              </h1>
              <div className="mb-5 flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="mb-10 max-w-xl text-base leading-relaxed text-gray-300 md:text-lg">
                {item.longDescription || item.shortDescription}
              </p>
            </>
          )}

          {/* CTAs - more prominent */}
          <div className="flex flex-wrap items-center gap-4">
            <button className="flex items-center gap-2.5 rounded-md bg-white px-7 py-3.5 text-base font-bold text-black transition-all hover:bg-gray-100 hover:scale-105">
              <Play className="h-5 w-5 fill-current" />
              {item?.primaryCTA || "Play Case Study"}
            </button>
            <button className="flex items-center gap-2.5 rounded-md bg-white/20 px-7 py-3.5 text-base font-bold text-white backdrop-blur-sm transition-all hover:bg-white/30">
              <Info className="h-5 w-5" />
              {item?.secondaryCTA || "Browse Portfolio"}
            </button>
            {showDefault && (
              <button className="flex items-center gap-2 text-sm font-medium text-gray-400 transition-colors hover:text-white">
                <Download className="h-4 w-4" />
                Download Resume
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
