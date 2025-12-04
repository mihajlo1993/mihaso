"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { MihFlixLogo } from "./mihflix-logo"
import type { Profile } from "@/lib/data"
import { Home, Briefcase, User, Mail, Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface TopNavProps {
  profile: Profile
  activeTab: string
  onTabChange: (tab: string) => void
  onProfileSwitch: () => void
}

const navItems = [
  { id: "home", label: "Home", icon: Home },
  { id: "work", label: "Work", icon: Briefcase },
  { id: "about", label: "About", icon: User },
  { id: "contact", label: "Contact", icon: Mail },
]

const mobileNavItems = [
  { id: "home", label: "Home", icon: Home },
  { id: "work", label: "View Work", icon: Briefcase },
  { id: "about", label: "About", icon: User },
  { id: "contact", label: "Get in Touch", icon: Mail },
]

function MiniDesignExplorerAvatar() {
  return (
    <div className="relative h-10 w-10 overflow-hidden rounded-full">
      {/* Background gradient: deep indigo to electric blue */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#18143A] via-[#1e2a6e] to-[#2772FF]" />

      {/* Soft light flare */}
      <div className="absolute left-1/2 top-0 h-6 w-8 -translate-x-1/2 bg-gradient-to-b from-white/15 to-transparent blur-md" />

      {/* Face container - scaled down */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {/* Glasses outline */}
        <div className="relative mb-0.5">
          <div className="flex gap-1">
            {/* Left lens */}
            <div className="h-2 w-2.5 rounded-full border border-white/60" />
            {/* Bridge */}
            <div className="absolute left-1/2 top-1/2 h-px w-1 -translate-x-1/2 -translate-y-1/2 bg-white/40" />
            {/* Right lens */}
            <div className="h-2 w-2.5 rounded-full border border-white/60" />
          </div>
        </div>

        {/* Eyes inside glasses */}
        <div className="relative -mt-2 flex gap-2.5">
          <div className="h-1 w-1 rounded-full bg-white shadow-[0_0_3px_rgba(255,255,255,0.8)]" />
          <div className="h-1 w-1 rounded-full bg-white shadow-[0_0_3px_rgba(255,255,255,0.8)]" />
        </div>

        {/* Subtle smiling mouth */}
        <div className="mt-1.5 h-0.5 w-2.5 rounded-full border-b border-white/50" />
      </div>
    </div>
  )
}

export function TopNav({ profile, activeTab, onTabChange, onProfileSwitch }: TopNavProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-40 bg-gradient-to-b from-black via-black/95 to-transparent backdrop-blur-sm"
    >
      <div className="flex items-center justify-between px-6 py-5 md:px-12 lg:px-16">
        {/* Left - Logo with subtle hover animation */}
        <motion.button
          onClick={() => onTabChange("home")}
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0"
        >
          <MihFlixLogo size="sm" />
        </motion.button>

        {/* Center - Navigation tabs (desktop only) */}
        <div className="hidden md:flex items-center justify-center absolute left-1/2 -translate-x-1/2">
          <div className="relative flex items-center gap-1 lg:gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={cn(
                  "relative z-10 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 lg:px-5 lg:py-2.5",
                  activeTab === item.id ? "text-white" : "text-gray-400 hover:text-white",
                )}
              >
                {activeTab === item.id && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 rounded-full bg-white/15 shadow-lg"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Right - Profile avatar */}
        <div className="flex items-center gap-4">
          <button
            onClick={onProfileSwitch}
            className="group relative hidden md:block overflow-hidden rounded-full transition-all hover:scale-110 border border-white/25 hover:border-white/40"
            aria-label="Switch profile"
          >
            <MiniDesignExplorerAvatar />
          </button>

          {/* Mobile menu button */}
          <button
            className="rounded-full p-2 text-gray-400 transition-colors hover:text-white md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
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
                <button
                  key={item.id}
                  onClick={() => {
                    onTabChange(item.id)
                    setIsMobileMenuOpen(false)
                  }}
                  className={cn(
                    "flex items-center gap-4 rounded-xl px-5 py-4 text-left text-lg font-medium transition-colors",
                    activeTab === item.id ? "bg-white/10 text-white" : "text-gray-300 hover:bg-white/5",
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
