"use client"

import { motion, type Transition, type Variants } from "framer-motion"
import { forwardRef } from "react"

interface AnimatedIconProps {
  className?: string
  size?: number
  isHovered?: boolean
}

const defaultTransition: Transition = {
  type: "spring",
  stiffness: 250,
  damping: 25,
}

// Animated Home Icon
export const AnimatedHome = forwardRef<SVGSVGElement, AnimatedIconProps>(
  ({ className, size = 20, isHovered = false }, ref) => {
    const roofVariants: Variants = {
      normal: { y: 0 },
      animate: { y: [-1, 0], transition: { ...defaultTransition, delay: 0.1 } },
    }

    const chimneyVariants: Variants = {
      normal: { y: 0, scaleY: 1 },
      animate: {
        y: [0, -2, 0],
        transition: { ...defaultTransition, delay: 0.2 },
      },
    }

    return (
      <motion.svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        animate={isHovered ? "animate" : "normal"}
      >
        <motion.path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
        <motion.path
          d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
          variants={roofVariants}
        />
        <motion.path d="M17 3v4" variants={chimneyVariants} style={{ transformOrigin: "bottom" }} />
      </motion.svg>
    )
  },
)
AnimatedHome.displayName = "AnimatedHome"

// Animated Briefcase Icon
export const AnimatedBriefcase = forwardRef<SVGSVGElement, AnimatedIconProps>(
  ({ className, size = 20, isHovered = false }, ref) => {
    const handleVariants: Variants = {
      normal: { y: 0 },
      animate: {
        y: [-1, 0],
        transition: defaultTransition,
      },
    }

    const bagVariants: Variants = {
      normal: { rotate: 0 },
      animate: {
        rotate: [-2, 2, 0],
        transition: { ...defaultTransition, delay: 0.1 },
      },
    }

    return (
      <motion.svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        animate={isHovered ? "animate" : "normal"}
      >
        <motion.rect width="20" height="14" x="2" y="7" rx="2" ry="2" variants={bagVariants} />
        <motion.path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" variants={handleVariants} />
      </motion.svg>
    )
  },
)
AnimatedBriefcase.displayName = "AnimatedBriefcase"

// Animated User Icon
export const AnimatedUser = forwardRef<SVGSVGElement, AnimatedIconProps>(
  ({ className, size = 20, isHovered = false }, ref) => {
    const headVariants: Variants = {
      normal: { scale: 1 },
      animate: {
        scale: [1, 1.1, 1],
        transition: defaultTransition,
      },
    }

    const bodyVariants: Variants = {
      normal: { y: 0 },
      animate: {
        y: [0, -1, 0],
        transition: { ...defaultTransition, delay: 0.15 },
      },
    }

    return (
      <motion.svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        animate={isHovered ? "animate" : "normal"}
      >
        <motion.circle cx="12" cy="8" r="5" variants={headVariants} />
        <motion.path d="M20 21a8 8 0 0 0-16 0" variants={bodyVariants} />
      </motion.svg>
    )
  },
)
AnimatedUser.displayName = "AnimatedUser"

// Animated Mail Icon
export const AnimatedMail = forwardRef<SVGSVGElement, AnimatedIconProps>(
  ({ className, size = 20, isHovered = false }, ref) => {
    const envelopeVariants: Variants = {
      normal: { y: 0 },
      animate: {
        y: [0, -2, 0],
        transition: defaultTransition,
      },
    }

    const flapVariants: Variants = {
      normal: { rotateX: 0 },
      animate: {
        rotateX: [0, -20, 0],
        transition: { ...defaultTransition, delay: 0.1 },
      },
    }

    return (
      <motion.svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        animate={isHovered ? "animate" : "normal"}
        style={{ perspective: 100 }}
      >
        <motion.rect width="20" height="16" x="2" y="4" rx="2" variants={envelopeVariants} />
        <motion.path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" variants={flapVariants} />
      </motion.svg>
    )
  },
)
AnimatedMail.displayName = "AnimatedMail"

// Animated Play Icon
export const AnimatedPlay = forwardRef<SVGSVGElement, AnimatedIconProps>(
  ({ className, size = 20, isHovered = false }, ref) => {
    const playVariants: Variants = {
      normal: { scale: 1, x: 0 },
      animate: {
        scale: [1, 1.15, 1],
        x: [0, 1, 0],
        transition: defaultTransition,
      },
    }

    return (
      <motion.svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
        animate={isHovered ? "animate" : "normal"}
        variants={playVariants}
      >
        <path d="M6.3 2.841A1.5 1.5 0 004 4.11v15.78a1.5 1.5 0 002.3 1.269l11.344-7.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
      </motion.svg>
    )
  },
)
AnimatedPlay.displayName = "AnimatedPlay"

