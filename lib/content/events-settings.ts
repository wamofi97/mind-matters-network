import { isSanityConfigured } from "@/sanity/env";
import { sanityFetch } from "@/sanity/lib/fetch";
import { type PageHero, mergeHero } from "@/lib/content/page-content";

export type EventsSettings = {
  hero: PageHero;
};

const query = `*[_type == "eventsSettings"][0]{ hero }`;

const FALLBACK_HERO: PageHero = {
  label: "Events",
  titleLead: "Come as you are.",
  titleEmphasis: "Leave a little lighter.",
  titleSuffix: "",
  description:
    "From journaling circles to outdoor meditations, our events are made to be soft landings — judgement-free, free to join.",
  paragraphs: [],
};

export async function getEventsSettings(): Promise<EventsSettings> {
  if (!isSanityConfigured) return { hero: FALLBACK_HERO };

  const doc = await sanityFetch<{ hero?: Partial<PageHero> } | null>({
    query,
    tags: ["eventsSettings"],
  });

  return { hero: mergeHero(doc?.hero, FALLBACK_HERO) };
}
