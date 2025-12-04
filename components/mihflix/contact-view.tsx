"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, Send } from "lucide-react"

export function ContactView() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Form submitted:", formData)
    setIsSubmitted(true)
    setTimeout(() => setIsSubmitted(false), 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      className="min-h-screen bg-black pt-32 pb-20 px-6"
    >
      <div className="mx-auto max-w-2xl">
        {/* Icon and header */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 text-center"
        >
          <div className="mb-4 inline-flex rounded-full bg-gradient-to-br from-red-600/20 to-red-700/20 p-4">
            <Mail className="h-8 w-8 text-red-500" />
          </div>
          <h1 className="mb-3 text-4xl font-bold text-white">Get in touch</h1>
          <p className="text-balance text-gray-400">
            Ready to talk about your product? Let's design clear, intuitive experiences that ship.
          </p>
        </motion.div>

        {/* Form card */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18 }}
          className="rounded-2xl bg-gradient-to-br from-gray-900/80 to-gray-900/40 p-8 shadow-[0_8px_24px_rgba(0,0,0,0.4)] backdrop-blur-sm"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name field */}
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-300">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-700 bg-black/50 px-4 py-3 text-white placeholder-gray-500 outline-none transition-all focus:border-red-500 focus:ring-2 focus:ring-red-500/50"
                placeholder="Your name"
              />
            </div>

            {/* Email field */}
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-300">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-700 bg-black/50 px-4 py-3 text-white placeholder-gray-500 outline-none transition-all focus:border-red-500 focus:ring-2 focus:ring-red-500/50"
                placeholder="your@email.com"
              />
            </div>

            {/* Subject field */}
            <div>
              <label htmlFor="subject" className="mb-2 block text-sm font-medium text-gray-300">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-700 bg-black/50 px-4 py-3 text-white placeholder-gray-500 outline-none transition-all focus:border-red-500 focus:ring-2 focus:ring-red-500/50"
                placeholder="Project inquiry"
              />
            </div>

            {/* Message field */}
            <div>
              <label htmlFor="message" className="mb-2 block text-sm font-medium text-gray-300">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full resize-none rounded-lg border border-gray-700 bg-black/50 px-4 py-3 text-white placeholder-gray-500 outline-none transition-all focus:border-red-500 focus:ring-2 focus:ring-red-500/50"
                placeholder="Tell me about your project..."
              />
            </div>

            {/* Submit button */}
            <motion.button
              type="submit"
              whileTap={{ scale: 0.98 }}
              className="group relative w-full overflow-hidden rounded-lg bg-gradient-to-r from-red-600 to-red-700 px-6 py-4 font-semibold text-white shadow-[0_8px_24px_rgba(229,9,20,0.3)] transition-all hover:scale-[1.02] hover:shadow-[0_12px_32px_rgba(229,9,20,0.4)]"
            >
              <span className="flex items-center justify-center gap-2">
                {isSubmitted ? "Message sent!" : "Send message"}
                <Send className="h-4 w-4" />
              </span>
            </motion.button>

            {/* Success message */}
            {isSubmitted && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center text-sm text-green-500"
              >
                Thanks for reaching out! I'll get back to you soon.
              </motion.p>
            )}
          </form>
        </motion.div>
      </div>
    </motion.div>
  )
}
