import type { Metadata } from "next";
import { PageShell } from "@/components/layout/page-shell";
import { AboutHeroSection } from "@/components/sections/about/about-hero-section";
import { WhySection } from "@/components/sections/about/why-section";
import { MissionVisionSection } from "@/components/sections/about/mission-vision-section";
import { ValuesSection } from "@/components/sections/about/values-section";
import { TeamSection } from "@/components/sections/about/team-section";
import { FaqSection } from "@/components/sections/about/faq-section";

export const metadata: Metadata = {
  title: "About",
  description:
    "Mind Matters Network is a youth-led movement rewriting the rules of care — meet the team and the mission behind it.",
};

export default function AboutPage() {
  return (
    <PageShell>
       <div
        className="pointer-events-none absolute -right-40 top-10 size-[460px] rounded-full bg-butter/40 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-32 top-1/2 size-72 rounded-full bg-lilac-soft/70 blur-3xl"
        aria-hidden
      />
      <AboutHeroSection />
      <WhySection />
      <MissionVisionSection />
      <ValuesSection />
      <TeamSection />
      <FaqSection />
    </PageShell>
  );
}
