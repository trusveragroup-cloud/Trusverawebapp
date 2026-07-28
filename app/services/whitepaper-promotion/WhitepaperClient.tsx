"use client";

import NavBar from "@/components/sections/NavBar";
import WhitepaperHero from "@/components/sections/WhitepaperHero";
import DistributionProblem from "@/components/sections/DistributionProblem";
import DistributionChannels from "@/components/sections/DistributionChannels";
import LeadQualitySection from "@/components/sections/LeadQualitySection";
import WhitepaperDeliverables from "@/components/sections/WhitepaperDeliverables";
import WhitepaperResults from "@/components/sections/WhitepaperResults";
import WhitepaperConnects from "@/components/sections/WhitepaperConnects";
import ContactFormSection from "@/components/sections/ContactFormSection";
import FooterSection from "@/components/sections/FooterSection";
import { C } from "@/lib/colors";

const SERVICE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "B2B Whitepaper Promotion and Content Syndication",
  provider: { "@type": "Organization", name: "TrusVera Group" },
  name: "B2B Whitepaper Promotion and Content Syndication",
  description:
    "Whitepaper and research report distribution to verified intent-matched technology buyers with qualified lead capture and full contact data delivery.",
  url: "https://www.trusveragroup.com/services/whitepaper-promotion",
};

export default function WhitepaperClient() {
  return (
    <div
      className="wp-page"
      style={{
        fontFamily: "var(--font-inter), sans-serif",
        color: C.textDark,
        background: C.white,
        overflowX: "hidden",
      }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SERVICE_JSON_LD) }}
      />
      <NavBar />
      <WhitepaperHero />
      <DistributionProblem />
      <DistributionChannels />
      <LeadQualitySection />
      <WhitepaperDeliverables />
      <WhitepaperResults />
      <WhitepaperConnects />
      <ContactFormSection defaultService="Whitepaper Promotion" />
      <FooterSection />
    </div>
  );
}
