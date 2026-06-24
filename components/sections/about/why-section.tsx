"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/components/layout/container";
import { SectionLabel, CoralEmphasis } from "@/components/shared/section-header";
import { type StoryStat } from "@/lib/content/about-settings";
import { type SectionHeading } from "@/lib/content/page-content";
import { fadeUpVariants, staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/utils";

const statTone = {
  coral: "text-coral",
  lilac: "text-lilac",
};

type WhySectionProps = {
  storyStats: StoryStat[];
  heading: SectionHeading;
  paragraphs: string[];
};

export function WhySection({
  storyStats,
  heading,
  paragraphs,
}: WhySectionProps) {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="relative mx-auto w-full max-w-md lg:mx-0"
          >
            <div
              className="pointer-events-none absolute -left-6 -top-6 size-56 rounded-full bg-sage-soft/70 blur-2xl"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -bottom-6 right-2 size-44 rounded-full bg-butter/50 blur-2xl"
              aria-hidden
            />
            <div className="relative aspect-square w-full overflow-hidden rounded-full shadow-card">
              <Image
                src="https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800&q=80"
                alt="Two students sitting on the grass, talking and laughing"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 90vw, 440px"
              />
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeUpVariants}>
              <SectionLabel>{heading.label}</SectionLabel>
            </motion.div>

            <motion.h2
              variants={fadeUpVariants}
              className="mt-4 font-heading text-4xl font-bold leading-[1.08] text-ink sm:text-5xl"
            >
              {heading.headingLead}{" "}
              <CoralEmphasis>{heading.headingEmphasis}</CoralEmphasis>
            </motion.h2>

            <motion.div
              variants={fadeUpVariants}
              className="mt-6 space-y-4 font-body text-base leading-relaxed text-muted-foreground"
            >
              {paragraphs.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </motion.div>

            <motion.dl
              variants={fadeUpVariants}
              className="mt-10 grid grid-cols-2 gap-6 border-t border-border/80 pt-8"
            >
              {storyStats.map((stat) => (
                <div key={stat.label}>
                  <dt
                    className={cn(
                      "font-heading text-4xl font-bold tracking-tight sm:text-5xl",
                      statTone[stat.tone]
                    )}
                  >
                    {stat.value}
                  </dt>
                  <dd className="mt-1 font-body text-sm text-muted-foreground sm:text-base">
                    {stat.label}
                  </dd>
                </div>
              ))}
            </motion.dl>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
