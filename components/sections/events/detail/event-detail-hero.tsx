"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CalendarDays, Clock, MapPin, Users } from "lucide-react";
import { motion } from "framer-motion";
import { Container } from "@/components/layout/container";
import { PillTag } from "@/components/ui/pill-tag";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { fadeUpVariants, staggerContainer } from "@/lib/motion";
import type { EventItem, EventTone } from "@/constants/events";

const badgeBg: Record<EventTone, string> = {
  butter: "bg-butter",
  coral: "bg-coral text-cream",
  mint: "bg-sage-soft",
  lilac: "bg-lilac-soft",
};

export function EventDetailHero({ event }: { event: EventItem }) {
  const isPast = event.status === "past";
  const { detail } = event;

  const meta = [
    { icon: CalendarDays, label: "Date", value: detail.dateLabel },
    { icon: Clock, label: "Duration", value: detail.duration },
    { icon: Users, label: "Host", value: detail.host },
    { icon: MapPin, label: "Location", value: detail.location },
  ];

  return (
    <section className="relative overflow-hidden py-12 md:pt-20 md:pb-12">
      <div
        className="pointer-events-none absolute -left-32 -top-24 size-[420px] rounded-full bg-lilac-soft/60 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-32 top-10 size-72 rounded-full bg-butter/40 blur-3xl"
        aria-hidden
      />

      <Container className="relative z-10">
        <Link
          href="/events"
          className="inline-flex items-center gap-1.5 font-body text-sm font-medium text-muted-foreground transition-colors hover:text-ink"
        >
          <ArrowLeft className="size-4" />
          Back to events
        </Link>

        <div className="mt-8 grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div variants={fadeUpVariants} className="flex flex-wrap items-center gap-2">
              <PillTag tone={event.tone} size="sm">
                {event.category}
              </PillTag>
              <span className="rounded-full border border-border bg-card px-3 py-1 font-body text-xs font-semibold capitalize text-ink">
                {isPast ? "Past event" : "Upcoming"}
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUpVariants}
              className="mt-5 font-heading text-4xl font-bold leading-[1.05] tracking-tight text-ink sm:text-5xl"
            >
              {event.title}
            </motion.h1>

            <motion.p
              variants={fadeUpVariants}
              className="mt-5 max-w-xl font-body text-base leading-relaxed text-muted-foreground"
            >
              {detail.summary}
            </motion.p>

            <motion.dl
              variants={fadeUpVariants}
              className="mt-7 grid grid-cols-2 gap-x-6 gap-y-5"
            >
              {meta.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="flex items-start gap-3">
                    <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full bg-card text-ink shadow-soft">
                      <Icon className="size-4" strokeWidth={2} />
                    </span>
                    <div>
                      <dt className="font-body text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        {item.label}
                      </dt>
                      <dd className="mt-0.5 font-body text-sm font-medium text-ink">
                        {item.value}
                      </dd>
                    </div>
                  </div>
                );
              })}
            </motion.dl>

            <motion.div
              variants={fadeUpVariants}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              {isPast ? (
                <Button variant="donate" asChild>
                  <Link href="#recap">
                    View Recap
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              ) : (
                <>
                  <Button variant="donate" asChild>
                    <Link href="#save-your-spot">
                      Register Now
                      <ArrowRight className="size-4" />
                    </Link>
                  </Button>
                  <span className="font-body text-sm text-muted-foreground">
                    Free · limited spots
                  </span>
                </>
              )}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative"
          >
            <div className="relative aspect-4/3 overflow-hidden rounded-card shadow-card">
              <Image
                src={event.image}
                alt={event.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div
              className={cn(
                "absolute -bottom-5 left-6 flex size-20 flex-col items-center justify-center rounded-full text-center shadow-card",
                badgeBg[event.tone]
              )}
            >
              <span className="font-heading text-2xl font-bold leading-none">
                {event.day}
              </span>
              <span className="mt-1 font-body text-[0.65rem] font-semibold tracking-wider">
                {event.month}
              </span>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
