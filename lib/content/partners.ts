import type { StaticImageData } from "next/image";

import { isSanityConfigured } from "@/sanity/env";
import { sanityFetch } from "@/sanity/lib/fetch";

import institutionLogo0 from "@/assets/institutions/Logo.png";
import institutionLogo1 from "@/assets/institutions/Logo-1.png";
import institutionLogo2 from "@/assets/institutions/Logo-2.png";
import institutionLogo3 from "@/assets/institutions/Logo-3.png";
import institutionLogo4 from "@/assets/institutions/Logo-4.png";
import institutionLogo5 from "@/assets/institutions/Logo-5.png";
import institutionLogo6 from "@/assets/institutions/Logo-6.png";
import institutionLogo7 from "@/assets/institutions/Logo-7.png";
import institutionLogo8 from "@/assets/institutions/Logo-8.png";
import institutionLogo9 from "@/assets/institutions/Logo-9.png";
import institutionLogo10 from "@/assets/institutions/Logo-10.png";
import institutionLogo11 from "@/assets/institutions/Logo-11.png";

export type Partner = {
  name: string;
  src: string | StaticImageData;
  width: number;
  height: number;
  href?: string;
};

const fallbackLogos: StaticImageData[] = [
  institutionLogo0,
  institutionLogo1,
  institutionLogo2,
  institutionLogo3,
  institutionLogo4,
  institutionLogo5,
  institutionLogo6,
  institutionLogo7,
  institutionLogo8,
  institutionLogo9,
  institutionLogo10,
  institutionLogo11,
];

const query = `*[_type == "partner"] | order(order asc){
  name,
  href,
  "src": logo.asset->url,
  "width": logo.asset->metadata.dimensions.width,
  "height": logo.asset->metadata.dimensions.height
}`;

type SanityPartner = {
  name: string;
  href?: string;
  src?: string;
  width?: number;
  height?: number;
};

function fallback(): Partner[] {
  return fallbackLogos.map((logo, i) => ({
    name: `Institution ${i + 1}`,
    src: logo,
    width: logo.width,
    height: logo.height,
  }));
}

export async function getPartners(): Promise<Partner[]> {
  if (!isSanityConfigured) return fallback();

  const docs = await sanityFetch<SanityPartner[] | null>({
    query,
    tags: ["partner"],
  });
  if (!docs || !docs.length) return fallback();

  return docs
    .filter((p) => p.src)
    .map((p) => ({
      name: p.name,
      src: p.src as string,
      width: p.width ?? 200,
      height: p.height ?? 80,
      href: p.href,
    }));
}
