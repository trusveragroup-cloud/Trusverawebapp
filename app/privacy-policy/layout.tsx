import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy | TrusVera Group",
  description: "TrusVera Group Privacy Policy. Learn how we collect, use, and protect your personal data in compliance with DPDP 2023, GDPR, and CCPA.",
}

export default function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
