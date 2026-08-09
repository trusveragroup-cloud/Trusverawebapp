import { NextRequest, NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/admin"
import { requireAdmin } from "@/lib/supabase/requireAdmin"
import { requirePermission } from "@/lib/supabase/permissions"

const VALID_STATUSES = ["new", "read", "replied", "closed"]

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdmin()
  if ("error" in auth) return auth.error
  const denied = requirePermission(auth.user, "edit_bs_contacts")
  if (denied) return denied

  try {
    const { id } = await params
    const body = await req.json()
    const { status } = body

    if (!VALID_STATUSES.includes(status)) {
      return NextResponse.json({ error: "Invalid status value." }, { status: 400 })
    }

    const supabase = createAdminClient()

    const { data, error } = await supabase
      .from("bs_contacts")
      .update({ status })
      .eq("id", id)
      .select("id, name, email, company, subject, message, status, submitted_at, created_at")

    if (error) {
      console.error("Contact update error:", error)
      return NextResponse.json({ error: "Failed to update contact." }, { status: 500 })
    }

    if (!data || data.length === 0) {
      return NextResponse.json({ error: "Contact not found." }, { status: 404 })
    }

    return NextResponse.json({ success: true, contact: data[0] })
  } catch (err) {
    console.error("Contact PATCH error:", err)
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 })
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdmin()
  if ("error" in auth) return auth.error
  const denied = requirePermission(auth.user, "edit_bs_contacts")
  if (denied) return denied

  try {
    const { id } = await params
    const supabase = createAdminClient()

    const { data, error } = await supabase
      .from("bs_contacts")
      .delete()
      .eq("id", id)
      .select("id")

    if (error) {
      console.error("Contact delete error:", error)
      return NextResponse.json({ error: "Failed to delete contact." }, { status: 500 })
    }

    if (!data || data.length === 0) {
      return NextResponse.json({ error: "Contact not found." }, { status: 404 })
    }

    return NextResponse.json({ success: true, message: "Contact deleted." })
  } catch (err) {
    console.error("Contact DELETE error:", err)
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 })
  }
}
