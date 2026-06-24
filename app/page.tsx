import { PageShell } from "@/components/layout/page-shell";
import { HeroSection } from "@/components/sections/home/hero-section";
import { StatsSection } from "@/components/sections/home/stats-section";
import { TestimonialSection } from "@/components/sections/home/testimonial-section";
import { PartnersSection } from "@/components/sections/home/partners-section";
import { EventsSection } from "@/components/sections/home/events-section";
import { ResourcesSection } from "@/components/sections/home/resources-section";
import { CtaBannerSection } from "@/components/sections/home/cta-banner-section";
import { InstagramSection } from "@/components/sections/home/instagram-section";
import {
  getHomeSettings,
  getHomeEvents,
  getHomeResources,
} from "@/lib/content/home";
import { getTestimonials } from "@/lib/content/testimonials";
import { getPartners } from "@/lib/content/partners";

export default async function HomePage() {
  const [home, events, resources, testimonials, partners] = await Promise.all([
    getHomeSettings(),
    getHomeEvents(),
    getHomeResources(),
    getTestimonials(),
    getPartners(),
  ]);

  return (
    <PageShell>
      <HeroSection hero={home.hero} />
      <StatsSection stats={home.stats} />
      <TestimonialSection
        heading={home.testimonialHeading}
        testimonials={testimonials}
      />
      <PartnersSection heading={home.partnersHeading} partners={partners} />
      <EventsSection events={events} heading={home.eventsHeading} />
      <ResourcesSection
        resources={resources}
        heading={home.resourcesHeading}
      />
      <CtaBannerSection />
      <InstagramSection heading={home.instagramHeading} />
    </PageShell>
  );
}
