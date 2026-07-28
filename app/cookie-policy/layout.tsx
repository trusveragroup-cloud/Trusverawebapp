import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Cookie Policy | TrusVera Group",
  description: "TrusVera Group Cookie Policy. Learn about how we use cookies and similar tracking technologies on our website.",
}

export default function CookieLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
