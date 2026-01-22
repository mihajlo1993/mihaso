import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "Miha Sodja | Lead Product Designer | Healthcare & Fintech UX Expert",
    template: "%s | Miha Sodja - Product Designer",
  },
  description:
    "Miha Sodja is a Lead Product Designer with 10+ years crafting exceptional UI/UX experiences. Specializing in healthcare platforms (Simple Online Doctor - 156% conversion increase), fintech applications (Alvara DeFi - 60% drop-off reduction), and mobile engagement (TreeApp - 33% session boost). Expert in design systems, prototyping, user research, and accessibility. Available for freelance and full-time opportunities worldwide.",
  generator: "v0.app",
  keywords: [
    "Miha Sodja",
    "Miha Sodja designer",
    "Miha Sodja portfolio",
    "Miha Sodja product designer",
    "lead product designer",
    "senior product designer",
    "UI/UX designer",
    "product design",
    "UI/UX",
    "design systems",
    "prototyping",
    "healthcare UX",
    "healthcare UX designer",
    "fintech UI",
    "fintech UI designer",
    "DeFi product designer",
    "mobile app designer",
    "mobile apps",
    "SaaS product designer",
    "design systems expert",
    "user experience designer",
    "user research",
    "visual design",
    "interaction design",
    "accessibility design",
    "Figma expert",
    "product design portfolio",
    "Slovenia designer",
    "Europe product designer",
    "remote product designer",
    "Simple Online Doctor designer",
    "TreeApp designer",
    "Alvara designer",
    "telehealth UX",
    "crypto UI design",
    "web platforms",
    "hire product designer",
    "freelance product designer",
    "best product designer",
    "top UX designer",
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

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://mihasodja.com/#person",
  name: "Miha Sodja",
  givenName: "Miha",
  familyName: "Sodja",
  jobTitle: "Lead Product Designer",
  description:
    "Miha Sodja is a Lead Product Designer with 10+ years of experience specializing in healthcare platforms, fintech applications, and mobile engagement. Expert in product design, UI/UX, design systems, prototyping, user research, and accessibility.",
  url: "https://mihasodja.com",
  image: {
    "@type": "ImageObject",
    url: "https://mihasodja.com/images/miha-hero.png",
    width: 800,
    height: 800,
  },
  sameAs: [
    "https://www.linkedin.com/in/mihasodja",
    "https://twitter.com/mihasodja",
    "https://dribbble.com/mihasodja",
    "https://www.upwork.com/freelancers/mihasodja",
  ],
  knowsAbout: [
    "Product Design",
    "UI/UX Design",
    "Healthcare UX",
    "Telehealth Design",
    "Fintech Design",
    "Fintech UI",
    "DeFi Applications",
    "Mobile App Design",
    "Mobile Apps",
    "Design Systems",
    "Accessibility Design",
    "User Research",
    "Visual Design",
    "Interaction Design",
    "Prototyping",
    "Figma",
    "Web Platforms",
  ],
  hasOccupation: {
    "@type": "Occupation",
    name: "Lead Product Designer",
    occupationLocation: {
      "@type": "Country",
      name: "Slovenia",
    },
    skills: "Product Design, UI/UX, Healthcare UX, Fintech UI, Design Systems, Prototyping, User Research, Visual Design, Interaction Design, Accessibility, Figma, Mobile Apps",
  },
  alumniOf: {
    "@type": "Organization",
    name: "University of Ljubljana",
  },
  nationality: {
    "@type": "Country",
    name: "Slovenia",
  },
  workExample: [
    {
      "@type": "CreativeWork",
      name: "Simple Online Doctor",
      description: "Healthcare platform rebrand and digital launch increasing conversions by 156%",
      url: "https://simpleonlinedoctor.co.uk",
      creator: { "@id": "https://mihasodja.com/#person" },
    },
    {
      "@type": "CreativeWork",
      name: "TreeApp",
      description: "Mobile app UX redesign improving session duration by 33%",
      url: "https://www.thetreeapp.org",
      creator: { "@id": "https://mihasodja.com/#person" },
    },
    {
      "@type": "CreativeWork",
      name: "Alvara",
      description: "DeFi token distribution platform reducing user drop-off by 60%",
      url: "https://alvara.xyz",
      creator: { "@id": "https://mihasodja.com/#person" },
    },
  ],
}

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://mihasodja.com/#website",
  url: "https://mihasodja.com",
  name: "Miha Sodja | Lead Product Designer",
  description: "Portfolio of Miha Sodja, Lead Product Designer specializing in healthcare UX, fintech UI, and mobile apps.",
  publisher: { "@id": "https://mihasodja.com/#person" },
  inLanguage: "en-US",
}

const portfolioSchema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": "https://mihasodja.com/#profilepage",
  url: "https://mihasodja.com",
  name: "Miha Sodja Portfolio",
  mainEntity: { "@id": "https://mihasodja.com/#person" },
  dateCreated: "2024-01-01",
  dateModified: new Date().toISOString().split("T")[0],
}

const jsonLd = [personSchema, websiteSchema, portfolioSchema]

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
