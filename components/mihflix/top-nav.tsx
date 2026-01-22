"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { MihFlixLogo } from "./mihflix-logo"
import type { Profile } from "@/lib/data"
import { motion, AnimatePresence } from "framer-motion"
import {
  AnimatedHome,
  AnimatedBriefcase,
  AnimatedUser,
  AnimatedMail,
  AnimatedMenu,
  AnimatedX,
} from "@/components/ui/animated-icons"

interface TopNavProps {
  profile: Profile
  activeTab: string
  onTabChange: (tab: string) => void
  onProfileSwitch: () => void
}

const navItems = [
  { id: "home", label: "Home", Icon: AnimatedHome },
  { id: "work", label: "Work", Icon: AnimatedBriefcase },
  { id: "about", label: "About", Icon: AnimatedUser },
  { id: "contact", label: "Contact", Icon: AnimatedMail },
]

const mobileNavItems = [
  { id: "home", label: "Home", Icon: AnimatedHome },
  { id: "work", label: "View Work", Icon: AnimatedBriefcase },
  { id: "about", label: "About", Icon: AnimatedUser },
  { id: "contact", label: "Get in Touch", Icon: AnimatedMail },
]

function MiniDesignExplorerAvatar() {
  return (
    <div className="relative h-10 w-10 overflow-hidden rounded-full">
      <div className="absolute inset-0 bg-gradient-to-br from-[#18143A] via-[#1e2a6e] to-[#2772FF]" />
      <div className="absolute left-1/2 top-0 h-6 w-8 -translate-x-1/2 bg-gradient-to-b from-white/15 to-transparent blur-md" />
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="relative mb-0.5">
          <div className="flex gap-1">
            <div className="h-2 w-2.5 rounded-full border border-white/60" />
            <div className="absolute left-1/2 top-1/2 h-px w-1 -translate-x-1/2 -translate-y-1/2 bg-white/40" />
            <div className="h-2 w-2.5 rounded-full border border-white/60" />
          </div>
        </div>
        <div className="relative -mt-2 flex gap-2.5">
          <div className="h-1 w-1 rounded-full bg-white shadow-[0_0_3px_rgba(255,255,255,0.8)]" />
          <div className="h-1 w-1 rounded-full bg-white shadow-[0_0_3px_rgba(255,255,255,0.8)]" />
        </div>
        <div className="mt-1.5 h-0.5 w-2.5 rounded-full border-b border-white/50" />
      </div>
    </div>
  )
}

function NavButton({
  item,
  isActive,
  onClick,
}: {
  item: (typeof navItems)[0]
  isActive: boolean
  onClick: () => void
}) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "relative z-10 flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 lg:px-5 lg:py-2.5",
        isActive ? "text-white" : "text-gray-400 hover:text-white",
      )}
    >
      {isActive && (
        <motion.div
          layoutId="active-pill"
          className="absolute inset-0 rounded-full bg-white/15 shadow-lg"
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      )}
      <item.Icon className="relative z-10 h-4 w-4" isHovered={isHovered} />
      <span className="relative z-10">{item.label}</span>
    </button>
  )
}

function MobileNavButton({
  item,
  isActive,
  onClick,
}: {
  item: (typeof mobileNavItems)[0]
  isActive: boolean
  onClick: () => void
}) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "flex items-center gap-4 rounded-xl px-5 py-4 text-left text-lg font-medium transition-colors",
        isActive ? "bg-white/10 text-white" : "text-gray-300 hover:bg-white/5",
      )}
    >
      <item.Icon className="h-5 w-5" isHovered={isHovered} />
      {item.label}
    </button>
  )
}

export function TopNav({ profile, activeTab, onTabChange, onProfileSwitch }: TopNavProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMenuHovered, setIsMenuHovered] = useState(false)

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-40 bg-gradient-to-b from-black via-black/95 to-transparent backdrop-blur-sm"
    >
      <div className="flex items-center justify-between px-6 py-5 md:px-12 lg:px-16">
        <motion.button
          onClick={() => onTabChange("home")}
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0"
        >
          <MihFlixLogo size="sm" />
        </motion.button>

        <div className="hidden md:flex items-center justify-center absolute left-1/2 -translate-x-1/2">
          <div className="relative flex items-center gap-1 lg:gap-2">
            {navItems.map((item) => (
              <NavButton
                key={item.id}
                item={item}
                isActive={activeTab === item.id}
                onClick={() => onTabChange(item.id)}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={onProfileSwitch}
            className="group relative hidden md:block overflow-hidden rounded-full transition-all hover:scale-110 border border-white/25 hover:border-white/40"
            aria-label="Switch profile"
          >
            <MiniDesignExplorerAvatar />
          </button>

          <button
            className="rounded-full p-2 text-gray-400 transition-colors hover:text-white md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            onMouseEnter={() => setIsMenuHovered(true)}
            onMouseLeave={() => setIsMenuHovered(false)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <AnimatedX className="h-6 w-6" isHovered={isMenuHovered} />
            ) : (
              <AnimatedMenu className="h-6 w-6" isHovered={isMenuHovered} />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="border-t border-gray-800/50 bg-black/98 px-6 py-6 md:hidden"
          >
            <div className="flex flex-col gap-2">
              {mobileNavItems.map((item) => (
                <MobileNavButton
                  key={item.id}
                  item={item}
                  isActive={activeTab === item.id}
                  onClick={() => {
                    onTabChange(item.id)
                    setIsMobileMenuOpen(false)
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
