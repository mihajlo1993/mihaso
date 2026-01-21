"use client"

import { useState, useEffect } from "react"
import type { Profile } from "@/lib/data"
import { MihFlixLogo } from "./mihflix-logo"
import { cn } from "@/lib/utils"

interface ProfilePickerProps {
  onSelect: (profile: Profile) => void
}

const designExplorerProfile: Profile = {
  id: "design-explorer",
  name: "Design Explorer",
  role: "Here to see what great product design really looks like.",
  description: "Click to start watching MihFlix.",
  type: "designer",
  avatarGradient: "blue-purple",
  avatarFace: "◉‿◉",
  isReal: true,
  avatar: "👀",
}

function DesignExplorerAvatar({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="group flex flex-col items-center gap-6 transition-all duration-500 focus:outline-none"
      aria-label="Enter portfolio as Design Explorer"
    >
      <div className="relative">
        {/* Soft spotlight glow behind avatar */}
        <div
          className={cn(
            "absolute -inset-8 rounded-full opacity-40 blur-3xl transition-all duration-700",
            "bg-gradient-to-br from-[#2772FF]/60 via-[#4F46E5]/40 to-[#18143A]/60",
            "group-hover:opacity-70 group-hover:scale-110 group-focus:opacity-70",
          )}
        />

        {/* Secondary glow ring */}
        <div
          className={cn(
            "absolute -inset-4 rounded-2xl opacity-0 blur-xl transition-all duration-500",
            "bg-gradient-to-t from-white/10 to-transparent",
            "group-hover:opacity-100",
          )}
        />

        {/* Avatar container */}
        <div
          className={cn(
            "relative h-36 w-36 overflow-hidden rounded-xl transition-all duration-500 sm:h-40 sm:w-40",
            "border border-white/10 group-hover:border-white/25",
            "group-hover:scale-[1.02] group-hover:shadow-[0_20px_60px_-15px_rgba(39,114,255,0.4)]",
            "group-active:scale-[0.98]",
          )}
        >
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#18143A] via-[#1e2a6e] to-[#2772FF]" />

          {/* Soft light flare */}
          <div className="absolute left-1/2 top-0 h-28 w-40 -translate-x-1/2 bg-gradient-to-b from-white/12 to-transparent blur-xl" />

          {/* Face container */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pt-2">
            {/* Glasses outline */}
            <div className="relative mb-1">
              <div className="flex gap-2">
                <div className="h-5 w-6 rounded-full border-2 border-white/60" />
                <div className="absolute left-1/2 top-1/2 h-0.5 w-2 -translate-x-1/2 -translate-y-1/2 bg-white/40" />
                <div className="h-5 w-6 rounded-full border-2 border-white/60" />
              </div>
            </div>

            {/* Eyes */}
            <div className="relative -mt-5 flex gap-6">
              <div className="h-2 w-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.9)]" />
              <div className="h-2 w-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.9)]" />
            </div>

            {/* Mouth */}
            <div className="mt-4 h-1.5 w-6 rounded-full border-b-2 border-white/50" />
          </div>

          {/* Cursor icon */}
          <div className="absolute bottom-2.5 right-2.5 text-white/60 transition-all duration-500 group-hover:text-white/90">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="drop-shadow-lg">
              <path d="M4 2L20 12L12 14L10 22L4 2Z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Profile name */}
      <p className="text-lg font-medium text-white/90 transition-colors duration-300 group-hover:text-white">
        {designExplorerProfile.name}
      </p>
    </button>
  )
}

export function ProfilePicker({ onSelect }: ProfilePickerProps) {
  const [showCta, setShowCta] = useState(false)

  useEffect(() => {
    // Delayed fade-in for CTA
    const timer = setTimeout(() => setShowCta(true), 1500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Handle Enter key press
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        onSelect(designExplorerProfile)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [onSelect])

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#050505] px-6">
      {/* Cinematic vignette overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.4)_70%,rgba(0,0,0,0.8)_100%)]" />
      
      {/* Subtle top-to-bottom gradient */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />

      {/* Content container */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Large centered title */}
        <div className="mb-8 animate-in fade-in slide-in-from-top-6 duration-1000 ease-out">
          <MihFlixLogo size="hero" />
        </div>

        {/* Welcome prompt */}
        <p className="mb-16 text-base font-light tracking-wide text-white/50 animate-in fade-in slide-in-from-top-4 duration-1000 delay-200 ease-out sm:mb-20 sm:text-lg">
          Ready to explore?
        </p>

        {/* Avatar with spotlight */}
        <div className="mb-12 animate-in fade-in zoom-in-95 duration-1000 delay-500 ease-out sm:mb-16">
          <DesignExplorerAvatar onClick={() => onSelect(designExplorerProfile)} />
        </div>

        {/* Value proposition */}
        <p className="max-w-md text-center text-sm font-normal leading-relaxed text-white/40 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-700 ease-out sm:text-base">
          Lead Product Designer crafting intuitive, scalable digital experiences that drive results.
        </p>

        {/* Subtle CTA cue */}
        <p
          className={cn(
            "mt-12 text-xs font-light tracking-widest text-white/25 uppercase transition-all duration-1000 sm:mt-16",
            showCta ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
          )}
        >
          Press Enter or click to begin
        </p>
      </div>
    </div>
  )
}
