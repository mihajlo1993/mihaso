"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

interface CertificationCardProps {
  title: string
  issuer: string
  date: string
  thumbnailUrl: string
  certificateUrl: string
  index: number
}

export function CertificationCard({
  title,
  issuer,
  date,
  thumbnailUrl,
  certificateUrl,
  index,
}: CertificationCardProps) {
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const card = cardRef.current
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateXValue = ((y - centerY) / centerY) * -15
    const rotateYValue = ((x - centerX) / centerX) * 15

    setRotateX(rotateXValue)
    setRotateY(rotateYValue)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
    setIsHovered(false)
  }

  const handleClick = () => {
    window.open(certificateUrl, "_blank", "noopener,noreferrer")
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
      className="perspective-1000"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <motion.div
        animate={{
          rotateX,
          rotateY,
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
        }}
        className="relative cursor-pointer transform-gpu"
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {/* Card container with glass effect */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900/90 to-gray-950/90 backdrop-blur-sm border border-gray-800/50 shadow-2xl">
          {/* Reflection overlay */}
          <div
            className="absolute inset-0 opacity-0 transition-opacity duration-300 pointer-events-none"
            style={{
              background: `linear-gradient(${105 + rotateY * 2}deg, transparent 40%, rgba(255, 255, 255, ${isHovered ? 0.1 : 0}) 50%, transparent 60%)`,
              opacity: isHovered ? 1 : 0,
            }}
          />

          {/* Glow effect */}
          <div
            className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 rounded-2xl blur-xl opacity-0 transition-opacity duration-300"
            style={{ opacity: isHovered ? 0.6 : 0 }}
          />

          {/* Certificate thumbnail */}
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={thumbnailUrl || "/placeholder.svg"}
              alt={title}
              fill
              className="object-cover transition-transform duration-300"
              style={{
                transform: isHovered ? "scale(1.05)" : "scale(1)",
              }}
            />

            {/* Shimmer effect on hover */}
            <div
              className="absolute inset-0 opacity-0 transition-opacity duration-500"
              style={{
                background: `linear-gradient(${90 + rotateY * 3}deg, transparent 30%, rgba(255, 255, 255, 0.15) 50%, transparent 70%)`,
                opacity: isHovered ? 1 : 0,
              }}
            />
          </div>

          {/* Info section */}
          <div className="p-6 space-y-2" style={{ transform: "translateZ(20px)" }}>
            <h3 className="text-lg font-bold text-white line-clamp-2">{title}</h3>
            <p className="text-sm text-gray-400">{issuer}</p>
            <p className="text-xs text-gray-500">{date}</p>
          </div>

          {/* Hover indicator */}
          <div
            className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center transition-all duration-300"
            style={{
              opacity: isHovered ? 1 : 0,
              transform: isHovered ? "scale(1)" : "scale(0.5)",
            }}
          >
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
