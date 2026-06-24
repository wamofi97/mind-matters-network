import {
  contactDetails as fallbackDetails,
  contactSocials as fallbackSocials,
} from "@/constants/contact";
import { isSanityConfigured } from "@/sanity/env";
import { sanityFetch } from "@/sanity/lib/fetch";
import { getSocialIconKey } from "@/lib/content/icons";
import { type PageHero, mergeHero } from "@/lib/content/page-content";

export type SocialLink = {
  label: string;
  icon: string;
  href: string;
};

export type ContactSettings = {
  hero: PageHero;
  email: string;
  phone: string;
  addressLines: string[];
  hours: string;
  socials: SocialLink[];
};

const query = `*[_type == "contactSettings"][0]{
  hero, email, phone, addressLines, hours,
  "socials": socials[]{ label, icon, href }
}`;

type SanityContact = {
  hero?: Partial<PageHero>;
  email?: string;
  phone?: string;
  addressLines?: string[];
  hours?: string;
  socials?: SocialLink[];
};

const FALLBACK_HERO: PageHero = {
  label: "Say hi",
  titleLead: "Let's",
  titleEmphasis: "talk.",
  titleSuffix: "",
  description:
    "Whether you're a young person looking for community, a partner, or just a curious soul — drop us a line.",
  paragraphs: [],
};

function fallback(): ContactSettings {
  return {
    hero: FALLBACK_HERO,
    email: fallbackDetails.email,
    phone: fallbackDetails.phone,
    addressLines: [...fallbackDetails.addressLines],
    hours: fallbackDetails.hours,
    socials: fallbackSocials.map((s) => ({
      label: s.label,
      icon: getSocialIconKey(s.icon),
      href: s.href,
    })),
  };
}

export async function getContactSettings(): Promise<ContactSettings> {
  if (!isSanityConfigured) return fallback();

  const doc = await sanityFetch<SanityContact | null>({
    query,
    tags: ["contactSettings"],
  });
  if (!doc) return fallback();

  const fb = fallback();
  return {
    hero: mergeHero(doc.hero, fb.hero),
    email: doc.email ?? fb.email,
    phone: doc.phone ?? fb.phone,
    addressLines:
      doc.addressLines && doc.addressLines.length
        ? doc.addressLines
        : fb.addressLines,
    hours: doc.hours ?? fb.hours,
    socials: doc.socials && doc.socials.length ? doc.socials : fb.socials,
  };
}
