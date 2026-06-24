"use client";

import { type FormEvent, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { type ContactSettings } from "@/lib/content/contact";
import { getSocialIcon } from "@/lib/content/icons";
import { fadeUpVariants, staggerContainer } from "@/lib/motion";
import { submitForm } from "@/lib/submit-form";

const inputClasses =
  "h-12 w-full rounded-input border border-border bg-cream/40 px-4 font-body text-sm text-ink placeholder:text-muted-foreground/60 transition-colors focus:border-sage focus:bg-card focus:outline-none focus:ring-2 focus:ring-sage/30";

const labelClasses =
  "font-body text-sm font-semibold text-ink";

type ContactFormSectionProps = {
  contact: ContactSettings;
};

export function ContactFormSection({ contact }: ContactFormSectionProps) {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;

    const form = e.currentTarget;
    const data = new FormData(form);

    setSubmitting(true);
    setError(null);

    const result = await submitForm({
      kind: "contact",
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      subject: String(data.get("subject") ?? ""),
      message: String(data.get("message") ?? ""),
      company: String(data.get("company") ?? ""),
    });

    setSubmitting(false);

    if (result.ok) {
      setSubmitted(true);
    } else {
      setError(result.error);
    }
  }

  return (
    <section className="pb-20 md:pb-28">
      <Container>
        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:gap-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUpVariants}
            className="rounded-card border border-border/60 bg-card p-7 shadow-soft sm:p-9 lg:p-10"
          >
            <h2 className="font-heading text-2xl font-bold text-ink sm:text-3xl">
              Send a message
            </h2>

            {submitted ? (
              <div className="mt-7 rounded-input border border-sage/40 bg-sage-soft/50 p-6">
                <p className="font-heading text-lg font-bold text-deep-green">
                  Message sent — thank you.
                </p>
                <p className="mt-1 font-body text-sm text-ink/80">
                  We&apos;ll get back to you soon.
                </p>
              </div>
            ) : (
            <form
              className="mt-7 space-y-5"
              onSubmit={handleSubmit}
              aria-label="Contact form"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="name" className={labelClasses}>
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
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

              <div className="space-y-2">
                <label htmlFor="subject" className={labelClasses}>
                  Subject
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder="What's this about?"
                  className={inputClasses}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className={labelClasses}>
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  placeholder="Take your time..."
                  className={`${inputClasses} h-auto resize-none py-3 leading-relaxed`}
                />
              </div>

              <input
                type="text"
                name="company"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden
                className="hidden"
              />

              {error && (
                <p className="font-body text-sm text-coral" role="alert">
                  {error}
                </p>
              )}

              <Button
                type="submit"
                variant="donate"
                className="mt-2"
                disabled={submitting}
              >
                {submitting ? "Sending…" : "Send message →"}
              </Button>
            </form>
            )}
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="space-y-6"
          >
            <motion.div
              variants={fadeUpVariants}
              className="relative overflow-hidden rounded-card bg-coral p-7 text-cream shadow-soft sm:p-8"
            >
              <div
                className="pointer-events-none absolute -right-6 -top-6 size-32 rounded-full bg-cream/15"
                aria-hidden
              />
              <p className="font-heading text-sm font-semibold italic text-cream/90">
                Drop in
              </p>
              <a
                href={`mailto:${contact.email}`}
                className="mt-3 block font-heading text-xl font-bold text-cream transition-opacity hover:opacity-90 sm:text-2xl"
              >
                {contact.email}
              </a>
              <p className="mt-2 font-body text-sm text-cream/85">
                {contact.phone}
              </p>
            </motion.div>

            <motion.div
              variants={fadeUpVariants}
              className="rounded-card border border-border/60 bg-card p-7 shadow-soft sm:p-8"
            >
              <p className="font-heading text-sm font-semibold italic text-coral">
                Visit us
              </p>
              <address className="mt-3 not-italic font-body text-base leading-relaxed text-ink">
                {contact.addressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
              <p className="mt-2 font-body text-sm text-muted-foreground">
                {contact.hours}
              </p>
            </motion.div>

            <motion.div
              variants={fadeUpVariants}
              className="rounded-card bg-butter/70 p-7 shadow-soft sm:p-8"
            >
              <p className="font-heading text-sm font-semibold italic text-coral">
                Find us online
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                {contact.socials.map((social) => {
                  const Icon = getSocialIcon(social.icon);
                  return (
                    <Link
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-full bg-card px-4 py-2 font-body text-sm font-semibold text-ink shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-card"
                    >
                      <Icon className="size-4" />
                      {social.label}
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
