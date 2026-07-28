import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      )
    }

    // Use server client for auth (handles cookies)
    const supabase = await createClient()

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password,
    })

    if (error) {
      console.error("Login error:", error.message)
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 }
      )
    }

    if (!data.user) {
      return NextResponse.json(
        { error: "Login failed. Please try again." },
        { status: 401 }
      )
    }

    // Use admin client for admin_users check (bypasses RLS)
    const adminSupabase = createAdminClient()

    const { data: adminUser, error: adminError } = await adminSupabase
      .from("admin_users")
      .select("id, role, is_active, full_name")
      .eq("id", data.user.id)
      .single()

    console.log("Admin user check:", adminUser, adminError)

    if (adminError || !adminUser) {
      await supabase.auth.signOut()
      return NextResponse.json(
        { error: "Access denied. This account is not authorized for admin access." },
        { status: 403 }
      )
    }

    if (!adminUser.is_active) {
      await supabase.auth.signOut()
      return NextResponse.json(
        { error: "Your account has been deactivated. Contact your administrator." },
        { status: 403 }
      )
    }

    // Update last_login_at
    await adminSupabase
      .from("admin_users")
      .update({ last_login_at: new Date().toISOString() })
      .eq("id", data.user.id)

    return NextResponse.json({
      success: true,
      user: {
        id: adminUser.id,
        name: adminUser.full_name,
        role: adminUser.role,
      },
    })
  } catch (err) {
    console.error("Auth login error:", err)
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    )
  }
}
