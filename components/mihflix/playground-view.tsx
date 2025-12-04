"use client"

import { GradientBackground } from "./gradient-background"
import { Gamepad2, Wand2, Sparkles, Zap } from "lucide-react"

const playgroundItems = [
  {
    id: "motion-lab",
    title: "Motion Lab",
    description: "Interactive animation playground",
    icon: Sparkles,
    gradient: "purple-blue" as const,
  },
  {
    id: "component-builder",
    title: "Component Builder",
    description: "Build and export UI components",
    icon: Wand2,
    gradient: "teal-green" as const,
  },
  {
    id: "color-mixer",
    title: "Color Mixer",
    description: "Generate harmonious palettes",
    icon: Zap,
    gradient: "orange-pink" as const,
  },
  {
    id: "game-corner",
    title: "Game Corner",
    description: "Mini design games and challenges",
    icon: Gamepad2,
    gradient: "cyan-blue" as const,
  },
]

export function PlaygroundView() {
  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="px-4 md:px-12">
        {/* Header */}
        <div className="mb-8 text-center">
          <span className="mb-2 inline-block text-4xl">🎮</span>
          <h1 className="text-3xl font-bold text-white md:text-4xl">Playground</h1>
          <p className="text-gray-400">Interactive tools and fun experiments</p>
        </div>

        {/* Coming Soon Banner */}
        <div className="mb-10 rounded-2xl border border-dashed border-gray-700 bg-gray-900/50 p-8 text-center">
          <p className="mb-2 text-xl font-bold text-white">Interactive Playground Coming Soon</p>
          <p className="text-gray-500">Check back for interactive design tools and mini-games</p>
        </div>

        {/* Preview Grid */}
        <div className="grid gap-6 sm:grid-cols-2">
          {playgroundItems.map((item) => (
            <button
              key={item.id}
              className="group relative overflow-hidden rounded-xl transition-transform hover:scale-[1.02]"
            >
              <GradientBackground type={item.gradient} overlay={false} className="p-8">
                <div className="flex items-start gap-4">
                  <div className="rounded-xl bg-white/20 p-3 backdrop-blur-sm">
                    <item.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-xl font-bold text-white">{item.title}</h3>
                    <p className="text-sm text-white/70">{item.description}</p>
                    <span className="mt-3 inline-block rounded bg-black/30 px-2 py-1 text-xs text-white/50">
                      Coming Soon
                    </span>
                  </div>
                </div>
              </GradientBackground>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
