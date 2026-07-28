"use client"

import { useCallback, useEffect, useState } from "react"

export type AdminRole = "Super Admin" | "Sales Admin" | "Content Admin" | "Viewer"

type PermissionRow = { role: string; permission: string; granted: boolean }

export function usePermissions() {
  const [role, setRole] = useState<AdminRole | null>(null)
  const [permissions, setPermissions] = useState<PermissionRow[]>([])
  const [loading, setLoading] = useState(true)

  const fetchPermissions = useCallback(async () => {
    setLoading(true)
    try {
      const meRes = await fetch("/api/auth/me", { credentials: "include" })
      const meData = await meRes.json()
      const currentRole: AdminRole | null = meRes.ok ? meData.user?.role ?? null : null
      setRole(currentRole)

      if (currentRole && currentRole !== "Super Admin") {
        const permRes = await fetch("/api/admin/permissions", { credentials: "include" })
        const permData = await permRes.json()
        setPermissions(permRes.ok ? permData.permissions || [] : [])
      } else {
        setPermissions([])
      }
    } catch {
      setRole(null)
      setPermissions([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchPermissions()
  }, [fetchPermissions])

  const can = useCallback(
    (permission: string) => {
      if (role === "Super Admin") return true
      if (!role) return false
      const found = permissions.find((p) => p.role === role && p.permission === permission)
      return found?.granted ?? false
    },
    [role, permissions]
  )

  return { can, role, loading }
}
