import { PageShell } from "@/components/layout/page-shell";
import { HeroSection } from "@/components/sections/home/hero-section";
import { StatsSection } from "@/components/sections/home/stats-section";
import { TestimonialSection } from "@/components/sections/home/testimonial-section";
import { PartnersSection } from "@/components/sections/home/partners-section";
import { EventsSection } from "@/components/sections/home/events-section";
import { ResourcesSection } from "@/components/sections/home/resources-section";
import { CtaBannerSection } from "@/components/sections/home/cta-banner-section";
import { InstagramSection } from "@/components/sections/home/instagram-section";

export default function HomePage() {
  return (
    <PageShell>
      <HeroSection />
      <StatsSection />
      <TestimonialSection />
      <PartnersSection />
      <EventsSection />
      <ResourcesSection />
      <CtaBannerSection />
      <InstagramSection />
    </PageShell>
  );
}
