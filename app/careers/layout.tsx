import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Careers | TrusVera Group",
  description: "Join TrusVera Group and help shape the future of B2B intelligence. We are looking for driven professionals who bring precision, integrity, and expertise to everything they do.",
  keywords: "TrusVera Group careers, B2B intelligence jobs, demand generation careers, marketing intelligence jobs Pune, account profiling jobs",
  openGraph: {
    title: "Careers at TrusVera Group",
    description: "Join a team that powers enterprise pipeline with precision intelligence. Explore opportunities at TrusVera Group.",
    type: "website",
  },
}

export default function CareersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
