import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { EditorialPageLayout } from "@/components/shared/editorial-page-layout";

export const metadata: Metadata = {
  title: "Crisis Help",
  description:
    "Immediate crisis support resources and emergency guidance for anyone who needs urgent help.",
};

const immediateSteps = [
  "If there is immediate danger, call your local emergency number now.",
  "Move to a safer place and stay with someone you trust if possible.",
  "Tell a trusted friend, family member, teacher, or colleague what is happening.",
];

const groundingSteps = [
  "Take 5 slow breaths: inhale for 4 counts, exhale for 6 counts.",
  "Name 5 things you can see, 4 you can feel, 3 you can hear.",
  "Drink water and place both feet firmly on the ground.",
];

const malaysiaSupportLines = [
  {
    name: "Emergency Services",
    contact: "999",
    contactHref: "tel:999",
    websiteLabel: "999 Emergency Services",
    websiteHref: "https://www.malaysia.gov.my/portal/content/30750",
    availability: "24/7",
    description:
      "For immediate danger, medical emergencies, or risk of harm to self or others.",
  },
  {
    name: "Talian HEAL (KKM)",
    contact: "15555",
    contactHref: "tel:15555",
    websiteLabel: "MOH HEAL 15555",
    websiteHref: "https://sites.google.com/moh.gov.my/ncemh/talian-sokongan-psikososial",
    availability: "Daily, 8:00 AM - 12:00 AM",
    description:
      "National mental health crisis support line by the Ministry of Health.",
  },
  {
    name: "Befrienders Kuala Lumpur",
    contact: "03-7627 2929",
    contactHref: "tel:+60376272929",
    websiteLabel: "Befrienders Kuala Lumpur",
    websiteHref: "https://www.befrienders.org.my/",
    availability: "24/7",
    description:
      "Confidential emotional support for people in distress or having suicidal thoughts.",
  },
  {
    name: "Talian Kasih",
    contact: "15999 / WhatsApp 019-261 5999",
    contactHref: "tel:15999",
    websiteLabel: "Talian Kasih",
    websiteHref:
      "https://www.malaysia.gov.my/en/categories/law--safety/vulnerable-groups/talian-kasih-15999",
    availability: "24/7",
    description:
      "Support for abuse, neglect, family crises, and vulnerable groups.",
  },
  {
    name: "Buddy Bear Childline",
    contact: "1800-18-2327",
    contactHref: "tel:+601800182327",
    websiteLabel: "Buddy Bear Childline",
    websiteHref: "https://www.humankind.my/buddybear-info",
    availability: "Daily, 6:00 PM - 12:00 AM",
    description:
      "Emotional support helpline for children and teenagers aged 6 to 18.",
  },
];

const supportPillars = [
  "Immediate safety",
  "Confidential support",
  "Malaysia resources",
];

export default function CrisisHelpPage() {
  return (
    <EditorialPageLayout
      eyebrow="Crisis Support"
      title="You are not alone. Help is available now."
      description="If you or someone else might be in danger, contact emergency services immediately. For urgent emotional support, reach out to a trusted person and a professional crisis service in your area as soon as possible."
      pillars={supportPillars}
    >
      <div className="mt-8 flex flex-wrap gap-3">
        <Button variant="primary" asChild>
          <Link href="/contact">Contact our team</Link>
        </Button>
        <Button variant="ghost" asChild>
          <Link href="/resources">Browse wellbeing resources</Link>
        </Button>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        <article className="rounded-card border border-border/60 bg-card p-6 shadow-soft transition-transform duration-300 hover:-translate-y-0.5">
          <div className="flex items-center gap-3">
            <span className="inline-flex size-8 items-center justify-center rounded-full bg-butter/70 font-body text-xs font-bold text-ink">
              01
            </span>
            <h2 className="font-heading text-2xl font-semibold text-ink">
              What to do right now
            </h2>
          </div>
          <ul className="mt-4 space-y-3">
            {immediateSteps.map((step) => (
              <li
                key={step}
                className="rounded-2xl border border-border/50 bg-cream px-4 py-3 font-body text-sm leading-relaxed text-ink/90"
              >
                {step}
              </li>
            ))}
          </ul>
        </article>

        <article className="rounded-card border border-border/60 bg-card p-6 shadow-soft transition-transform duration-300 hover:-translate-y-0.5">
          <div className="flex items-center gap-3">
            <span className="inline-flex size-8 items-center justify-center rounded-full bg-butter/70 font-body text-xs font-bold text-ink">
              02
            </span>
            <h2 className="font-heading text-2xl font-semibold text-ink">
              Quick grounding tools
            </h2>
          </div>
          <ul className="mt-4 space-y-3">
            {groundingSteps.map((step) => (
              <li
                key={step}
                className="rounded-2xl border border-border/50 bg-cream px-4 py-3 font-body text-sm leading-relaxed text-ink/90"
              >
                {step}
              </li>
            ))}
          </ul>
        </article>
      </div>

      <div className="mt-8 rounded-card border border-border/60 bg-card p-6 shadow-soft sm:p-8">
        <h2 className="font-heading text-2xl font-semibold text-ink">
          Malaysia support lines
        </h2>
        <p className="mt-3 font-body text-sm leading-relaxed text-muted-foreground sm:text-base">
          If you are in Malaysia, these services can provide urgent support.
        </p>
        <div className="mt-5 space-y-3">
          {malaysiaSupportLines.map((line) => (
            <article
              key={line.name}
              className="rounded-2xl border border-border/60 bg-cream/80 p-4"
            >
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="font-body text-base font-semibold text-ink">
                  {line.name}
                </h3>
                <p className="font-body text-xs font-medium uppercase tracking-widest text-deep-green/80">
                  {line.availability}
                </p>
              </div>
              <p className="mt-2 font-body text-sm leading-relaxed text-ink/90">
                {line.description}
              </p>
              <p className="mt-3 font-body text-sm font-semibold text-ink">
                Contact:{" "}
                <Link
                  href={line.contactHref}
                  className="text-deep-green underline-offset-2 hover:underline"
                >
                  {line.contact}
                </Link>
              </p>
              <p className="mt-1 font-body text-sm font-semibold text-ink">
                Website:{" "}
                <Link
                  href={line.websiteHref}
                  className="text-deep-green underline-offset-2 hover:underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  {line.websiteLabel}
                </Link>
              </p>
            </article>
          ))}
        </div>
        <p className="mt-4 font-body text-xs leading-relaxed text-muted-foreground">
          Helpline details can change. Please verify current operating hours with
          the provider if a line is unavailable.
        </p>
      </div>

      <div className="mt-8 rounded-card border border-border/60 bg-card p-6 shadow-soft sm:p-8">
        <h2 className="font-heading text-2xl font-semibold text-ink">
          Important note
        </h2>
        <p className="mt-4 font-body text-base leading-relaxed text-muted-foreground">
          Mind Matters Network is a community-led initiative and cannot provide
          emergency medical or psychiatric care. This page is educational and
          supportive, but it is not a substitute for licensed professional
          services.
        </p>
      </div>
    </EditorialPageLayout>
  );
}
