"use client"

import { useState, useCallback } from "react"
import { ContentRow } from "./content-row"
import { HighlightReelRow } from "./highlight-reel-row"
import { TestimonialsRow } from "./testimonials-row"
import { Footer } from "./footer"
import { CaseStudyModal } from "./case-study-modal"
import { AmbientSectionWrapper } from "./ambient-section-wrapper"
import { HeroBanner } from "./hero-banner"
import { CertificationsSection } from "./certifications-section"
import { DeFiCaseStudy } from "./defi-case-study"
import { TreeAppCaseStudy } from "./treeapp-case-study"
import { SimpleDoctorCaseStudy } from "./simple-doctor-case-study"
import { highlightReel, testimonials, contactLinks, certifications, type ContentItem, type Profile } from "@/lib/data"
import { motion } from "framer-motion"

interface HomeScreenProps {
  profile: Profile
}

export function HomeScreen({ profile }: HomeScreenProps) {
  const [hoveredItem, setHoveredItem] = useState<ContentItem | null>(null)
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeFiCaseStudyOpen, setIsDeFiCaseStudyOpen] = useState(false)
  const [isTreeAppCaseStudyOpen, setIsTreeAppCaseStudyOpen] = useState(false)
  const [isSimpleDoctorCaseStudyOpen, setIsSimpleDoctorCaseStudyOpen] = useState(false)

  const otherRows = [
    {
      id: "contact",
      title: "Contact & Links",
      subtitle: "Let's connect",
      items: contactLinks,
    },
  ]

  const handleItemHover = useCallback((item: ContentItem | null) => {
    setHoveredItem(item)
  }, [])

  const handleHighlightClick = useCallback((item: ContentItem) => {
    if (item.id === "highlight-1") {
      setIsDeFiCaseStudyOpen(true)
    } else if (item.id === "highlight-2") {
      setIsTreeAppCaseStudyOpen(true)
    } else if (item.id === "highlight-3") {
      setIsSimpleDoctorCaseStudyOpen(true)
    }
  }, [])

  const handleItemClick = useCallback((item: ContentItem) => {
    if (item.type === "link") {
      if (item.id === "contact") {
        window.location.hash = "contact"
        return
      } else if (item.id === "resume") {
        return
      } else if (item.liveUrl) {
        window.open(item.liveUrl, "_blank", "noopener,noreferrer")
        return
      }
    } else if (item.id === "highlight-1") {
      setIsDeFiCaseStudyOpen(true)
    } else if (item.id === "highlight-2") {
      setIsTreeAppCaseStudyOpen(true)
    } else if (item.id === "highlight-3") {
      setIsSimpleDoctorCaseStudyOpen(true)
    } else {
      setSelectedItem(item)
      setIsModalOpen(true)
    }
  }, [])

  const scrollToWork = useCallback(() => {
    const element = document.getElementById("highlight-reel")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }, [])

  const scrollToContact = useCallback(() => {
    window.location.hash = "contact"
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      className="min-h-screen bg-black pt-16"
    >
      <HeroBanner onViewWork={scrollToWork} onGetInTouch={scrollToContact} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="relative z-10 space-y-16 pt-12 pb-20 md:space-y-20 md:pt-12"
      >
        <motion.div
          id="highlight-reel"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.15,
            duration: 0.35,
            ease: "easeOut",
          }}
        >
          <AmbientSectionWrapper>
            <HighlightReelRow items={highlightReel} onItemClick={handleHighlightClick} />
          </AmbientSectionWrapper>
        </motion.div>

        <motion.div
          id="testimonials"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.23,
            duration: 0.35,
            ease: "easeOut",
          }}
        >
          <AmbientSectionWrapper>
            <TestimonialsRow testimonials={testimonials} />
          </AmbientSectionWrapper>
        </motion.div>

        {otherRows.map((row, index) => (
          <motion.div
            key={row.id}
            id={row.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.31 + index * 0.08,
              duration: 0.35,
              ease: "easeOut",
            }}
          >
            <AmbientSectionWrapper>
              <ContentRow row={row} onItemClick={handleItemClick} onItemHover={handleItemHover} />
            </AmbientSectionWrapper>
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.31 + otherRows.length * 0.08,
            duration: 0.35,
            ease: "easeOut",
          }}
        >
          <CertificationsSection certifications={certifications} />
        </motion.div>
      </motion.div>

      <Footer />

      <CaseStudyModal item={selectedItem} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <DeFiCaseStudy isOpen={isDeFiCaseStudyOpen} onClose={() => setIsDeFiCaseStudyOpen(false)} />

      <TreeAppCaseStudy isOpen={isTreeAppCaseStudyOpen} onClose={() => setIsTreeAppCaseStudyOpen(false)} />

      <SimpleDoctorCaseStudy
        isOpen={isSimpleDoctorCaseStudyOpen}
        onClose={() => setIsSimpleDoctorCaseStudyOpen(false)}
      />
    </motion.div>
  )
}
