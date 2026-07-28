"use client";

import NavBar from "@/components/sections/NavBar";
import BANTHero from "@/components/sections/BANTHero";
import WhatIsBANT from "@/components/sections/WhatIsBANT";
import BANTCriteriaSection from "@/components/sections/BANTCriteriaSection";
import HowTVGDeliversSection from "@/components/sections/HowTVGDeliversSection";
import BANTScoreboardSection from "@/components/sections/BANTScoreboardSection";
import BANTAdvantageSection from "@/components/sections/BANTAdvantageSection";
import BANTConnects from "@/components/sections/BANTConnects";
import ContactFormSection from "@/components/sections/ContactFormSection";
import FooterSection from "@/components/sections/FooterSection";
import { C } from "@/lib/colors";

const SERVICE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "BANT Qualified Lead Generation",
  provider: { "@type": "Organization", name: "TrusVera Group" },
  name: "BANT Qualified Leads for B2B Technology Sales",
  description: "Stop chasing unqualified pipeline. TrusVera Group delivers BANT-verified leads with confirmed Budget, Authority, Need, and Timeline.",
  url: "https://www.trusveragroup.com/services/bant-qualified-leads",
};

export default function BANTClient() {
  return (
    <div
      className="id-page"
      style={{ fontFamily: "var(--font-inter), sans-serif", color: C.textDark, background: C.cream100, overflowX: "hidden" }}
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SERVICE_JSON_LD) }} />
      <NavBar />
      <BANTHero />
      <WhatIsBANT />
      <BANTCriteriaSection />
      <HowTVGDeliversSection />
      <BANTScoreboardSection />
      <BANTAdvantageSection />
      <BANTConnects />
      <ContactFormSection defaultService="BANT Qualified Leads" />
      <FooterSection />
    </div>
  );
}
