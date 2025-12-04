"use client"
import { ContentCard } from "./content-card"
import { caseStudies, experiments, type ContentItem } from "@/lib/data"
import { Clock, History, Bookmark } from "lucide-react"

interface MyMihViewProps {
  onItemClick?: (item: ContentItem) => void
}

// Simulated saved/history data
const savedItems = caseStudies.slice(0, 3)
const continueWatching = [caseStudies[2], experiments[0]]
const recentlyViewed = [...caseStudies.slice(3, 5), experiments[1]]

export function MyMihView({ onItemClick }: MyMihViewProps) {
  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="px-4 md:px-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-white md:text-4xl">My Mih</h1>
          <p className="text-gray-400">Your saved items and browsing history</p>
        </div>

        {/* Continue Exploring */}
        <section className="mb-10">
          <div className="mb-4 flex items-center gap-2">
            <Clock className="h-5 w-5 text-[#E50914]" />
            <h2 className="text-lg font-bold text-white">Continue Exploring</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {continueWatching.map((item) => (
              <div key={item.id} className="relative">
                <ContentCard item={item} onClick={() => onItemClick?.(item)} />
                {/* Progress indicator */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-800">
                  <div className="h-full bg-[#E50914]" style={{ width: `${Math.random() * 60 + 20}%` }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Saved Items */}
        <section className="mb-10">
          <div className="mb-4 flex items-center gap-2">
            <Bookmark className="h-5 w-5 text-[#E50914]" />
            <h2 className="text-lg font-bold text-white">Saved for Later</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {savedItems.map((item) => (
              <ContentCard key={item.id} item={item} onClick={() => onItemClick?.(item)} />
            ))}
          </div>
          {savedItems.length === 0 && (
            <p className="text-gray-500">No saved items yet. Click the bookmark icon on any card to save it.</p>
          )}
        </section>

        {/* Recently Viewed */}
        <section className="mb-10">
          <div className="mb-4 flex items-center gap-2">
            <History className="h-5 w-5 text-gray-500" />
            <h2 className="text-lg font-bold text-white">Recently Viewed</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {recentlyViewed.map((item) => (
              <ContentCard key={item.id} item={item} onClick={() => onItemClick?.(item)} size="sm" />
            ))}
          </div>
        </section>

        {/* Quick Stats */}
        <section className="mb-10">
          <h2 className="mb-4 text-lg font-bold text-white">Your Stats</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              { label: "Case Studies Viewed", value: "7" },
              { label: "Skills Explored", value: "12" },
              { label: "Time Spent", value: "15m" },
              { label: "Items Saved", value: "3" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-lg bg-gray-900/50 p-4 text-center">
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-xs text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
