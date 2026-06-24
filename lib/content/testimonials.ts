import type { SanityImageSource } from "@sanity/image-url";

import { communityTestimonials as fallbackTestimonials } from "@/constants/homepage";
import { isSanityConfigured } from "@/sanity/env";
import { sanityFetch } from "@/sanity/lib/fetch";
import { urlForImage } from "@/sanity/lib/image";

export type Testimonial = {
  quote: string;
  name: string;
  meta: string;
  image: string;
  imageAlt: string;
};

const query = `*[_type == "communityTestimonial"] | order(order asc){
  quote, name, meta, image, imageAlt
}`;

type SanityTestimonial = Omit<Testimonial, "image"> & {
  image?: SanityImageSource;
};

function fallback(): Testimonial[] {
  return fallbackTestimonials.map((t) => ({
    quote: t.quote,
    name: t.name,
    meta: t.meta,
    image: t.image,
    imageAlt: t.imageAlt,
  }));
}

export async function getTestimonials(): Promise<Testimonial[]> {
  if (!isSanityConfigured) return fallback();

  const docs = await sanityFetch<SanityTestimonial[] | null>({
    query,
    tags: ["communityTestimonial"],
  });
  if (!docs || !docs.length) return fallback();

  return docs.map((t) => ({
    quote: t.quote,
    name: t.name,
    meta: t.meta,
    image: urlForImage(t.image),
    imageAlt: t.imageAlt ?? t.name,
  }));
}
