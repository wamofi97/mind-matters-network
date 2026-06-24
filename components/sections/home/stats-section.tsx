"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView } from "framer-motion";
import { Container } from "@/components/layout/container";
import { BlobShape } from "@/components/decorations/organic-shapes";
import { SectionHeader, CoralEmphasis } from "@/components/shared/section-header";
import { type HomeStat } from "@/lib/content/home";
import { getFeatureIcon } from "@/lib/content/icons";
import { fadeUpVariants, staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/utils";

type Stat = HomeStat;
type Tone = Stat["tone"];

const toneStyles = {
  coral: "bg-coral/20 border-coral/20",
  butter: "bg-butter/40 border-butter/20",
  mint: "bg-sage-soft/30 border-sage-soft/20",
  lilac: "bg-lilac-soft border-lilac-soft/20",
};

const blobColors: Record<Tone, "coral" | "butter" | "mint" | "lilac"> = {
  coral: "coral",
  butter: "butter",
  mint: "mint",
  lilac: "lilac",
};

// Varied blob placements so each card feels a little different.
const blobPositions = [
  "-right-12 -top-12 rotate-0",
  "-left-14 -bottom-14 rotate-45",
  "-right-10 -bottom-16 -rotate-12",
  "-left-12 -top-16 rotate-12",
  "-right-16 top-1/3 rotate-90",
];

function StatCard({ stat, index }: { stat: Stat; index: number }) {
  const Icon = getFeatureIcon(stat.icon);
  const blobPosition = blobPositions[index % blobPositions.length];
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const target = parseInt(stat.value, 10);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView || Number.isNaN(target)) return;
    const controls = animate(0, target, {
      duration: 1.6,
      ease: [0.25, 0.1, 0.25, 1],
      onUpdate: (value) => setCount(Math.round(value)),
    });
    return () => controls.stop();
  }, [inView, target]);

  const display = Number.isNaN(target) ? stat.value : count.toLocaleString();

  return (
    <motion.div
      ref={ref}
      variants={fadeUpVariants}
      className={cn(
        "group relative flex min-h-[160px] flex-col justify-center overflow-hidden rounded-card border p-8 shadow-soft transition-transform duration-300 hover:-translate-y-1.5 lg:min-h-[180px] lg:p-10",
        toneStyles[stat.tone]
      )}
    >
      <BlobShape
        color={blobColors[stat.tone]}
        size="lg"
        className={cn(
          "absolute transition-transform duration-500 group-hover:scale-110",
          blobPosition
        )}
      />

      <div className="relative z-10 flex flex-col items-center">
          <Icon className="mb-2 h-6 w-6 text-ink" strokeWidth={2} />
        <p className="font-heading text-4xl font-bold tracking-tight text-ink tabular-nums lg:text-5xl">
          {display}
        </p>
        <div className="flex flex-col items-center gap-2">
          <p className="font-body text-sm text-center leading-snug text-ink sm:text-base">
            {stat.label}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

type StatsSectionProps = {
  stats: HomeStat[];
};

export function StatsSection({ stats }: StatsSectionProps) {
  return (
    <section className="py-20 md:py-28 lg:py-32">
      <Container>
        <SectionHeader label="By the numbers" align="center">
          <h2 className="text-balance font-heading text-4xl font-bold leading-[1.08] text-ink sm:text-5xl lg:text-[3.25rem] xl:text-6xl">
            A loud little movement,{" "}
            <CoralEmphasis>measured in smiles.</CoralEmphasis>
          </h2>
        </SectionHeader>

        <motion.div
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={staggerContainer}
        >
          {stats.map((stat, index) => (
            <StatCard key={stat.label} stat={stat} index={index} />
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
