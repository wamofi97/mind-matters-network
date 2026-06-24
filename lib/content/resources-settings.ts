import { isSanityConfigured } from "@/sanity/env";
import { sanityFetch } from "@/sanity/lib/fetch";
import { type PageHero, mergeHero } from "@/lib/content/page-content";

export type ResourcesSettings = {
  hero: PageHero;
};

const query = `*[_type == "resourcesSettings"][0]{ hero }`;

const FALLBACK_HERO: PageHero = {
  label: "Free resources",
  titleLead: "Tools, words &",
  titleEmphasis: "small comforts.",
  titleSuffix: "",
  description:
    "Designed by youth, reviewed by professionals — every resource is free to download, share and remix.",
  paragraphs: [],
};

export async function getResourcesSettings(): Promise<ResourcesSettings> {
  if (!isSanityConfigured) return { hero: FALLBACK_HERO };

  const doc = await sanityFetch<{ hero?: Partial<PageHero> } | null>({
    query,
    tags: ["resourcesSettings"],
  });

  return { hero: mergeHero(doc?.hero, FALLBACK_HERO) };
}
