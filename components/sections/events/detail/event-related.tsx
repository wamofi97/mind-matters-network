"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Container } from "@/components/layout/container";
import { SectionLabel, CoralEmphasis } from "@/components/shared/section-header";
import { PillTag } from "@/components/ui/pill-tag";
import { fadeUpVariants, staggerContainer } from "@/lib/motion";
import type { EventItem } from "@/constants/events";

export function EventRelated({ events }: { events: EventItem[] }) {
  if (events.length === 0) return null;

  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <SectionLabel>More events</SectionLabel>
            <h2 className="mt-4 font-heading text-3xl font-bold leading-[1.1] text-ink sm:text-4xl lg:text-5xl">
              You might <CoralEmphasis>also love.</CoralEmphasis>
            </h2>
          </div>
          <Link
            href="/events"
            className="inline-flex w-fit items-center gap-1.5 font-body text-sm font-semibold text-ink transition-colors hover:text-coral"
          >
            All events
            <ArrowRight className="size-4" />
          </Link>
        </div>

        <motion.div
          className="mt-12 grid gap-8 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={staggerContainer}
        >
          {events.map((event) => (
            <motion.article
              key={event.slug}
              variants={fadeUpVariants}
              className="group flex flex-col overflow-hidden rounded-card bg-card shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card"
            >
              <Link href={event.href} className="flex flex-1 flex-col">
                <div className="relative aspect-4/3 overflow-hidden">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <PillTag tone={event.tone} size="sm" className="w-fit">
                    {event.category}
                  </PillTag>
                  <h3 className="mt-4 font-heading text-xl font-semibold text-ink">
                    {event.title}
                  </h3>
                  <p className="mt-2 font-body text-sm leading-relaxed text-muted-foreground">
                    {event.description}
                  </p>
                </div>
              </Link>
            </motion.article>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
