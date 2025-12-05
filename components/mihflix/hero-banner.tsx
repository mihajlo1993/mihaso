"use client"

import { useState } from "react"
import { motion } from "framer-motion"

interface HeroBannerProps {
  onViewWork: () => void
  onGetInTouch: () => void
}

type HeroSlide = {
  type: "video"
  src: string
}

const heroSlides: HeroSlide[] = [
  {
    type: "video",
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Video_Enhanced_for_Mobile_UI-kTEWcysxZO4TYO2nJw7SWoNvBlLxSR.mp4",
  },
]

const chips = ["Product Design", "UI/UX", "Design Systems", "Digital Health"]

export function HeroBanner({ onViewWork, onGetInTouch }: HeroBannerProps) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)

  return (
    <div className="relative w-full h-[85vh] min-h-[500px] max-h-[900px] md:h-[70vh] md:max-h-[800px] overflow-hidden">
      <div className="absolute inset-0">
        <video
          src={heroSlides[0].src}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            transform: "scale(1.2)",
            transformOrigin: "center center",
          }}
        />
      </div>

      {/* Gradient overlays for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent md:from-black/80 md:via-black/40 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent pointer-events-none" />

      {/* Subtle shadow for depth */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black via-transparent to-transparent shadow-2xl pointer-events-none" />

      {/* Content overlay */}
      <div className="absolute inset-0 flex items-end pointer-events-none">
        <div className="w-full px-6 pb-12 md:px-14 md:pb-20 lg:px-16 lg:pb-24 pointer-events-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="max-w-2xl space-y-4 md:space-y-5"
          >
            {/* Name - responsive sizing */}
            <h1 className="text-3xl font-bold text-white tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
              Miha Sodja
            </h1>

            {/* Tagline */}
            <p className="text-base text-gray-300 font-medium sm:text-lg md:text-xl">
              Lead Designer | Crafting Engaging User Experiences | Utilising AI
            </p>

            <div className="flex flex-wrap gap-2 pt-1 md:pt-2">
              {chips.map((chip) => (
                <span
                  key={chip}
                  className="px-2.5 py-1 text-xs font-medium text-white/90 bg-white/10 backdrop-blur-sm rounded-md border border-white/10 sm:px-3 sm:py-1.5 sm:text-sm"
                >
                  {chip}
                </span>
              ))}
            </div>

            <div className="flex flex-col gap-3 pt-4 sm:flex-row sm:items-center sm:gap-4 md:pt-5">
              <button
                onClick={onViewWork}
                className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3.5 sm:py-3 bg-white text-black font-semibold rounded-lg hover:bg-white/90 transition-colors text-base"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                </svg>
                View work
              </button>
              <button
                onClick={onGetInTouch}
                className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3.5 sm:py-3 bg-gray-600/80 text-white font-semibold rounded-lg hover:bg-gray-600 transition-colors backdrop-blur-sm text-base"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                Get in touch
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 sm:bottom-6 sm:left-auto sm:right-12 sm:translate-x-0 z-10">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlideIndex(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentSlideIndex ? "bg-white w-6" : "bg-white/40 hover:bg-white/60 w-2"
            }`}
          />
        ))}
      </div>
    </div>
  )
}
