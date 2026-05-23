"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Container } from "@/components/layout/container";
import { SectionHeader, CoralEmphasis } from "@/components/shared/section-header";
import { partnerLogos } from "@/constants/homepage";
import { fadeUpVariants } from "@/lib/motion";

export function PartnersSection() {
  return (
    <section className="py-20 md:py-28 lg:py-32">
      <Container>
        <SectionHeader label="Our partners" align="center">
          <h2 className="text-balance font-heading text-4xl font-bold leading-[1.08] text-ink sm:text-5xl lg:text-6xl">
            Participating <CoralEmphasis>institutions.</CoralEmphasis>
          </h2>
        </SectionHeader>

        <motion.div
          className="mt-14 lg:mt-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeUpVariants}
        >
          <div className="border-t border-border/80 pt-12">
            <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 lg:gap-y-12">
              {partnerLogos.map((partner) => (
                <div
                  key={partner.id}
                  className="flex items-center justify-center px-4"
                >
                  <span className="font-body text-lg font-semibold tracking-tight text-ink/25 grayscale sm:text-xl">
                    Logoipsum
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/partners"
              className="inline-flex items-center gap-2 font-body text-sm font-semibold text-ink transition-colors hover:text-coral"
            >
              Become a partner
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
