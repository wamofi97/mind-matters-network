"use client";

import { type FormEvent, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { fadeUpVariants } from "@/lib/motion";
import { submitForm } from "@/lib/submit-form";
import type { EventItem } from "@/constants/events";

export function EventCtaBanner({ event }: { event: EventItem }) {
  const isPast = event.status === "past";
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;

    const form = e.currentTarget;
    const data = new FormData(form);

    setSubmitting(true);
    setError(null);

    const result = await submitForm({
      kind: "eventRegistration",
      name: String(data.get("name") ?? ""),
      phone: String(data.get("phone") ?? ""),
      email: String(data.get("email") ?? ""),
      company: String(data.get("company") ?? ""),
      eventTitle: event.title,
      eventSlug: event.slug,
    });

    setSubmitting(false);

    if (result.ok) {
      setSubmitted(true);
    } else {
      setError(result.error);
    }
  }

  return (
    <section
      id="save-your-spot"
      className="scroll-mt-24 py-12 md:py-16"
    >
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeUpVariants}
          className="relative overflow-hidden rounded-card bg-deep-green px-7 py-10 text-cream shadow-card md:px-12 md:py-14"
        >
          <div
            className="pointer-events-none absolute -right-16 -top-16 size-64 rounded-full bg-cream/10 blur-2xl"
            aria-hidden
          />

          <div className="relative grid items-center gap-8 lg:grid-cols-2">
            <div>
              <h2 className="font-heading text-butter text-3xl font-bold leading-tight sm:text-4xl">
                {isPast ? "Catch the recap" : "Save your spot"}
              </h2>
              <p className="mt-3 max-w-md font-body text-sm leading-relaxed text-cream/80 sm:text-base">
                {isPast
                  ? "This one's wrapped, but the conversation lives on. Watch the recap and join the next."
                  : "There are limited spots available — register and we'll send the details to your inbox."}
              </p>
            </div>

            {isPast ? (
              <div className="flex flex-wrap gap-3 lg:justify-end">
                <Button
                  variant="unstyled"
                  size="none"
                  className="rounded-full bg-cream px-6 py-3 font-body text-sm font-semibold text-deep-green transition-transform duration-300 hover:scale-[1.02]"
                  asChild
                >
                  <Link href="#recap">
                    View Recap
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <Button
                  variant="unstyled"
                  size="none"
                  className="rounded-full border-2 border-cream/40 px-6 py-3 font-body text-sm font-semibold text-cream transition-colors duration-300 hover:bg-cream/10"
                  asChild
                >
                  <Link href="/events">
                    See upcoming
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </div>
            ) : submitted ? (
              <p className="font-body text-base font-medium text-cream lg:text-right">
                You&apos;re on the list — see you there.
              </p>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex w-full flex-col gap-3 lg:ml-auto lg:max-w-sm"
              >
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Your name"
                  aria-label="Full name"
                  className="w-full rounded-full border border-cream/20 bg-cream/10 px-5 py-3 font-body text-sm text-cream placeholder:text-cream/50 focus:outline-none focus:ring-2 focus:ring-cream/40"
                />
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="Phone number"
                  aria-label="Phone number"
                  className="w-full rounded-full border border-cream/20 bg-cream/10 px-5 py-3 font-body text-sm text-cream placeholder:text-cream/50 focus:outline-none focus:ring-2 focus:ring-cream/40"
                />
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="you@email.com"
                  aria-label="Email address"
                  className="w-full rounded-full border border-cream/20 bg-cream/10 px-5 py-3 font-body text-sm text-cream placeholder:text-cream/50 focus:outline-none focus:ring-2 focus:ring-cream/40"
                />
                <input
                  type="text"
                  name="company"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden
                  className="hidden"
                />
                {error && (
                  <p className="font-body text-sm text-butter" role="alert">
                    {error}
                  </p>
                )}
                <Button
                  variant="unstyled"
                  size="none"
                  type="submit"
                  disabled={submitting}
                  className="shrink-0 rounded-full bg-coral px-6 py-3 font-body text-sm font-semibold text-cream transition-transform duration-300 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {submitting ? "Reserving…" : "Reserve my spot"}
                </Button>
              </form>
            )}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
