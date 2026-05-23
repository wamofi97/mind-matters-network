"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { fadeUpVariants } from "@/lib/motion";
import { Container } from "./container";

type SectionSpacing = "sm" | "md" | "lg" | "xl";

const spacingMap: Record<SectionSpacing, string> = {
  sm: "py-16 md:py-20",
  md: "py-20 md:py-28",
  lg: "py-24 md:py-32 lg:py-36",
  xl: "py-28 md:py-36 lg:py-40",
};

type SectionProps = React.HTMLAttributes<HTMLElement> & {
  spacing?: SectionSpacing;
  container?: boolean;
  narrow?: boolean;
  animate?: boolean;
  id?: string;
};

export function Section({
  className,
  spacing = "md",
  container = true,
  narrow = false,
  animate = true,
  children,
  id,
  ...props
}: SectionProps) {
  const content = container ? (
    <Container narrow={narrow}>{children}</Container>
  ) : (
    children
  );

  if (!animate) {
    return (
      <section
        id={id}
        className={cn(spacingMap[spacing], className)}
        {...props}
      >
        {content}
      </section>
    );
  }

  return (
    <motion.section
      id={id}
      className={cn(spacingMap[spacing], className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={fadeUpVariants}
      {...props}
    >
      {content}
    </motion.section>
  );
}
