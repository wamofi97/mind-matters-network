import type { SanityImageSource } from "@sanity/image-url";

import { sanityFetch } from "@/sanity/lib/fetch";
import { urlForImage } from "@/sanity/lib/image";
import { getEvents } from "@/lib/content/events";
import { getResources } from "@/lib/content/resources";
import {
  type SectionHeading,
  normalizeHeading,
} from "@/lib/content/page-content";

export type { SectionHeading } from "@/lib/content/page-content";

export type HeroContent = {
  eyebrow: string;
  titlePrefix: string;
  titleHighlight: string;
  titleSuffix: string;
  description: string;
  image: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
  badgePrimary: string;
  badgeSecondary: string;
  socialProofCount: string;
  socialProofText: string;
  communityAvatars: string[];
};

export type HomeStat = {
  value: string;
  label: string;
  tone: "coral" | "butter" | "mint" | "lilac";
  icon: string;
};

export type HomeSettings = {
  hero: HeroContent;
  stats: HomeStat[];
  eventsHeading: SectionHeading;
  resourcesHeading: SectionHeading;
  testimonialHeading: SectionHeading;
  partnersHeading: SectionHeading;
  instagramHeading: SectionHeading;
};

const query = `*[_type == "homeSettings"][0]{
  heroEyebrow, heroTitlePrefix, heroTitleHighlight, heroTitleSuffix,
  heroDescription, heroImage,
  heroPrimaryCtaLabel, heroPrimaryCtaHref,
  heroSecondaryCtaLabel, heroSecondaryCtaHref,
  heroBadgePrimary, heroBadgeSecondary,
  heroSocialProofCount, heroSocialProofText,
  communityAvatars,
  eventsLabel, eventsHeadingLead, eventsHeadingEmphasis,
  resourcesLabel, resourcesHeadingLead, resourcesHeadingEmphasis,
  testimonialHeading, partnersHeading, instagramHeading,
  "stats": stats[]{ value, label, tone, icon }
}`;

type SanityHome = {
  heroEyebrow?: string;
  heroTitlePrefix?: string;
  heroTitleHighlight?: string;
  heroTitleSuffix?: string;
  heroDescription?: string;
  heroImage?: SanityImageSource;
  heroPrimaryCtaLabel?: string;
  heroPrimaryCtaHref?: string;
  heroSecondaryCtaLabel?: string;
  heroSecondaryCtaHref?: string;
  heroBadgePrimary?: string;
  heroBadgeSecondary?: string;
  heroSocialProofCount?: string;
  heroSocialProofText?: string;
  communityAvatars?: SanityImageSource[];
  eventsLabel?: string;
  eventsHeadingLead?: string;
  eventsHeadingEmphasis?: string;
  resourcesLabel?: string;
  resourcesHeadingLead?: string;
  resourcesHeadingEmphasis?: string;
  testimonialHeading?: Partial<SectionHeading>;
  partnersHeading?: Partial<SectionHeading>;
  instagramHeading?: Partial<SectionHeading>;
  stats?: HomeStat[];
};

export async function getHomeSettings(): Promise<HomeSettings> {
  const doc = await sanityFetch<SanityHome | null>({
    query,
    tags: ["homeSettings"],
  });
  if (!doc) throw new Error("Missing 'homeSettings' document in Sanity.");

  const communityAvatars = (doc.communityAvatars ?? [])
    .map((a) => urlForImage(a))
    .filter(Boolean);

  return {
    hero: {
      eyebrow: doc.heroEyebrow ?? "",
      titlePrefix: doc.heroTitlePrefix ?? "",
      titleHighlight: doc.heroTitleHighlight ?? "",
      titleSuffix: doc.heroTitleSuffix ?? "",
      description: doc.heroDescription ?? "",
      image: urlForImage(doc.heroImage),
      primaryCtaLabel: doc.heroPrimaryCtaLabel ?? "",
      primaryCtaHref: doc.heroPrimaryCtaHref ?? "",
      secondaryCtaLabel: doc.heroSecondaryCtaLabel ?? "",
      secondaryCtaHref: doc.heroSecondaryCtaHref ?? "",
      badgePrimary: doc.heroBadgePrimary ?? "",
      badgeSecondary: doc.heroBadgeSecondary ?? "",
      socialProofCount: doc.heroSocialProofCount ?? "",
      socialProofText: doc.heroSocialProofText ?? "",
      communityAvatars,
    },
    stats: doc.stats ?? [],
    eventsHeading: {
      label: doc.eventsLabel ?? "",
      headingLead: doc.eventsHeadingLead ?? "",
      headingEmphasis: doc.eventsHeadingEmphasis ?? "",
    },
    resourcesHeading: {
      label: doc.resourcesLabel ?? "",
      headingLead: doc.resourcesHeadingLead ?? "",
      headingEmphasis: doc.resourcesHeadingEmphasis ?? "",
    },
    testimonialHeading: normalizeHeading(doc.testimonialHeading),
    partnersHeading: normalizeHeading(doc.partnersHeading),
    instagramHeading: normalizeHeading(doc.instagramHeading),
  };
}

export type HomeEventTeaser = {
  title: string;
  category: string;
  date: string;
  image: string;
  href: string;
};

export type HomeResourceTeaser = {
  title: string;
  description: string;
  icon: string;
  tone: "butter" | "coral" | "mint" | "lilac";
  /** Undefined when no file has been uploaded and no external URL is set. */
  href?: string;
};

function titleCaseMonth(month: string): string {
  if (!month) return month;
  return month.charAt(0).toUpperCase() + month.slice(1).toLowerCase();
}

/** Upcoming events for the homepage teaser, pulled from the Events collection. */
export async function getHomeEvents(limit = 3): Promise<HomeEventTeaser[]> {
  const events = await getEvents();
  const upcoming = events.filter((e) => e.status === "upcoming");
  const source = upcoming.length ? upcoming : events;
  return source.slice(0, limit).map((e) => ({
    title: e.title,
    category: e.category,
    date: `${titleCaseMonth(e.month)} ${e.day}`,
    image: e.image,
    href: e.href,
  }));
}

/** Featured resources for the homepage teaser, from the Resources collection. */
export async function getHomeResources(
  limit = 3
): Promise<HomeResourceTeaser[]> {
  const resources = await getResources();
  return resources.slice(0, limit).map((r) => ({
    title: r.title,
    description: r.description,
    icon: r.icon,
    tone: r.tone,
    href: r.href,
  }));
}
