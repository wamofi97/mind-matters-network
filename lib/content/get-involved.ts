import type { SanityImageSource } from "@sanity/image-url";

import { sanityFetch } from "@/sanity/lib/fetch";
import { urlForImage } from "@/sanity/lib/image";
import {
  type PageHero,
  type SectionHeading,
  normalizeHero,
  normalizeHeading,
} from "@/lib/content/page-content";

export type InvolvementPath = {
  id: string;
  emoji: string;
  title: string;
  description: string;
  perks: string[];
  tone: "coral" | "butter" | "mint";
};

export type VolunteerVoice = {
  quote: string;
  name: string;
  role: string;
  image: string;
  tone: "butter" | "mint" | "coral";
};

export type GetInvolvedSettings = {
  hero: PageHero;
  voicesHeading: SectionHeading;
  paths: InvolvementPath[];
  voices: VolunteerVoice[];
};

const query = `*[_type == "getInvolvedSettings"][0]{
  hero, voicesHeading,
  "paths": paths[]{ "id": key.current, emoji, title, description, perks, tone },
  "voices": voices[]{ quote, name, role, image, tone }
}`;

type SanityGetInvolved = {
  hero?: Partial<PageHero>;
  voicesHeading?: Partial<SectionHeading>;
  paths?: InvolvementPath[];
  voices?: Array<Omit<VolunteerVoice, "image"> & { image?: SanityImageSource }>;
};

export async function getGetInvolvedSettings(): Promise<GetInvolvedSettings> {
  const doc = await sanityFetch<SanityGetInvolved | null>({
    query,
    tags: ["getInvolvedSettings"],
  });
  if (!doc) throw new Error("Missing 'getInvolvedSettings' document in Sanity.");

  const voices = (doc.voices ?? []).map((v) => ({
    quote: v.quote,
    name: v.name,
    role: v.role,
    tone: v.tone,
    image: urlForImage(v.image),
  }));

  return {
    hero: normalizeHero(doc.hero),
    voicesHeading: normalizeHeading(doc.voicesHeading),
    paths: doc.paths ?? [],
    voices,
  };
}
