"use client"

import { motion } from "framer-motion"
import { highlightReel, alvaraEnlargedContent } from "@/lib/data"
import { caseStudyThemes } from "@/lib/color-extractor"
import { useState, useCallback } from "react"
import { GradientBackground } from "./gradient-background"
import { CaseStudyModal } from "./case-study-modal"
import type { ContentItem } from "@/lib/data"
import {
  EnlargedCaseStudyModal,
  SectionParagraph,
  SectionBullets,
  SectionImage,
  TwoColumnLayout,
} from "./enlarged-case-study-modal"

export function WorkView() {
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEnlargedModalOpen, setIsEnlargedModalOpen] = useState(false)

  const handleItemClick = useCallback((item: ContentItem) => {
    if (item.id === "highlight-1") {
      setIsEnlargedModalOpen(true)
    } else {
      setSelectedItem(item)
      setIsModalOpen(true)
    }
  }, [])

  const alvaraSections = [
    {
      id: "overview",
      title: "Overview",
      content: (
        <>
          <SectionParagraph>
            Alvara is a DeFi platform that simplifies pooled investment strategies (called &quot;BTS Factory&quot; —
            Blockchain Token Sets) for both retail and professional crypto users. The platform enables users to create,
            manage, and invest in diversified token portfolios.
          </SectionParagraph>
          <SectionParagraph>
            This case study focuses on the Token Platform dashboard and workflows I designed to make complex DeFi
            strategies understandable, trustworthy, and frictionless.
          </SectionParagraph>

          <div className="my-8 grid gap-6 md:grid-cols-3 text-sm">
            <div>
              <p className="text-gray-500 mb-1">Role</p>
              <p className="text-white font-medium">Product Designer — UI/UX</p>
            </div>
            <div>
              <p className="text-gray-500 mb-1">Team</p>
              <p className="text-white font-medium">1 designer, 1 PM, 3 engineers</p>
            </div>
            <div>
              <p className="text-gray-500 mb-1">Timeframe</p>
              <p className="text-white font-medium">8 weeks</p>
            </div>
          </div>

          <SectionImage src="/images/alvara-4.png" alt="Alvara Platform - Multiple Views" priority />
        </>
      ),
    },
    {
      id: "problem",
      title: "Problem & Goals",
      content: (
        <>
          <SectionParagraph>
            Retail and professional crypto users struggle to understand complex pooled investment strategies. Lack of
            clarity leads to mistrust, abandoned deposits, and increased support requests.
          </SectionParagraph>

          <div className="my-8">
            <h4 className="text-lg font-bold text-white mb-3">Business Goals</h4>
            <SectionBullets
              items={[
                "Improve user comprehension of BTS performance and composition",
                "Boost deposit conversions by reducing friction",
                "Reduce support load through self-service clarity",
                "Build trust through transparent performance tracking",
              ]}
            />
          </div>

          <div className="my-8">
            <h4 className="text-lg font-bold text-white mb-3">UX Goals</h4>
            <SectionBullets
              items={[
                "Create clear information hierarchy for quick scanning",
                "Make performance data instantly understandable",
                "Design a frictionless deposit flow with clear feedback",
                "Ensure mobile responsiveness for on-the-go trading",
              ]}
            />
          </div>

          <SectionImage src="/images/alvara-2.png" alt="Alvara Portfolio Overview" />
        </>
      ),
    },
    {
      id: "ia",
      title: "Information Architecture",
      content: (
        <>
          <SectionParagraph>
            I structured the product around three top-level sections accessible from persistent navigation:
          </SectionParagraph>

          <SectionBullets
            items={[
              "BTS Factory — Browse and create new token pools",
              "Leaderboard — Compare performance across all strategies",
              "Portfolio — Track your investments and activity",
            ]}
          />

          <TwoColumnLayout
            left={
              <>
                <h4 className="text-lg font-bold text-white mb-4">Key IA Decisions</h4>
                <SectionBullets
                  items={[
                    "Hero band with key KPIs (AUM, price, performance) for at-a-glance status",
                    "Breakdown sections organized by priority: performance charts, asset tables, activity log",
                    "Consistent card structure across all views for predictability",
                    "Dark theme to align with finance/crypto conventions while maintaining high contrast",
                  ]}
                />
              </>
            }
            right={<SectionImage src="/images/alvara-1.png" alt="DeFi Dashboard with Asset Breakdown" />}
          />
        </>
      ),
    },
    {
      id: "flow",
      title: "Key Flow: Create a Pool",
      content: (
        <>
          <SectionParagraph>
            The &quot;Create a pool in seconds&quot; journey is the core conversion flow. I broke it into three clear
            steps:
          </SectionParagraph>

          <div className="space-y-8 my-8">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm"
                  style={{ backgroundColor: "var(--theme-primary, #E50914)" }}
                >
                  1
                </div>
                <h4 className="text-lg font-bold text-white">Add your assets</h4>
              </div>
              <SectionBullets
                items={[
                  "Search and filter with clear token icons and names",
                  "Show common tokens first to reduce scrolling",
                  "Display current holdings for quick reference",
                ]}
              />
            </div>

            <div>
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm"
                  style={{ backgroundColor: "var(--theme-primary, #E50914)" }}
                >
                  2
                </div>
                <h4 className="text-lg font-bold text-white">Set allocations and configuration</h4>
              </div>
              <SectionBullets
                items={[
                  "Visual sliders with live percentage updates",
                  "Total allocation shown prominently (must equal 100%)",
                  "Risk level indicators based on asset volatility",
                ]}
              />
            </div>

            <div>
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm"
                  style={{ backgroundColor: "var(--theme-primary, #E50914)" }}
                >
                  3
                </div>
                <h4 className="text-lg font-bold text-white">Review and launch</h4>
              </div>
              <SectionBullets
                items={[
                  "Summary view with clear preview of pool composition",
                  "Estimated gas fees surfaced upfront",
                  "One-click deploy with loading states and confirmation",
                ]}
              />
            </div>
          </div>

          <SectionImage src="/images/alvara-3.png" alt="BTS Factory Creation Flow" />
        </>
      ),
    },
    {
      id: "visuals",
      title: "Visual System & Clarity",
      content: (
        <>
          <SectionParagraph>
            The visual language needed to balance finance-industry conventions with crypto-native aesthetics:
          </SectionParagraph>

          <SectionBullets
            items={[
              "Dark theme (near-black backgrounds) to reduce eye strain and align with trading platforms",
              "Bright accent purple (#A855F7) for primary actions and interactive elements",
              "Consistent 8px corner radius for all cards and containers",
              "Clear typographic hierarchy: bold headings, medium labels, regular body text",
              "Donut and line charts with high contrast colors for quick data scanning",
            ]}
          />

          <SectionImage src="/images/alvara-1.png" alt="Visual Design System in Action" />
        </>
      ),
    },
    {
      id: "outcomes",
      title: "Outcomes & Reflection",
      content: (
        <>
          <div className="my-8">
            <h4 className="text-lg font-bold text-white mb-4">Impact</h4>
            <SectionBullets
              items={[
                "Improved user comprehension and perceived trust from usability testing sessions",
                "Clearer path from exploration to deposit reduced friction",
                "Reduced cognitive load with reorganized IA and simplified multi-step flows",
                "Successfully launched platform with strong early adoption metrics",
              ]}
            />
          </div>

          <div className="p-6 bg-gray-900/50 border border-gray-800 rounded-xl my-8">
            <SectionParagraph>
              This project reinforced the importance of progressive disclosure in complex financial interfaces. If I
              could iterate further, I'd focus on mobile-first optimizations, deeper analytics for power users, and A/B
              testing variations of the deposit flow to maximize conversion.
            </SectionParagraph>
          </div>
        </>
      ),
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      className="min-h-screen bg-black pt-32 pb-20"
    >
      <div className="px-6 md:px-12 lg:px-16 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.3 }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Most Relevant Work</h2>
          <p className="text-lg text-gray-400">
            Selected projects showcasing product design across SaaS, healthcare, and digital platforms
          </p>
        </motion.div>

        {/* Grid with 9:16 vertical cards */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
        >
          {highlightReel.map((item, index) => (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 + index * 0.05, duration: 0.3 }}
              onClick={() => handleItemClick(item)}
              className="group relative w-full"
            >
              {/* 9:16 aspect ratio card */}
              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.14, ease: "easeOut" }}
                className="relative aspect-[9/16] overflow-hidden rounded-lg shadow-[0_8px_24px_rgba(0,0,0,0.4)] hover:shadow-[0_12px_32px_rgba(229,9,20,0.2)]"
              >
                {item.thumbnailUrl ? (
                  <img
                    src={item.thumbnailUrl || "/placeholder.svg"}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <GradientBackground type={item.gradientType} overlay={true} className="absolute inset-0" />
                )}

                {/* Content overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
                  <div className="transform transition-transform duration-200 group-hover:translate-y-0 translate-y-2">
                    <h3 className="font-bold text-white text-sm md:text-base mb-1 text-balance leading-tight">
                      {item.title}
                    </h3>
                    {item.shortDescription && (
                      <p className="text-xs text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        {item.shortDescription}
                      </p>
                    )}
                  </div>

                  {/* Tags */}
                  {item.tags && item.tags.length > 0 && (
                    <div className="flex gap-1.5 mt-2 flex-wrap">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 bg-white/20 backdrop-blur-sm rounded text-[10px] text-white font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Hover indicator */}
                <div className="absolute top-3 right-3 w-8 h-8 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </div>
              </motion.div>
            </motion.button>
          ))}
        </motion.div>

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.4 }}
          className="mt-20 text-center"
        >
          <div className="inline-block p-8 bg-gradient-to-br from-gray-900/80 to-gray-900/40 backdrop-blur rounded-2xl border border-gray-800">
            <h3 className="text-2xl font-bold text-white mb-3">Want to work together?</h3>
            <p className="text-gray-400 mb-6 max-w-md mx-auto">
              I'm available for freelance projects and full-time opportunities in product design and UX leadership.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="mailto:miha.sodja@gmail.com"
                className="px-6 py-3 bg-[#E50914] text-white rounded-lg font-medium hover:bg-[#c00812] transition-colors"
              >
                Get in Touch
              </a>
              <a
                href="#"
                className="px-6 py-3 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors"
              >
                Download Resume
              </a>
            </div>
          </div>
        </motion.div>
      </div>
      <CaseStudyModal item={selectedItem} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <EnlargedCaseStudyModal
        isOpen={isEnlargedModalOpen}
        onClose={() => setIsEnlargedModalOpen(false)}
        title={alvaraEnlargedContent.title}
        tags={alvaraEnlargedContent.tags}
        gradientType={alvaraEnlargedContent.gradientType}
        liveUrl={alvaraEnlargedContent.liveUrl}
        slug={alvaraEnlargedContent.slug}
        sections={alvaraSections}
        themeColors={caseStudyThemes.alvara}
      />
    </motion.div>
  )
}
