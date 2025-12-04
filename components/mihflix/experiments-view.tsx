"use client"

import { useState } from "react"
import { ContentCard } from "./content-card"
import { CaseStudyModal } from "./case-study-modal"
import { experiments, type ContentItem } from "@/lib/data"

export function ExperimentsView() {
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="px-4 md:px-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white md:text-4xl">Experiments & Playground</h1>
          <p className="text-gray-400">Fun explorations, prototypes, and creative experiments</p>
        </div>

        {/* Featured Experiment */}
        <div className="mb-10 rounded-2xl bg-gradient-to-br from-purple-900/50 to-pink-900/50 p-8">
          <span className="mb-4 inline-block rounded bg-[#E50914] px-2 py-1 text-xs font-bold uppercase text-white">
            Featured
          </span>
          <h2 className="mb-2 text-2xl font-bold text-white">Generative UI Concepts</h2>
          <p className="mb-4 max-w-xl text-gray-300">
            Exploring the intersection of AI and interface design. These prototypes showcase dynamic, context-aware UI
            generation.
          </p>
          <button className="rounded bg-white px-6 py-2 font-bold text-black hover:bg-gray-200">Explore</button>
        </div>

        {/* Experiments Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {experiments.map((item) => (
            <ContentCard
              key={item.id}
              item={item}
              onClick={() => {
                setSelectedItem(item)
                setIsModalOpen(true)
              }}
              size="lg"
            />
          ))}
        </div>
      </div>

      <CaseStudyModal item={selectedItem} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}
