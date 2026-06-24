import { mainNavLinks, siteConfig } from "@/constants/navigation";
import { isSanityConfigured } from "@/sanity/env";
import { sanityFetch } from "@/sanity/lib/fetch";

export type NavLink = { label: string; href: string };
export type SiteSocial = { label: string; icon: string; href: string };

export type SiteSettings = {
  title: string;
  tagline: string;
  joinHref: string;
  donateHref: string;
  instagramHandle: string;
  instagramUrl: string;
  mainNavLinks: NavLink[];
  footerExploreLinks: NavLink[];
  footerSupportLinks: NavLink[];
  socials: SiteSocial[];
  newsletterHeadingLead: string;
  newsletterHeadingEmphasis: string;
  newsletterText: string;
  newsletterPlaceholder: string;
  newsletterButtonLabel: string;
};

const query = `*[_type == "siteSettings"][0]{
  title, tagline, joinHref, donateHref, instagramHandle, instagramUrl,
  newsletterHeadingLead, newsletterHeadingEmphasis, newsletterText,
  newsletterPlaceholder, newsletterButtonLabel,
  "mainNavLinks": mainNavLinks[]{ label, href },
  "footerExploreLinks": footerExploreLinks[]{ label, href },
  "footerSupportLinks": footerSupportLinks[]{ label, href },
  "socials": socials[]{ label, icon, href }
}`;

// Mirrors the current hardcoded footer (`components/layout/footer.tsx`).
const FALLBACK: SiteSettings = {
  title: siteConfig.name,
  tagline: "A youth-led mental health movement 🌱",
  joinHref: siteConfig.joinHref,
  donateHref: siteConfig.donateHref,
  instagramHandle: siteConfig.instagram,
  instagramUrl: siteConfig.instagramUrl,
  mainNavLinks: [...mainNavLinks],
  footerExploreLinks: [
    { label: "About", href: "/about" },
    { label: "Events", href: "/events" },
    { label: "Resources", href: "/resources" },
    { label: "Get Involved", href: "/get-involved" },
  ],
  footerSupportLinks: [
    { label: "Contact", href: "/contact" },
    { label: "Crisis lines", href: "/crisis-help" },
    { label: "FAQ", href: "/faq" },
    { label: "Privacy", href: "/privacy" },
  ],
  socials: [
    { label: "Instagram", icon: "instagram", href: siteConfig.instagramUrl },
    { label: "LinkedIn", icon: "linkedin", href: "https://linkedin.com" },
    { label: "Facebook", icon: "facebook", href: "https://facebook.com" },
    { label: "Twitter", icon: "twitter", href: "https://twitter.com" },
  ],
  newsletterHeadingLead: "Get a little goodness",
  newsletterHeadingEmphasis: "in your box.",
  newsletterText:
    "Monthly stories, free toolkits, gentle reminders that you're not alone.",
  newsletterPlaceholder: "you@kind.email",
  newsletterButtonLabel: "Subscribe",
};

export async function getSiteSettings(): Promise<SiteSettings> {
  if (!isSanityConfigured) return FALLBACK;

  const doc = await sanityFetch<Partial<SiteSettings> | null>({
    query,
    tags: ["siteSettings"],
  });
  if (!doc) return FALLBACK;

  const nonEmpty = <T,>(arr: T[] | undefined, fb: T[]) =>
    arr && arr.length ? arr : fb;

  return {
    title: doc.title ?? FALLBACK.title,
    tagline: doc.tagline ?? FALLBACK.tagline,
    joinHref: doc.joinHref ?? FALLBACK.joinHref,
    donateHref: doc.donateHref ?? FALLBACK.donateHref,
    instagramHandle: doc.instagramHandle ?? FALLBACK.instagramHandle,
    instagramUrl: doc.instagramUrl ?? FALLBACK.instagramUrl,
    newsletterHeadingLead:
      doc.newsletterHeadingLead ?? FALLBACK.newsletterHeadingLead,
    newsletterHeadingEmphasis:
      doc.newsletterHeadingEmphasis ?? FALLBACK.newsletterHeadingEmphasis,
    newsletterText: doc.newsletterText ?? FALLBACK.newsletterText,
    newsletterPlaceholder:
      doc.newsletterPlaceholder ?? FALLBACK.newsletterPlaceholder,
    newsletterButtonLabel:
      doc.newsletterButtonLabel ?? FALLBACK.newsletterButtonLabel,
    mainNavLinks: nonEmpty(doc.mainNavLinks, FALLBACK.mainNavLinks),
    footerExploreLinks: nonEmpty(
      doc.footerExploreLinks,
      FALLBACK.footerExploreLinks
    ),
    footerSupportLinks: nonEmpty(
      doc.footerSupportLinks,
      FALLBACK.footerSupportLinks
    ),
    socials: nonEmpty(doc.socials, FALLBACK.socials),
  };
}
