"use client"

import { cn } from "@/lib/utils"

interface MihFlixLogoProps {
  className?: string
  size?: "sm" | "md" | "lg" | "xl"
  animated?: boolean
}

export function MihFlixLogo({ className, size = "md", animated = false }: MihFlixLogoProps) {
  const sizeClasses = {
    sm: "text-xl",
    md: "text-3xl",
    lg: "text-5xl",
    xl: "text-7xl",
  }

  return (
    <div
      className={cn("font-bold tracking-wider select-none", sizeClasses[size], animated && "animate-pulse", className)}
    >
      <span className="text-white">MIHA</span>
      <span className="text-white">SODJA</span>
    </div>
  )
}
