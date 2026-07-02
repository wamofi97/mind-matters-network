"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { motion, useAnimationControls, type Variants } from "framer-motion";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { SectionLabel, CoralEmphasis } from "@/components/shared/section-header";
import { type SectionHeading } from "@/lib/content/page-content";
import { type Testimonial } from "@/lib/content/testimonials";
import { fadeUpVariants } from "@/lib/motion";

const AUTOPLAY_MS = 6000;

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

const SPRING = { type: "spring", stiffness: 320, damping: 36 } as const;

const textColumnVariants: Variants = {
  inactive: {},
  active: {
    transition: {
      when: "beforeChildren",
      delayChildren: 0.12,
      staggerChildren: 0.05,
    },
  },
};

const lineVariants: Variants = {
  inactive: { opacity: 0, y: 10 },
  active: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_OUT },
  },
};

const quoteVariants: Variants = {
  inactive: {},
  active: {
    transition: { staggerChildren: 0.04 },
  },
};

const wordVariants: Variants = {
  inactive: { opacity: 0, y: 14, filter: "blur(4px)" },
  active: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.45, ease: EASE_OUT },
  },
};

type TestimonialSectionProps = {
  heading: SectionHeading;
  testimonials: Testimonial[];
};

function TestimonialCard({
  testimonial,
  isActive,
}: {
  testimonial: Testimonial;
  isActive: boolean;
}) {
  return (
    <div className="grid h-full sm:grid-cols-[minmax(240px,320px)_1fr]">
      <div className="relative h-1/2  bg-coral/30 sm:h-auto min-h-[360px]">
        {testimonial.image ? (
          <Image
            src={testimonial.image}
            alt={testimonial.imageAlt}
            fill
            className="object-cover object-top"
            sizes="(max-width: 768px) 100vw, 320px"
            draggable={false}
          />
        ) : null}
      </div>

      <motion.div
        variants={textColumnVariants}
        initial="inactive"
        animate={isActive ? "active" : "inactive"}
        className="relative flex flex-col justify-center px-8 py-10 md:px-12 md:py-14 lg:px-16"
      >
        <motion.span
          variants={lineVariants}
          className="pointer-events-none absolute bottom-6 right-8 font-heading text-[8rem] leading-none text-coral/15 select-none md:text-[10rem]"
          aria-hidden
        >
          &ldquo;
        </motion.span>
        <motion.blockquote
          variants={quoteVariants}
          className="relative z-10 font-heading text-2xl font-medium italic leading-snug text-ink sm:text-3xl lg:text-[2rem] lg:leading-snug"
        >
          {testimonial.quote.split(" ").map((word, i, words) => (
            <span key={`${word}-${i}`}>
              <motion.span variants={wordVariants} className="inline-block">
                {word}
              </motion.span>
              {i < words.length - 1 ? " " : ""}
            </span>
          ))}
        </motion.blockquote>
        <footer className="relative z-10 mt-8">
          <motion.p
            variants={lineVariants}
            className="font-body text-lg font-semibold text-ink"
          >
            {testimonial.name}
          </motion.p>
          <motion.p
            variants={lineVariants}
            className="mt-1 font-body text-sm text-muted-foreground"
          >
            {testimonial.meta}
          </motion.p>
        </footer>
      </motion.div>
    </div>
  );
}

