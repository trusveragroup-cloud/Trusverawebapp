import { LayoutDashboard } from "lucide-react"

export default function ByteSphereDashboardPage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 text-center">
      <div className="flex size-14 items-center justify-center rounded-full bg-muted">
        <LayoutDashboard className="size-6 text-muted-foreground" />
      </div>
      <h1 className="text-xl font-semibold text-foreground">ByteSphere Dashboard</h1>
      <p className="max-w-sm text-sm text-muted-foreground">
        Not yet built. This section is reserved for ByteSphere-wide stats — content volume,
        publish velocity, and subscriber growth.
      </p>
    </div>
  )
}
