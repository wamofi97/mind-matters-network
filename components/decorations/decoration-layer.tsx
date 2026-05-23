"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { BlobShape, FloatingCircle } from "./organic-shapes";
import { floatVariants } from "@/lib/motion";

type DecorationLayerProps = {
  className?: string;
  intensity?: "subtle" | "medium";
};

/**
 * Subtle ambient shapes for section backgrounds.
 * Keeps layouts feeling warm and editorial without overwhelming content.
 */
export function DecorationLayer({
  className,
  intensity = "subtle",
}: DecorationLayerProps) {
  const opacity = intensity === "subtle" ? "opacity-60" : "opacity-90";

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        opacity,
        className
      )}
      aria-hidden
    >
      <motion.div
        className="absolute -left-8 top-1/4"
        variants={floatVariants}
        initial="initial"
        animate="animate"
      >
        <BlobShape color="mint" size="lg" />
      </motion.div>

      <motion.div
        className="absolute right-[10%] top-12"
        variants={floatVariants}
        initial="initial"
        animate="animate"
        style={{ animationDelay: "1s" }}
      >
        <FloatingCircle color="butter" size="md" />
      </motion.div>

      <motion.div
        className="absolute bottom-16 left-[15%]"
        variants={floatVariants}
        initial="initial"
        animate="animate"
        style={{ animationDelay: "2s" }}
      >
        <BlobShape color="lilac" size="md" />
      </motion.div>

      <motion.div
        className="absolute bottom-1/4 right-4"
        variants={floatVariants}
        initial="initial"
        animate="animate"
      >
        <FloatingCircle color="coral" size="sm" />
      </motion.div>
    </div>
  );
}
