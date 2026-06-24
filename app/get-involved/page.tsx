import type { Metadata } from "next";
import { PageShell } from "@/components/layout/page-shell";
import { GetInvolvedHeroSection } from "@/components/sections/get-involved/get-involved-hero-section";
import { InvolvementFormSection } from "@/components/sections/get-involved/involvement-form-section";
import { VolunteerVoicesSection } from "@/components/sections/get-involved/volunteer-voices-section";
import { getGetInvolvedSettings } from "@/lib/content/get-involved";

export const metadata: Metadata = {
  title: "Get Involved",
  description:
    "Volunteer, lead a campus chapter, or partner with Mind Matters Network. Whatever your time, skill, or geography — there's a way to plug in.",
};

export default async function GetInvolvedPage() {
  const { hero, voicesHeading, paths, voices } =
    await getGetInvolvedSettings();

  return (
    <PageShell>
      <div
        className="pointer-events-none absolute -right-24 -top-16 size-[420px] rounded-full bg-sage-soft/30 blur-2xl md:size-[520px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-32 top-1/3 size-72 rounded-full bg-lilac-soft blur-3xl"
        aria-hidden
      />
      <GetInvolvedHeroSection hero={hero} />
      <InvolvementFormSection paths={paths} />
      <VolunteerVoicesSection voices={voices} heading={voicesHeading} />
    </PageShell>
  );
}
