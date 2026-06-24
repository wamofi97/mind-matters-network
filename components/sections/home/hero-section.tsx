"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { communityAvatars } from "@/constants/homepage";
import { siteConfig } from "@/constants/navigation";
import { fadeUpVariants } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function HeroSection() {
  return (
    <section className="relative flex items-center justify-center lg:h-screen overflow-hidden pb-16 pt-24 md:pb-24 md:pt-28 lg:pb-32 lg:pt-32">
      <div
        className="pointer-events-none absolute -right-32 top-20 size-[420px] rounded-full bg-butter/50 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute left-1/3 top-1/2 size-72 rounded-full bg-coral/25 blur-3xl"
        aria-hidden
      />

      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUpVariants}
            className="relative z-10 flex flex-col items-center justify-center lg:block "
          >
            <span className="inline-block rounded-full border border-border/80 bg-white/70 px-4 py-1.5 font-body text-xs font-medium text-ink shadow-soft sm:text-sm">
              A youth-led mental health movement
            </span>

            <h1 className="mt-6 font-heading text-center lg:text-left text-[2.75rem] font-bold leading-[1.02] tracking-tight text-ink sm:text-5xl lg:text-[3.25rem] xl:text-6xl ">
              Uniting youth for{" "}
              <em className="text-coral not-italic text-nowrap">mental health</em>
              <br />
              <span className="italic">awareness.</span>
            </h1>

            <p className="mt-6 max-w-md text-center lg:text-left text-base leading-relaxed text-muted-foreground sm:text-lg">
              We are building a kinder generation through real conversations,
              free resources, and a community that shows up for each other.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button variant="primary" size="lg" asChild>
                <Link href={siteConfig.joinHref}>Get Involved</Link>
              </Button>
              <Button variant="secondary" size="lg" asChild>
                <Link href="/about">Learn More</Link>
              </Button>
            </div>

            <div className="mt-10 flex items-center gap-4">
              <div className="flex -space-x-3">
                {communityAvatars.map((src, i) => (
                  <div
                    key={src}
                    className={cn(
                      "relative size-10 overflow-hidden rounded-full border-2 border-cream ring-2 ring-cream sm:size-11",
                      i > 0 && "-ml-3"
                    )}
                  >
                    <Image
                      src={src}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="44px"
                    />
                  </div>
                ))}
              </div>
              <p className="font-body text-sm text-muted-foreground sm:text-base">
                <span className="font-semibold text-ink">2445+</span> young people
                already in the movement
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative mx-auto w-full max-w-lg lg:max-w-none lg:justify-self-end"
          >
            <div
              className="pointer-events-none absolute -left-8 top-8 size-64 rounded-full bg-butter/60 md:size-80"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -right-4 bottom-12 size-48 rounded-full bg-lilac-soft/80 md:size-56"
              aria-hidden
            />

            <div className="relative mx-auto aspect-square w-full max-w-[440px] lg:max-w-[480px]">
              <div className="absolute inset-0 overflow-hidden rounded-full shadow-card">
                <Image
                  src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80"
                  alt="Diverse group of young people laughing together"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 90vw, 480px"
                />
              </div>

              <motion.div
                animate={{ y: [-4, 4, -4] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -left-2 top-8 z-10 sm:left-0 sm:top-12 -rotate-4"
              >
                <span className="inline-block rounded-2xl rounded-bl-sm bg-butter px-4 py-2.5 font-body text-sm font-semibold text-ink shadow-soft">
                  you matter 🍁
                </span>
              </motion.div>

              <motion.div
                animate={{ y: [4, -4, 4] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-2 right-0 z-10 sm:right-4 rotate-4"
              >
                <span className="inline-block rounded-2xl rounded-br-sm bg-sage-soft px-4 py-2.5 font-body text-sm font-semibold text-ink shadow-soft">
                  it&apos;s okay to not be okay ☘️
                </span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
