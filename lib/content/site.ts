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

export async function getSiteSettings(): Promise<SiteSettings> {
  const doc = await sanityFetch<Partial<SiteSettings> | null>({
    query,
    tags: ["siteSettings"],
  });
  if (!doc) throw new Error("Missing 'siteSettings' document in Sanity.");

  return {
    title: doc.title ?? "",
    tagline: doc.tagline ?? "",
    joinHref: doc.joinHref ?? "",
    donateHref: doc.donateHref ?? "",
    instagramHandle: doc.instagramHandle ?? "",
    instagramUrl: doc.instagramUrl ?? "",
    newsletterHeadingLead: doc.newsletterHeadingLead ?? "",
    newsletterHeadingEmphasis: doc.newsletterHeadingEmphasis ?? "",
    newsletterText: doc.newsletterText ?? "",
    newsletterPlaceholder: doc.newsletterPlaceholder ?? "",
    newsletterButtonLabel: doc.newsletterButtonLabel ?? "",
    mainNavLinks: doc.mainNavLinks ?? [],
    footerExploreLinks: doc.footerExploreLinks ?? [],
    footerSupportLinks: doc.footerSupportLinks ?? [],
    socials: doc.socials ?? [],
  };
}