export function TestimonialSection({
  heading,
  testimonials,
}: TestimonialSectionProps) {
  const count = testimonials.length;

  // Three stacked copies so the track can keep moving in the same direction
  // past either end; we silently re-center after each loop.
  const loop = [...testimonials, ...testimonials, ...testimonials];
  const loopLength = loop.length;
  const step = 100 / loopLength;

  // `page` is the position within the tripled track. We keep it resting in the
  // middle copy: [count, 2*count - 1].
  const [page, setPage] = useState(count);
  const [instant, setInstant] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isUserPaused, setIsUserPaused] = useState(false);
  const [isInteractionPaused, setIsInteractionPaused] = useState(false);
  const progressRef = useRef(0);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackControls = useAnimationControls();

  const activeIndex = ((page % count) + count) % count;
  const isPaused = isUserPaused || isInteractionPaused;

  const paginate = useCallback((direction: number) => {
    setProgress(0);
    progressRef.current = 0;
    setInstant(false);
    setPage((prev) => prev + direction);
  }, []);

  const goTo = (next: number) => {
    setProgress(0);
    progressRef.current = 0;
    setInstant(false);
    setPage((prev) => prev - (((prev % count) + count) % count) + next);
  };

  const handleSettle = useCallback(() => {
    setPage((prev) => {
      if (prev < count) {
        setInstant(true);
        return prev + count;
      }
      if (prev >= 2 * count) {
        setInstant(true);
        return prev - count;
      }
      setInstant(false);
      return prev;
    });
  }, [count]);

  useEffect(() => {
    progressRef.current = progress;
  }, [progress]);

  useEffect(() => {
    void trackControls.start({
      x: `-${page * step}%`,
      transition: instant ? { duration: 0 } : SPRING,
    });
  }, [instant, page, step, trackControls]);

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
  }, [isPaused, activeIndex, paginate]);

  const counter = `${String(activeIndex + 1).padStart(2, "0")} / ${String(
    count,
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
            <Button
              variant="unstyled"
              size="none"
              type="button"
              onClick={() => setIsUserPaused((prev) => !prev)}
              aria-pressed={isUserPaused}
              aria-label={isUserPaused ? "Resume testimonial autoplay" : "Pause testimonial autoplay"}
              className="h-11 rounded-full border-2 border-ink/20 px-4 font-body text-xs font-semibold uppercase tracking-wide text-ink transition-colors hover:border-ink hover:bg-white"
            >
              {isUserPaused ? (
                <>
                  <Play className="size-4" />
                  Play
                </>
              ) : (
                <>
                  <Pause className="size-4" />
                  Pause
                </>
              )}
            </Button>
          </div>
        </div>

        <div
          className="mt-8 lg:mt-16"
          onMouseEnter={() => setIsInteractionPaused(true)}
          onMouseLeave={() => setIsInteractionPaused(false)}
          onFocusCapture={() => setIsInteractionPaused(true)}
          onBlurCapture={() => setIsInteractionPaused(false)}
        >
          <motion.div
            ref={viewportRef}
            className="relative overflow-hidden rounded-card bg-card shadow-card"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUpVariants}
          >
            <motion.div
              className="flex cursor-grab touch-pan-y active:cursor-grabbing"
              style={{ width: `${loopLength * 100}%` }}
              drag="x"
              dragConstraints={viewportRef}
              dragElastic={0.12}
              dragMomentum={false}
              animate={trackControls}
              onAnimationComplete={handleSettle}
              onDragStart={() => setIsInteractionPaused(true)}
              onDragEnd={(_, info) => {
                setIsInteractionPaused(false);
                const slideWidth = viewportRef.current?.offsetWidth ?? 1;
                const swipe = info.offset.x;
                const velocity = info.velocity.x;
                if (swipe < -slideWidth * 0.2 || velocity < -500) {
                  paginate(1);
                } else if (swipe > slideWidth * 0.2 || velocity > 500) {
                  paginate(-1);
                } else {
                  void trackControls.start({
                    x: `-${page * step}%`,
                    transition: SPRING,
                  });
                }
              }}
            >
              {loop.map((testimonial, i) => (
                <div
                  key={`${testimonial.name}-${i}`}
                  className="shrink-0"
                  style={{ width: `${step}%` }}
                  aria-hidden={i !== page}
                >
                  <TestimonialCard
                    testimonial={testimonial}
                    isActive={i % count === activeIndex}
                  />
                </div>
              ))}
            </motion.div>
          </motion.div>

          <div className="mt-6 flex items-center gap-3">
            {testimonials.map((testimonial, i) => {
              const scaleX =
                i < activeIndex ? 1 : i === activeIndex ? progress : 0;
              return (
                <Button
                  key={testimonial.name}
                  variant="unstyled"
                  size="none"
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Go to testimonial from ${testimonial.name}`}
                  aria-current={i === activeIndex}
                  className="group relative h-1.5 flex-1 overflow-hidden rounded-full bg-ink/10"
                >
                  <span
                    className="absolute inset-0 origin-left rounded-full bg-deep-green"
                    style={{
                      transform: `scaleX(${scaleX})`,
                      transition: "none",
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
