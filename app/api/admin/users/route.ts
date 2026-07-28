import { NextRequest, NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/admin"

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const search = searchParams.get("search")
    const role = searchParams.get("role")
    const status = searchParams.get("status")

    const supabase = createAdminClient()

    let query = supabase
      .from("admin_users")
      .select("*")
      .order("created_at", { ascending: false })

    const userId = searchParams.get("id")
    if (userId) {
      query = query.eq("id", userId)
    }

    if (role && role !== "All") {
      query = query.eq("role", role)
    }

    if (status === "Active") {
      query = query.eq("is_active", true)
    } else if (status === "Inactive") {
      query = query.eq("is_active", false)
    }

    if (search) {
      query = query.or(
        `full_name.ilike.%${search}%,email.ilike.%${search}%`
      )
    }

    const { data, error } = await query

    if (error) {
      console.error("Users fetch error:", error)
      return NextResponse.json(
        { error: "Failed to fetch users." },
        { status: 500 }
      )
    }

    return NextResponse.json({ users: data || [] })
  } catch (err) {
    console.error("Users GET error:", err)
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const { fullName, email, role } = await req.json()

    if (!fullName || !email || !role) {
      return NextResponse.json(
        { error: "Full name, email and role are required." },
        { status: 400 }
      )
    }

    const validRoles = ["Super Admin", "Sales Admin", "Content Admin", "Viewer"]
    if (!validRoles.includes(role)) {
      return NextResponse.json(
        { error: "Invalid role." },
        { status: 400 }
      )
    }

    const supabase = createAdminClient()

    // Check if user already exists in admin_users
    const { data: existing } = await supabase
      .from("admin_users")
      .select("id")
      .eq("email", email.trim().toLowerCase())
      .single()

    if (existing) {
      return NextResponse.json(
        { error: "A user with this email already exists." },
        { status: 409 }
      )
    }

    // Create user in Supabase Auth and send invitation email
    const { data: authData, error: authError } =
      await supabase.auth.admin.inviteUserByEmail(
        email.trim().toLowerCase(),
        {
          data: {
            full_name: fullName.trim(),
            role,
          },
          redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/api/auth/callback?type=invite`,
        }
      )

    if (authError) {
      console.error("Auth invite error:", authError)
      return NextResponse.json(
        { error: "Failed to send invitation. " + authError.message },
        { status: 500 }
      )
    }

    // Insert into admin_users table
    const { error: profileError } = await supabase
      .from("admin_users")
      .insert({
        id: authData.user.id,
        full_name: fullName.trim(),
        email: email.trim().toLowerCase(),
        role,
        is_active: true,
      })

    if (profileError) {
      console.error("Admin user profile error:", profileError)
      // Rollback: delete the auth user
      await supabase.auth.admin.deleteUser(authData.user.id)
      return NextResponse.json(
        { error: "Failed to create user profile." },
        { status: 500 }
      )
    }

    return NextResponse.json(
      {
        success: true,
        message: `Invitation sent to ${email}. They will receive an email to set their password.`,
      },
      { status: 201 }
    )
  } catch (err) {
    console.error("Users POST error:", err)
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    )
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { id, role, isActive } = await req.json()

    if (!id) {
      return NextResponse.json(
        { error: "User ID is required." },
        { status: 400 }
      )
    }

    const supabase = createAdminClient()

    const updateData: Record<string, unknown> = {}
    if (role) updateData.role = role
    if (isActive !== undefined) updateData.is_active = isActive

    const { error } = await supabase
      .from("admin_users")
      .update(updateData)
      .eq("id", id)

    if (error) {
      console.error("User update error:", error)
      return NextResponse.json(
        { error: "Failed to update user." },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("Users PATCH error:", err)
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    )
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json(
        { error: "User ID is required." },
        { status: 400 }
      )
    }

    const supabase = createAdminClient()

    // Delete from admin_users table first
    const { error: profileError } = await supabase
      .from("admin_users")
      .delete()
      .eq("id", id)

    if (profileError) {
      console.error("Profile delete error:", profileError)
      return NextResponse.json(
        { error: "Failed to delete user profile." },
        { status: 500 }
      )
    }

    // Delete from Supabase Auth
    const { error: authError } = await supabase.auth.admin.deleteUser(id)

    if (authError) {
      console.error("Auth delete error:", authError)
      return NextResponse.json(
        { error: "Failed to delete auth user." },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: "User deleted successfully.",
    })
  } catch (err) {
    console.error("Users DELETE error:", err)
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    )
  }
}
