"use client";

import { type FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { submitForm } from "@/lib/submit-form";

type NewsletterFormProps = {
  placeholder: string;
  buttonLabel: string;
};

export function NewsletterForm({
  placeholder,
  buttonLabel,
}: NewsletterFormProps) {
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
      kind: "newsletter",
      name: "",
      email: String(data.get("email") ?? ""),
      company: String(data.get("company") ?? ""),
    });

    setSubmitting(false);

    if (result.ok) {
      setSubmitted(true);
    } else {
      setError(result.error);
    }
  }

  if (submitted) {
    return (
      <p className="mt-7 font-body text-base font-medium text-butter">
        You&apos;re subscribed — watch your inbox.
      </p>
    );
  }

  return (
    <form
      className="mt-7 flex max-w-md flex-col gap-3"
      onSubmit={handleSubmit}
      aria-label="Newsletter signup"
    >
      <div className="flex items-center gap-3">
        <input
          type="email"
          name="email"
          required
          placeholder={placeholder}
          className="h-12 min-w-0 flex-1 rounded-full border border-cream/20 bg-cream/10 px-5 font-body text-sm text-cream placeholder:text-cream/50 focus:outline-none focus:ring-2 focus:ring-sage"
          aria-label="Email address"
        />
        <input
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden
          className="hidden"
        />
        <Button
          variant="unstyled"
          size="none"
          type="submit"
          disabled={submitting}
          className="h-12 shrink-0 rounded-full bg-sage px-7 font-body text-sm font-semibold text-cream transition-colors hover:bg-sage/90 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {submitting ? "Subscribing…" : buttonLabel}
        </Button>
      </div>
      {error && (
        <p className="font-body text-sm text-butter" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}
