"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/container";
import { BlobShape } from "@/components/decorations/organic-shapes";
import { fadeUpVariants, staggerContainer } from "@/lib/motion";
import { MessagesSquare, Eye, Icon, Brain } from "lucide-react";

const cards = [
  {
    icon: Brain,
    label: "Mission",
    text: "To make mental wellbeing a daily, normal conversation in every young person's life.",
    className: "bg-coral text-cream",
    blob: "butter" as const,
  },
  {
      icon: Eye,
    label: "Vision",
    text: "A world where no young person ever feels like they have to struggle alone.",
    className: "bg-deep-green text-cream",
    blob: "mint" as const,
  },
];

export function MissionVisionSection() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <motion.div
          className="grid gap-5 md:grid-cols-2 lg:gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={staggerContainer}
        >
          {cards.map((card) => (
            <motion.div
              key={card.label}
              variants={fadeUpVariants}
              className={`relative flex min-h-[200px] flex-col justify-center overflow-hidden rounded-card p-8 shadow-card lg:min-h-[240px] lg:p-12 ${card.className}`}
            >
              <BlobShape
                color={card.blob}
                size="lg"
                className="absolute -right-12 -top-12 opacity-40"
              />
              <div className="flex items-center gap-2">
              <span className="relative z-10">
                <card.icon className="size-6 text-butter" />
              </span>
              <p className="relative z-10 font-body text-sm font-semibold uppercase tracking-wider text-butter">
                {card.label}
              </p>
              </div>
              <p className="relative z-10 mt-4 font-heading text-2xl font-semibold leading-snug sm:text-3xl text-cream">
                {card.text}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
