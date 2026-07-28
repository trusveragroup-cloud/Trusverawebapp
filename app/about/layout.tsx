import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About TrusVera Group | B2B Intent Data and Demand Generation Company",
  description:
    "TrusVera Group is a B2B technology marketing intelligence company. We deliver intent data, BANT-qualified leads, account profiling, and whitepaper promotion to enterprise technology companies. Pune, India.",
  keywords:
    "TrusVera Group, B2B intent data company, BANT leads provider, account profiling firm, B2B demand generation, enterprise technology marketing, Pune B2B company",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
