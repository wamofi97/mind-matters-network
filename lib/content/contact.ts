import { sanityFetch } from "@/sanity/lib/fetch";
import { type PageHero, normalizeHero } from "@/lib/content/page-content";

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

export async function getContactSettings(): Promise<ContactSettings> {
  const doc = await sanityFetch<SanityContact | null>({
    query,
    tags: ["contactSettings"],
  });
  if (!doc) throw new Error("Missing 'contactSettings' document in Sanity.");

  return {
    hero: normalizeHero(doc.hero),
    email: doc.email ?? "",
    phone: doc.phone ?? "",
    addressLines: doc.addressLines ?? [],
    hours: doc.hours ?? "",
    socials: doc.socials ?? [],
  };
}
