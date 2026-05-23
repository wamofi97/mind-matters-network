"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Container } from "@/components/layout/container";
import { SectionLabel, CoralEmphasis } from "@/components/shared/section-header";
import { Button } from "@/components/ui/button";
import { PillTag } from "@/components/ui/pill-tag";
import { events } from "@/constants/homepage";
import { fadeUpVariants, staggerContainer } from "@/lib/motion";

export function EventsSection() {
  return (
    <section className="py-20 md:py-28 lg:py-32">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <SectionLabel>Upcoming events</SectionLabel>
            <h2 className="mt-4 font-heading text-4xl font-bold leading-[1.08] text-ink sm:text-5xl lg:text-6xl">
              Show up. <CoralEmphasis>Belong.</CoralEmphasis>
            </h2>
          </div>
          <Button variant="secondary" className="w-fit shrink-0" asChild>
            <Link href="/events">
              All Events
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>

        <motion.div
          className="mt-12 grid gap-8 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={staggerContainer}
        >
          {events.map((event) => (
            <motion.article
              key={event.title}
              variants={fadeUpVariants}
              className="group flex flex-col overflow-hidden rounded-[32px] bg-card shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  sizes="(max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="flex flex-1 flex-col p-6 lg:p-7">
                <div className="flex items-center justify-between gap-3">
                  <PillTag tone="mint" size="sm">
                    {event.category}
                  </PillTag>
                  <span className="font-body text-sm font-medium text-muted-foreground">
                    {event.date}
                  </span>
                </div>
                <h3 className="mt-4 font-heading text-2xl font-semibold text-ink">
                  {event.title}
                </h3>
                <Link
                  href={event.href}
                  className="mt-auto inline-flex items-center gap-1.5 pt-6 font-body text-sm font-semibold text-ink transition-colors hover:text-coral"
                >
                  Register
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
