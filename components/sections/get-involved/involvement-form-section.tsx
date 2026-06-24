"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import {
  involvementPaths,
  interestOptions,
  type PathTone,
} from "@/constants/get-involved";
import { fadeUpVariants, staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/utils";

const toneStyles: Record<
  PathTone,
  { card: string; selected: string; chip: string; link: string }
> = {
  coral: {
    card: "bg-coral/20",
    selected: "ring-coral",
    chip: "bg-coral/15 text-coral",
    link: "text-coral",
  },
  butter: {
    card: "bg-butter/60",
    selected: "ring-butter",
    chip: "bg-ink/5 text-ink",
    link: "text-ink",
  },
  mint: {
    card: "bg-sage-soft",
    selected: "ring-sage",
    chip: "bg-deep-green/10 text-deep-green",
    link: "text-deep-green",
  },
};

const inputClasses =
  "h-12 w-full rounded-input border border-border bg-cream/40 px-4 font-body text-sm text-ink placeholder:text-muted-foreground/60 transition-colors focus:border-sage focus:bg-card focus:outline-none focus:ring-2 focus:ring-sage/30";

const labelClasses = "font-body text-sm font-semibold text-ink";

export function InvolvementFormSection() {
  const [selected, setSelected] = useState(involvementPaths[0].id);

  return (
    <section className="pb-20 md:pb-28">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="grid gap-5 md:grid-cols-3 lg:gap-6"
        >
          {involvementPaths.map((path) => {
            const tone = toneStyles[path.tone];
            const isSelected = selected === path.id;
            return (
              <motion.button
                key={path.id}
                type="button"
                onClick={() => setSelected(path.id)}
                variants={fadeUpVariants}
                aria-pressed={isSelected}
                className={cn(
                  "group flex flex-col rounded-card p-7 text-left transition-all duration-300 hover:-translate-y-1 lg:p-8",
                  tone.card,
                  isSelected
                    ? cn("shadow-card ring-2", tone.selected)
                    : "shadow-soft ring-2 ring-transparent"
                )}
              >
                <span className="text-3xl" aria-hidden>
                  {path.emoji}
                </span>
                <h3 className="mt-4 font-heading text-xl font-bold text-ink sm:text-2xl">
                  {path.title}
                </h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-ink/70">
                  {path.description}
                </p>

                <ul className="mt-4 flex flex-wrap gap-2">
                  {path.perks.map((perk) => (
                    <li
                      key={perk}
                      className={cn(
                        "rounded-full px-3 py-1 font-body text-xs font-semibold",
                        tone.chip
                      )}
                    >
                      {perk}
                    </li>
                  ))}
                </ul>

                <span
                  className={cn(
                    "mt-6 inline-flex items-center gap-1.5 font-body text-sm font-semibold",
                    tone.link
                  )}
                >
                  {isSelected ? (
                    <>
                      <Check className="size-4" /> Selected
                    </>
                  ) : (
                    <>Choose this &rarr;</>
                  )}
                </span>
              </motion.button>
            );
          })}
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUpVariants}
          className="mx-auto mt-12 max-w-7xl rounded-card border border-border/60 bg-card p-7 shadow-card sm:p-9 lg:mt-16 lg:p-10"
        >
          <h2 className="font-heading text-2xl font-bold text-ink sm:text-3xl">
            Tell us about you
          </h2>
          <p className="mt-2 font-body text-sm text-muted-foreground">
            We&apos;ll be in touch within 3 days.
          </p>

          <form className="mt-7 space-y-5" action="#" aria-label="Get involved form">
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="fullName" className={labelClasses}>
                  Full name
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="Your name"
                  className={inputClasses}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className={labelClasses}>
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@kind.email"
                  className={inputClasses}
                />
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="phone" className={labelClasses}>
                  Phone
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+1 555 0100"
                  className={inputClasses}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="interest" className={labelClasses}>
                  Interest
                </label>
                <select
                  id="interest"
                  name="interest"
                  value={selected}
                  onChange={(event) => setSelected(event.target.value)}
                  className={cn(inputClasses, "cursor-pointer appearance-none")}
                >
                  {interestOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="why" className={labelClasses}>
                Tell us why you&apos;re here
              </label>
              <textarea
                id="why"
                name="why"
                rows={5}
                placeholder="What pulled you toward this work?"
                className={cn(inputClasses, "h-auto resize-none py-3 leading-relaxed")}
              />
            </div>

            <Button type="submit" variant="donate" className="mt-2">
              Send my application &rarr;
            </Button>
          </form>
        </motion.div>
      </Container>
    </section>
  );
}
