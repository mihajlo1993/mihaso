"use client"

import { workExperiences, certifications } from "@/lib/data"
import { Mail, Linkedin, Globe, MapPin, Download } from "lucide-react"

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
            margin: 0.5in;
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
        }
      `}</style>

      {/* Download button - fixed position */}
      <button
        onClick={handleDownload}
        className="no-print fixed top-6 right-6 z-50 flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg font-medium hover:bg-gray-100 transition-colors shadow-lg"
      >
        <Download className="w-4 h-4" />
        Download PDF
      </button>

      {/* CV Content */}
      <div className="min-h-screen bg-[#0a0a0a] text-white print:bg-white print:text-black">
        <div className="max-w-[850px] mx-auto px-8 py-12 print:px-0 print:py-0">
          {/* Header */}
          <header className="mb-10 pb-8 border-b border-white/10 print:border-gray-200">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2">
              Miha Sodja
            </h1>
            <h2 className="text-xl md:text-2xl text-gray-400 print:text-gray-600 font-medium mb-6">
              Lead Product Designer
            </h2>
            
            {/* Contact info */}
            <div className="flex flex-wrap gap-4 text-sm text-gray-400 print:text-gray-600">
              <a href="mailto:hello@mihasodja.com" className="flex items-center gap-1.5 hover:text-white print:hover:text-black transition-colors">
                <Mail className="w-4 h-4" />
                hello@mihasodja.com
              </a>
              <a href="https://linkedin.com/in/mihasodja" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-white print:hover:text-black transition-colors">
                <Linkedin className="w-4 h-4" />
                linkedin.com/in/mihasodja
              </a>
              <a href="https://mihasodja.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-white print:hover:text-black transition-colors">
                <Globe className="w-4 h-4" />
                mihasodja.com
              </a>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4" />
                Slovenia, EU (Remote)
              </span>
            </div>
          </header>

          {/* Summary */}
          <section className="mb-10">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 print:text-gray-400 mb-4">
              Profile
            </h3>
            <p className="text-base leading-relaxed text-gray-300 print:text-gray-700">
              Lead Product Designer with 10+ years of experience crafting intuitive, scalable digital experiences that drive measurable results. Specialized in healthcare platforms, fintech applications, and mobile engagement products. Expert in design systems, prototyping, user research, and accessibility. Proven track record of increasing conversions by 156%, reducing user drop-off by 60%, and boosting engagement by 33%.
            </p>
          </section>

          {/* Skills */}
          <section className="mb-10">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 print:text-gray-400 mb-4">
              Core Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {[
                "Product Design",
                "UI/UX",
                "Design Systems",
                "Prototyping",
                "User Research",
                "Healthcare UX",
                "Fintech UI",
                "Mobile Apps",
                "Accessibility",
                "Figma",
                "Interaction Design",
                "Visual Design",
              ].map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 bg-white/5 print:bg-gray-100 border border-white/10 print:border-gray-200 rounded-full text-sm text-gray-300 print:text-gray-700"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>

          {/* Experience */}
          <section className="mb-10">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 print:text-gray-400 mb-6">
              Experience
            </h3>
            <div className="space-y-8">
              {workExperiences.map((exp, index) => (
                <div key={exp.id} className={index > 0 ? "pt-6 border-t border-white/5 print:border-gray-100" : ""}>
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-2">
                    <div>
                      <h4 className="text-lg font-semibold text-white print:text-black">
                        {exp.role}
                        {exp.current && (
                          <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-emerald-500/20 print:bg-emerald-100 text-emerald-400 print:text-emerald-700 rounded-full">
                            Current
                          </span>
                        )}
                      </h4>
                      <p className="text-base text-gray-400 print:text-gray-600">{exp.company}</p>
                    </div>
                    <div className="text-sm text-gray-500 print:text-gray-500 sm:text-right whitespace-nowrap">
                      <p>{exp.period}</p>
                      <p className="text-gray-600">{exp.location}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-300 print:text-gray-700 mb-3 leading-relaxed">
                    {exp.description}
                  </p>
                  <ul className="space-y-1">
                    {exp.keyContributions.slice(0, 4).map((contribution, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-400 print:text-gray-600">
                        <span className="text-gray-600 print:text-gray-400 mt-1.5">•</span>
                        {contribution}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Key Projects */}
          <section className="mb-10 print-break">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 print:text-gray-400 mb-6">
              Featured Projects
            </h3>
            <div className="space-y-6">
              <div className="p-5 bg-white/5 print:bg-gray-50 rounded-lg border border-white/10 print:border-gray-200">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h4 className="text-base font-semibold text-white print:text-black">Simple Online Doctor</h4>
                  <span className="text-xs text-emerald-400 print:text-emerald-600 font-medium">+156% Conversions</span>
                </div>
                <p className="text-sm text-gray-400 print:text-gray-600 leading-relaxed">
                  Led the complete healthcare platform rebrand and digital launch, designing end-to-end patient journeys from consultation to delivery. Implemented AI-driven health automation while maintaining intuitive UX.
                </p>
              </div>
              <div className="p-5 bg-white/5 print:bg-gray-50 rounded-lg border border-white/10 print:border-gray-200">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h4 className="text-base font-semibold text-white print:text-black">Alvara DeFi Protocol</h4>
                  <span className="text-xs text-emerald-400 print:text-emerald-600 font-medium">-60% Drop-off</span>
                </div>
                <p className="text-sm text-gray-400 print:text-gray-600 leading-relaxed">
                  Designed an intuitive token distribution platform from scratch, creating seamless onboarding flows and building user trust through clear, progressive disclosure patterns.
                </p>
              </div>
              <div className="p-5 bg-white/5 print:bg-gray-50 rounded-lg border border-white/10 print:border-gray-200">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h4 className="text-base font-semibold text-white print:text-black">TreeApp</h4>
                  <span className="text-xs text-emerald-400 print:text-emerald-600 font-medium">+33% Engagement</span>
                </div>
                <p className="text-sm text-gray-400 print:text-gray-600 leading-relaxed">
                  Improved accessibility, navigation, and user flows for this environmental impact mobile app. Conducted comprehensive accessibility audit and redesigned core navigation patterns.
                </p>
              </div>
            </div>
          </section>

          {/* Certifications */}
          <section className="mb-10">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 print:text-gray-400 mb-4">
              Certifications
            </h3>
            <div className="space-y-3">
              {certifications.map((cert) => (
                <div key={cert.id} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white print:text-black">{cert.title}</p>
                    <p className="text-xs text-gray-500 print:text-gray-500">{cert.issuer}</p>
                  </div>
                  <span className="text-xs text-gray-500 print:text-gray-500">{cert.date}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Education */}
          <section>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 print:text-gray-400 mb-4">
              Education
            </h3>
            <div>
              <p className="text-sm font-medium text-white print:text-black">University of Ljubljana</p>
              <p className="text-xs text-gray-500 print:text-gray-500">Computer Science & Multimedia Design</p>
            </div>
          </section>

          {/* Footer */}
          <footer className="mt-12 pt-6 border-t border-white/10 print:border-gray-200 text-center">
            <p className="text-xs text-gray-600 print:text-gray-400">
              Full portfolio and case studies available at mihasodja.com
            </p>
          </footer>
        </div>
      </div>
    </>
  )
}
