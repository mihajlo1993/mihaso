"use client"

import { motion } from "framer-motion"
import { highlightReel } from "@/lib/data"
import { useState, useCallback } from "react"
import type { ContentItem } from "@/lib/data"
import { HighlightReelRow } from "./highlight-reel-row"
import { DeFiCaseStudy } from "./defi-case-study"
import { TreeAppCaseStudy } from "./treeapp-case-study"
import { SimpleDoctorCaseStudy } from "./simple-doctor-case-study"

export function WorkView() {
  const [isDeFiCaseStudyOpen, setIsDeFiCaseStudyOpen] = useState(false)
  const [isTreeAppCaseStudyOpen, setIsTreeAppCaseStudyOpen] = useState(false)
  const [isSimpleDoctorCaseStudyOpen, setIsSimpleDoctorCaseStudyOpen] = useState(false)

  const handleItemClick = useCallback((item: ContentItem) => {
    if (item.id === "highlight-1") {
      setIsSimpleDoctorCaseStudyOpen(true)
    } else if (item.id === "highlight-2") {
      setIsTreeAppCaseStudyOpen(true)
    } else if (item.id === "highlight-3") {
      setIsDeFiCaseStudyOpen(true)
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      className="min-h-screen bg-black pt-32 pb-20"
    >
      <div className="px-6 md:px-12 lg:px-16 max-w-[1600px] mx-auto">
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

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.4 }}>
          <HighlightReelRow
            items={highlightReel}
            onItemClick={handleItemClick}
            size="large"
            showHeader={false}
            isWorkPage={true}
            mobileThumbnails={{
              "highlight-1": "/images/simple-doctor-hero-mobile.png",
            }}
          />
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
                href="https://www.linkedin.com/in/mihasodja"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors"
              >
                View LinkedIn
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      <SimpleDoctorCaseStudy
        isOpen={isSimpleDoctorCaseStudyOpen}
        onClose={() => setIsSimpleDoctorCaseStudyOpen(false)}
      />
      <TreeAppCaseStudy isOpen={isTreeAppCaseStudyOpen} onClose={() => setIsTreeAppCaseStudyOpen(false)} />
      <DeFiCaseStudy isOpen={isDeFiCaseStudyOpen} onClose={() => setIsDeFiCaseStudyOpen(false)} />
    </motion.div>
  )
}
