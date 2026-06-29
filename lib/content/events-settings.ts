import { sanityFetch } from "@/sanity/lib/fetch";
import { type PageHero, normalizeHero } from "@/lib/content/page-content";

export type EventsSettings = {
  hero: PageHero;
};

const query = `*[_type == "eventsSettings"][0]{ hero }`;

export async function getEventsSettings(): Promise<EventsSettings> {
  const doc = await sanityFetch<{ hero?: Partial<PageHero> } | null>({
    query,
    tags: ["eventsSettings"],
  });
  if (!doc) throw new Error("Missing 'eventsSettings' document in Sanity.");

  return { hero: normalizeHero(doc.hero) };
}
