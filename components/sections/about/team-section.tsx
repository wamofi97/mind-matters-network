"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/components/layout/container";
import { SectionHeader, CoralEmphasis } from "@/components/shared/section-header";
import { type TeamTone } from "@/constants/about";
import { type TeamMemberContent } from "@/lib/content/team";
import { type SectionHeading } from "@/lib/content/page-content";
import { fadeUpVariants, staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/utils";

const toneBg: Record<TeamTone, string> = {
  coral: "bg-coral/25",
  butter: "bg-butter/50",
  mint: "bg-sage-soft",
  lilac: "bg-lilac-soft",
};

type TeamSectionProps = {
  team: TeamMemberContent[];
  heading: SectionHeading;
};

export function TeamSection({ team, heading }: TeamSectionProps) {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <SectionHeader label={heading.label}>
          <h2 className="font-heading text-4xl font-bold leading-[1.08] text-ink sm:text-5xl lg:text-6xl">
            {heading.headingLead}{" "}
            <CoralEmphasis>{heading.headingEmphasis}</CoralEmphasis>
          </h2>
        </SectionHeader>

        <motion.div
          className="mt-14 grid grid-cols-2 gap-5 lg:mt-16 lg:grid-cols-4 lg:gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={staggerContainer}
        >
          {team.map((member) => (
            <motion.article
              key={member.name}
              variants={fadeUpVariants}
              className="group flex flex-col overflow-hidden rounded-card border border-border/60 bg-card shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card"
            >
              <div
                className={cn(
                  "relative aspect-square overflow-hidden rounded-card-top",
                  toneBg[member.tone]
                )}
              >
                {member.image ? (
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                ) : null}
              </div>
              <div className="px-5 py-4">
                <h3 className="font-heading text-lg font-semibold text-ink">
                  {member.name}
                </h3>
                <p className="mt-0.5 font-body text-sm text-muted-foreground">
                  {member.role}
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
