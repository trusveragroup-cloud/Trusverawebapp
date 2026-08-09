import { NextResponse } from "next/server"
import type { AdminUser } from "@/lib/supabase/requireAdmin"

export function hasPermission(user: AdminUser, permission: string): boolean {
  if (user.role === "Super Admin") return true
  return user.permissions.includes(permission)
}

export function requirePermission(
  user: AdminUser,
  permission: string
): NextResponse | null {
  if (hasPermission(user, permission)) return null
  return NextResponse.json(
    { error: "You do not have permission to perform this action." },
    { status: 403 }
  )
}
