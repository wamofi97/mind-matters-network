import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/page-shell";
import { EventDetailHero } from "@/components/sections/events/detail/event-detail-hero";
import { EventDetailBody } from "@/components/sections/events/detail/event-detail-body";
import { EventCtaBanner } from "@/components/sections/events/detail/event-cta-banner";
import { EventRelated } from "@/components/sections/events/detail/event-related";
import { events, getEventBySlug, getRelatedEvents } from "@/constants/events";

type EventPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return events.map((event) => ({ slug: event.slug }));
}

export async function generateMetadata({
  params,
}: EventPageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = getEventBySlug(slug);

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
  const event = getEventBySlug(slug);

  if (!event) {
    notFound();
  }

  const related = getRelatedEvents(slug);

  return (
    <PageShell>
      <EventDetailHero event={event} />
      <EventDetailBody event={event} />
      <EventCtaBanner event={event} />
      <EventRelated events={related} />
    </PageShell>
  );
}
