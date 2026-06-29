import { sanityFetch } from "@/sanity/lib/fetch";

export type Partner = {
  name: string;
  src: string;
  width: number;
  height: number;
  href?: string;
};

const query = `*[_type == "partner"] | order(order asc){
  name,
  href,
  "src": logo.asset->url,
  "width": logo.asset->metadata.dimensions.width,
  "height": logo.asset->metadata.dimensions.height
}`;

type SanityPartner = {
  name: string;
  href?: string;
  src?: string;
  width?: number;
  height?: number;
};

export async function getPartners(): Promise<Partner[]> {
  const docs = await sanityFetch<SanityPartner[] | null>({
    query,
    tags: ["partner"],
  });
  if (!docs) return [];

  return docs
    .filter((p) => p.src)
    .map((p) => ({
      name: p.name,
      src: p.src as string,
      width: p.width ?? 200,
      height: p.height ?? 80,
      href: p.href,
    }));
}
