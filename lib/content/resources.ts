import {
  resources as fallbackResources,
  type ResourceCategory,
  type ResourceTone,
} from "@/constants/resources";
import { isSanityConfigured } from "@/sanity/env";
import { sanityFetch } from "@/sanity/lib/fetch";
import { getResourceIconKey } from "@/lib/content/icons";

/**
 * Serializable resource shape passed from Server to Client Components. `icon` is
 * a string key (mapped to a Lucide component on the client via `getResourceIcon`).
 */
export type ResourceContent = {
  slug: string;
  title: string;
  category: ResourceCategory;
  year: string;
  description: string;
  icon: string;
  tone: ResourceTone;
  href: string;
};

const resourcesQuery = `*[_type == "resource"] | order(year desc, title asc) {
  "slug": slug.current,
  title, category, year, description, icon, tone,
  "fileUrl": file.asset->url,
  externalUrl
}`;

type SanityResource = Omit<ResourceContent, "href"> & {
  fileUrl?: string;
  externalUrl?: string;
};

function mapResource(doc: SanityResource): ResourceContent {
  const { fileUrl, externalUrl, ...rest } = doc;
  return {
    ...rest,
    href: fileUrl || externalUrl || `/resources/${doc.slug}`,
  };
}

export async function getResources(): Promise<ResourceContent[]> {
  if (!isSanityConfigured) return mapFallback();

  const docs = await sanityFetch<SanityResource[]>({
    query: resourcesQuery,
    tags: ["resource"],
  });

  if (!docs || docs.length === 0) return mapFallback();
  return docs.map(mapResource);
}

function mapFallback(): ResourceContent[] {
  return fallbackResources.map((r) => ({
    slug: r.slug,
    title: r.title,
    category: r.category,
    year: r.year,
    description: r.description,
    icon: getResourceIconKey(r.icon),
    tone: r.tone,
    href: r.href,
  }));
}
