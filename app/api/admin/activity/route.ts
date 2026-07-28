import { NextRequest, NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/admin"

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const contactId = searchParams.get("contact_id")
    const limit = parseInt(searchParams.get("limit") || "5")

    const supabase = createAdminClient()

    let query = supabase
      .from("consent_audit_log")
      .select("*")
      .order("event_timestamp", { ascending: false })
      .limit(limit)

    if (contactId) {
      query = query.eq("contact_id", contactId)
    }

    const { data, error } = await query

    if (error) {
      console.error("Activity fetch error:", error)
      return NextResponse.json({ events: [] })
    }

    return NextResponse.json({ events: data || [] })
  } catch (err) {
    console.error("Activity API error:", err)
    return NextResponse.json({ events: [] })
  }
}
