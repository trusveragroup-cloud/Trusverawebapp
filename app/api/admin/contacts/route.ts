import { NextRequest, NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/admin"

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get("id")
    const status = searchParams.get("status")
    const search = searchParams.get("search")
    const limit = parseInt(searchParams.get("limit") || "50")
    const offset = parseInt(searchParams.get("offset") || "0")

    const supabase = createAdminClient()

    let query = supabase
      .from("contacts")
      .select("*", { count: "exact" })
      .eq("is_anonymized", false)
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1)

    if (id) {
      query = query.eq("id", id)
    }

    if (status && status !== "All") {
      query = query.eq("status", status)
    }

    if (search) {
      query = query.or(
        `full_name.ilike.%${search}%,email.ilike.%${search}%,company_name.ilike.%${search}%`
      )
    }

    const service = searchParams.get("service")
    const date = searchParams.get("date")

    if (service) {
      query = query.eq("service_interest", service)
    }

    if (date) {
      const now = new Date()
      let fromDate: Date | null = null
      if (date === "today") {
        fromDate = new Date(now.setHours(0, 0, 0, 0))
      } else if (date === "week") {
        fromDate = new Date(now.setDate(now.getDate() - 7))
      } else if (date === "month") {
        fromDate = new Date(now.setMonth(now.getMonth() - 1))
      } else if (date === "3months") {
        fromDate = new Date(now.setMonth(now.getMonth() - 3))
      }
      if (fromDate) {
        query = query.gte("created_at", fromDate.toISOString())
      }
    }

    const { data, error, count } = await query

    if (error) {
      console.error("Contacts fetch error:", error)
      return NextResponse.json(
        { error: "Failed to fetch contacts." },
        { status: 500 }
      )
    }

    return NextResponse.json({ contacts: data || [], total: count || 0 })
  } catch (err) {
    console.error("Contacts GET error:", err)
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const {
      fullName,
      email,
      phone,
      companyName,
      jobTitle,
      country,
      serviceInterest,
      message,
      sourceDetail,
      notes,
    } = body

    // Validation
    if (!fullName || !email) {
      return NextResponse.json(
        { error: "Full name and email are required." },
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

    const supabase = createAdminClient()

    const { data: contact, error: contactError } = await supabase
      .from("contacts")
      .insert({
        full_name: fullName.trim(),
        email: email.trim().toLowerCase(),
        phone: phone?.trim() || null,
        company_name: companyName?.trim() || null,
        job_title: jobTitle?.trim() || null,
        country: country?.trim() || null,
        service_interest: serviceInterest || null,
        message: message?.trim() || null,
        source: "manual_entry",
        source_detail: sourceDetail?.trim() || null,
        legal_basis: "legitimate_interest",
        consent_given: false,
        notes: notes?.trim() || null,
        status: "New",
      })
      .select("id, full_name, email, status, created_at")
      .single()

    if (contactError) {
      console.error("Contact insert error:", contactError)
      return NextResponse.json(
        { error: "Failed to save contact. Please try again." },
        { status: 500 }
      )
    }

    // Log to consent audit trail
    const supabaseAdmin = createAdminClient()
    await supabaseAdmin.from("consent_audit_log").insert({
      contact_id: contact.id,
      event_type: "consent_given",
      notes: "Contact manually added by admin. Legal basis: legitimate interest.",
    })

    return NextResponse.json(
      {
        success: true,
        message: "Contact added successfully.",
        contact,
      },
      { status: 201 }
    )
  } catch (err) {
    console.error("Contact POST error:", err)
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    )
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json()
    const { id, status, notes } = body

    if (!id) {
      return NextResponse.json({ error: "Contact ID required." }, { status: 400 })
    }

    const supabase = createAdminClient()
    const updateData: Record<string, string> = {}
    if (status) updateData.status = status
    if (notes !== undefined) updateData.notes = notes

    const { error } = await supabase
      .from("contacts")
      .update(updateData)
      .eq("id", id)

    if (error) {
      return NextResponse.json({ error: "Failed to update contact." }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("Contact PATCH error:", err)
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 })
  }
}
