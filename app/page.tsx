"use client"

import { useState, useCallback, useEffect } from "react"
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

const validTabs: Tab[] = ["home", "work", "about", "contact"]

function getTabFromPath(): Tab {
  if (typeof window === "undefined") return "home"
  const path = window.location.pathname.replace("/", "")
  return validTabs.includes(path as Tab) ? (path as Tab) : "home"
}

export default function MihFlixApp() {
  const [appState, setAppState] = useState<AppState>("profile-picker")
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null)
  const [activeTab, setActiveTab] = useState<Tab>("home")

  useEffect(() => {
    // Set initial tab from path
    setActiveTab(getTabFromPath())

    // Listen for popstate (browser back/forward)
    const handlePopState = () => {
      setActiveTab(getTabFromPath())
    }

    window.addEventListener("popstate", handlePopState)
    return () => window.removeEventListener("popstate", handlePopState)
  }, [])

  const handleProfileSelect = useCallback((profile: Profile) => {
    setSelectedProfile(profile)
    setAppState("main")
    const currentTab = getTabFromPath()
    if (currentTab !== "home") {
      window.history.pushState({}, "", `/${currentTab}`)
    }
  }, [])

  const handleProfileSwitch = useCallback(() => {
    setAppState("profile-picker")
  }, [])

  const handleTabChange = useCallback((tab: string) => {
    const newTab = tab as Tab
    setActiveTab(newTab)
    const newPath = newTab === "home" ? "/" : `/${newTab}`
    window.history.pushState({}, "", newPath)
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
