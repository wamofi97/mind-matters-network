import type { SanityImageSource } from "@sanity/image-url";

import {
  involvementPaths as fallbackPaths,
  volunteerVoices as fallbackVoices,
} from "@/constants/get-involved";
import { isSanityConfigured } from "@/sanity/env";
import { sanityFetch } from "@/sanity/lib/fetch";
import { urlForImage } from "@/sanity/lib/image";
import {
  type PageHero,
  type SectionHeading,
  mergeHero,
  mergeHeading,
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

const FALLBACK_HERO: PageHero = {
  label: "Get involved",
  titleLead: "Be the friend you",
  titleEmphasis: "wish you'd had.",
  titleSuffix: "",
  description:
    "Pick a path below. Whatever your time, skill, or geography — there's a way to plug in.",
  paragraphs: [],
};

function fallback(): GetInvolvedSettings {
  return {
    hero: FALLBACK_HERO,
    voicesHeading: {
      label: "From our volunteers",
      headingLead: "Why people",
      headingEmphasis: "stick around.",
    },
    paths: fallbackPaths.map((p) => ({
      id: p.id,
      emoji: p.emoji,
      title: p.title,
      description: p.description,
      perks: p.perks,
      tone: p.tone,
    })),
    voices: fallbackVoices.map((v) => ({
      quote: v.quote,
      name: v.name,
      role: v.role,
      image: v.image,
      tone: v.tone,
    })),
  };
}

export async function getGetInvolvedSettings(): Promise<GetInvolvedSettings> {
  if (!isSanityConfigured) return fallback();

  const doc = await sanityFetch<SanityGetInvolved | null>({
    query,
    tags: ["getInvolvedSettings"],
  });
  if (!doc) return fallback();

  const fb = fallback();
  const paths = doc.paths && doc.paths.length ? doc.paths : fb.paths;
  const voices =
    doc.voices && doc.voices.length
      ? doc.voices.map((v) => ({
          quote: v.quote,
          name: v.name,
          role: v.role,
          tone: v.tone,
          image: urlForImage(v.image),
        }))
      : fb.voices;

  return {
    hero: mergeHero(doc.hero, fb.hero),
    voicesHeading: mergeHeading(doc.voicesHeading, fb.voicesHeading),
    paths,
    voices,
  };
}
