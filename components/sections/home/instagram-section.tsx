"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Container } from "@/components/layout/container";
import { siteConfig } from "@/constants/navigation";
import { instagramPosts } from "@/constants/homepage";
import { fadeUpVariants, staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/utils";

const staggerOffsets = [
  "lg:mt-0",
  "lg:-mt-8",
  "lg:mt-0",
  "lg:mt-6",
  "lg:-mt-4",
  "lg:mt-4",
];

export function InstagramSection() {
  return (
    <section className="py-20 md:py-28 lg:py-32">
      <Container>
        <motion.div
          className="text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUpVariants}
        >
          <Link
            href="https://instagram.com"
            className="inline-block rounded-full border border-border bg-white/80 px-4 py-1.5 font-body text-sm font-medium text-ink shadow-soft transition-colors hover:border-sage"
          >
            {siteConfig.instagram}
          </Link>
          <h2 className="mt-6 font-heading text-4xl font-bold text-ink sm:text-5xl lg:text-6xl">
            Find us on the gram 🌸
          </h2>
        </motion.div>

        <motion.div
          className="mx-auto mt-14 grid max-w-5xl grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:mt-16 lg:gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={staggerContainer}
        >
          {instagramPosts.map((post, i) => (
            <motion.div
              key={post.image}
              variants={fadeUpVariants}
              className={cn(
                "relative aspect-square overflow-hidden rounded-[24px] shadow-soft transition-transform duration-300 hover:scale-[1.02] lg:rounded-[28px]",
                staggerOffsets[i]
              )}
            >
              <Image
                src={post.image}
                alt={post.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
