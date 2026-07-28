import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"

export async function GET() {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Not authenticated." }, { status: 401 })
    }

    const adminSupabase = createAdminClient()
    const { data: adminUser, error } = await adminSupabase
      .from("admin_users")
      .select("id, full_name, email, role, is_active")
      .eq("id", user.id)
      .single()

    if (error || !adminUser || !adminUser.is_active) {
      return NextResponse.json({ error: "Access denied." }, { status: 403 })
    }

    return NextResponse.json({
      user: {
        id: adminUser.id,
        fullName: adminUser.full_name,
        email: adminUser.email,
        role: adminUser.role,
      },
    })
  } catch (err) {
    console.error("Auth me error:", err)
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 })
  }
}
