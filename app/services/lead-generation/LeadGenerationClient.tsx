"use client";
import NavBar from "@/components/sections/NavBar";
import LeadGenHero from "@/components/sections/LeadGenHero";
import WhatIsLeadGen from "@/components/sections/WhatIsLeadGen";
import CostOfBadLeadGen from "@/components/sections/CostOfBadLeadGen";
import LeadGenChannels from "@/components/sections/LeadGenChannels";
import CampaignTimeline from "@/components/sections/CampaignTimeline";
import LeadGenResults from "@/components/sections/LeadGenResults";
import LeadGenConnects from "@/components/sections/LeadGenConnects";
import ContactFormSection from "@/components/sections/ContactFormSection";
import FooterSection from "@/components/sections/FooterSection";
import { C } from "@/lib/colors";

const SERVICE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "B2B Lead Generation",
  provider: { "@type": "Organization", name: "TrusVera Group" },
  name: "B2B Lead Generation Services for Technology Companies",
  description:
    "Multi-channel B2B lead generation programs delivering verified, sales-ready contacts across email, LinkedIn, phone, and content syndication.",
  url: "https://www.trusveragroup.com/services/lead-generation",
};

export default function LeadGenerationClient() {
  return (
    <div
      className="lg-page"
      style={{
        fontFamily: "var(--font-inter), sans-serif",
        color: C.textDark,
        background: C.cream100,
        overflowX: "hidden",
      }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SERVICE_JSON_LD) }}
      />
      <NavBar />
      <LeadGenHero />
      <WhatIsLeadGen />
      <CostOfBadLeadGen />
      <LeadGenChannels />
      <CampaignTimeline />
      <LeadGenResults />
      <LeadGenConnects />
      <ContactFormSection defaultService="Lead Generation" />
      <FooterSection />
    </div>
  );
}
