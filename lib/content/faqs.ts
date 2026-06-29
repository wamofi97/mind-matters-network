import { sanityFetch } from "@/sanity/lib/fetch";

export type FaqContent = {
  question: string;
  answer: string;
};

const faqsQuery = `*[_type == "faq"] | order(order asc) {
  question, answer
}`;

export async function getFaqs(): Promise<FaqContent[]> {
  const docs = await sanityFetch<FaqContent[] | null>({
    query: faqsQuery,
    tags: ["faq"],
  });

  return docs ?? [];
}
