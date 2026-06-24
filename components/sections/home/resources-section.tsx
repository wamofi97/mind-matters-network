"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Container } from "@/components/layout/container";
import { SectionLabel, CoralEmphasis } from "@/components/shared/section-header";
import { Button } from "@/components/ui/button";
import {
  type HomeResourceTeaser,
  type SectionHeading,
} from "@/lib/content/home";
import { getResourceIcon } from "@/lib/content/icons";
import { fadeUpVariants, staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/utils";

const iconColors = {
  butter: "bg-butter text-amber-700",
  coral: "bg-coral/20 text-coral",
  mint: "bg-sage-soft text-deep-green",
  lilac: "bg-lilac-soft text-lilac",
};

type ResourcesSectionProps = {
  resources: HomeResourceTeaser[];
  heading: SectionHeading;
};

export function ResourcesSection({ resources, heading }: ResourcesSectionProps) {
  return (
    <section className="py-20 md:py-28 lg:py-32">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <SectionLabel>{heading.label}</SectionLabel>
            <h2 className="mt-4 font-heading text-4xl font-bold leading-[1.08] text-ink sm:text-5xl lg:text-6xl">
              {heading.headingLead}{" "}
              <CoralEmphasis>{heading.headingEmphasis}</CoralEmphasis>
            </h2>
          </div>
          <Button variant="secondary" className="w-fit shrink-0" asChild>
            <Link href="/resources">
              Browse All
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>

        <motion.div
          className="mt-12 grid gap-5 lg:mt-16 lg:grid-cols-3 lg:gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={staggerContainer}
        >
          {resources.map((resource) => {
            const Icon = getResourceIcon(resource.icon);
            return (
              <motion.article
                key={resource.title}
                variants={fadeUpVariants}
                className="flex flex-col rounded-card border border-border/60 bg-card p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card lg:p-8"
              >
                <span
                  className={cn(
                    "flex size-12 items-center justify-center rounded-full",
                    iconColors[resource.tone]
                  )}
                >
                  <Icon className="size-5" strokeWidth={2} />
                </span>
                <h3 className="mt-5 font-heading text-xl font-semibold text-ink sm:text-2xl">
                  {resource.title}
                </h3>
                <p className="mt-2 flex-1 font-body text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {resource.description}
                </p>
                <Link
                  href={resource.href}
                  className="mt-6 inline-flex items-center gap-1.5 font-body text-sm font-semibold text-ink transition-colors hover:text-coral"
                >
                  Download
                  <ArrowRight className="size-4" />
                </Link>
              </motion.article>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
