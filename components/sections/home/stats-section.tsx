"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/container";
import { SectionHeader, CoralEmphasis } from "@/components/shared/section-header";
import { stats } from "@/constants/homepage";
import { fadeUpVariants, staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/utils";

const toneStyles = {
  coral: "bg-coral/25 border-coral/20",
  butter: "bg-butter border-butter",
  mint: "bg-sage-soft border-sage-soft",
  lilac: "bg-lilac-soft border-lilac-soft",
};

export function StatsSection() {
  return (
    <section className="py-20 md:py-28 lg:py-32">
      <Container>
        <SectionHeader label="By the numbers" align="center">
          <h2 className="text-balance font-heading text-4xl font-bold leading-[1.08] text-ink sm:text-5xl lg:text-6xl">
            A loud little movement,{" "}
            <CoralEmphasis>measured in smiles.</CoralEmphasis>
          </h2>
        </SectionHeader>

        <motion.div
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={staggerContainer}
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={fadeUpVariants}
              className={cn(
                "flex min-h-[160px] flex-col justify-center rounded-[32px] border p-8 shadow-soft transition-transform duration-300 hover:-translate-y-1 lg:min-h-[180px] lg:p-10",
                toneStyles[stat.tone]
              )}
            >
              <p className="font-heading text-5xl font-bold tracking-tight text-ink lg:text-6xl">
                {stat.value}
              </p>
              <p className="mt-3 font-body text-sm leading-snug text-muted-foreground sm:text-base">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
