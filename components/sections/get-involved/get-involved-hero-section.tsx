"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/container";
import { SectionLabel, CoralEmphasis } from "@/components/shared/section-header";
import { fadeUpVariants, staggerContainer } from "@/lib/motion";

export function GetInvolvedHeroSection() {
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
            <SectionLabel>Get involved</SectionLabel>
          </motion.div>

          <motion.h1
            variants={fadeUpVariants}
            className="mt-6 font-heading text-[2.75rem] font-bold leading-[1.04] tracking-tight text-ink sm:text-5xl lg:text-6xl"
          >
            Be the friend you{" "}
            <CoralEmphasis className="italic">wish you&apos;d had.</CoralEmphasis>
          </motion.h1>

          <motion.p
            variants={fadeUpVariants}
            className="mt-6 max-w-xl font-body text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            Pick a path below. Whatever your time, skill, or geography — there&apos;s
            a way to plug in.
          </motion.p>
        </motion.div>
      </Container>
    </section>
  );
}
