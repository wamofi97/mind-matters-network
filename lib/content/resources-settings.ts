import { featuredResource as fallbackFeatured } from "@/constants/resources";
import { isSanityConfigured } from "@/sanity/env";
import { sanityFetch } from "@/sanity/lib/fetch";
import { type PageHero, mergeHero } from "@/lib/content/page-content";
import { getResourceIconKey } from "@/lib/content/icons";

export type FeaturedResource = {
  tag: string;
  title: string;
  description: string;
  /** Undefined when no file has been uploaded and no external URL is set. */
  href?: string;
  icon: string;
};

export type ResourcesSettings = {
  hero: PageHero;
  featured: FeaturedResource;
};

const query = `*[_type == "resourcesSettings"][0]{
  hero,
  featured
}`;

const FALLBACK_HERO: PageHero = {
  label: "Free resources",
  titleLead: "Tools, words &",
  titleEmphasis: "small comforts.",
  titleSuffix: "",
  description:
    "Designed by youth, reviewed by professionals — every resource is free to download, share and remix.",
  paragraphs: [],
};

const FALLBACK_FEATURED: FeaturedResource = {
  tag: fallbackFeatured.tag,
  title: fallbackFeatured.title,
  description: fallbackFeatured.description,
  href: fallbackFeatured.href,
  icon: getResourceIconKey(fallbackFeatured.icon),
};

type SanityResourcesSettings = {
  hero?: Partial<PageHero>;
  featured?: Partial<FeaturedResource>;
};

export async function getResourcesSettings(): Promise<ResourcesSettings> {
  if (!isSanityConfigured) {
    return { hero: FALLBACK_HERO, featured: FALLBACK_FEATURED };
  }

  const doc = await sanityFetch<SanityResourcesSettings | null>({
    query,
    tags: ["resourcesSettings"],
  });

  return {
    hero: mergeHero(doc?.hero, FALLBACK_HERO),
    featured: {
      tag: doc?.featured?.tag ?? FALLBACK_FEATURED.tag,
      title: doc?.featured?.title ?? FALLBACK_FEATURED.title,
      description: doc?.featured?.description ?? FALLBACK_FEATURED.description,
      href: doc?.featured?.href || undefined,
      icon: doc?.featured?.icon ?? FALLBACK_FEATURED.icon,
    },
  };
}
