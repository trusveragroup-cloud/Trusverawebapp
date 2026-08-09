import { NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/admin"
import { requireAdmin } from "@/lib/supabase/requireAdmin"

export async function GET() {
  const auth = await requireAdmin()
  if ("error" in auth) return auth.error

  try {
    const supabase = createAdminClient()

    const { data, error } = await supabase
      .from("bs_subscribers")
      .select("id, email, name, subscribed_at, active, unsubscribed_at, created_at")
      .order("subscribed_at", { ascending: false })

    if (error) {
      console.error("Subscribers fetch error:", error)
      return NextResponse.json({ error: "Failed to fetch subscribers." }, { status: 500 })
    }

    return NextResponse.json({ subscribers: data || [] })
  } catch (err) {
    console.error("Subscribers GET error:", err)
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 })
  }
}
