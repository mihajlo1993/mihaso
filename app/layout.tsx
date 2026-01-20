import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Miha Sodja | Lead Product Designer | Healthcare & Fintech UX Expert",
  description:
    "Lead Product Designer with 10+ years crafting exceptional UI/UX experiences. Specializing in healthcare platforms (Simple Online Doctor), fintech applications (Alvara DeFi), and mobile engagement (TreeApp). Available for freelance and full-time opportunities.",
  generator: "v0.app",
  keywords: [
    "Miha Sodja",
    "Miha Sodja designer",
    "lead product designer",
    "senior product designer",
    "UI/UX designer",
    "healthcare UX designer",
    "fintech UI designer",
    "DeFi product designer",
    "mobile app designer",
    "SaaS product designer",
    "design systems expert",
    "user experience designer",
    "product design portfolio",
    "Slovenia designer",
    "Europe product designer",
    "remote product designer",
    "Simple Online Doctor designer",
    "TreeApp designer",
    "Alvara designer",
    "telehealth UX",
    "crypto UI design",
    "accessibility design",
    "hire product designer",
    "freelance product designer",
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
    siteName: "Miha Sodja | Lead Product Designer",
    title: "Miha Sodja | Lead Product Designer | Healthcare & Fintech UX Expert",
    description:
      "Lead Product Designer specializing in healthcare platforms, fintech applications, and mobile engagement. View case studies from Simple Online Doctor, Alvara, and TreeApp.",
    images: [
      {
        url: "/images/simple-doctor-hero.png",
        width: 1200,
        height: 630,
        alt: "Miha Sodja - Lead Product Designer Portfolio featuring healthcare and fintech case studies",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Miha Sodja | Lead Product Designer | Healthcare & Fintech UX Expert",
    description:
      "Lead Product Designer specializing in healthcare platforms, fintech applications, and mobile engagement.",
    images: ["/images/simple-doctor-hero.png"],
    creator: "@mihasodja",
  },
  alternates: {
    canonical: "https://mihasodja.com",
  },
  other: {
    "google-site-verification": "YOUR_GOOGLE_VERIFICATION_CODE",
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    shortcut: "/favicon.svg",
    apple: "/apple-icon.svg",
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
  jobTitle: "Lead Product Designer",
  description:
    "Lead Product Designer with 10+ years of experience specializing in healthcare platforms, fintech applications, and mobile engagement. Creator of Simple Online Doctor, Alvara, and TreeApp case studies.",
  url: "https://mihasodja.com",
  image: "https://mihasodja.com/images/miha-hero.png",
  sameAs: [
    "https://www.linkedin.com/in/mihasodja",
    "https://twitter.com/mihasodja",
    "https://dribbble.com/mihasodja",
  ],
  knowsAbout: [
    "Product Design",
    "UI/UX Design",
    "Healthcare UX",
    "Telehealth Design",
    "Fintech Design",
    "DeFi Applications",
    "Mobile App Design",
    "Design Systems",
    "Accessibility Design",
    "User Research",
  ],
  hasOccupation: {
    "@type": "Occupation",
    name: "Lead Product Designer",
    occupationLocation: {
      "@type": "Country",
      name: "Slovenia",
    },
    skills: "Product Design, UI/UX Design, Healthcare UX, Fintech UI, Design Systems, Prototyping, User Research",
  },
  workExample: [
    {
      "@type": "CreativeWork",
      name: "Simple Online Doctor",
      description: "Healthcare rebrand and digital launch increasing conversions by 156%",
      url: "https://simpleonlinedoctor.co.uk",
    },
    {
      "@type": "CreativeWork",
      name: "TreeApp",
      description: "Mobile app UX redesign improving session duration by 33%",
      url: "https://www.thetreeapp.org",
    },
    {
      "@type": "CreativeWork",
      name: "Alvara",
      description: "DeFi token distribution platform reducing user drop-off by 60%",
      url: "https://alvara.xyz",
    },
  ],
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
