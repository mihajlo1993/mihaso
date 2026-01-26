"use client"

import { workExperiences, certifications } from "@/lib/data"
import { Mail, Linkedin, Globe, MapPin, Download, ExternalLink, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function CVPage() {
  const handleDownload = () => {
    window.print()
  }

  return (
    <>
      {/* Print styles */}
      <style jsx global>{`
        @media print {
          @page {
            size: A4;
            margin: 0.4in 0.5in;
          }
          body {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            background: white !important;
          }
          .no-print {
            display: none !important;
          }
          .print-break {
            page-break-before: always;
          }
          .print-avoid-break {
            page-break-inside: avoid;
          }
        }
      `}</style>

      {/* Top navigation bar - fixed */}
      <div className="no-print fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-[900px] mx-auto px-6 py-4 flex items-center justify-between">
          <Link 
            href="/"
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back to Portfolio</span>
          </Link>
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-5 py-2.5 bg-white text-black rounded-full font-semibold text-sm hover:bg-gray-100 transition-all hover:scale-105 active:scale-95"
          >
            <Download className="w-4 h-4" />
            Download PDF
          </button>
        </div>
      </div>

      {/* CV Content */}
      <div className="min-h-screen bg-[#050505] text-white print:bg-white print:text-black">
        {/* Subtle gradient overlay */}
        <div className="no-print fixed inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/[0.02] rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-white/[0.015] rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-[850px] mx-auto px-6 md:px-8 pt-24 pb-16 print:px-0 print:py-0 print:pt-0">
          {/* Header */}
          <header className="mb-12 pb-8 border-b border-white/10 print:border-gray-300 print:mb-8 print:pb-6">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
              <div>
                <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-3 print:text-4xl print:mb-2">
                  Miha Sodja
                </h1>
                <h2 className="text-xl md:text-2xl text-gray-400 print:text-gray-600 font-medium print:text-lg">
                  Senior Product Designer
                </h2>
              </div>
              <div className="no-print flex items-center gap-2">
                <span className="px-3 py-1.5 bg-emerald-500/10 text-emerald-400 text-xs font-semibold rounded-full border border-emerald-500/20 flex items-center gap-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                  </span>
                  Available for work
                </span>
              </div>
            </div>
            
            {/* Contact info */}
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-400 print:text-gray-600">
              <a href="mailto:hello@mihaso.io" className="flex items-center gap-1.5 hover:text-white print:hover:text-black transition-colors group">
                <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
                hello@mihaso.io
              </a>
              <a href="https://linkedin.com/in/sodmi" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-white print:hover:text-black transition-colors group">
                <Linkedin className="w-4 h-4 group-hover:scale-110 transition-transform" />
                linkedin.com/in/sodmi
              </a>
              <a href="https://mihaso.io" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-white print:hover:text-black transition-colors group">
                <Globe className="w-4 h-4 group-hover:scale-110 transition-transform" />
                mihaso.io
              </a>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4" />
                Slovenia, EU
              </span>
            </div>
          </header>

          {/* Summary */}
          <section className="mb-10 print:mb-6 print-avoid-break">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.25em] text-gray-500 print:text-gray-500 mb-4 print:mb-3">
              Profile
            </h3>
            <p className="text-base leading-relaxed text-gray-300 print:text-gray-700 print:text-sm print:leading-relaxed">
              Senior Product Designer with 15+ years of experience crafting engaging digital experiences for over 50 B2B clients worldwide. Specializing in healthcare platforms, fintech applications, and mobile engagement products with a proven track record of driving measurable results. Expert in design systems, prototyping, user research, and accessibility. Successfully increased conversions by 156%, reduced user drop-off by 60%, and boosted engagement by 33% across key projects.
            </p>
          </section>

          {/* Skills */}
          <section className="mb-10 print:mb-6 print-avoid-break">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.25em] text-gray-500 print:text-gray-500 mb-4 print:mb-3">
              Core Expertise
            </h3>
            <div className="flex flex-wrap gap-2 print:gap-1.5">
              {[
                "Product Design",
                "UI/UX Strategy",
                "Design Systems",
                "Prototyping",
                "User Research",
                "Healthcare UX",
                "Fintech",
                "Mobile Apps",
                "Accessibility",
                "Figma",
                "Interaction Design",
                "Visual Design",
              ].map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 bg-white/[0.03] print:bg-gray-100 border border-white/10 print:border-gray-300 rounded-full text-sm text-gray-300 print:text-gray-700 print:text-xs print:px-2 print:py-1"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>

          {/* Experience */}
          <section className="mb-10 print:mb-6">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.25em] text-gray-500 print:text-gray-500 mb-6 print:mb-4">
              Professional Experience
            </h3>
            <div className="space-y-6 print:space-y-4">
              {workExperiences.map((exp, index) => (
                <div key={exp.id} className={`print-avoid-break ${index > 0 ? "pt-5 border-t border-white/[0.06] print:border-gray-200 print:pt-4" : ""}`}>
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-2 print:mb-1.5">
                    <div>
                      <h4 className="text-lg font-semibold text-white print:text-black print:text-base flex items-center gap-2 flex-wrap">
                        {exp.role}
                        {exp.current && (
                          <span className="px-2 py-0.5 text-[10px] font-semibold bg-emerald-500/15 print:bg-emerald-100 text-emerald-400 print:text-emerald-700 rounded-full border border-emerald-500/20 print:border-emerald-200">
                            Current
                          </span>
                        )}
                      </h4>
                      <p className="text-base text-gray-400 print:text-gray-600 print:text-sm font-medium">{exp.company}</p>
                    </div>
                    <div className="text-sm text-gray-500 print:text-gray-500 sm:text-right whitespace-nowrap print:text-xs">
                      <p className="font-medium">{exp.period}</p>
                      <p className="text-gray-600">{exp.location}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-300 print:text-gray-700 mb-2.5 leading-relaxed print:text-xs print:leading-relaxed">
                    {exp.description}
                  </p>
                  <ul className="space-y-0.5 print:space-y-0">
                    {exp.keyContributions.slice(0, 3).map((contribution, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-400 print:text-gray-600 print:text-xs">
                        <span className="text-white/40 print:text-gray-400 mt-1">•</span>
                        <span className="leading-relaxed">{contribution}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Key Projects */}
          <section className="mb-10 print:mb-6 print-break">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.25em] text-gray-500 print:text-gray-500 mb-6 print:mb-4">
              Key Impact Projects
            </h3>
            <div className="grid gap-4 print:gap-3">
              <div className="p-5 print:p-4 bg-white/[0.02] print:bg-gray-50 rounded-xl print:rounded-lg border border-white/[0.06] print:border-gray-200 print-avoid-break">
                <div className="flex items-start justify-between gap-4 mb-2 print:mb-1.5">
                  <h4 className="text-base font-semibold text-white print:text-black print:text-sm">Simple Online Doctor</h4>
                  <span className="text-xs text-emerald-400 print:text-emerald-600 font-semibold whitespace-nowrap bg-emerald-500/10 print:bg-emerald-50 px-2 py-0.5 rounded-full">+156% Conversions</span>
                </div>
                <p className="text-sm text-gray-400 print:text-gray-600 leading-relaxed print:text-xs print:leading-relaxed">
                  Led the complete healthcare platform rebrand and digital launch, designing end-to-end patient journeys from consultation to delivery. Implemented AI-driven health automation while maintaining intuitive UX.
                </p>
              </div>
              <div className="p-5 print:p-4 bg-white/[0.02] print:bg-gray-50 rounded-xl print:rounded-lg border border-white/[0.06] print:border-gray-200 print-avoid-break">
                <div className="flex items-start justify-between gap-4 mb-2 print:mb-1.5">
                  <h4 className="text-base font-semibold text-white print:text-black print:text-sm">Alvara DeFi Protocol</h4>
                  <span className="text-xs text-emerald-400 print:text-emerald-600 font-semibold whitespace-nowrap bg-emerald-500/10 print:bg-emerald-50 px-2 py-0.5 rounded-full">-60% Drop-off</span>
                </div>
                <p className="text-sm text-gray-400 print:text-gray-600 leading-relaxed print:text-xs print:leading-relaxed">
                  Designed an intuitive token distribution platform from scratch, creating seamless onboarding flows and building user trust through clear, progressive disclosure patterns.
                </p>
              </div>
              <div className="p-5 print:p-4 bg-white/[0.02] print:bg-gray-50 rounded-xl print:rounded-lg border border-white/[0.06] print:border-gray-200 print-avoid-break">
                <div className="flex items-start justify-between gap-4 mb-2 print:mb-1.5">
                  <h4 className="text-base font-semibold text-white print:text-black print:text-sm">TreeApp</h4>
                  <span className="text-xs text-emerald-400 print:text-emerald-600 font-semibold whitespace-nowrap bg-emerald-500/10 print:bg-emerald-50 px-2 py-0.5 rounded-full">+33% Engagement</span>
                </div>
                <p className="text-sm text-gray-400 print:text-gray-600 leading-relaxed print:text-xs print:leading-relaxed">
                  Improved accessibility, navigation, and user flows for this environmental impact mobile app. Conducted comprehensive accessibility audit and redesigned core navigation patterns.
                </p>
              </div>
            </div>
          </section>

          {/* Two column: Certifications + Education */}
          <div className="grid md:grid-cols-2 gap-8 print:gap-6 print:grid-cols-2">
            {/* Certifications */}
            <section className="print-avoid-break">
              <h3 className="text-[11px] font-bold uppercase tracking-[0.25em] text-gray-500 print:text-gray-500 mb-4 print:mb-3">
                Certifications
              </h3>
              <div className="space-y-3 print:space-y-2">
                {certifications.map((cert) => (
                  <div key={cert.id} className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium text-white print:text-black print:text-xs">{cert.title}</p>
                      <p className="text-xs text-gray-500 print:text-gray-500 print:text-[10px]">{cert.issuer}</p>
                    </div>
                    <span className="text-xs text-gray-500 print:text-gray-500 whitespace-nowrap print:text-[10px]">{cert.date}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Education */}
            <section className="print-avoid-break">
              <h3 className="text-[11px] font-bold uppercase tracking-[0.25em] text-gray-500 print:text-gray-500 mb-4 print:mb-3">
                Education
              </h3>
              <div>
                <p className="text-sm font-medium text-white print:text-black print:text-xs">University of Ljubljana</p>
                <p className="text-xs text-gray-500 print:text-gray-500 print:text-[10px]">Computer Science & Multimedia Design</p>
              </div>
            </section>
          </div>

          {/* Footer */}
          <footer className="mt-12 pt-6 border-t border-white/[0.06] print:border-gray-200 print:mt-8 print:pt-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 print:text-gray-400">
              <p className="flex items-center gap-1.5">
                Full portfolio and case studies at{" "}
                <a href="https://mihaso.io" className="text-white print:text-black font-medium hover:underline inline-flex items-center gap-0.5">
                  mihaso.io
                  <ExternalLink className="w-3 h-3 no-print" />
                </a>
              </p>
              <p className="text-gray-600 print:text-gray-500">References available upon request</p>
            </div>
          </footer>
        </div>
      </div>
    </>
  )
}
