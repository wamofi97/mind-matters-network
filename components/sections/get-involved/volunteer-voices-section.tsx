"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/components/layout/container";
import { SectionHeader, CoralEmphasis } from "@/components/shared/section-header";
import { volunteerVoices, type VoiceTone } from "@/constants/get-involved";
import { fadeUpVariants, staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/utils";

const toneBg: Record<VoiceTone, string> = {
  butter: "bg-butter/60",
  mint: "bg-sage-soft",
  coral: "bg-coral/20",
};

export function VolunteerVoicesSection() {
  return (
    <section className="pb-20 md:pb-28 lg:pb-32">
      <Container>
        <SectionHeader label="From our volunteers" align="center">
          <h2 className="text-balance font-heading text-4xl font-bold leading-[1.08] text-ink sm:text-5xl lg:text-6xl">
            Why people <CoralEmphasis>stick around.</CoralEmphasis>
          </h2>
        </SectionHeader>

        <motion.div
          className="mt-14 grid gap-5 lg:mt-16 lg:grid-cols-3 lg:gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={staggerContainer}
        >
          {volunteerVoices.map((voice) => (
            <motion.figure
              key={voice.name}
              variants={fadeUpVariants}
              className={cn(
                "flex flex-col rounded-card p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card sm:p-8",
                toneBg[voice.tone]
              )}
            >
              <span
                className="font-heading text-5xl leading-none text-ink/20 select-none"
                aria-hidden
              >
                &ldquo;
              </span>
              <blockquote className="mt-2 flex-1 font-heading text-lg font-medium italic leading-snug text-ink sm:text-xl">
                {voice.quote}
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span className="relative size-11 overflow-hidden rounded-full bg-card">
                  <Image
                    src={voice.image}
                    alt={voice.name}
                    fill
                    className="object-cover"
                    sizes="44px"
                  />
                </span>
                <span>
                  <span className="block font-body text-sm font-semibold text-ink">
                    {voice.name}
                  </span>
                  <span className="block font-body text-xs text-ink/60">
                    {voice.role}
                  </span>
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
