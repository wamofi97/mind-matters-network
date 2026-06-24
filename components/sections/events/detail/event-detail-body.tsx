"use client";

import Image from "next/image";
import { Check, Quote } from "lucide-react";
import { motion } from "framer-motion";
import { Container } from "@/components/layout/container";
import { SectionHeader, CoralEmphasis } from "@/components/shared/section-header";
import { fadeUpVariants, staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { EventItem, EventTone } from "@/constants/events";

const viewport = { once: true, margin: "-60px" };

const toneBg: Record<EventTone, string> = {
  coral: "bg-coral/25",
  butter: "bg-butter/50",
  mint: "bg-sage-soft",
  lilac: "bg-lilac-soft",
};

export function EventDetailBody({ event }: { event: EventItem }) {
  const isPast = event.status === "past";
  const { detail } = event;

  return (
    <>
      {/* Who it's for / What you'll get */}
      <section className="py-12 md:py-16">
        <Container>
          <motion.div
            className="grid gap-10 md:grid-cols-2 md:gap-16"
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={staggerContainer}
          >
            <motion.div variants={fadeUpVariants}>
              <p className="font-body text-sm font-semibold uppercase tracking-wider text-coral">
                Who it&apos;s for
              </p>
              <ul className="mt-5 space-y-3">
                {detail.whoFor.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-sage-soft text-deep-green">
                      <Check className="size-3" strokeWidth={3} />
                    </span>
                    <span className="font-body text-base text-ink/85">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div variants={fadeUpVariants}>
              <p className="font-body text-sm font-semibold uppercase tracking-wider text-coral">
                What you&apos;ll get
              </p>
              <ul className="mt-5 space-y-3">
                {detail.whatYouGet.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-sage-soft text-deep-green">
                      <Check className="size-3" strokeWidth={3} />
                    </span>
                    <span className="font-body text-base text-ink/85">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* Agenda */}
      <section className="py-12 md:py-16">
        <Container>
          <SectionHeader label="Agenda">
            <h2 className="font-heading text-3xl font-bold leading-[1.1] text-ink sm:text-4xl lg:text-5xl">
              How the day <CoralEmphasis>unfolds.</CoralEmphasis>
            </h2>
          </SectionHeader>

          <motion.ol
            className="mt-12 space-y-7 border-l-2 border-border/70 pl-6 lg:mt-14"
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={staggerContainer}
          >
            {detail.agenda.map((item) => (
              <motion.li
                key={`${item.time}-${item.title}`}
                variants={fadeUpVariants}
                className="relative"
              >
                <span className="absolute left-[-31px] top-1.5 size-3 rounded-full bg-coral ring-4 ring-background" />
                <p className="font-body text-sm font-semibold text-coral">
                  {item.time}
                </p>
                <h3 className="mt-1 font-heading text-lg font-semibold text-ink">
                  {item.title}
                </h3>
                {item.description && (
                  <p className="mt-1 font-body text-sm text-muted-foreground">
                    {item.description}
                  </p>
                )}
              </motion.li>
            ))}
          </motion.ol>
        </Container>
      </section>

      {/* Facilitators */}
      <section className="py-12 md:py-16">
        <Container>
          <SectionHeader label="Facilitators">
            <h2 className="font-heading text-3xl font-bold leading-[1.1] text-ink sm:text-4xl lg:text-5xl">
              The humans <CoralEmphasis>guiding this.</CoralEmphasis>
            </h2>
          </SectionHeader>

          <motion.div
            className={cn(
              "mt-12 grid gap-5 lg:mt-14 lg:gap-6",
              detail.facilitators.length > 1
                ? "grid-cols-2 sm:grid-cols-2 lg:grid-cols-4"
                : "grid-cols-1 w-1/4"
            )}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={staggerContainer}
          >
            {detail.facilitators.map((person) => (
              <motion.article
                key={person.name}
                variants={fadeUpVariants}
                className="group flex flex-col overflow-hidden rounded-card border border-border/60 bg-card p-3 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card"
              >
                <div
                  className={cn(
                    "relative aspect-square overflow-hidden rounded-card",
                    toneBg[event.tone]
                  )}
                >
                  {person.avatar && (
                    <Image
                      src={person.avatar}
                      alt={person.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      sizes="(max-width: 1024px) 50vw, 25vw"
                    />
                  )}
                </div>
                <div className="px-2 pb-2 pt-4">
                  <h3 className="font-heading text-lg font-semibold text-ink">
                    {person.name}
                  </h3>
                  <p className="mt-0.5 font-body text-sm text-muted-foreground">
                    {person.role}
                  </p>
                  <p className="mt-3 font-body text-sm leading-relaxed text-muted-foreground">
                    {person.bio}
                  </p>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* Gallery */}
      <section id="recap" className="scroll-mt-24 py-12 md:py-16">
        <Container>
          <SectionHeader label={isPast ? "Gallery" : "A glimpse"}>
            <h2 className="font-heading text-3xl font-bold leading-[1.1] text-ink sm:text-4xl lg:text-5xl">
              {isPast ? (
                <>
                  Moments from <CoralEmphasis>the day.</CoralEmphasis>
                </>
              ) : (
                <>
                  What it tends to <CoralEmphasis>feel like.</CoralEmphasis>
                </>
              )}
            </h2>
          </SectionHeader>

          <motion.div
            className={cn(
              "mt-12 grid gap-4 lg:mt-14 lg:gap-6",
              isPast ? "sm:grid-cols-2" : "sm:grid-cols-3"
            )}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={staggerContainer}
          >
            {(isPast ? detail.gallery.slice(0, 2) : detail.gallery.slice(0, 3)).map(
              (src, index) => (
                <motion.div
                  key={src}
                  variants={fadeUpVariants}
                  className="relative aspect-4/3 overflow-hidden rounded-card shadow-soft"
                >
                  <Image
                    src={src}
                    alt={`${event.title} photo ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-[1.03]"
                    sizes="(max-width: 1024px) 50vw, 33vw"
                  />
                </motion.div>
              )
            )}
          </motion.div>
        </Container>
      </section>

      {/* Testimonials */}
      <section className="py-12 md:py-16">
        <Container>
          <SectionHeader label="In their words">
            <h2 className="font-heading text-3xl font-bold leading-[1.1] text-ink sm:text-4xl lg:text-5xl">
              Real feedback from <CoralEmphasis>real people.</CoralEmphasis>
            </h2>
          </SectionHeader>

          <motion.div
            className={cn(
              "mt-12 grid gap-5 lg:mt-14 lg:gap-6",
              detail.testimonials.length > 1 ? "md:grid-cols-2" : "max-w-2xl"
            )}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={staggerContainer}
          >
            {detail.testimonials.map((item) => (
              <motion.figure
                key={item.quote}
                variants={fadeUpVariants}
                className="rounded-card border border-border/60 bg-card p-7 shadow-soft"
              >
                <Quote className="size-7 text-coral/40" />
                <blockquote className="mt-4 font-body text-lg leading-relaxed text-ink/90">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-4 font-body text-sm font-medium text-muted-foreground">
                  — {item.author}
                </figcaption>
              </motion.figure>
            ))}
          </motion.div>
        </Container>
      </section>
    </>
  );
}
