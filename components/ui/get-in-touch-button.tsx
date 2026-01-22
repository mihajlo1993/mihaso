"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { AnimatedMail } from "@/components/ui/animated-icons"

export function GetInTouchButton() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => {
        window.history.pushState({}, "", "/contact")
        window.dispatchEvent(new PopStateEvent("popstate"))
      }}
      className="group flex items-center gap-2 px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-gray-100 transition-all duration-300 shadow-lg shadow-white/20"
    >
      <AnimatedMail size={20} isHovered={isHovered} className="text-black" />
      Get in touch
    </motion.button>
  )
}
