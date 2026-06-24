import type { Metadata } from "next";
import { PageShell } from "@/components/layout/page-shell";
import { ResourcesHeroSection } from "@/components/sections/resources/resources-hero-section";
import { FeaturedResourceSection } from "@/components/sections/resources/featured-resource-section";
import { ResourcesListSection } from "@/components/sections/resources/resources-list-section";
import { getResources } from "@/lib/content/resources";
import { getResourcesSettings } from "@/lib/content/resources-settings";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Free, youth-made mental health guides, toolkits, and infographics — reviewed by professionals and free to download, share, and remix.",
};

export default async function ResourcesPage() {
  const [resources, settings] = await Promise.all([
    getResources(),
    getResourcesSettings(),
  ]);

  return (
    <PageShell>
       <div
        className="pointer-events-none absolute -right-32 -top-10 size-[460px] rounded-full bg-butter/40 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-32 top-1/2 size-72 rounded-full bg-lilac-soft/70 blur-3xl"
        aria-hidden
      />
      <ResourcesHeroSection hero={settings.hero} />
      <FeaturedResourceSection />
      <ResourcesListSection resources={resources} />
    </PageShell>
  );
}
