import { NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/admin"
import { requireAdmin } from "@/lib/supabase/requireAdmin"
import { requirePermission } from "@/lib/supabase/permissions"

export async function GET() {
  const auth = await requireAdmin()
  if ("error" in auth) return auth.error
  const denied = requirePermission(auth.user, "view_bs_contacts")
  if (denied) return denied

  try {
    const supabase = createAdminClient()

    const { data, error } = await supabase
      .from("bs_contacts")
      .select("id, name, email, company, subject, message, status, submitted_at, created_at")
      .order("submitted_at", { ascending: false })

    if (error) {
      console.error("Contacts fetch error:", error)
      return NextResponse.json({ error: "Failed to fetch contacts." }, { status: 500 })
    }

    return NextResponse.json({ contacts: data || [] })
  } catch (err) {
    console.error("Contacts GET error:", err)
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 })
  }
}
