import { sanityFetch } from "@/sanity/lib/fetch";
import {
  type PageHero,
  type SectionHeading,
  normalizeHero,
  normalizeHeading,
} from "@/lib/content/page-content";

export type StoryStat = {
  value: string;
  label: string;
  tone: "coral" | "lilac";
};

export type AboutValue = {
  title: string;
  description: string;
  icon: string;
  tone: "coral" | "mint" | "lilac";
};

export type AboutSettings = {
  hero: PageHero;
  whyHeading: SectionHeading;
  whyParagraphs: string[];
  teamHeading: SectionHeading;
  valuesHeading: SectionHeading;
  faqHeading: SectionHeading;
  missionText: string;
  visionText: string;
  storyStats: StoryStat[];
  values: AboutValue[];
};

const query = `*[_type == "aboutSettings"][0]{
  hero, whyHeading, whyParagraphs, teamHeading, valuesHeading, faqHeading,
  missionText, visionText,
  "storyStats": storyStats[]{ value, label, tone },
  "values": values[]{ title, description, icon, tone }
}`;

type SanityAbout = {
  hero?: Partial<PageHero>;
  whyHeading?: Partial<SectionHeading>;
  whyParagraphs?: string[];
  teamHeading?: Partial<SectionHeading>;
  valuesHeading?: Partial<SectionHeading>;
  faqHeading?: Partial<SectionHeading>;
  missionText?: string;
  visionText?: string;
  storyStats?: StoryStat[];
  values?: AboutValue[];
};

export async function getAboutSettings(): Promise<AboutSettings> {
  const doc = await sanityFetch<SanityAbout | null>({
    query,
    tags: ["aboutSettings"],
  });
  if (!doc) throw new Error("Missing 'aboutSettings' document in Sanity.");

  return {
    hero: normalizeHero(doc.hero),
    whyHeading: normalizeHeading(doc.whyHeading),
    whyParagraphs: doc.whyParagraphs ?? [],
    teamHeading: normalizeHeading(doc.teamHeading),
    valuesHeading: normalizeHeading(doc.valuesHeading),
    faqHeading: normalizeHeading(doc.faqHeading),
    missionText: doc.missionText ?? "",
    visionText: doc.visionText ?? "",
    storyStats: doc.storyStats ?? [],
    values: doc.values ?? [],
  };
}
