"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface LoadingIntroProps {
  onComplete: () => void
}

export function LoadingIntro({ onComplete }: LoadingIntroProps) {
  const [isFading, setIsFading] = useState(false)
  const [animationPhase, setAnimationPhase] = useState(0)

  useEffect(() => {
    // Phase 1: Initial state (0ms)
    // Phase 2: M draws in (100ms)
    // Phase 3: M glows (800ms)
    // Phase 4: Fade out (1600ms)

    const phase2Timer = setTimeout(() => setAnimationPhase(1), 100)
    const phase3Timer = setTimeout(() => setAnimationPhase(2), 800)
    const fadeTimer = setTimeout(() => {
      setIsFading(true)
      setTimeout(onComplete, 500)
    }, 2000)

    return () => {
      clearTimeout(phase2Timer)
      clearTimeout(phase3Timer)
      clearTimeout(fadeTimer)
    }
  }, [onComplete])

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-500",
        isFading && "opacity-0",
      )}
    >
      {/* Animated M Logo */}
      <div className="relative flex items-center justify-center">
        {/* Outer glow ring */}
        <div
          className={cn(
            "absolute inset-0 rounded-full transition-all duration-1000",
            animationPhase >= 2 ? "scale-150 opacity-0" : "scale-100 opacity-0",
          )}
          style={{
            background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)",
            width: "200px",
            height: "200px",
            marginLeft: "-50px",
            marginTop: "-50px",
          }}
        />

        {/* SVG M with draw animation */}
        <svg viewBox="0 0 100 100" className="h-24 w-24 md:h-32 md:w-32">
          {/* Background subtle glow */}
          <defs>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <linearGradient id="mGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#cccccc" />
            </linearGradient>
          </defs>

          {/* M letter path with stroke animation */}
          <path
            d="M 20 75 L 20 25 L 50 55 L 80 25 L 80 75"
            fill="none"
            stroke="url(#mGradient)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter={animationPhase >= 2 ? "url(#glow)" : "none"}
            className={cn("transition-all duration-700", animationPhase >= 1 ? "opacity-100" : "opacity-0")}
            style={{
              strokeDasharray: 200,
              strokeDashoffset: animationPhase >= 1 ? 0 : 200,
              transition: "stroke-dashoffset 0.7s ease-out, opacity 0.3s ease-out",
            }}
          />
        </svg>

        {/* Subtle particle effects */}
        {animationPhase >= 2 && (
          <>
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute h-1 w-1 rounded-full bg-white/40 animate-ping"
                style={{
                  left: `${50 + Math.cos((i * 60 * Math.PI) / 180) * 60}px`,
                  top: `${50 + Math.sin((i * 60 * Math.PI) / 180) * 60}px`,
                  animationDelay: `${i * 100}ms`,
                  animationDuration: "1s",
                }}
              />
            ))}
          </>
        )}
      </div>

      {/* Subtle tagline */}
      <div
        className={cn(
          "absolute bottom-20 text-center transition-all duration-500",
          animationPhase >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
        )}
      >
        <p className="text-xs tracking-[0.3em] text-zinc-500 uppercase">Miha Sodja</p>
      </div>
    </div>
  )
}
