"use client"

import { CertificationCard } from "./certification-card"
import { motion } from "framer-motion"

interface Certification {
  id: string
  title: string
  issuer: string
  date: string
  thumbnailUrl: string
  certificateUrl: string
}

interface CertificationsSectionProps {
  certifications: Certification[]
}

export function CertificationsSection({ certifications }: CertificationsSectionProps) {
  return (
    <div className="px-6 md:px-12 lg:px-16">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mb-8"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Certifications</h2>
        <p className="text-sm md:text-base text-gray-400">Professional credentials and achievements</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl">
        {certifications.map((cert, index) => (
          <CertificationCard key={cert.id} {...cert} index={index} />
        ))}
      </div>
    </div>
  )
}
