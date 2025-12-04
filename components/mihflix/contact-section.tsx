"use client"

import { GradientBackground } from "./gradient-background"
import { Mail, ExternalLink, Calendar, Download, Linkedin } from "lucide-react"

const contactItems = [
  {
    id: "email",
    title: "Email",
    description: "hello@mihasodja.com",
    icon: Mail,
    gradient: "blue-purple" as const,
    action: "Send Email",
  },
  {
    id: "upwork",
    title: "Upwork",
    description: "Top Rated Plus",
    icon: ExternalLink,
    gradient: "teal-green" as const,
    action: "View Profile",
  },
  {
    id: "linkedin",
    title: "LinkedIn",
    description: "Connect",
    icon: Linkedin,
    gradient: "cyan-blue" as const,
    action: "Connect",
  },
  {
    id: "calendar",
    title: "Book a Call",
    description: "30 min intro",
    icon: Calendar,
    gradient: "orange-pink" as const,
    action: "Schedule",
  },
  {
    id: "resume",
    title: "Resume",
    description: "PDF format",
    icon: Download,
    gradient: "purple-blue" as const,
    action: "Download",
  },
]

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
            <button
              key={item.id}
              className="group relative overflow-hidden rounded-xl transition-transform hover:scale-105"
            >
              <GradientBackground type={item.gradient} overlay={false} className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <item.icon className="h-5 w-5 text-white" />
                  <div className="text-left">
                    <p className="font-bold text-white">{item.title}</p>
                    <p className="text-xs text-white/70">{item.description}</p>
                  </div>
                </div>
              </GradientBackground>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
