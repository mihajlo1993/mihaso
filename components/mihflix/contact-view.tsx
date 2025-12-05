"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Mail, Send, CheckCircle, X, Sparkles } from "lucide-react"

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

function validateEmail(email: string): { isValid: boolean; message: string } {
  if (!email) {
    return { isValid: false, message: "Email is required" }
  }
  if (!EMAIL_REGEX.test(email)) {
    return { isValid: false, message: "Please enter a valid email address" }
  }
  return { isValid: true, message: "" }
}

function SuccessModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 to-gray-950 p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-full p-2 text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Animated success icon */}
            <div className="mb-6 flex justify-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", damping: 15, stiffness: 200 }}
                className="relative"
              >
                {/* Outer glow rings */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1.5, opacity: 0 }}
                  transition={{ delay: 0.3, duration: 1, repeat: Number.POSITIVE_INFINITY, repeatDelay: 1 }}
                  className="absolute inset-0 rounded-full bg-green-500/30"
                />
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1.3, opacity: 0 }}
                  transition={{ delay: 0.5, duration: 1, repeat: Number.POSITIVE_INFINITY, repeatDelay: 1 }}
                  className="absolute inset-0 rounded-full bg-green-500/20"
                />

                {/* Main icon container */}
                <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-green-600 shadow-[0_0_40px_rgba(34,197,94,0.4)]">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.4, type: "spring", damping: 12 }}
                  >
                    <CheckCircle className="h-10 w-10 text-white" />
                  </motion.div>
                </div>

                {/* Sparkles */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 }}
                  className="absolute -right-2 -top-2"
                >
                  <Sparkles className="h-6 w-6 text-yellow-400" />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 }}
                  className="absolute -bottom-1 -left-3"
                >
                  <Sparkles className="h-4 w-4 text-yellow-400" />
                </motion.div>
              </motion.div>
            </div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-center"
            >
              <h3 className="mb-2 text-2xl font-bold text-white">Message Sent!</h3>
              <p className="mb-6 text-gray-400">
                Thank you for reaching out. Your message has been successfully delivered.
              </p>

              {/* Response time badge */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="mb-6 inline-flex items-center gap-2 rounded-full bg-red-500/10 px-4 py-2 text-sm"
              >
                <div className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
                <span className="text-red-400">Expected response within 17 hours</span>
              </motion.div>

              {/* Close button */}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                onClick={onClose}
                className="w-full rounded-lg bg-gradient-to-r from-red-600 to-red-700 px-6 py-3 font-semibold text-white transition-all hover:scale-[1.02] hover:shadow-[0_8px_24px_rgba(229,9,20,0.3)]"
              >
                Got it
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function ContactView() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [emailTouched, setEmailTouched] = useState(false)
  const [emailValidation, setEmailValidation] = useState<{ isValid: boolean; message: string }>({
    isValid: false,
    message: "",
  })

  useEffect(() => {
    if (emailTouched || formData.email) {
      setEmailValidation(validateEmail(formData.email))
    }
  }, [formData.email, emailTouched])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const validation = validateEmail(formData.email)
    if (!validation.isValid) {
      setEmailTouched(true)
      setEmailValidation(validation)
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Failed to send message")
      }

      // Success - show modal and reset form
      setShowSuccessModal(true)
      setFormData({ name: "", email: "", subject: "", message: "" })
      setEmailTouched(false)
      setEmailValidation({ isValid: false, message: "" })
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
    setError(null)
  }

  const handleEmailBlur = () => {
    setEmailTouched(true)
  }

  return (
    <>
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

              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-300">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleEmailBlur}
                    required
                    className={`w-full rounded-lg border bg-black/50 px-4 py-3 pr-12 text-white placeholder-gray-500 outline-none transition-all ${
                      emailTouched && !emailValidation.isValid
                        ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/50"
                        : emailTouched && emailValidation.isValid
                          ? "border-green-500 focus:border-green-500 focus:ring-2 focus:ring-green-500/50"
                          : "border-gray-700 focus:border-red-500 focus:ring-2 focus:ring-red-500/50"
                    }`}
                    placeholder="your@email.com"
                  />
                  {/* Validation icon */}
                  {emailTouched && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                      {emailValidation.isValid ? (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", damping: 15 }}
                        >
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        </motion.div>
                      ) : (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", damping: 15 }}
                        >
                          <X className="h-5 w-5 text-red-500" />
                        </motion.div>
                      )}
                    </div>
                  )}
                </div>
                {/* Error message */}
                <AnimatePresence>
                  {emailTouched && !emailValidation.isValid && emailValidation.message && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      className="mt-2 text-sm text-red-500"
                    >
                      {emailValidation.message}
                    </motion.p>
                  )}
                </AnimatePresence>
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

              {/* Error message */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    className="rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-500"
                  >
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileTap={{ scale: 0.98 }}
                className="group relative w-full overflow-hidden rounded-lg bg-gradient-to-r from-red-600 to-red-700 px-6 py-4 font-semibold text-white shadow-[0_8px_24px_rgba(229,9,20,0.3)] transition-all hover:scale-[1.02] hover:shadow-[0_12px_32px_rgba(229,9,20,0.4)] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:scale-100"
              >
                <span className="flex items-center justify-center gap-2">
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        className="h-5 w-5 rounded-full border-2 border-white/30 border-t-white"
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send message
                      <Send className="h-4 w-4" />
                    </>
                  )}
                </span>
              </motion.button>
            </form>
          </motion.div>
        </div>
      </motion.div>

      {/* Success Modal */}
      <SuccessModal isOpen={showSuccessModal} onClose={() => setShowSuccessModal(false)} />
    </>
  )
}
