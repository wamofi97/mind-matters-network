"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/container";
import { SectionLabel, CoralEmphasis } from "@/components/shared/section-header";
import { fadeUpVariants, staggerContainer } from "@/lib/motion";

export function EventsHeroSection() {
  return (
    <section className="relative py-16 md:pt-24 md:pb-12">

      <Container>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="relative z-10 max-w-3xl"
        >
          <motion.div variants={fadeUpVariants}>
            <SectionLabel>Events</SectionLabel>
          </motion.div>

          <motion.h1
            variants={fadeUpVariants}
            className="mt-6 font-heading text-[2.75rem] font-bold leading-[1.04] tracking-tight text-ink sm:text-5xl lg:text-6xl"
          >
            Come as you are.
            <br />
            <CoralEmphasis className="italic">
              Leave a little lighter.
            </CoralEmphasis>
          </motion.h1>

          <motion.p
            variants={fadeUpVariants}
            className="mt-6 max-w-xl font-body text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            From journaling circles to outdoor meditations, our events are made
            to be soft landings — judgement-free, free to join.
          </motion.p>
        </motion.div>
      </Container>
    </section>
  );
}
