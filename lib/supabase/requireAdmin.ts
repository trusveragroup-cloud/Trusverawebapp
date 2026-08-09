import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"
import type { AdminRole } from "@/lib/supabase/types"

export type AdminUser = {
  id: string
  email: string
  fullName: string
  role: AdminRole
  permissions: string[]
}

export async function requireAdmin(): Promise<
  { user: AdminUser } | { error: NextResponse }
> {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return {
      error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    }
  }

  // admin_users bypasses RLS via the service role client, matching the
  // check already performed in /api/auth/login and /api/auth/me
  const adminSupabase = createAdminClient()
  const { data: adminUser, error } = await adminSupabase
    .from("admin_users")
    .select("id, full_name, email, role, is_active")
    .eq("id", user.id)
    .single()

  if (error || !adminUser || !adminUser.is_active) {
    return {
      error: NextResponse.json({ error: "Forbidden" }, { status: 403 }),
    }
  }

  const { data: perms } = await adminSupabase
    .from("role_permissions")
    .select("permission, granted")
    .eq("role", adminUser.role)

  let permissions: string[] = (perms || [])
    .filter((p) => p.granted)
    .map((p) => p.permission)

  // Super Admin always gets everything regardless of DB rows
  if (adminUser.role === "Super Admin") {
    const { data: allPerms } = await adminSupabase
      .from("role_permissions")
      .select("permission")
    permissions = [...new Set((allPerms || []).map((p) => p.permission))]
  }

  return {
    user: {
      id: adminUser.id,
      email: adminUser.email,
      fullName: adminUser.full_name,
      role: adminUser.role,
      permissions,
    },
  }
}
