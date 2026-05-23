"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/constants/navigation";
import { fadeUpVariants } from "@/lib/motion";

export function CtaBannerSection() {
  return (
    <section className="py-12 md:py-16 lg:py-20">
      <Container>
        <motion.div
          className="relative overflow-hidden rounded-[40px] bg-coral px-8 py-14 md:px-14 md:py-16 lg:px-20 lg:py-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeUpVariants}
        >
          <div
            className="pointer-events-none absolute -right-16 top-1/2 size-72 -translate-y-1/2 rounded-full bg-coral/80 opacity-60 blur-sm md:size-96"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute right-8 top-8 size-48 rounded-[40%_60%_50%_40%] bg-[#e86b6b]/50 md:right-16 md:size-64"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute bottom-4 right-24 size-32 rounded-full bg-[#e86b6b]/40 md:size-40"
            aria-hidden
          />

          <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <h2 className="max-w-xl font-heading text-4xl font-bold leading-[1.05] text-cream sm:text-5xl lg:text-[3.25rem]">
              Join a movement
              <br />
              that <em className="text-butter not-italic">shows up.</em>
            </h2>
            <Button
              variant="primary"
              size="lg"
              className="w-fit shrink-0 bg-deep-green hover:bg-deep-green/90"
              asChild
            >
              <Link href={siteConfig.joinHref}>Join the Movement</Link>
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
