"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { fadeUpVariants, staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/utils";

type FadeUpProps = HTMLMotionProps<"div"> & {
  stagger?: boolean;
};

export function FadeUp({ className, stagger = false, children, ...props }: FadeUpProps) {
  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={stagger ? staggerContainer : fadeUpVariants}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function FadeUpItem({ className, children, ...props }: HTMLMotionProps<"div">) {
  return (
    <motion.div className={cn(className)} variants={fadeUpVariants} {...props}>
      {children}
    </motion.div>
  );
}
