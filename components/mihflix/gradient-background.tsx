"use client"

import type React from "react"
import { cn } from "@/lib/utils"
import type { GradientType } from "@/lib/data"

interface GradientBackgroundProps {
  type: GradientType
  className?: string
  children?: React.ReactNode
  overlay?: boolean
}

const gradientClasses: Record<GradientType, string> = {
  "blue-purple": "from-blue-600 via-indigo-600 to-purple-700",
  "teal-green": "from-teal-500 via-emerald-500 to-green-600",
  "green-teal": "from-green-500 via-emerald-500 to-teal-600",
  "orange-pink": "from-orange-500 via-rose-500 to-pink-600",
  "deep-red": "from-red-700 via-rose-800 to-violet-900",
  "purple-blue": "from-purple-600 via-violet-600 to-blue-700",
  "cyan-blue": "from-cyan-500 via-blue-500 to-indigo-600",
  "pink-purple": "from-pink-500 via-fuchsia-500 to-purple-600",
  "red-violet": "from-red-600 via-rose-600 to-violet-700",
  "red-orange": "from-red-600 via-orange-500 to-amber-500",
  "violet-pink": "from-violet-600 via-purple-500 to-pink-500",
}

export function GradientBackground({ type, className, children, overlay = true }: GradientBackgroundProps) {
  return (
    <div className={cn("relative bg-gradient-to-br", gradientClasses[type], className)}>
      {overlay && <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />}
      {children}
    </div>
  )
}
