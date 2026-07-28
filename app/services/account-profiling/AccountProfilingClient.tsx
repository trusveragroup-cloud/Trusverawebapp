"use client";

import NavBar from "@/components/sections/NavBar";
import AccountProfilingHero from "@/components/sections/AccountProfilingHero";
import WhatIsAccountProfiling from "@/components/sections/WhatIsAccountProfiling";
import ProfileLayersSection from "@/components/sections/ProfileLayersSection";
import BuyingCommitteeSection from "@/components/sections/BuyingCommitteeSection";
import ProfilingEngineSection from "@/components/sections/ProfilingEngineSection";
import WhyProfilingMatters from "@/components/sections/WhyProfilingMatters";
import ProfilingConnects from "@/components/sections/ProfilingConnects";
import ContactFormSection from "@/components/sections/ContactFormSection";
import FooterSection from "@/components/sections/FooterSection";
import { C } from "@/lib/colors";

const SERVICE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "B2B Account Profiling",
  provider: { "@type": "Organization", name: "TrusVera Group" },
  name: "B2B Account Profiling Services",
  description: "Build deep intelligence on every target account before your first outreach.",
  url: "https://www.trusveragroup.com/services/account-profiling",
};

export default function AccountProfilingClient() {
  return (
    <div
      className="id-page"
      style={{ fontFamily: "var(--font-inter), sans-serif", color: C.textDark, background: C.cream100, overflowX: "hidden" }}
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SERVICE_JSON_LD) }} />
      <NavBar />
      <AccountProfilingHero />
      <WhatIsAccountProfiling />
      <ProfileLayersSection />
      <BuyingCommitteeSection />
      <ProfilingEngineSection />
      <WhyProfilingMatters />
      <ProfilingConnects />
      <ContactFormSection defaultService="Account Profiling" />
      <FooterSection />
    </div>
  );
}
