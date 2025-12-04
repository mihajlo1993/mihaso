"use client"

import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { ContentRow } from "./content-row"
import { Footer } from "./footer"
import { CaseStudyModal } from "./case-study-modal"
import { TestimonialModal } from "./testimonial-modal"
import { AmbientSectionWrapper } from "./ambient-section-wrapper"
import { HeroBanner } from "./hero-banner"
import { CertificationsSection } from "./certifications-section"
import { DeFiCaseStudy } from "./defi-case-study"
import { TreeAppCaseStudy } from "./treeapp-case-study"
import { highlightReel, testimonials, contactLinks, certifications, type ContentItem, type Profile } from "@/lib/data"
import { motion } from "framer-motion"

interface HomeScreenProps {
  profile: Profile
}

export function HomeScreen({ profile }: HomeScreenProps) {
  const router = useRouter()
  const [hoveredItem, setHoveredItem] = useState<ContentItem | null>(null)
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeFiCaseStudyOpen, setIsDeFiCaseStudyOpen] = useState(false)
  const [isTreeAppCaseStudyOpen, setIsTreeAppCaseStudyOpen] = useState(false)
  const [isTestimonialModalOpen, setIsTestimonialModalOpen] = useState(false)
  const [testimonialIndex, setTestimonialIndex] = useState(0)

  const rows = [
    {
      id: "highlight-reel",
      title: "Highlight Reel",
      subtitle: "Visual showcase",
      items: highlightReel,
    },
    {
      id: "testimonials",
      title: "What Clients Say",
      subtitle: "Real feedback from real projects",
      items: testimonials,
    },
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

  const handleItemClick = useCallback(
    (item: ContentItem) => {
      if (item.type === "link") {
        if (item.id === "contact") {
          router.push("/contact")
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
      } else if (item.type === "testimonial") {
        const index = testimonials.findIndex((t) => t.id === item.id)
        setTestimonialIndex(index >= 0 ? index : 0)
        setIsTestimonialModalOpen(true)
      } else {
        setSelectedItem(item)
        setIsModalOpen(true)
      }
    },
    [router],
  )

  const scrollToWork = useCallback(() => {
    const element = document.getElementById("highlight-reel")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }, [])

  const scrollToContact = useCallback(() => {
    router.push("/contact")
  }, [router])

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
        {rows.map((row, index) => (
          <motion.div
            key={row.id}
            id={row.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.15 + index * 0.08,
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
            delay: 0.15 + rows.length * 0.08,
            duration: 0.35,
            ease: "easeOut",
          }}
        >
          <CertificationsSection certifications={certifications} />
        </motion.div>
      </motion.div>

      <Footer />

      <CaseStudyModal item={selectedItem} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <TestimonialModal
        testimonials={testimonials}
        currentIndex={testimonialIndex}
        isOpen={isTestimonialModalOpen}
        onClose={() => setIsTestimonialModalOpen(false)}
        onNavigate={setTestimonialIndex}
      />

      <DeFiCaseStudy isOpen={isDeFiCaseStudyOpen} onClose={() => setIsDeFiCaseStudyOpen(false)} />

      <TreeAppCaseStudy isOpen={isTreeAppCaseStudyOpen} onClose={() => setIsTreeAppCaseStudyOpen(false)} />
    </motion.div>
  )
}
