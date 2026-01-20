"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { GradientBackground } from "./gradient-background"
import type { ContentItem } from "@/lib/data"
import { X, Share2, Calendar, Tag, Briefcase, ExternalLink, Check } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { CaseStudyViewer } from "./case-study-viewer"

interface CaseStudyModalProps {
  item: ContentItem | null
  isOpen: boolean
  onClose: () => void
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-10">
      <h3 className="mb-4 text-xl font-bold text-white">{title}</h3>
      <div className="whitespace-pre-line text-base text-gray-300 leading-relaxed">{children}</div>
    </div>
  )
}

function ImagePlaceholder({ label, gradient }: { label: string; gradient: string }) {
  return (
    <div className="relative aspect-video overflow-hidden rounded-lg">
      <GradientBackground type={gradient as any} className="absolute inset-0" overlay={false} />
      <div className="absolute inset-0 bg-black/30" />
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent" />
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <p className="text-center text-sm font-medium text-white/80">{label}</p>
      </div>
    </div>
  )
}

export function CaseStudyModal({ item, isOpen, onClose }: CaseStudyModalProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isViewerOpen, setIsViewerOpen] = useState(false)
  const [showCopiedToast, setShowCopiedToast] = useState(false)
  const [copyError, setCopyError] = useState(false)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
      if (scrollRef.current) {
        scrollRef.current.scrollTop = 0
      }
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleEsc)
    return () => window.removeEventListener("keydown", handleEsc)
  }, [onClose])

  const content = item?.content

  const handleViewFullCaseStudy = () => {
    if (content?.viewerContent) {
      setIsViewerOpen(true)
    }
  }

  const handleCloseViewer = () => {
    setIsViewerOpen(false)
  }

  const handleShare = async () => {
    if (!item) return

    const slug = item.slug || item.id
    const url = `${window.location.origin}/work/${slug}`

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(url)
        setShowCopiedToast(true)
        setCopyError(false)
        setTimeout(() => setShowCopiedToast(false), 2000)
      } else {
        // Fallback for older browsers
        const textArea = document.createElement("textarea")
        textArea.value = url
        textArea.style.position = "fixed"
        textArea.style.left = "-999999px"
        document.body.appendChild(textArea)
        textArea.select()
        try {
          document.execCommand("copy")
          setShowCopiedToast(true)
          setCopyError(false)
          setTimeout(() => setShowCopiedToast(false), 2000)
        } catch (err) {
          setCopyError(true)
          setTimeout(() => setCopyError(false), 3000)
        }
        document.body.removeChild(textArea)
      }
    } catch (err) {
      setCopyError(true)
      setTimeout(() => setCopyError(false), 3000)
    }
  }

  const handleViewLiveProject = () => {
    if (item?.liveUrl) {
      window.open(item.liveUrl, "_blank", "noopener,noreferrer")
    }
  }

  return (
    <>
      <AnimatePresence>
        {item && isOpen && !isViewerOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
              onClick={onClose}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 8 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className={cn(
                "relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-gray-900",
                "shadow-[0_20px_60px_rgba(0,0,0,0.6)] ring-1 ring-white/10",
              )}
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-6 right-6 z-20 rounded-full bg-black/70 p-3 text-white backdrop-blur-sm transition-all hover:bg-black hover:scale-110 hover:rotate-90"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Hero Section */}
              <div className="relative h-64 flex-shrink-0 md:h-80">
                <GradientBackground type={item.gradientType} className="absolute inset-0" overlay={false} />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
                  {item.badge && (
                    <span className="mb-3 inline-block rounded bg-[#E50914] px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg">
                      {item.badge}
                    </span>
                  )}
                  <h2 className="text-balance text-3xl font-bold text-white md:text-4xl lg:text-5xl">{item.title}</h2>
                </div>
              </div>

              <div ref={scrollRef} className="flex-1 overflow-y-auto">
                <div className="p-8 md:p-10">
                  {/* Meta info row */}
                  {content && (
                    <div className="mb-8 flex flex-wrap items-center gap-4 text-sm text-gray-400">
                      {content.year && (
                        <span className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          {content.year}
                        </span>
                      )}
                      {content.category && (
                        <span className="flex items-center gap-2">
                          <Tag className="h-4 w-4" />
                          {content.category}
                        </span>
                      )}
                      {content.service && (
                        <span className="flex items-center gap-2">
                          <Briefcase className="h-4 w-4" />
                          {content.service}
                        </span>
                      )}
                      {content.website && item.liveUrl && (
                        <a
                          href={item.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-[#E50914] hover:underline"
                        >
                          <ExternalLink className="h-4 w-4" />
                          {content.website}
                        </a>
                      )}
                    </div>
                  )}

                  {/* Tags */}
                  <div className="mb-8 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span key={tag} className="rounded-full bg-white/10 px-4 py-1.5 text-sm text-gray-300">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mb-10 space-y-4">
                    <div className="flex flex-wrap items-center gap-4">
                      {/* Primary CTA - View Live Project */}
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ duration: 0.14 }}
                        onClick={handleViewLiveProject}
                        disabled={!item.liveUrl}
                        className={cn(
                          "flex items-center gap-2 rounded-lg px-8 py-3.5 font-bold shadow-[0_8px_24px_rgba(255,255,255,0.15)] transition-colors",
                          item.liveUrl
                            ? "bg-white text-black hover:bg-gray-200"
                            : "cursor-not-allowed bg-gray-700 text-gray-400",
                        )}
                      >
                        <ExternalLink className="h-5 w-5" />
                        View live project
                      </motion.button>

                      {/* Share Icon */}
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.14 }}
                        onClick={handleShare}
                        className="rounded-full bg-gray-800 p-3.5 text-white transition-colors hover:bg-gray-700"
                        aria-label="Share project"
                      >
                        <Share2 className="h-5 w-5" />
                      </motion.button>
                    </div>

                    {/* Secondary Link - View Full Case Study */}
                    {content?.viewerContent && (
                      <button
                        onClick={handleViewFullCaseStudy}
                        className="text-sm text-gray-400 underline-offset-4 hover:text-white hover:underline"
                      >
                        View full case study
                      </button>
                    )}
                  </div>

                  <div className="mb-10 h-px bg-gray-800" />

                  {content ? (
                    <>
                      <Section title="Overview">{content.overview}</Section>
                      <Section title="Role & Responsibilities">{content.role}</Section>
                      <Section title="Problem">{content.problem}</Section>
                      <Section title="Research">{content.research}</Section>
                      <Section title="Solution">{content.solution}</Section>
                      <Section title="Impact">{content.impact}</Section>
                      <Section title="Conclusion">{content.conclusion}</Section>

                      {content.images && content.images.length > 0 && (
                        <div className="mt-10">
                          <h3 className="mb-6 text-xl font-bold text-white">Project Gallery</h3>
                          <div className="grid gap-6 sm:grid-cols-2">
                            {content.images.map((img, i) => (
                              <ImagePlaceholder key={i} label={img} gradient={item.gradientType} />
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      <p className="text-base text-gray-300 leading-relaxed">
                        {item.longDescription || item.shortDescription}
                      </p>
                      <div className="mt-10 grid gap-6 md:grid-cols-2">
                        <div>
                          <p className="text-sm text-gray-500">Type</p>
                          <p className="text-white capitalize">{item.type}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Category</p>
                          <p className="text-white">{item.tags[0] || "Design"}</p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {(showCopiedToast || copyError) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed bottom-8 left-1/2 z-[60] -translate-x-1/2"
          >
            <div
              className={cn(
                "flex items-center gap-3 rounded-lg px-6 py-3 shadow-2xl backdrop-blur-sm",
                showCopiedToast && "bg-green-600/90 text-white",
                copyError && "bg-red-600/90 text-white",
              )}
            >
              {showCopiedToast && (
                <>
                  <Check className="h-5 w-5" />
                  <span className="font-medium">Link copied successfully</span>
                </>
              )}
              {copyError && <span className="font-medium">Unable to copy link. Please copy it manually.</span>}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {item?.content?.viewerContent && (
        <CaseStudyViewer content={item.content.viewerContent} isOpen={isViewerOpen} onClose={handleCloseViewer} />
      )}
    </>
  )
}
