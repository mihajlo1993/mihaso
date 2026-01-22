"use client"

import React from "react"

import { useState } from "react"
import { GradientBackground } from "./gradient-background"
import { AnimatedMail, AnimatedExternalLink, AnimatedDownload } from "@/components/ui/animated-icons"
import { Calendar, Linkedin } from "lucide-react"
import { motion } from "framer-motion"

interface ContactItem {
  id: string
  title: string
  description: string
  Icon: React.ComponentType<{ className?: string; size?: number; isHovered?: boolean }>
  gradient: "blue-purple" | "teal-green" | "cyan-blue" | "orange-pink" | "purple-blue"
  action: string
  isAnimated?: boolean
}

const contactItems: ContactItem[] = [
  {
    id: "email",
    title: "Email",
    description: "hello@mihasodja.com",
    Icon: AnimatedMail,
    gradient: "blue-purple",
    action: "Send Email",
    isAnimated: true,
  },
  {
    id: "upwork",
    title: "Upwork",
    description: "Top Rated Plus",
    Icon: AnimatedExternalLink,
    gradient: "teal-green",
    action: "View Profile",
    isAnimated: true,
  },
  {
    id: "linkedin",
    title: "LinkedIn",
    description: "Connect",
    Icon: Linkedin,
    gradient: "cyan-blue",
    action: "Connect",
  },
  {
    id: "calendar",
    title: "Book a Call",
    description: "30 min intro",
    Icon: Calendar,
    gradient: "orange-pink",
    action: "Schedule",
  },
  {
    id: "resume",
    title: "Resume",
    description: "PDF format",
    Icon: AnimatedDownload,
    gradient: "purple-blue",
    action: "Download",
    isAnimated: true,
  },
]

function ContactButton({ item }: { item: ContactItem }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative overflow-hidden rounded-xl"
    >
      <GradientBackground type={item.gradient} overlay={false} className="px-6 py-4">
        <div className="flex items-center gap-3">
          {item.isAnimated ? (
            <item.Icon className="h-5 w-5 text-white" size={20} isHovered={isHovered} />
          ) : (
            <item.Icon className="h-5 w-5 text-white" />
          )}
          <div className="text-left">
            <p className="font-bold text-white">{item.title}</p>
            <p className="text-xs text-white/70">{item.description}</p>
          </div>
        </div>
      </GradientBackground>
    </motion.button>
  )
}

export function ContactSection() {
  return (
    <section className="bg-gradient-to-b from-black via-gray-900/50 to-black px-4 py-16 md:px-12">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">Ready to talk about your product?</h2>
        <p className="mb-10 text-gray-400">
          Let&apos;s design clear, intuitive experiences that ship. Share your product context and we can explore the
          best way to collaborate.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          {contactItems.map((item) => (
            <ContactButton key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}
