import { sanityFetch } from "@/sanity/lib/fetch";
import { type PageHero, normalizeHero } from "@/lib/content/page-content";

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
  featured{
    tag,
    title,
    description,
    icon,
    "fileUrl": file.asset->url,
    externalUrl
  }
}`;

type SanityFeatured = Partial<Omit<FeaturedResource, "href">> & {
  fileUrl?: string;
  externalUrl?: string;
};

type SanityResourcesSettings = {
  hero?: Partial<PageHero>;
  featured?: SanityFeatured;
};

export async function getResourcesSettings(): Promise<ResourcesSettings> {
  const doc = await sanityFetch<SanityResourcesSettings | null>({
    query,
    tags: ["resourcesSettings"],
  });
  if (!doc) throw new Error("Missing 'resourcesSettings' document in Sanity.");

  return {
    hero: normalizeHero(doc.hero),
    featured: {
      tag: doc.featured?.tag ?? "",
      title: doc.featured?.title ?? "",
      description: doc.featured?.description ?? "",
      href: doc.featured?.fileUrl || doc.featured?.externalUrl || undefined,
      icon: doc.featured?.icon ?? "",
    },
  };
}
