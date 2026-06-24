import type { Metadata } from "next";
import { PageShell } from "@/components/layout/page-shell";
import { ContactHeroSection } from "@/components/sections/contact/contact-hero-section";
import { ContactFormSection } from "@/components/sections/contact/contact-form-section";
import { getContactSettings } from "@/lib/content/contact";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Reach out to Mind Matters Network — whether you're looking for community, a partner, or just a curious soul, drop us a line.",
};

export default async function ContactPage() {
  const contact = await getContactSettings();

  return (
    <PageShell>
      <div
        className="pointer-events-none absolute -left-40 -top-16 size-[420px] rounded-full bg-lilac-soft/70 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-32 top-10 size-[460px] rounded-full bg-butter/40 blur-3xl"
        aria-hidden
      />
      <ContactHeroSection hero={contact.hero} />
      <ContactFormSection contact={contact} />
    </PageShell>
  );
}
