"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Container } from "@/components/layout/container";
import { SectionHeader, CoralEmphasis } from "@/components/shared/section-header";
import { fadeUpVariants } from "@/lib/motion";

import institutionLogo0 from "@/assets/institutions/Logo.png";
import institutionLogo1 from "@/assets/institutions/Logo-1.png";
import institutionLogo2 from "@/assets/institutions/Logo-2.png";
import institutionLogo3 from "@/assets/institutions/Logo-3.png";
import institutionLogo4 from "@/assets/institutions/Logo-4.png";
import institutionLogo5 from "@/assets/institutions/Logo-5.png";
import institutionLogo6 from "@/assets/institutions/Logo-6.png";
import institutionLogo7 from "@/assets/institutions/Logo-7.png";
import institutionLogo8 from "@/assets/institutions/Logo-8.png";
import institutionLogo9 from "@/assets/institutions/Logo-9.png";
import institutionLogo10 from "@/assets/institutions/Logo-10.png";
import institutionLogo11 from "@/assets/institutions/Logo-11.png";

const partnerLogos = [
  { id: 1, name: "Institution 1", logo: institutionLogo0 },
  { id: 2, name: "Institution 2", logo: institutionLogo1 },
  { id: 3, name: "Institution 3", logo: institutionLogo2 },
  { id: 4, name: "Institution 4", logo: institutionLogo3 },
  { id: 5, name: "Institution 5", logo: institutionLogo4 },
  { id: 6, name: "Institution 6", logo: institutionLogo5 },
  { id: 7, name: "Institution 7", logo: institutionLogo6 },
  { id: 8, name: "Institution 8", logo: institutionLogo7 },
  { id: 9, name: "Institution 9", logo: institutionLogo8 },
  { id: 10, name: "Institution 10", logo: institutionLogo9 },
  { id: 11, name: "Institution 11", logo: institutionLogo10 },
  { id: 12, name: "Institution 12", logo: institutionLogo11 },
];

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
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    className="h-8 w-auto object-contain opacity-70 grayscale-25 transition-all duration-500 hover:opacity-100 hover:grayscale-0 hover:scale-102 sm:h-10"
                  />
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
