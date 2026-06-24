import type { Metadata } from "next";
import { PageShell } from "@/components/layout/page-shell";
import { EventsHeroSection } from "@/components/sections/events/events-hero-section";
import { EventsListSection } from "@/components/sections/events/events-list-section";
import { getEvents } from "@/lib/content/events";
import { getEventsSettings } from "@/lib/content/events-settings";

export const metadata: Metadata = {
  title: "Events",
  description:
    "From journaling circles to outdoor meditations, Mind Matters Network events are soft landings — judgement-free and free to join.",
};

export default async function EventsPage() {
  const [events, settings] = await Promise.all([
    getEvents(),
    getEventsSettings(),
  ]);

  return (
    <PageShell>
      <div
        className="pointer-events-none absolute -left-32 -top-24 size-[460px] rounded-full bg-coral/25 blur-3xl"
        aria-hidden
      />
      <EventsHeroSection hero={settings.hero} />
      <EventsListSection events={events} />
    </PageShell>
  );
}
