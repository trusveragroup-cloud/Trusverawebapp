import { NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/admin"

export async function GET() {
  try {
    const supabase = createAdminClient()

    const thisMonthStart = new Date()
    thisMonthStart.setDate(1)
    thisMonthStart.setHours(0, 0, 0, 0)

    const [
      totalContactsRes,
      newUnreadRes,
      contactsThisMonthRes,
      blogsPublishedRes,
      blogsDraftRes,
      blogsArchivedRes,
      activeAdminsRes,
    ] = await Promise.all([
      supabase.from("contacts").select("id", { count: "exact", head: true }).eq("is_anonymized", false),
      supabase.from("contacts").select("id", { count: "exact", head: true }).eq("status", "New").eq("is_anonymized", false),
      supabase.from("contacts").select("id", { count: "exact", head: true }).gte("created_at", thisMonthStart.toISOString()).eq("is_anonymized", false),
      supabase.from("blogs").select("id", { count: "exact", head: true }).eq("status", "Published"),
      supabase.from("blogs").select("id", { count: "exact", head: true }).eq("status", "Draft"),
      supabase.from("blogs").select("id", { count: "exact", head: true }).eq("status", "Archived"),
      supabase.from("admin_users").select("id", { count: "exact", head: true }).eq("is_active", true),
    ])

    return NextResponse.json({
      totalContacts: totalContactsRes.count ?? 0,
      newUnread: newUnreadRes.count ?? 0,
      contactsThisMonth: contactsThisMonthRes.count ?? 0,
      blogsPublished: blogsPublishedRes.count ?? 0,
      blogsDraft: blogsDraftRes.count ?? 0,
      blogsArchived: blogsArchivedRes.count ?? 0,
      activeAdmins: activeAdminsRes.count ?? 0,
    })
  } catch (err) {
    console.error("Dashboard metrics error:", err)
    return NextResponse.json(
      { error: "Failed to fetch dashboard metrics." },
      { status: 500 }
    )
  }
}
