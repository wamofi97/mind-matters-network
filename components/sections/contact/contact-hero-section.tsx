"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/container";
import { SectionLabel, CoralEmphasis } from "@/components/shared/section-header";
import { fadeUpVariants, staggerContainer } from "@/lib/motion";

export function ContactHeroSection() {
  return (
    <section className="relative overflow-hidden py-16 md:pt-28 md:pb-12">

      <Container>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="relative z-10 max-w-3xl"
        >
          <motion.div variants={fadeUpVariants}>
            <SectionLabel>Say hi</SectionLabel>
          </motion.div>

          <motion.h1
            variants={fadeUpVariants}
            className="mt-6 font-heading text-[2.75rem] font-bold leading-[1.04] tracking-tight text-ink sm:text-5xl lg:text-6xl"
          >
            Let&apos;s <CoralEmphasis className="italic">talk.</CoralEmphasis>
          </motion.h1>

          <motion.p
            variants={fadeUpVariants}
            className="mt-6 max-w-xl font-body text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            Whether you&apos;re a young person looking for community, a partner,
            or just a curious soul — drop us a line.
          </motion.p>
        </motion.div>
      </Container>
    </section>
  );
}
