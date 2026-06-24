"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { SectionLabel, CoralEmphasis } from "@/components/shared/section-header";
import { type SectionHeading } from "@/lib/content/page-content";
import { type Testimonial } from "@/lib/content/testimonials";
import { fadeUpVariants } from "@/lib/motion";

const AUTOPLAY_MS = 6000;

type TestimonialSectionProps = {
  heading: SectionHeading;
  testimonials: Testimonial[];
};

export function TestimonialSection({
  heading,
  testimonials,
}: TestimonialSectionProps) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const progressRef = useRef(0);

  const paginate = useCallback((newDirection: number) => {
    setDirection(newDirection);
    setProgress(0);
    progressRef.current = 0;
    setIndex(
      (prev) => (prev + newDirection + testimonials.length) % testimonials.length,
    );
  }, []);

  const goTo = (next: number) => {
    setDirection(next > index ? 1 : -1);
    setProgress(0);
    progressRef.current = 0;
    setIndex(next);
  };

  useEffect(() => {
    progressRef.current = progress;
  }, [progress]);

  useEffect(() => {
    if (isPaused) return;
    let frame: number;
    const start = performance.now() - progressRef.current * AUTOPLAY_MS;
    const tick = (now: number) => {
      const next = Math.min((now - start) / AUTOPLAY_MS, 1);
      setProgress(next);
      if (next >= 1) {
        paginate(1);
        return;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [isPaused, index, paginate]);

  const active = testimonials[index];
  const counter = `${String(index + 1).padStart(2, "0")} / ${String(
    testimonials.length,
  ).padStart(2, "0")}`;

  return (
    <section className="py-20 md:py-28 lg:py-32">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <SectionLabel>{heading.label}</SectionLabel>
            <h2 className="mt-4 font-heading text-4xl font-bold leading-[1.08] text-ink sm:text-5xl lg:text-[3.25rem] xl:text-6xl">
              {heading.headingLead}{" "}
              <CoralEmphasis className="italic">
                {heading.headingEmphasis}
              </CoralEmphasis>
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-body text-sm font-medium text-muted-foreground tabular-nums">
              {counter}
            </span>
            <Button
              variant="unstyled"
              size="none"
              type="button"
              onClick={() => paginate(-1)}
              className="size-11 rounded-full border-2 border-ink/20 text-ink transition-colors hover:border-ink hover:bg-white [&_svg]:size-5"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="size-5" />
            </Button>
            <Button
              variant="unstyled"
              size="none"
              type="button"
              onClick={() => paginate(1)}
              className="size-11 rounded-full border-2 border-ink/20 text-ink transition-colors hover:border-ink hover:bg-white [&_svg]:size-5"
              aria-label="Next testimonial"
            >
              <ChevronRight className="size-5" />
            </Button>
          </div>
        </div>

        <div
          className="mt-12 lg:mt-16"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocusCapture={() => setIsPaused(true)}
          onBlurCapture={() => setIsPaused(false)}
        >
        <motion.div
          className="relative overflow-hidden rounded-card bg-card shadow-card"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUpVariants}
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.article
              key={index}
              custom={direction}
              initial={{ opacity: 0, x: direction >= 0 ? 40 : -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction >= 0 ? -40 : 40 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
            >
              <div className="grid md:grid-cols-[minmax(240px,320px)_1fr]">
                <div className="relative aspect-square min-h-[280px] bg-coral/30 md:aspect-auto md:min-h-[360px]">
                  {active.image ? (
                    <Image
                      src={active.image}
                      alt={active.imageAlt}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 768px) 100vw, 320px"
                    />
                  ) : null}
                </div>

                <div className="relative flex flex-col justify-center px-8 py-10 md:px-12 md:py-14 lg:px-16">
                  <span
                    className="pointer-events-none absolute bottom-6 right-8 font-heading text-[8rem] leading-none text-coral/15 select-none md:text-[10rem]"
                    aria-hidden
                  >
                    &ldquo;
                  </span>
                  <blockquote className="relative z-10 font-heading text-2xl font-medium italic leading-snug text-ink sm:text-3xl lg:text-[2rem] lg:leading-snug">
                    {active.quote}
                  </blockquote>
                  <footer className="relative z-10 mt-8">
                    <p className="font-body text-lg font-semibold text-ink">
                      {active.name}
                    </p>
                    <p className="mt-1 font-body text-sm text-muted-foreground">
                      {active.meta}
                    </p>
                  </footer>
                </div>
              </div>
            </motion.article>
          </AnimatePresence>
        </motion.div>

        <div className="mt-6 flex items-center gap-3">
          {testimonials.map((testimonial, i) => {
            const scaleX = i < index ? 1 : i === index ? progress : 0;
            return (
              <Button
                key={testimonial.name}
                variant="unstyled"
                size="none"
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Go to testimonial from ${testimonial.name}`}
                aria-current={i === index}
                className="group relative h-1.5 flex-1 overflow-hidden rounded-full bg-ink/10"
              >
                <span
                  className="absolute inset-0 origin-left rounded-full bg-deep-green"
                  style={{
                    transform: `scaleX(${scaleX})`,
                    transition: i === index ? "none" : "transform 0.3s ease",
                  }}
                />
              </Button>
            );
          })}
        </div>
        </div>
      </Container>
    </section>
  );
}
