"use client"

import { cn } from "@/lib/utils"
import { GradientBackground } from "./gradient-background"
import type { ContentItem } from "@/lib/data"
import { Play, Info, Quote, ExternalLink, ArrowRight, Star, Mail, Linkedin, FileText } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"

interface ContentCardProps {
  item: ContentItem
  isActive?: boolean
  onHover?: () => void
  onLeave?: () => void
  onClick?: () => void
  size?: "sm" | "md" | "lg"
  index?: number // Add index prop for unique gradient variations
}

function CardStarRating({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 >= 0.5

  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => {
        if (i < fullStars) {
          return (
            <Star
              key={i}
              className="h-3.5 w-3.5 text-amber-400 fill-amber-400 drop-shadow-[0_0_3px_rgba(251,191,36,0.5)]"
            />
          )
        }
        if (i === fullStars && hasHalfStar) {
          return (
            <div key={i} className="relative">
              <Star className="h-3.5 w-3.5 text-amber-400/30" />
              <div className="absolute inset-0 overflow-hidden w-[50%]">
                <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400 drop-shadow-[0_0_3px_rgba(251,191,36,0.5)]" />
              </div>
            </div>
          )
        }
        return <Star key={i} className="h-3.5 w-3.5 text-amber-400/30" />
      })}
    </div>
  )
}

function UpworkIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.548-1.405-.002-2.543-1.143-2.545-2.548V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.439-5.439-5.439z" />
    </svg>
  )
}

