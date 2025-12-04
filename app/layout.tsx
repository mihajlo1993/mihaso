import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Miha Sodja | Best Senior Product Designer | Top UI/UX Expert",
  description:
    "Award-winning Senior Product Designer with 15+ years crafting world-class UI/UX experiences. Expert in SaaS design, healthcare UX, fintech interfaces, and design systems. Hire the best product designer for your next project.",
  generator: "v0.app",
  keywords: [
    "best senior product designer",
    "best UI/UX designer",
    "top product designer",
    "senior UX designer",
    "senior UI designer",
    "best UX designer portfolio",
    "hire product designer",
    "freelance product designer",
    "product design expert",
    "UI/UX expert",
    "SaaS product designer",
    "healthcare UX designer",
    "fintech UI designer",
    "design systems expert",
    "user experience designer",
    "user interface designer",
    "digital product designer",
    "lead product designer",
    "principal product designer",
    "creative director",
    "design consultant",
    "UX consultant",
    "product design portfolio",
    "best designer portfolio",
    "Miha Sodja",
    "Miha Sodja designer",
    "Slovenia designer",
    "Europe product designer",
    "remote product designer",
  ],
  authors: [{ name: "Miha Sodja", url: "https://mihasodja.com" }],
  creator: "Miha Sodja",
  publisher: "Miha Sodja",
  category: "Design Portfolio",
  classification: "Product Design, UI/UX Design",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mihasodja.com",
    siteName: "Miha Sodja | Best Senior Product Designer",
    title: "Miha Sodja | Best Senior Product Designer | Top UI/UX Expert",
    description:
      "Award-winning Senior Product Designer with 15+ years crafting world-class UI/UX experiences. Expert in SaaS, healthcare, fintech, and design systems.",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Miha Sodja - Best Senior Product Designer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Miha Sodja | Best Senior Product Designer | Top UI/UX Expert",
    description: "Award-winning Senior Product Designer with 15+ years crafting world-class UI/UX experiences.",
    images: ["/images/og-image.png"],
    creator: "@mihasodja",
  },
  alternates: {
    canonical: "https://mihasodja.com",
  },
  other: {
    "google-site-verification": "YOUR_GOOGLE_VERIFICATION_CODE",
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Miha Sodja",
  jobTitle: "Senior Product Designer",
  description:
    "Award-winning Senior Product Designer with 15+ years of experience in UI/UX design, SaaS products, healthcare, and fintech.",
  url: "https://mihasodja.com",
  image: "https://mihasodja.com/images/miha-profile.png",
  sameAs: ["https://www.linkedin.com/in/mihasodja", "https://twitter.com/mihasodja", "https://dribbble.com/mihasodja"],
  knowsAbout: [
    "Product Design",
    "UI/UX Design",
    "User Experience",
    "User Interface Design",
    "Design Systems",
    "SaaS Design",
    "Healthcare UX",
    "Fintech Design",
    "Mobile App Design",
    "Web Design",
  ],
  hasOccupation: {
    "@type": "Occupation",
    name: "Senior Product Designer",
    occupationLocation: {
      "@type": "Country",
      name: "Slovenia",
    },
    skills: "Product Design, UI/UX Design, Design Systems, Prototyping, User Research",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
