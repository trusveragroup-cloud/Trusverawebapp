"use client"

import { createContext, useContext, useEffect, useState } from "react"

type AdminContextType = {
  role: string
  permissions: string[]
  can: (permission: string) => boolean
  loading: boolean
}

const AdminCtx = createContext<AdminContextType>({
  role: "",
  permissions: [],
  can: () => false,
  loading: true,
})

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AdminContextType>({
    role: "",
    permissions: [],
    can: () => false,
    loading: true,
  })

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data) => {
        const role: string = data.user?.role || ""
        const permissions: string[] = data.user?.permissions || []
        setState({
          role,
          permissions,
          can: (p: string) => role === "Super Admin" || permissions.includes(p),
          loading: false,
        })
      })
      .catch(() =>
        setState({
          role: "",
          permissions: [],
          can: () => false,
          loading: false,
        })
      )
  }, [])

  return <AdminCtx.Provider value={state}>{children}</AdminCtx.Provider>
}

export const useAdmin = () => useContext(AdminCtx)
