import { NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/admin"
import { requireAdmin } from "@/lib/supabase/requireAdmin"
import { requirePermission } from "@/lib/supabase/permissions"

function csvEscape(value: string): string {
  if (/[",\n]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`
  }
  return value
}

export async function GET() {
  const auth = await requireAdmin()
  if ("error" in auth) return auth.error
  const denied = requirePermission(auth.user, "view_bs_subscribers")
  if (denied) return denied

  try {
    const supabase = createAdminClient()

    const { data, error } = await supabase
      .from("bs_subscribers")
      .select("email, name, active, subscribed_at, unsubscribed_at")
      .order("subscribed_at", { ascending: false })

    if (error) {
      console.error("Subscribers export error:", error)
      return NextResponse.json({ error: "Failed to export subscribers." }, { status: 500 })
    }

    const header = ["Email", "Name", "Status", "Subscribed At", "Unsubscribed At"]
    const lines = [header.join(",")]

    for (const row of data || []) {
      lines.push(
        [
          csvEscape(row.email ?? ""),
          csvEscape(row.name ?? ""),
          csvEscape(row.active ? "Active" : "Unsubscribed"),
          csvEscape(row.subscribed_at ?? ""),
          csvEscape(row.unsubscribed_at ?? ""),
        ].join(",")
      )
    }

    const csv = lines.join("\n")
    const filename = `bytesphere-subscribers-${new Date().toISOString().slice(0, 10)}.csv`

    return new NextResponse(csv, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    })
  } catch (err) {
    console.error("Subscribers export error:", err)
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 })
  }
}
