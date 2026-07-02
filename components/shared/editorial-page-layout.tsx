import { type ReactNode } from "react";
import { PageShell } from "@/components/layout/page-shell";
import { Container } from "@/components/layout/container";

type EditorialPageLayoutProps = {
  eyebrow: string;
  title: string;
  description: string;
  lastUpdated?: string;
  pillars?: string[];
  children: ReactNode;
};

export function EditorialPageLayout({
  eyebrow,
  title,
  description,
  lastUpdated,
  pillars = [],
  children,
}: EditorialPageLayoutProps) {
  return (
    <PageShell className="isolate overflow-hidden">
      <div
        className="pointer-events-none absolute -left-36 -top-16 -z-10 size-[420px] rounded-full bg-lilac-soft/70 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-24 top-44 -z-10 size-[420px] rounded-full bg-butter/45 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute left-1/2 top-[34%] -z-10 size-[340px] -translate-x-1/2 rounded-full bg-sage-soft/45 blur-3xl"
        aria-hidden
      />

      <section className="py-16 md:py-24">
        <Container className="max-w-5xl">
          <div className="relative overflow-hidden rounded-card border border-border/60 bg-card/95 p-7 shadow-soft sm:p-10">
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-1.5 bg-linear-to-r from-lilac-soft via-butter to-sage-soft"
              aria-hidden
            />
            <p className="font-body text-sm font-semibold uppercase tracking-[0.18em] text-deep-green/80">
              {eyebrow}
            </p>
            <h1 className="mt-4 font-heading text-4xl font-bold leading-[1.1] text-ink sm:text-5xl">
              {title}
            </h1>
            <p className="mt-6 max-w-3xl font-body text-base leading-relaxed text-muted-foreground sm:text-lg">
              {description}
            </p>
            {lastUpdated ? (
              <p className="mt-4 font-body text-sm text-muted-foreground">
                Last updated: {lastUpdated}
              </p>
            ) : null}
            {pillars.length > 0 ? (
              <div className="mt-6 flex flex-wrap gap-2">
                {pillars.map((pillar) => (
                  <span
                    key={pillar}
                    className="rounded-full border border-sage/30 bg-sage-soft/40 px-3 py-1.5 font-body text-xs font-semibold uppercase tracking-widest text-deep-green"
                  >
                    {pillar}
                  </span>
                ))}
              </div>
            ) : null}
          </div>

          {children}
        </Container>
      </section>
    </PageShell>
  );
}
