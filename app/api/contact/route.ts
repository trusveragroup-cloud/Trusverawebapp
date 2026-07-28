import { NextRequest, NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/admin"
import { sendConfirmationEmail, sendNotificationEmail } from "@/lib/email"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const {
      firstName,
      lastName,
      email,
      company,
      service,
      message,
      consentConfirm,
      consentMarketing,
    } = body

    // Validation
    if (!firstName || !lastName || !email || !consentConfirm) {
      return NextResponse.json(
        { error: "Required fields missing or consent not given." },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address." },
        { status: 400 }
      )
    }

    // Capture compliance metadata server-side
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown"
    const userAgent = req.headers.get("user-agent") || "unknown"
    const consentTimestamp = new Date().toISOString()

    const supabase = createAdminClient()

    // Insert contact
    const { data: contact, error: contactError } = await supabase
      .from("contacts")
      .insert({
        full_name: `${firstName.trim()} ${lastName.trim()}`,
        email: email.trim().toLowerCase(),
        company_name: company?.trim() || null,
        service_interest: service || null,
        message: message?.trim() || null,
        source: "website_form",
        legal_basis: "consent",
        consent_given: true,
        consent_timestamp: consentTimestamp,
        consent_method: "website_checkbox",
        consent_text: "Send me a confirmation of this submission.",
        consent_ip_address: ip,
        consent_user_agent: userAgent,
        notes: consentMarketing
          ? "Opted in to B2B demand generation insights newsletter."
          : null,
      })
      .select("id")
      .single()

    if (contactError) {
      console.error("Contact insert error:", contactError)
      return NextResponse.json(
        { error: "Failed to save your enquiry. Please try again." },
        { status: 500 }
      )
    }

    // Log consent event to audit log
    const { error: auditError } = await supabase
      .from("consent_audit_log")
      .insert({
        contact_id: contact.id,
        event_type: "consent_given",
        ip_address: ip,
        user_agent: userAgent,
        notes: "Consent given via website contact form checkbox.",
      })

    if (auditError) {
      // Non-blocking — contact saved successfully, audit log failure is logged only
      console.error("Audit log error:", auditError)
    }

    // Send emails — non-blocking, errors logged but do not fail the request
    try {
      await Promise.all([
        sendConfirmationEmail({
          fullName: `${firstName.trim()} ${lastName.trim()}`,
          email: email.trim(),
          company: company?.trim(),
          serviceInterest: service,
          message: message?.trim(),
        }),
        sendNotificationEmail({
          fullName: `${firstName.trim()} ${lastName.trim()}`,
          email: email.trim(),
          company: company?.trim(),
          serviceInterest: service,
          message: message?.trim(),
        }),
      ])
    } catch (emailError) {
      // Email failure does not block the contact from being saved
      console.error("Email send error:", emailError)
    }

    return NextResponse.json(
      { success: true, message: "Enquiry submitted successfully." },
      { status: 200 }
    )
  } catch (err) {
    console.error("Contact API error:", err)
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    )
  }
}
