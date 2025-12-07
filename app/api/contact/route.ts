import { NextResponse } from "next/server"

// Email validation regex
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    // Validate email format
    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 })
    }

    // Send email using Resend
    const resendApiKey = process.env.RESEND_API_KEY

    if (!resendApiKey) {
      // If no API key, log the message and return success (for development)
      console.log("[v0] Contact form submission (no RESEND_API_KEY configured):", {
        name,
        email,
        subject,
        message,
        to: "miha.sodja@gmail.com",
      })

      return NextResponse.json({
        success: true,
        message: "Message received (email sending not configured)",
      })
    }

    // Send email via Resend API
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "MihFlix Contact <onboarding@resend.dev>",
        to: "miha.sodja@gmail.com",
        reply_to: email,
        subject: `[MihFlix Contact] ${subject}`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #333; border-bottom: 2px solid #d13aff; padding-bottom: 10px;">New Contact Form Submission</h2>
            
            <div style="margin: 20px 0; padding: 20px; background-color: #f9f9f9; border-radius: 8px;">
              <p style="margin: 0 0 10px;"><strong>Name:</strong> ${name}</p>
              <p style="margin: 0 0 10px;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
              <p style="margin: 0;"><strong>Subject:</strong> ${subject}</p>
            </div>
            
            <div style="margin: 20px 0;">
              <h3 style="color: #333; margin-bottom: 10px;">Message:</h3>
              <div style="padding: 20px; background-color: #fff; border: 1px solid #e0e0e0; border-radius: 8px; white-space: pre-wrap;">${message}</div>
            </div>
            
            <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 30px 0;" />
            <p style="color: #888; font-size: 12px;">This email was sent from the MihFlix portfolio contact form.</p>
          </div>
        `,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error("[v0] Resend API error:", errorData)
      throw new Error("Failed to send email")
    }

    return NextResponse.json({ success: true, message: "Email sent successfully" })
  } catch (error) {
    console.error("[v0] Contact form error:", error)
    return NextResponse.json({ error: "Failed to send message. Please try again later." }, { status: 500 })
  }
}
