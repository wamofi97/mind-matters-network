/**
 * Shared shapes for editable page chrome (hero + section headings) and helpers
 * that normalize a (possibly partial) Sanity object into the full shape the UI
 * expects. Missing fields resolve to empty values — there is no bundled content.
 */

export type SectionHeading = {
  label: string;
  headingLead: string;
  headingEmphasis: string;
};

export type PageHero = {
  label: string;
  titleLead: string;
  titleEmphasis: string;
  titleSuffix: string;
  description: string;
  paragraphs: string[];
};

export function normalizeHeading(
  doc: Partial<SectionHeading> | undefined | null
): SectionHeading {
  return {
    label: doc?.label ?? "",
    headingLead: doc?.headingLead ?? "",
    headingEmphasis: doc?.headingEmphasis ?? "",
  };
}

export function normalizeHero(
  doc: Partial<PageHero> | undefined | null
): PageHero {
  return {
    label: doc?.label ?? "",
    titleLead: doc?.titleLead ?? "",
    titleEmphasis: doc?.titleEmphasis ?? "",
    titleSuffix: doc?.titleSuffix ?? "",
    description: doc?.description ?? "",
    paragraphs: doc?.paragraphs ?? [],
  };
}
