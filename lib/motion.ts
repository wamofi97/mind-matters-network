import type { Variants, Transition } from "framer-motion";

/** Calm, slow motion defaults for the brand */
export const gentleTransition: Transition = {
  duration: 0.6,
  ease: [0.25, 0.1, 0.25, 1],
};

export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: gentleTransition,
  },
};

export const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: gentleTransition,
  },
};

export const floatVariants: Variants = {
  initial: { y: 0 },
  animate: {
    y: [-6, 6, -6],
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};
