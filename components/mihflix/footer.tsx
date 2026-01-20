"use client"

import { MihFlixLogo } from "./mihflix-logo"

export function Footer() {
  return (
    <footer className="bg-black px-4 py-12 md:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col items-center justify-between gap-6 md:flex-row">
          <MihFlixLogo size="sm" />

          <nav className="flex flex-wrap justify-center gap-6 text-sm text-gray-500" aria-label="Footer navigation">
            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" })
                window.history.pushState({}, "", "/")
                window.dispatchEvent(new PopStateEvent("popstate"))
              }}
              className="hover:text-white transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => {
                window.history.pushState({}, "", "/work")
                window.dispatchEvent(new PopStateEvent("popstate"))
              }}
              className="hover:text-white transition-colors"
            >
              Case Studies
            </button>
            <button
              onClick={() => {
                window.history.pushState({}, "", "/about")
                window.dispatchEvent(new PopStateEvent("popstate"))
              }}
              className="hover:text-white transition-colors"
            >
              About
            </button>
            <button
              onClick={() => {
                window.history.pushState({}, "", "/contact")
                window.dispatchEvent(new PopStateEvent("popstate"))
              }}
              className="hover:text-white transition-colors"
            >
              Contact
            </button>
          </nav>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-600">
          <p className="mb-2">Built with care by Miha Sodja</p>
          <p>© {new Date().getFullYear()} Miha Sodja. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
