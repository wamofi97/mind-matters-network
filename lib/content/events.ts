import type { SanityImageSource } from "@sanity/image-url";

import { events as fallbackEvents, type EventItem } from "@/constants/events";
import { isSanityConfigured } from "@/sanity/env";
import { sanityFetch } from "@/sanity/lib/fetch";
import { urlForImage } from "@/sanity/lib/image";

const eventsQuery = `*[_type == "event"] | order(status desc, dateLabel asc) {
  "slug": slug.current,
  title, category, tone, day, month, description, status,
  image,
  "detail": {
    summary, dateLabel, duration, host, location,
    whoFor, whatYouGet,
    "agenda": agenda[]{ time, title, description },
    "facilitators": facilitators[]{ name, role, bio, avatar },
    gallery,
    "testimonials": testimonials[]{ quote, author }
  }
}`;

type SanityImage = SanityImageSource | undefined | null;

type SanityEvent = Omit<EventItem, "image" | "href" | "detail"> & {
  image?: SanityImage;
  detail: Omit<EventItem["detail"], "gallery" | "facilitators"> & {
    gallery?: SanityImage[];
    facilitators?: Array<
      Omit<EventItem["detail"]["facilitators"][number], "avatar"> & {
        avatar?: SanityImage;
      }
    >;
  };
};

function mapEvent(doc: SanityEvent): EventItem {
  return {
    ...doc,
    image: urlForImage(doc.image),
    href: `/events/${doc.slug}`,
    detail: {
      ...doc.detail,
      gallery: (doc.detail.gallery ?? []).map((img) => urlForImage(img)),
      facilitators: (doc.detail.facilitators ?? []).map((f) => ({
        ...f,
        avatar: urlForImage(f.avatar),
      })),
    },
  };
}

export async function getEvents(): Promise<EventItem[]> {
  if (!isSanityConfigured) return fallbackEvents;

  const docs = await sanityFetch<SanityEvent[]>({
    query: eventsQuery,
    tags: ["event"],
  });

  if (!docs || docs.length === 0) return fallbackEvents;
  return docs.map(mapEvent);
}

export async function getEvent(slug: string): Promise<EventItem | undefined> {
  const events = await getEvents();
  return events.find((event) => event.slug === slug);
}

export async function getRelatedEvents(
  slug: string,
  count = 3
): Promise<EventItem[]> {
  const events = await getEvents();
  return events.filter((event) => event.slug !== slug).slice(0, count);
}
