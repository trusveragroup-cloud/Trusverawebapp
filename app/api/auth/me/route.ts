import { NextResponse } from "next/server"
import { requireAdmin } from "@/lib/supabase/requireAdmin"

export async function GET() {
  try {
    const auth = await requireAdmin()
    if ("error" in auth) return auth.error

    return NextResponse.json({
      user: {
        id: auth.user.id,
        fullName: auth.user.fullName,
        email: auth.user.email,
        role: auth.user.role,
        permissions: auth.user.permissions,
      },
    })
  } catch (err) {
    console.error("Auth me error:", err)
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 })
  }
}
