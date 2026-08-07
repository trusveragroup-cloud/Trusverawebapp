import { Inbox } from "lucide-react"

export default function ByteSphereContactsPage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 text-center">
      <div className="flex size-14 items-center justify-center rounded-full bg-muted">
        <Inbox className="size-6 text-muted-foreground" />
      </div>
      <h1 className="text-xl font-semibold text-foreground">Contacts</h1>
      <p className="max-w-sm text-sm text-muted-foreground">
        Not yet built. This section will list and triage contact form submissions
        stored in <code className="rounded bg-muted px-1 py-0.5 text-xs">bs_contacts</code>.
      </p>
    </div>
  )
}
