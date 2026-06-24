import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/page-shell";
import { EventDetailHero } from "@/components/sections/events/detail/event-detail-hero";
import { EventDetailBody } from "@/components/sections/events/detail/event-detail-body";
import { EventCtaBanner } from "@/components/sections/events/detail/event-cta-banner";
import { EventRelated } from "@/components/sections/events/detail/event-related";
import { getEvent, getEvents, getRelatedEvents } from "@/lib/content/events";

type EventPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const events = await getEvents();
  return events.map((event) => ({ slug: event.slug }));
}

export async function generateMetadata({
  params,
}: EventPageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEvent(slug);

  if (!event) {
    return { title: "Event not found" };
  }

  return {
    title: event.title,
    description: event.detail.summary,
  };
}

export default async function EventPage({ params }: EventPageProps) {
  const { slug } = await params;
  const event = await getEvent(slug);

  if (!event) {
    notFound();
  }

  const related = await getRelatedEvents(slug);

  return (
    <PageShell>
      <EventDetailHero event={event} />
      <EventDetailBody event={event} />
      <EventCtaBanner event={event} />
      <EventRelated events={related} />
    </PageShell>
  );
}
