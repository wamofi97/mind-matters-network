"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/container";
import { SectionLabel, CoralEmphasis } from "@/components/shared/section-header";
import { fadeUpVariants, staggerContainer } from "@/lib/motion";

export function AboutHeroSection() {
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
            <SectionLabel>Our story</SectionLabel>
          </motion.div>

          <motion.h1
            variants={fadeUpVariants}
            className="mt-6 font-heading text-[2.75rem] font-bold leading-[1.04] tracking-tight text-ink sm:text-5xl lg:text-6xl"
          >
            We started with one{" "}
            <CoralEmphasis className="italic">honest</CoralEmphasis>{" "}
            conversation
          </motion.h1>

          <motion.div
            variants={fadeUpVariants}
            className="mt-8 space-y-5 font-body text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            <p>Mind Matters Network began with a simple but powerful idea: young people deserve a voice in mental health. It started in a small classroom, where a few students gathered to share their struggles, support one another, and learn how to advocate for mental well-being. From those early conversations, MMN has grown into a nationwide youth-led movement — a network that brings together students, educators, and mental health advocates across Malaysia.</p>
            
            <p>Our journey has been one of learning, connection, and impact. We’ve developed resources like the Youth Mental Health Handbook, hosted events in schools and universities, and launched initiatives that give young people the tools to lead change in their communities. Through collaboration and action, we’re building a generation that not only cares about mental health, but also knows how to support each other.</p>
         
            <p>At MMN, we believe that real change starts with us — the youth. By working together, we’re breaking the stigma, starting important conversations, and creating spaces where mental health is valued, understood, and prioritized. Our story is still being written, and we invite you to be part of it.</p>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
