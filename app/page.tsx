"use client"

import { useState, useCallback } from "react"
import { ProfilePicker } from "@/components/mihflix/profile-picker"
import { TopNav } from "@/components/mihflix/top-nav"
import { HomeScreen } from "@/components/mihflix/home-screen"
import { WorkView } from "@/components/mihflix/work-view"
import { AboutView } from "@/components/mihflix/about-view"
import { ContactView } from "@/components/mihflix/contact-view"
import type { Profile } from "@/lib/data"
import { AnimatePresence } from "framer-motion"

type AppState = "profile-picker" | "main"
type Tab = "home" | "work" | "about" | "contact"

export default function MihFlixApp() {
  const [appState, setAppState] = useState<AppState>("profile-picker")
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null)
  const [activeTab, setActiveTab] = useState<Tab>("home")

  const handleProfileSelect = useCallback((profile: Profile) => {
    setSelectedProfile(profile)
    setAppState("main")
  }, [])

  const handleProfileSwitch = useCallback(() => {
    setAppState("profile-picker")
  }, [])

  const handleTabChange = useCallback((tab: string) => {
    setActiveTab(tab as Tab)
  }, [])

  // Profile picker
  if (appState === "profile-picker") {
    return <ProfilePicker onSelect={handleProfileSelect} />
  }

  // Main app
  if (!selectedProfile) return null

  return (
    <div className="min-h-screen bg-black">
      <TopNav
        profile={selectedProfile}
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onProfileSwitch={handleProfileSwitch}
      />

      <AnimatePresence mode="wait">
        {activeTab === "home" && <HomeScreen key="home" profile={selectedProfile} />}
        {activeTab === "work" && <WorkView key="work" />}
        {activeTab === "about" && <AboutView key="about" />}
        {activeTab === "contact" && <ContactView key="contact" />}
      </AnimatePresence>
    </div>
  )
}
