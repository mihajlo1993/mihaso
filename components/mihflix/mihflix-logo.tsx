"use client"

import { cn } from "@/lib/utils"

interface MihFlixLogoProps {
  className?: string
  size?: "sm" | "md" | "lg" | "xl" | "hero"
  animated?: boolean
}

export function MihFlixLogo({ className, size = "md", animated = false }: MihFlixLogoProps) {
  const sizeClasses = {
    sm: "text-xl tracking-[0.2em]",
    md: "text-3xl tracking-[0.25em]",
    lg: "text-5xl tracking-[0.3em]",
    xl: "text-7xl tracking-[0.35em]",
    hero: "text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-[0.4em] sm:tracking-[0.5em]",
  }

  return (
    <div
      className={cn(
        "font-bold select-none text-center",
        sizeClasses[size],
        animated && "animate-pulse",
        className,
      )}
    >
      <span className="text-white">MIHASODJA</span>
    </div>
  )
}
