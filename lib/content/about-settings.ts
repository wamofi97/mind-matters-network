import {
  storyStats as fallbackStoryStats,
  values as fallbackValues,
} from "@/constants/about";
import { isSanityConfigured } from "@/sanity/env";
import { sanityFetch } from "@/sanity/lib/fetch";
import { getFeatureIconKey } from "@/lib/content/icons";
import {
  type PageHero,
  type SectionHeading,
  mergeHero,
  mergeHeading,
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

const FALLBACK_MISSION =
  "To make mental wellbeing a daily, normal conversation in every young person's life.";
const FALLBACK_VISION =
  "A world where no young person ever feels like they have to struggle alone.";

const FALLBACK_HERO: PageHero = {
  label: "Our story",
  titleLead: "We started with one",
  titleEmphasis: "honest",
  titleSuffix: "conversation",
  description: "",
  paragraphs: [
    "Mind Matters Network began with a simple but powerful idea: young people deserve a voice in mental health. It started in a small classroom, where a few students gathered to share their struggles, support one another, and learn how to advocate for mental well-being. From those early conversations, MMN has grown into a nationwide youth-led movement — a network that brings together students, educators, and mental health advocates across Malaysia.",
    "Our journey has been one of learning, connection, and impact. We’ve developed resources like the Youth Mental Health Handbook, hosted events in schools and universities, and launched initiatives that give young people the tools to lead change in their communities. Through collaboration and action, we’re building a generation that not only cares about mental health, but also knows how to support each other.",
    "At MMN, we believe that real change starts with us — the youth. By working together, we’re breaking the stigma, starting important conversations, and creating spaces where mental health is valued, understood, and prioritized. Our story is still being written, and we invite you to be part of it.",
  ],
};

const FALLBACK_WHY_PARAGRAPHS = [
  "Mind Matters Network is a youth platform that brings together mental health initiatives so that it reaches both schools and university students at ground level. Each participating educational institute will be part of the Mind Matters Network which is a Peer Mental Health Group by integrating the Mind Matters programme in their clubs. The participating institute will be supported by the core committee of the Mind Matters Network in terms of proposed activities, resources, networking and training.",
  "In return, the participating institute may conduct a string of activities, suggestions will be provided in the Mind Matters booklet, to highlight and build mental health resilience and skills among their students.",
  "Students will also have the opportunity to join events at national level where they have the opportunity to speak up, network and champion mental health advocacy in our local community.",
];

function fallback(): AboutSettings {
  return {
    hero: FALLBACK_HERO,
    whyHeading: {
      label: "Why we exist",
      headingLead: "A generation rewriting the rules of",
      headingEmphasis: "care.",
    },
    whyParagraphs: FALLBACK_WHY_PARAGRAPHS,
    teamHeading: {
      label: "The humans",
      headingLead: "Meet the",
      headingEmphasis: "team.",
    },
    valuesHeading: {
      label: "Our values",
      headingLead: "What we",
      headingEmphasis: "stand for.",
    },
    faqHeading: {
      label: "FAQ",
      headingLead: "Things",
      headingEmphasis: "people ask.",
    },
    missionText: FALLBACK_MISSION,
    visionText: FALLBACK_VISION,
    storyStats: fallbackStoryStats.map((s) => ({
      value: s.value,
      label: s.label,
      tone: s.tone,
    })),
    values: fallbackValues.map((v) => ({
      title: v.title,
      description: v.description,
      icon: getFeatureIconKey(v.icon),
      tone: v.tone,
    })),
  };
}

export async function getAboutSettings(): Promise<AboutSettings> {
  if (!isSanityConfigured) return fallback();

  const doc = await sanityFetch<SanityAbout | null>({
    query,
    tags: ["aboutSettings"],
  });
  if (!doc) return fallback();

  const fb = fallback();
  return {
    hero: mergeHero(doc.hero, fb.hero),
    whyHeading: mergeHeading(doc.whyHeading, fb.whyHeading),
    whyParagraphs:
      doc.whyParagraphs && doc.whyParagraphs.length
        ? doc.whyParagraphs
        : fb.whyParagraphs,
    teamHeading: mergeHeading(doc.teamHeading, fb.teamHeading),
    valuesHeading: mergeHeading(doc.valuesHeading, fb.valuesHeading),
    faqHeading: mergeHeading(doc.faqHeading, fb.faqHeading),
    missionText: doc.missionText ?? fb.missionText,
    visionText: doc.visionText ?? fb.visionText,
    storyStats:
      doc.storyStats && doc.storyStats.length ? doc.storyStats : fb.storyStats,
    values: doc.values && doc.values.length ? doc.values : fb.values,
  };
}
