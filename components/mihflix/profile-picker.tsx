"use client"

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
    <button onClick={onClick} className="group flex flex-col items-center gap-5 transition-all duration-300">
      <div className="relative">
        {/* Soft outer glow on hover */}
        <div
          className={cn(
            "absolute -inset-3 rounded-xl opacity-0 blur-2xl transition-all duration-500",
            "bg-gradient-to-br from-[#2772FF] to-[#18143A]",
            "group-hover:opacity-60 group-focus:opacity-60",
          )}
        />

        {/* Avatar container */}
        <div
          className={cn(
            "relative h-32 w-32 overflow-hidden rounded-lg transition-all duration-300 md:h-36 md:w-36",
            "border border-white/10 group-hover:border-white/30",
            "group-hover:scale-[1.03] group-hover:shadow-2xl",
            "group-active:scale-[0.98]",
          )}
        >
          {/* Background gradient: deep indigo to electric blue with light flare */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#18143A] via-[#1e2a6e] to-[#2772FF]" />

          {/* Soft light flare near top center */}
          <div className="absolute left-1/2 top-0 h-24 w-32 -translate-x-1/2 bg-gradient-to-b from-white/15 to-transparent blur-xl" />

          {/* Face container */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pt-2">
            {/* Glasses outline */}
            <div className="relative mb-1">
              <div className="flex gap-2">
                {/* Left lens */}
                <div className="h-5 w-6 rounded-full border-2 border-white/60" />
                {/* Bridge */}
                <div className="absolute left-1/2 top-1/2 h-0.5 w-2 -translate-x-1/2 -translate-y-1/2 bg-white/40" />
                {/* Right lens */}
                <div className="h-5 w-6 rounded-full border-2 border-white/60" />
              </div>
            </div>

            {/* Eyes inside glasses */}
            <div className="relative -mt-5 flex gap-6">
              <div className="h-2 w-2 rounded-full bg-white shadow-[0_0_6px_rgba(255,255,255,0.8)]" />
              <div className="h-2 w-2 rounded-full bg-white shadow-[0_0_6px_rgba(255,255,255,0.8)]" />
            </div>

            {/* Subtle smiling mouth */}
            <div className="mt-4 h-1.5 w-6 rounded-full border-b-2 border-white/50" />
          </div>

          {/* Tiny cursor icon in bottom right */}
          <div className="absolute bottom-2 right-2 text-white/70 transition-all duration-300 group-hover:text-white">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="drop-shadow-lg">
              <path d="M4 2L20 12L12 14L10 22L4 2Z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Text layout */}
      <div className="text-center">
        <p className="text-xl font-semibold text-white transition-colors duration-300">{designExplorerProfile.name}</p>
        <p className="mt-2 max-w-[200px] text-sm font-normal leading-relaxed text-gray-400 transition-colors duration-300 group-hover:text-gray-300">
          {designExplorerProfile.role}
        </p>
      </div>
    </button>
  )
}

export function ProfilePicker({ onSelect }: ProfilePickerProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black px-4">
      {/* MIHASODJA wordmark */}
      <div className="mb-16 animate-in fade-in slide-in-from-top-4 duration-700">
        <MihFlixLogo size="lg" />
      </div>

      {/* Heading */}
      <h1 className="mb-12 text-3xl font-medium text-white animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150 md:text-4xl">
        Who&apos;s browsing?
      </h1>

      {/* Single profile card */}
      <div className="flex justify-center animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
        <div className="animate-in fade-in zoom-in-95 duration-500" style={{ animationDelay: "400ms" }}>
          <DesignExplorerAvatar onClick={() => onSelect(designExplorerProfile)} />
        </div>
      </div>

      {/* Helper text with extra top margin */}
      <p className="mt-10 text-sm text-gray-500 animate-in fade-in duration-700 delay-700">
        {designExplorerProfile.description}
      </p>
    </div>
  )
}
