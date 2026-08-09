"use client"

import { ArticleForm } from "@/components/admin/bytesphere/ArticleForm"
import { useAdmin } from "@/lib/admin-context"
import AccessDenied from "@/components/admin/AccessDenied"
import { C } from "@/lib/colors"

export default function NewArticlePage() {
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
  if (!can("create_bs_articles")) return <AccessDenied />

  return <ArticleForm mode="create" />
}
