"use client"

import type React from "react"

import { useState, useRef } from "react"
import { cn } from "@/lib/utils"

interface AmbientSectionWrapperProps {
  children: React.ReactNode
  className?: string
}

export function AmbientSectionWrapper({ children, className }: AmbientSectionWrapperProps) {
  const [ambientGradient, setAmbientGradient] = useState<string | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout>()

  const handleItemHover = (gradientType: string | null) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    if (gradientType) {
      setAmbientGradient(gradientType)
    } else {
      // Fade out with delay
      timeoutRef.current = setTimeout(() => {
        setAmbientGradient(null)
      }, 200)
    }
  }

  const getGradientStyle = () => {
    if (!ambientGradient) return {}

    const gradients: Record<string, string> = {
      "blue-purple": "radial-gradient(ellipse 80% 50% at 50% 40%, rgba(59, 130, 246, 0.15), transparent 70%)",
      "teal-green": "radial-gradient(ellipse 80% 50% at 50% 40%, rgba(20, 184, 166, 0.15), transparent 70%)",
      "orange-pink": "radial-gradient(ellipse 80% 50% at 50% 40%, rgba(251, 146, 60, 0.15), transparent 70%)",
      "purple-blue": "radial-gradient(ellipse 80% 50% at 50% 40%, rgba(147, 51, 234, 0.15), transparent 70%)",
      "red-violet": "radial-gradient(ellipse 80% 50% at 50% 40%, rgba(225, 29, 72, 0.15), transparent 70%)",
      "cyan-blue": "radial-gradient(ellipse 80% 50% at 50% 40%, rgba(6, 182, 212, 0.15), transparent 70%)",
      "green-teal": "radial-gradient(ellipse 80% 50% at 50% 40%, rgba(34, 197, 94, 0.15), transparent 70%)",
    }

    return {
      background: gradients[ambientGradient] || gradients["blue-purple"],
    }
  }

  return (
    <div className={cn("relative transition-all duration-200 ease-out", className)}>
      {/* Ambient Background Layer */}
      <div
        className="pointer-events-none absolute inset-0 -inset-y-12 transition-opacity duration-200"
        style={{
          ...getGradientStyle(),
          opacity: ambientGradient ? 1 : 0,
        }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}
