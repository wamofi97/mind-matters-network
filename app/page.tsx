import { PageShell } from "@/components/layout/page-shell";
import { Section } from "@/components/layout/section";
import { DecorationLayer } from "@/components/decorations/decoration-layer";
import { SoftDoodle } from "@/components/decorations/organic-shapes";
import { Button } from "@/components/ui/button";
import { PillTag } from "@/components/ui/pill-tag";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FadeUp, FadeUpItem } from "@/components/sections/fade-up";

/**
 * Design system foundation preview — not a production page.
 * Validates tokens, typography, components, and layout rhythm.
 */
export default function FoundationPage() {
  return (
    <PageShell>
      <div className="relative overflow-hidden">
        <DecorationLayer />

        <Section spacing="xl" className="relative text-center">
          <FadeUp>
            <p className="mb-4 font-body text-sm font-semibold uppercase tracking-widest text-sage">
              Design system foundation
            </p>
            <h1 className="text-balance font-heading text-ink">
              Mind Matters Network
            </h1>
            <SoftDoodle className="mx-auto mt-4" />
            <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
              Soft. Human. Warm. Youth-led. This preview confirms typography,
              color, spacing, and reusable components — ready for real pages.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Button variant="primary">Primary action</Button>
              <Button variant="secondary">Secondary action</Button>
            </div>
          </FadeUp>
        </Section>

        <Section spacing="md" className="relative">
          <FadeUp className="text-center">
            <h2 className="font-heading">Pill tags</h2>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <PillTag tone="butter">Wellness</PillTag>
              <PillTag tone="coral">Community</PillTag>
              <PillTag tone="mint">Mindfulness</PillTag>
              <PillTag tone="lilac">Youth-led</PillTag>
            </div>
          </FadeUp>
        </Section>

        <Section spacing="lg" className="relative">
          <FadeUp stagger className="text-center">
            <FadeUpItem>
              <h2 className="font-heading">Card system</h2>
              <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
                Large rounded corners, soft borders, airy padding.
              </p>
            </FadeUpItem>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <FadeUpItem>
                <Card variant="event">
                  <CardHeader>
                    <PillTag tone="mint" size="sm">
                      Event
                    </PillTag>
                    <CardTitle>Community Circle</CardTitle>
                    <CardDescription>
                      A gentle space to share and listen with peers.
                    </CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button variant="ghost" size="sm">
                      Learn more
                    </Button>
                  </CardFooter>
                </Card>
              </FadeUpItem>

              <FadeUpItem>
                <Card variant="resource">
                  <CardHeader>
                    <CardTitle>Resource guide</CardTitle>
                    <CardDescription>
                      Curated tools for mental wellness and self-care.
                    </CardDescription>
                  </CardHeader>
                </Card>
              </FadeUpItem>

              <FadeUpItem>
                <Card variant="quote">
                  <CardContent className="pt-0">
                    <blockquote className="font-heading text-xl text-ink">
                      &ldquo;You belong here. Your mind matters.&rdquo;
                    </blockquote>
                    <p className="mt-4 text-sm not-italic text-muted-foreground">
                      — Youth participant
                    </p>
                  </CardContent>
                </Card>
              </FadeUpItem>

              <FadeUpItem>
                <Card variant="team">
                  <div className="aspect-square bg-sage-soft" />
                  <CardHeader className="p-6">
                    <CardTitle>Team member</CardTitle>
                    <CardDescription>Youth advocate</CardDescription>
                  </CardHeader>
                </Card>
              </FadeUpItem>
            </div>
          </FadeUp>
        </Section>
      </div>
    </PageShell>
  );
}
