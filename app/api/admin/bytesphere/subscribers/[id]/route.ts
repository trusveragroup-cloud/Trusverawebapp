import { NextRequest, NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/admin"
import { requireAdmin } from "@/lib/supabase/requireAdmin"
import { requirePermission } from "@/lib/supabase/permissions"

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdmin()
  if ("error" in auth) return auth.error
  const denied = requirePermission(auth.user, "manage_bs_subscribers")
  if (denied) return denied

  try {
    const { id } = await params
    const body = await req.json()
    const { active } = body

    if (typeof active !== "boolean") {
      return NextResponse.json({ error: "active must be a boolean." }, { status: 400 })
    }

    const supabase = createAdminClient()

    const update = active
      ? { active: true, unsubscribed_at: null, subscribed_at: new Date().toISOString() }
      : { active: false, unsubscribed_at: new Date().toISOString() }

    const { data, error } = await supabase
      .from("bs_subscribers")
      .update(update)
      .eq("id", id)
      .select("id, email, name, subscribed_at, active, unsubscribed_at, created_at")

    if (error) {
      console.error("Subscriber update error:", error)
      return NextResponse.json({ error: "Failed to update subscriber." }, { status: 500 })
    }

    if (!data || data.length === 0) {
      return NextResponse.json({ error: "Subscriber not found." }, { status: 404 })
    }

    return NextResponse.json({ success: true, subscriber: data[0] })
  } catch (err) {
    console.error("Subscriber PATCH error:", err)
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 })
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdmin()
  if ("error" in auth) return auth.error
  const denied = requirePermission(auth.user, "manage_bs_subscribers")
  if (denied) return denied

  try {
    const { id } = await params
    const supabase = createAdminClient()

    const { data, error } = await supabase
      .from("bs_subscribers")
      .delete()
      .eq("id", id)
      .select("id")

    if (error) {
      console.error("Subscriber delete error:", error)
      return NextResponse.json({ error: "Failed to delete subscriber." }, { status: 500 })
    }

    if (!data || data.length === 0) {
      return NextResponse.json({ error: "Subscriber not found." }, { status: 404 })
    }

    return NextResponse.json({ success: true, message: "Subscriber deleted." })
  } catch (err) {
    console.error("Subscriber DELETE error:", err)
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 })
  }
}
