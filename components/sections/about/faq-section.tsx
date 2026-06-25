"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Container } from "@/components/layout/container";
import { SectionHeader, CoralEmphasis } from "@/components/shared/section-header";
import { Button } from "@/components/ui/button";
import { type FaqContent } from "@/lib/content/faqs";
import { type SectionHeading } from "@/lib/content/page-content";
import { fadeUpVariants, staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/utils";

type FaqSectionProps = {
  faqs: FaqContent[];
  heading: SectionHeading;
};

export function FaqSection({ faqs, heading }: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-16 md:py-24">
      <Container>
        <SectionHeader label={heading.label} align="center">
          <h2 className="font-heading text-4xl font-bold leading-[1.08] text-ink sm:text-5xl">
            {heading.headingLead}{" "}
            <CoralEmphasis>{heading.headingEmphasis}</CoralEmphasis>
          </h2>
        </SectionHeader>

        <motion.div
          className="mx-auto mt-14 max-w-2xl space-y-4 lg:mt-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={staggerContainer}
        >
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={faq.question}
                variants={fadeUpVariants}
                className="overflow-hidden rounded-card border border-border/60 bg-card shadow-soft"
              >
                <Button
                  variant="unstyled"
                  size="none"
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  className="flex w-full cursor-pointer items-center justify-between gap-4 px-6 py-5 text-left lg:px-7"
                >
                  <span className="font-heading text-lg font-semibold text-ink">
                    {faq.question}
                  </span>
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-butter/60 text-ink">
                    <ChevronDown
                      className={cn(
                        "size-4 transition-transform duration-300",
                        isOpen && "rotate-180"
                      )}
                      strokeWidth={2.5}
                    />
                  </span>
                </Button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                    >
                      <p className="px-6 pb-5 font-body text-sm leading-relaxed text-muted-foreground sm:text-base lg:px-7">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          className="mt-10 flex justify-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeUpVariants}
        >
          <Button variant="donate" asChild>
            <Link href="/contact">Still curious? Talk to us &rarr;</Link>
          </Button>
        </motion.div>
      </Container>
    </section>
  );
}
