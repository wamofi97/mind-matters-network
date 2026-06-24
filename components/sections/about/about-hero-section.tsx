"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/container";
import { SectionLabel, CoralEmphasis } from "@/components/shared/section-header";
import { type PageHero } from "@/lib/content/page-content";
import { fadeUpVariants, staggerContainer } from "@/lib/motion";

type AboutHeroSectionProps = {
  hero: PageHero;
};

export function AboutHeroSection({ hero }: AboutHeroSectionProps) {
  return (
    <section className="relative py-16 md:pt-28 md:pb-12">

      <Container>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="relative z-10 max-w-4xl"
        >
          <motion.div variants={fadeUpVariants}>
            <SectionLabel>{hero.label}</SectionLabel>
          </motion.div>

          <motion.h1
            variants={fadeUpVariants}
            className="mt-6 font-heading text-[2.75rem] font-bold leading-[1.04] tracking-tight text-ink sm:text-5xl lg:text-6xl"
          >
            {hero.titleLead}{" "}
            <CoralEmphasis className="italic">
              {hero.titleEmphasis}
            </CoralEmphasis>{" "}
            {hero.titleSuffix}
          </motion.h1>

          <motion.div
            variants={fadeUpVariants}
            className="mt-8 space-y-5 font-body text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            {hero.paragraphs.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