export function ContentCard({ item, isActive, onHover, onLeave, onClick, size = "md", index = 0 }: ContentCardProps) {
  const sizeClasses = {
    sm: "w-48 aspect-video",
    md: "w-64 aspect-[16/10] md:w-72",
    lg: "w-80 aspect-video md:w-96",
  }

  const getIcon = () => {
    switch (item.type) {
      case "caseStudy":
        return <Play className="h-4 w-4" />
      case "testimonial":
        return <Quote className="h-4 w-4" />
      case "link":
        if (item.id === "contact") return <Mail className="h-4 w-4" />
        if (item.id === "upwork") return <UpworkIcon className="h-4 w-4" />
        if (item.id === "linkedin") return <Linkedin className="h-4 w-4" />
        if (item.id === "resume") return <FileText className="h-4 w-4" />
        return <ExternalLink className="h-4 w-4" />
      default:
        return <Info className="h-4 w-4" />
    }
  }

  const getLinkCenterIcon = () => {
    if (item.id === "contact") return <Mail className="h-8 w-8 text-white/90" />
    if (item.id === "upwork") return <UpworkIcon className="h-8 w-8 text-white/90" />
    if (item.id === "linkedin") return <Linkedin className="h-8 w-8 text-white/90" />
    if (item.id === "resume") return <FileText className="h-8 w-8 text-white/90" />
    return <ExternalLink className="h-8 w-8 text-white/90" />
  }

  const getLinkGradient = () => {
    if (item.id === "upwork") {
      // Upwork green theme
      return {
        base: "linear-gradient(135deg, #000000 0%, #0a1a0a 20%, #14532d 45%, #166534 60%, #0a1a0a 80%, #000000 100%)",
        glow: "radial-gradient(circle at 60% 40%, rgba(34, 197, 94, 0.25) 0%, transparent 50%)",
        hoverGlow: "from-green-500/20 via-transparent to-emerald-500/15",
      }
    }
    if (item.id === "linkedin") {
      // LinkedIn blue theme
      return {
        base: "linear-gradient(135deg, #000000 0%, #0a1628 20%, #0369a1 45%, #0284c7 60%, #0a1628 80%, #000000 100%)",
        glow: "radial-gradient(circle at 60% 40%, rgba(14, 165, 233, 0.25) 0%, transparent 50%)",
        hoverGlow: "from-sky-500/20 via-transparent to-blue-500/15",
      }
    }
    // Contact & Resume - neutral blue theme
    return {
      base: "linear-gradient(135deg, #000000 0%, #0f172a 25%, #1e3a5f 50%, #0f172a 75%, #000000 100%)",
      glow: "radial-gradient(circle at 60% 40%, rgba(59, 130, 246, 0.2) 0%, transparent 50%)",
      hoverGlow: "from-blue-500/15 via-transparent to-cyan-500/10",
    }
  }

  const getTestimonialGradientStyle = () => {
    const variations = [
      // Linear diagonal - blue to dark
      {
        background: "linear-gradient(135deg, #000000 0%, #0a1628 25%, #1e3a5f 50%, #0a1628 75%, #000000 100%)",
        animationDelay: "0s",
        animationName: "gradient-shift-a",
      },
      // Radial from top-left
      {
        background: "radial-gradient(ellipse at 20% 20%, #1e3a5f 0%, #0a1628 40%, #000000 70%)",
        animationDelay: "1.5s",
        animationName: "gradient-shift-b",
      },
      // Linear from bottom
      {
        background: "linear-gradient(0deg, #1e3a5f 0%, #0a1628 35%, #000000 70%)",
        animationDelay: "3s",
        animationName: "gradient-shift-c",
      },
      // Radial from center
      {
        background: "radial-gradient(circle at 50% 60%, #1e3a5f 0%, #0a1628 35%, #000000 65%)",
        animationDelay: "4.5s",
        animationName: "gradient-shift-d",
      },
      // Linear from top-right corner
      {
        background: "linear-gradient(225deg, #1e3a5f 0%, #0a1628 40%, #000000 75%)",
        animationDelay: "2s",
        animationName: "gradient-shift-a",
      },
      // Radial from bottom-right
      {
        background: "radial-gradient(ellipse at 80% 80%, #1e3a5f 0%, #0a1628 45%, #000000 75%)",
        animationDelay: "5s",
        animationName: "gradient-shift-b",
      },
    ]
    return variations[index % variations.length]
  }

  const getLinkGradientStyle = () => {
    if (item.id === "upwork") {
      const upworkVariations = [
        {
          background:
            "linear-gradient(135deg, #000000 0%, #0a1a0a 20%, #14532d 45%, #166534 60%, #0a1a0a 80%, #000000 100%)",
          animationDelay: "0s",
        },
        {
          background: "radial-gradient(ellipse at 30% 30%, #166534 0%, #14532d 30%, #0a1a0a 60%, #000000 85%)",
          animationDelay: "2s",
        },
      ]
      return upworkVariations[index % upworkVariations.length]
    }
    if (item.id === "linkedin") {
      const linkedinVariations = [
        {
          background:
            "linear-gradient(135deg, #000000 0%, #0a1628 20%, #0369a1 45%, #0284c7 60%, #0a1628 80%, #000000 100%)",
          animationDelay: "1s",
        },
        {
          background: "radial-gradient(ellipse at 70% 30%, #0284c7 0%, #0369a1 30%, #0a1628 60%, #000000 85%)",
          animationDelay: "3s",
        },
      ]
      return linkedinVariations[index % linkedinVariations.length]
    }
    // Contact & Resume - neutral blue with variations
    const neutralVariations = [
      {
        background: "linear-gradient(135deg, #000000 0%, #0f172a 25%, #1e3a5f 50%, #0f172a 75%, #000000 100%)",
        animationDelay: "0.5s",
      },
      {
        background: "radial-gradient(ellipse at 50% 50%, #1e3a5f 0%, #0f172a 40%, #000000 70%)",
        animationDelay: "2.5s",
      },
    ]
    return neutralVariations[index % neutralVariations.length]
  }

  if (item.type === "testimonial") {
    const gradientStyle = getTestimonialGradientStyle()

    return (
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.14, ease: "easeOut" }}
        className={cn(
          "group relative flex-shrink-0 overflow-hidden rounded-lg border border-white/15",
          sizeClasses[size],
          isActive
            ? "z-10 shadow-[0_12px_32px_rgba(0,0,0,0.45)]"
            : "hover:z-10 hover:shadow-[0_12px_32px_rgba(0,0,0,0.3)]",
        )}
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
        onClick={onClick}
      >
        <div
          className="absolute inset-0 animate-gradient-shift-unique"
          style={{
            background: gradientStyle.background,
            backgroundSize: "400% 400%",
            animationDelay: gradientStyle.animationDelay,
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent" />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-blue-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* Stars - centered in the card */}
        <div className="absolute inset-0 flex items-center justify-center pb-16">
          <CardStarRating rating={item.rating || 5} />
        </div>

        {/* Title at bottom */}
        <div className="absolute inset-x-0 bottom-0 p-5">
          <h3 className="text-balance text-center text-sm font-bold leading-tight text-white drop-shadow-lg md:text-base line-clamp-2">
            {item.title}
          </h3>

          {/* Project name on hover */}
          <p
            className={cn(
              "mt-2 text-center text-xs text-gray-300 transition-all duration-300 ease-out line-clamp-1",
              isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100",
            )}
          >
            {item.projectName}
          </p>
        </div>
      </motion.button>
    )
  }

  if (item.type === "link") {
    const gradient = getLinkGradient()
    const gradientStyle = getLinkGradientStyle()

    return (
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.14, ease: "easeOut" }}
        className={cn(
          "group relative flex-shrink-0 overflow-hidden rounded-lg border border-white/15",
          sizeClasses[size],
          isActive
            ? "z-10 shadow-[0_12px_32px_rgba(0,0,0,0.45)]"
            : "hover:z-10 hover:shadow-[0_12px_32px_rgba(0,0,0,0.3)]",
        )}
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
        onClick={onClick}
      >
        <div
          className="absolute inset-0 animate-gradient-shift-unique"
          style={{
            background: gradientStyle.background,
            backgroundSize: "300% 300%",
            animationDelay: gradientStyle.animationDelay,
          }}
        />

        <div
          className="absolute inset-0 animate-glow-pulse"
          style={{ background: gradient.glow, animationDelay: gradientStyle.animationDelay }}
        />

        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        <div
          className={cn(
            "pointer-events-none absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-100",
            gradient.hoverGlow,
          )}
        />

        {/* Center icon */}
        <div className="absolute inset-0 flex items-center justify-center pb-14">
          <div className="rounded-full bg-white/10 p-4 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
            {getLinkCenterIcon()}
          </div>
        </div>

        {/* Content at bottom */}
        <div className="absolute inset-x-0 bottom-0 p-5">
          <h3 className="text-balance text-center text-sm font-medium leading-tight text-white drop-shadow-lg md:text-base">
            {item.title}
          </h3>

          <div
            className={cn(
              "mt-3 flex items-center justify-center gap-2 text-[11px] font-normal text-white/80 transition-all duration-300 ease-out",
              isActive
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0",
            )}
          >
            {getIcon()}
            <span>{item.primaryCTA || "View"}</span>
            <ArrowRight className="h-3 w-3 ml-0.5" />
          </div>
        </div>
      </motion.button>
    )
  }

  // Default card rendering for other types (caseStudy, highlight, etc.)
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.14, ease: "easeOut" }}
      className={cn(
        "group relative flex-shrink-0 overflow-hidden rounded-lg",
        sizeClasses[size],
        isActive ? "z-10 shadow-[0_8px_24px_rgba(0,0,0,0.4)]" : "hover:z-10 hover:shadow-[0_8px_24px_rgba(0,0,0,0.25)]",
      )}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onClick}
    >
      {(item as any).thumbnailType === "video" && (item as any).videoUrl ? (
        <div className="absolute inset-0">
          <iframe
            width="100%"
            height="100%"
            src={`${(item as any).videoUrl}&ap=true&muted=true&loop=true`}
            title={item.title}
            className="h-full w-full scale-150 object-cover pointer-events-none"
            frameBorder="0"
            scrolling="no"
            allow="autoplay; fullscreen; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : item.thumbnailUrl ? (
        <Image src={item.thumbnailUrl || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
      ) : (
        <GradientBackground type={item.gradientType} className="absolute inset-0" overlay />
      )}

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* Badge */}
      {item.badge && (
        <div className="absolute top-3 left-3 z-10 rounded bg-[#D13AFF] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg">
          {item.badge}
        </div>
      )}

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-5">
        <div
          className={cn(
            "mb-2 flex flex-wrap gap-1.5 transition-all duration-300 ease-out",
            isActive
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0",
          )}
        >
          {item.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-white/20 px-2.5 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm"
            >
              {tag}
            </span>
          ))}
        </div>

        <h3 className="text-balance text-sm font-bold leading-tight text-white drop-shadow-lg md:text-base">
          {item.title}
        </h3>

        <p
          className={cn(
            "mt-2 text-pretty text-xs leading-relaxed text-gray-200 transition-all duration-300 ease-out",
            isActive ? "line-clamp-2 opacity-100" : "line-clamp-1 opacity-0 group-hover:opacity-100",
          )}
        >
          {item.shortDescription}
        </p>

        <div
          className={cn(
            "mt-3 flex items-center gap-1.5 text-[11px] font-semibold text-white transition-all duration-300 ease-out",
            isActive
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0",
          )}
        >
          {getIcon()}
          <span>{item.primaryCTA || "View"}</span>
          <ArrowRight className="h-3 w-3" />
        </div>
      </div>
    </motion.button>
  )
}