// Animated Send/Mail Icon (for Get in Touch)
export const AnimatedSend = forwardRef<SVGSVGElement, AnimatedIconProps>(
  ({ className, size = 20, isHovered = false }, ref) => {
    const paperPlaneVariants: Variants = {
      normal: { x: 0, y: 0, rotate: 0 },
      animate: {
        x: [0, 3, 0],
        y: [0, -2, 0],
        rotate: [0, -5, 0],
        transition: defaultTransition,
      },
    }

    return (
      <motion.svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        animate={isHovered ? "animate" : "normal"}
        variants={paperPlaneVariants}
      >
        <path d="M3 3l3 9-3 9 19-9Z" />
        <path d="M6 12h16" />
      </motion.svg>
    )
  },
)
AnimatedSend.displayName = "AnimatedSend"

// Animated Menu Icon
export const AnimatedMenu = forwardRef<SVGSVGElement, AnimatedIconProps>(
  ({ className, size = 20, isHovered = false }, ref) => {
    const lineVariants: Variants = {
      normal: { x: 0 },
      animate: (i: number) => ({
        x: [0, i % 2 === 0 ? 2 : -2, 0],
        transition: { ...defaultTransition, delay: i * 0.05 },
      }),
    }

    return (
      <motion.svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        animate={isHovered ? "animate" : "normal"}
      >
        <motion.line x1="4" x2="20" y1="12" y2="12" variants={lineVariants} custom={0} />
        <motion.line x1="4" x2="20" y1="6" y2="6" variants={lineVariants} custom={1} />
        <motion.line x1="4" x2="20" y1="18" y2="18" variants={lineVariants} custom={2} />
      </motion.svg>
    )
  },
)
AnimatedMenu.displayName = "AnimatedMenu"

// Animated X/Close Icon
export const AnimatedX = forwardRef<SVGSVGElement, AnimatedIconProps>(
  ({ className, size = 20, isHovered = false }, ref) => {
    const xVariants: Variants = {
      normal: { rotate: 0, scale: 1 },
      animate: {
        rotate: [0, 90, 0],
        scale: [1, 0.9, 1],
        transition: defaultTransition,
      },
    }

    return (
      <motion.svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        animate={isHovered ? "animate" : "normal"}
        variants={xVariants}
      >
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
      </motion.svg>
    )
  },
)
AnimatedX.displayName = "AnimatedX"

// Animated Arrow Right
export const AnimatedArrowRight = forwardRef<SVGSVGElement, AnimatedIconProps>(
  ({ className, size = 20, isHovered = false }, ref) => {
    const arrowVariants: Variants = {
      normal: { x: 0 },
      animate: {
        x: [0, 4, 0],
        transition: defaultTransition,
      },
    }

    return (
      <motion.svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        animate={isHovered ? "animate" : "normal"}
        variants={arrowVariants}
      >
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
      </motion.svg>
    )
  },
)
AnimatedArrowRight.displayName = "AnimatedArrowRight"

// Animated Download
export const AnimatedDownload = forwardRef<SVGSVGElement, AnimatedIconProps>(
  ({ className, size = 20, isHovered = false }, ref) => {
    const arrowVariants: Variants = {
      normal: { y: 0 },
      animate: {
        y: [0, 3, 0],
        transition: defaultTransition,
      },
    }

    const lineVariants: Variants = {
      normal: { scaleX: 1 },
      animate: {
        scaleX: [1, 1.1, 1],
        transition: { ...defaultTransition, delay: 0.1 },
      },
    }

    return (
      <motion.svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        animate={isHovered ? "animate" : "normal"}
      >
        <motion.path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" variants={lineVariants} />
        <motion.polyline points="7 10 12 15 17 10" variants={arrowVariants} />
        <motion.line x1="12" x2="12" y1="15" y2="3" variants={arrowVariants} />
      </motion.svg>
    )
  },
)
AnimatedDownload.displayName = "AnimatedDownload"

// Animated External Link
export const AnimatedExternalLink = forwardRef<SVGSVGElement, AnimatedIconProps>(
  ({ className, size = 20, isHovered = false }, ref) => {
    const arrowVariants: Variants = {
      normal: { x: 0, y: 0 },
      animate: {
        x: [0, 2, 0],
        y: [0, -2, 0],
        transition: defaultTransition,
      },
    }

    return (
      <motion.svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        animate={isHovered ? "animate" : "normal"}
      >
        <path d="M15 3h6v6" />
        <motion.path d="M10 14 21 3" variants={arrowVariants} />
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      </motion.svg>
    )
  },
)
AnimatedExternalLink.displayName = "AnimatedExternalLink"
