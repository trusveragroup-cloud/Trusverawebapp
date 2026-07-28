import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Use | TrusVera Group",
  description: "Terms of Use for the TrusVera Group website. Please read these terms carefully before using our website.",
}

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
