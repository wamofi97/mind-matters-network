import { faqs as fallbackFaqs } from "@/constants/about";
import { isSanityConfigured } from "@/sanity/env";
import { sanityFetch } from "@/sanity/lib/fetch";

export type FaqContent = {
  question: string;
  answer: string;
};

const faqsQuery = `*[_type == "faq"] | order(order asc) {
  question, answer
}`;

export async function getFaqs(): Promise<FaqContent[]> {
  if (!isSanityConfigured) return [...fallbackFaqs];

  const docs = await sanityFetch<FaqContent[]>({
    query: faqsQuery,
    tags: ["faq"],
  });

  if (!docs || docs.length === 0) return [...fallbackFaqs];
  return docs;
}
