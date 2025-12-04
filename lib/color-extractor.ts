/**
 * Extracts predominant colors from an image URL
 * Returns a theme color palette for UI theming
 */

export interface ThemeColors {
  primary: string // Main brand color
  secondary: string // Supporting color
  accent: string // Highlight color for interactive elements
  text: string // Optimal text color (light/dark based on contrast)
}

/**
 * Extracts dominant color from an image using canvas API
 * This is a simplified version - in production you'd use a library like color-thief or vibrant.js
 */
export async function extractColorsFromImage(imageUrl: string): Promise<ThemeColors> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = "Anonymous"

    img.onload = () => {
      try {
        const canvas = document.createElement("canvas")
        const ctx = canvas.getContext("2d")

        if (!ctx) {
          reject(new Error("Could not get canvas context"))
          return
        }

        // Sample from scaled down version for performance
        const scaleFactor = 0.1
        canvas.width = img.width * scaleFactor
        canvas.height = img.height * scaleFactor

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        const pixels = imageData.data

        // Color buckets for histogram
        const colorCounts: { [key: string]: number } = {}

        // Sample every 10th pixel for performance
        for (let i = 0; i < pixels.length; i += 40) {
          const r = pixels[i]
          const g = pixels[i + 1]
          const b = pixels[i + 2]
          const a = pixels[i + 3]

          // Skip transparent or near-black/white pixels
          if (a < 125 || r + g + b < 50 || r + g + b > 700) continue

          // Bucket colors (reduce precision for grouping)
          const bucket = `${Math.floor(r / 16) * 16},${Math.floor(g / 16) * 16},${Math.floor(b / 16) * 16}`
          colorCounts[bucket] = (colorCounts[bucket] || 0) + 1
        }

        // Find most common colors
        const sortedColors = Object.entries(colorCounts)
          .sort(([, a], [, b]) => b - a)
          .slice(0, 5)
          .map(([color]) => color.split(",").map(Number))

        if (sortedColors.length === 0) {
          // Fallback to default purple theme
          resolve({
            primary: "#A855F7",
            secondary: "#7C3AED",
            accent: "#C084FC",
            text: "#FFFFFF",
          })
          return
        }

        // Primary: Most dominant color
        const [r1, g1, b1] = sortedColors[0]
        const primary = rgbToHex(r1, g1, b1)

        // Secondary: Second most dominant, or variant of primary
        const [r2, g2, b2] = sortedColors[1] || adjustBrightness(r1, g1, b1, 0.8)
        const secondary = rgbToHex(r2, g2, b2)

        // Accent: Lighter/brighter version for highlights
        const [r3, g3, b3] = adjustBrightness(r1, g1, b1, 1.3)
        const accent = rgbToHex(r3, g3, b3)

        // Text: White or black based on luminance
        const luminance = (0.299 * r1 + 0.587 * g1 + 0.114 * b1) / 255
        const text = luminance > 0.5 ? "#000000" : "#FFFFFF"

        resolve({ primary, secondary, accent, text })
      } catch (error) {
        reject(error)
      }
    }

    img.onerror = () => {
      reject(new Error(`Failed to load image: ${imageUrl}`))
    }

    img.src = imageUrl
  })
}

function rgbToHex(r: number, g: number, b: number): string {
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`
}

function adjustBrightness(r: number, g: number, b: number, factor: number): [number, number, number] {
  return [
    Math.min(255, Math.round(r * factor)),
    Math.min(255, Math.round(g * factor)),
    Math.min(255, Math.round(b * factor)),
  ]
}

/**
 * Predefined theme colors for case studies
 * Can be generated automatically or manually curated
 */
export const caseStudyThemes: { [key: string]: ThemeColors } = {
  alvara: {
    primary: "#A855F7", // Purple
    secondary: "#7C3AED",
    accent: "#C084FC",
    text: "#FFFFFF",
  },
  "highlight-2": {
    primary: "#3B82F6", // Blue
    secondary: "#2563EB",
    accent: "#60A5FA",
    text: "#FFFFFF",
  },
  "highlight-3": {
    primary: "#10B981", // Green
    secondary: "#059669",
    accent: "#34D399",
    text: "#FFFFFF",
  },
  "highlight-4": {
    primary: "#F59E0B", // Orange
    secondary: "#D97706",
    accent: "#FBBF24",
    text: "#000000",
  },
  "highlight-5": {
    primary: "#EF4444", // Red
    secondary: "#DC2626",
    accent: "#F87171",
    text: "#FFFFFF",
  },
  "highlight-6": {
    primary: "#8B5CF6", // Violet
    secondary: "#7C3AED",
    accent: "#A78BFA",
    text: "#FFFFFF",
  },
  "highlight-7": {
    primary: "#EC4899", // Pink
    secondary: "#DB2777",
    accent: "#F472B6",
    text: "#FFFFFF",
  },
  "highlight-8": {
    primary: "#06B6D4", // Cyan
    secondary: "#0891B2",
    accent: "#22D3EE",
    text: "#FFFFFF",
  },
  "highlight-9": {
    primary: "#14B8A6", // Teal
    secondary: "#0D9488",
    accent: "#2DD4BF",
    text: "#FFFFFF",
  },
}
