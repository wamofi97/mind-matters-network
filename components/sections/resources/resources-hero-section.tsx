"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/container";
import { SectionLabel, CoralEmphasis } from "@/components/shared/section-header";
import { fadeUpVariants, staggerContainer } from "@/lib/motion";

export function ResourcesHeroSection() {
  return (
    <section className="relative py-16 md:pt-28 md:pb-12">

      <Container>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="relative z-10 max-w-3xl"
        >
          <motion.div variants={fadeUpVariants}>
            <SectionLabel>Free resources</SectionLabel>
          </motion.div>

          <motion.h1
            variants={fadeUpVariants}
            className="mt-6 font-heading text-[2.75rem] font-bold leading-[1.04] tracking-tight text-ink sm:text-5xl lg:text-6xl"
          >
            Tools, words &amp;{" "}
            <CoralEmphasis className="italic">small comforts.</CoralEmphasis>
          </motion.h1>

          <motion.p
            variants={fadeUpVariants}
            className="mt-6 max-w-xl font-body text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            Designed by youth, reviewed by professionals — every resource is free
            to download, share and remix.
          </motion.p>
        </motion.div>
      </Container>
    </section>
  );
}
