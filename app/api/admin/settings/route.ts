import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"

export async function PATCH(req: NextRequest) {
  try {
    const { currentPassword, newPassword } = await req.json()

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { error: "Both passwords are required." },
        { status: 400 }
      )
    }
    if (newPassword.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters." },
        { status: 400 }
      )
    }

    // Get current user from session
    const supabase = await createClient()
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError || !user?.email) {
      return NextResponse.json({ error: "Not authenticated." }, { status: 401 })
    }

    // Verify current password — use a fresh client to avoid
    // session conflicts
    const { createClient: createFreshClient } = await import("@supabase/supabase-js")
    const freshClient = createFreshClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
    const { error: verifyError } = await freshClient.auth.signInWithPassword({
      email: user.email,
      password: currentPassword,
    })
    if (verifyError) {
      return NextResponse.json(
        { error: "Current password is incorrect." },
        { status: 400 }
      )
    }

    // Use admin client to update password — bypasses session issues
    const adminClient = createAdminClient()
    const { error: updateError } = await adminClient.auth.admin.updateUserById(
      user.id,
      { password: newPassword }
    )
    if (updateError) {
      console.error("Password update error:", updateError)
      return NextResponse.json(
        { error: updateError.message || "Failed to update password." },
        { status: 500 }
      )
    }

    console.log("Password updated for:", user.email)
    return NextResponse.json({ success: true })

  } catch (err) {
    console.error("Settings PATCH error:", err)
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    )
  }
}
