import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { EditorialPageLayout } from "@/components/shared/editorial-page-layout";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "How Mind Matters Network handles personal information and protects your privacy.",
};

const policySections = [
  {
    title: "Information we collect",
    points: [
      "Contact details you submit through forms (such as name, email, and message content).",
      "Basic usage information needed to improve site performance and user experience.",
      "Any details you voluntarily share when joining programs, events, or newsletters.",
    ],
  },
  {
    title: "How we use your information",
    points: [
      "To respond to inquiries and provide support related to our programs.",
      "To manage event participation, volunteer engagement, and community updates.",
      "To improve our services, safeguarding practices, and communication quality.",
    ],
  },
  {
    title: "Data sharing and disclosure",
    points: [
      "We do not sell your personal information.",
      "We only share data with trusted service providers when necessary to operate our services.",
      "We may disclose information when legally required or to protect safety and wellbeing.",
    ],
  },
  {
    title: "Retention and security",
    points: [
      "We retain personal information only as long as needed for operational or legal purposes.",
      "Reasonable technical and organizational safeguards are applied to protect your data.",
      "No online system is 100% secure, but we continuously improve our security practices.",
    ],
  },
  {
    title: "Your choices and rights",
    points: [
      "You may request access, correction, or deletion of your personal information.",
      "You may opt out of non-essential communications at any time.",
      "Questions about data practices can be submitted through our contact page.",
    ],
  },
];

const trustPillars = [
  "Transparency",
  "Minimal collection",
  "Respectful communication",
];

export default function PrivacyPage() {
  return (
    <EditorialPageLayout
      eyebrow="Privacy"
      title="Privacy Policy"
      description="Mind Matters Network is committed to protecting your personal information and treating it responsibly. This page outlines what we collect, why we collect it, and the choices you have over your data."
      lastUpdated="July 2026"
      pillars={trustPillars}
    >
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {policySections.map((section, index) => (
          <article
            key={section.title}
            className="rounded-card border border-border/60 bg-card p-6 shadow-soft transition-transform duration-300 hover:-translate-y-0.5 sm:p-8"
          >
            <div className="flex items-center gap-3">
              <span className="inline-flex size-8 items-center justify-center rounded-full bg-butter/70 font-body text-xs font-bold text-ink">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h2 className="font-heading text-2xl font-semibold text-ink">
                {section.title}
              </h2>
            </div>
            <ul className="mt-4 space-y-3">
              {section.points.map((point) => (
                <li
                  key={point}
                  className="rounded-2xl border border-border/50 bg-cream px-4 py-3 font-body text-sm leading-relaxed text-ink/90"
                >
                  {point}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <div className="mt-8 rounded-card border border-border/60 bg-card p-6 shadow-soft sm:p-8">
        <h2 className="font-heading text-2xl font-semibold text-ink">
          Contact us about privacy
        </h2>
        <p className="mt-4 max-w-3xl font-body text-base leading-relaxed text-muted-foreground">
          If you want to ask a question, request data correction, or request
          deletion, please contact us and we will assist as soon as possible.
        </p>
        <div className="mt-6">
          <Button variant="primary" asChild>
            <Link href="/contact">Go to contact page</Link>
          </Button>
        </div>
      </div>
    </EditorialPageLayout>
  );
}
