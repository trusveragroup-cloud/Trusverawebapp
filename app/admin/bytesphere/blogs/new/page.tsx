"use client"

import { BlogForm } from "@/components/admin/bytesphere/BlogForm"
import { useAdmin } from "@/lib/admin-context"
import AccessDenied from "@/components/admin/AccessDenied"
import { C } from "@/lib/colors"

export default function NewBlogPage() {
  const { can, loading } = useAdmin()

  if (loading) {
    return (
      <div style={{ padding: 32 }}>
        <div style={{ color: C.textMuted, fontFamily: "var(--font-inter)", fontSize: 14 }}>
          Loading...
        </div>
      </div>
    )
  }
  if (!can("create_bs_blogs")) return <AccessDenied />

  return <BlogForm mode="create" />
}
