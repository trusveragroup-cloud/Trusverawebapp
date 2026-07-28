"use client";

import NavBar from "@/components/sections/NavBar";
import HeroSection from "@/components/sections/HeroSection";
import FunnelStatsBar from "@/components/sections/FunnelStatsBar";
import WhatWeDeliver from "@/components/sections/WhatWeDeliver";
import PartnersSection from "@/components/sections/PartnersSection";
import SolutionsSection from "@/components/sections/SolutionsSection";
import ProcessSection from "@/components/sections/ProcessSection";
import CaseStudySection from "@/components/sections/CaseStudySection";
import BlogSection from "@/components/sections/BlogSection";
import ComplianceSection from "@/components/sections/ComplianceSection";
import ResourcesSection from "@/components/sections/ResourcesSection";
import ContactFormSection from "@/components/sections/ContactFormSection";
import FooterSection from "@/components/sections/FooterSection";

export default function Home() {
  return (
    <div
      style={{
        fontFamily: "var(--font-inter), sans-serif",
        color: "#1A2332",
        background: "#FAF7F2",
        overflowX: "hidden",
      }}
    >
      <NavBar />
      <HeroSection />
      <FunnelStatsBar />
      <WhatWeDeliver />
      <PartnersSection />
      <SolutionsSection />
      <ProcessSection />
      <CaseStudySection />
      <BlogSection />
      <ComplianceSection />
      <ResourcesSection />
      <ContactFormSection />
      <FooterSection />
    </div>
  );
}
