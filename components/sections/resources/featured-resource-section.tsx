"use client";

import Link from "next/link";
import { Download } from "lucide-react";
import { motion } from "framer-motion";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { featuredResource } from "@/constants/resources";
import { fadeUpVariants } from "@/lib/motion";

export function FeaturedResourceSection() {
  const { tag, title, description, href, icon: Icon } = featuredResource;

  return (
    <section className="pb-12 md:pb-16">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUpVariants}
          className="relative overflow-hidden rounded-card bg-deep-green px-7 py-10 shadow-card sm:px-10 lg:px-14 lg:py-12"
        >
          <div
            className="pointer-events-none absolute -right-16 -top-20 size-72 rounded-full bg-warm-taupe/40"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -bottom-24 right-24 size-56 rounded-full bg-sage/20 blur-2xl"
            aria-hidden
          />

          <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-6">
              <span
                className="relative hidden size-24 shrink-0 items-center justify-center rounded-3xl bg-coral/90 shadow-soft sm:flex"
                aria-hidden
              >
                <Icon className="size-10 text-cream" strokeWidth={1.75} />
              </span>

              <div className="max-w-2xl">
                <span className="inline-flex items-center rounded-full bg-cream/10 px-4 py-1 font-body text-xs font-semibold tracking-wider text-cream/90 ring-1 ring-cream/15">
                  {tag}
                </span>
                <h2 className="mt-4 font-heading text-3xl font-bold leading-[1.08] text-cream sm:text-4xl lg:text-[2.75rem]">
                  {title}
                </h2>
                <p className="mt-4 max-w-xl font-body text-sm leading-relaxed text-cream/75 sm:text-base">
                  {description}
                </p>
              </div>
            </div>

            <Button
              variant="primary"
              className="w-fit shrink-0 bg-cream text-ink hover:bg-cream/90"
              asChild
            >
              <Link href={href}>
                Download free PDF
                <Download className="size-4" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
