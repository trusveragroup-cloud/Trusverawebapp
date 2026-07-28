import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"

export async function GET() {
  try {
    const supabase = createAdminClient()
    const { data, error } = await supabase
      .from("role_permissions")
      .select("role, permission, granted")

    if (error) {
      console.error("Permissions fetch error:", error)
      return NextResponse.json({ error: "Failed to fetch permissions." }, { status: 500 })
    }

    return NextResponse.json({ permissions: data || [] })
  } catch (err) {
    console.error("Permissions GET error:", err)
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { role, permission, granted } = await req.json()

    if (!role || !permission || typeof granted !== "boolean") {
      return NextResponse.json(
        { error: "role, permission, and granted are required." },
        { status: 400 }
      )
    }

    if (role === "Super Admin") {
      return NextResponse.json(
        { error: "Super Admin permissions cannot be modified." },
        { status: 400 }
      )
    }

    // Only a Super Admin may change what other roles can do.
    const sessionSupabase = await createClient()
    const {
      data: { user },
    } = await sessionSupabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Not authenticated." }, { status: 401 })
    }

    const adminSupabase = createAdminClient()

    const { data: requester } = await adminSupabase
      .from("admin_users")
      .select("role")
      .eq("id", user.id)
      .single()

    if (!requester || requester.role !== "Super Admin") {
      return NextResponse.json(
        { error: "Only a Super Admin can manage permissions." },
        { status: 403 }
      )
    }

    const { error } = await adminSupabase
      .from("role_permissions")
      .upsert({ role, permission, granted }, { onConflict: "role,permission" })

    if (error) {
      console.error("Permission update error:", error)
      return NextResponse.json({ error: "Failed to update permission." }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("Permissions PATCH error:", err)
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 })
  }
}
