/**
 * Shared shapes for editable page chrome (hero + section headings) and helpers
 * that merge a (possibly partial) Sanity object with bundled fallback values.
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

export function mergeHeading(
  doc: Partial<SectionHeading> | undefined | null,
  fb: SectionHeading
): SectionHeading {
  return {
    label: doc?.label ?? fb.label,
    headingLead: doc?.headingLead ?? fb.headingLead,
    headingEmphasis: doc?.headingEmphasis ?? fb.headingEmphasis,
  };
}

export function mergeHero(
  doc: Partial<PageHero> | undefined | null,
  fb: PageHero
): PageHero {
  return {
    label: doc?.label ?? fb.label,
    titleLead: doc?.titleLead ?? fb.titleLead,
    titleEmphasis: doc?.titleEmphasis ?? fb.titleEmphasis,
    titleSuffix: doc?.titleSuffix ?? fb.titleSuffix,
    description: doc?.description ?? fb.description,
    paragraphs:
      doc?.paragraphs && doc.paragraphs.length ? doc.paragraphs : fb.paragraphs,
  };
}
