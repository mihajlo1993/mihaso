"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface LoadingIntroProps {
  onComplete: () => void
}

export function LoadingIntro({ onComplete }: LoadingIntroProps) {
  const [isFading, setIsFading] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Start playing the video
    video.play().catch((err) => {
      console.error("[v0] Video autoplay failed:", err)
      // If autoplay fails, still transition after a delay
      setTimeout(() => {
        setIsFading(true)
        setTimeout(onComplete, 500)
      }, 2000)
    })

    const handleEnded = () => {
      // Video finished, fade out and complete
      setIsFading(true)
      setTimeout(onComplete, 500)
    }

    video.addEventListener("ended", handleEnded)

    return () => {
      video.removeEventListener("ended", handleEnded)
    }
  }, [onComplete])

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-500",
        isFading && "opacity-0",
      )}
    >
      <video
        ref={videoRef}
        className="h-full w-full object-contain"
        playsInline
        muted
        preload="auto"
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Video_Prompt_for_Animation-t03O1esclPgtIqDfSbRezLXQuFpZcY.mp4"
      />
    </div>
  )
}
