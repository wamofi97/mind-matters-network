"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { Container } from "@/components/layout/container";
import { SectionLabel, CoralEmphasis } from "@/components/shared/section-header";
import { fadeUpVariants } from "@/lib/motion";

export function TestimonialSection() {
  return (
    <section className="py-20 md:py-28 lg:py-32">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <SectionLabel>Real stories</SectionLabel>
            <h2 className="mt-4 font-heading text-4xl font-bold leading-[1.08] text-ink sm:text-5xl lg:text-6xl">
              Words from our <CoralEmphasis className="italic">community.</CoralEmphasis>
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-body text-sm font-medium text-muted-foreground">
              01 / 05
            </span>
            <button
              type="button"
              className="flex size-11 items-center justify-center rounded-full border-2 border-ink/20 text-ink transition-colors hover:border-ink hover:bg-white"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              className="flex size-11 items-center justify-center rounded-full border-2 border-ink/20 text-ink transition-colors hover:border-ink hover:bg-white"
              aria-label="Next testimonial"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>

        <motion.article
          className="relative mt-12 overflow-hidden rounded-[32px] bg-card shadow-card lg:mt-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUpVariants}
        >
          <div className="grid md:grid-cols-[minmax(240px,320px)_1fr]">
            <div className="relative aspect-square min-h-[280px] bg-coral/30 md:aspect-auto md:min-h-[360px]">
              <Image
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80"
                alt="Daniel, community member"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 320px"
              />
            </div>

            <div className="relative flex flex-col justify-center px-8 py-10 md:px-12 md:py-14 lg:px-16">
              <span
                className="pointer-events-none absolute bottom-6 right-8 font-heading text-[8rem] leading-none text-coral/15 select-none md:text-[10rem]"
                aria-hidden
              >
                &ldquo;
              </span>
              <blockquote className="relative z-10 font-heading text-2xl font-medium leading-snug text-ink sm:text-3xl lg:text-[2rem] lg:leading-snug">
                I found a circle that listens without judging. For the first time,
                I felt seen.
              </blockquote>
              <footer className="relative z-10 mt-8">
                <p className="font-body text-lg font-semibold text-ink">Daniel</p>
                <p className="mt-1 font-body text-sm text-muted-foreground">
                  Member since 2022
                </p>
              </footer>
            </div>
          </div>
        </motion.article>
      </Container>
    </section>
  );
}
