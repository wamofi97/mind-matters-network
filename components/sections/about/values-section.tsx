"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/container";
import { SectionHeader, CoralEmphasis } from "@/components/shared/section-header";
import { type AboutValue } from "@/lib/content/about-settings";
import { type SectionHeading } from "@/lib/content/page-content";
import { getFeatureIcon } from "@/lib/content/icons";
import { fadeUpVariants, staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/utils";

const iconColors = {
  coral: "bg-coral/20 text-coral",
  mint: "bg-sage-soft text-deep-green",
  lilac: "bg-lilac-soft text-lilac",
};

type ValuesSectionProps = {
  values: AboutValue[];
  heading: SectionHeading;
};

export function ValuesSection({ values, heading }: ValuesSectionProps) {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <SectionHeader label={heading.label} align="center">
          <h2 className="text-balance font-heading text-4xl font-bold leading-[1.08] text-ink sm:text-5xl lg:text-6xl">
            {heading.headingLead}{" "}
            <CoralEmphasis>{heading.headingEmphasis}</CoralEmphasis>
          </h2>
        </SectionHeader>

        <motion.div
          className="mt-14 grid gap-5 lg:mt-16 lg:grid-cols-3 lg:gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={staggerContainer}
        >
          {values.map((value) => {
            const Icon = getFeatureIcon(value.icon);
            return (
              <motion.article
                key={value.title}
                variants={fadeUpVariants}
                className="flex flex-col rounded-card border border-border/60 bg-card p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card lg:p-8"
              >
                <span
                  className={cn(
                    "flex size-12 items-center justify-center rounded-full",
                    iconColors[value.tone]
                  )}
                >
                  <Icon className="size-5" strokeWidth={2} />
                </span>
                <h3 className="mt-5 font-heading text-xl font-semibold text-ink sm:text-2xl">
                  {value.title}
                </h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {value.description}
                </p>
              </motion.article>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
