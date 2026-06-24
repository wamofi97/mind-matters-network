"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Container } from "@/components/layout/container";
import { SectionHeader, CoralEmphasis } from "@/components/shared/section-header";
import { type SectionHeading } from "@/lib/content/page-content";
import { type Partner } from "@/lib/content/partners";
import { fadeUpVariants } from "@/lib/motion";

type PartnersSectionProps = {
  heading: SectionHeading;
  partners: Partner[];
};

export function PartnersSection({ heading, partners }: PartnersSectionProps) {
  return (
    <section className="py-20 md:py-28 lg:py-32">
      <Container>
        <SectionHeader label={heading.label} align="center">
          <h2 className="text-balance font-heading text-4xl font-bold leading-[1.08] text-ink sm:text-5xl lg:text-6xl">
            {heading.headingLead}{" "}
            <CoralEmphasis>{heading.headingEmphasis}</CoralEmphasis>
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
              {partners.map((partner, i) => {
                const logo = (
                  <Image
                    src={partner.src}
                    alt={partner.name}
                    width={partner.width}
                    height={partner.height}
                    className="h-8 w-auto object-contain opacity-70 grayscale-25 transition-all duration-500 hover:opacity-100 hover:grayscale-0 hover:scale-102 sm:h-10"
                  />
                );
                return (
                  <div
                    key={`${partner.name}-${i}`}
                    className="flex items-center justify-center px-4"
                  >
                    {partner.href ? (
                      <Link
                        href={partner.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={partner.name}
                      >
                        {logo}
                      </Link>
                    ) : (
                      logo
                    )}
                  </div>
                );
              })}
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
