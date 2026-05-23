import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { footerLinkGroups, siteConfig } from "@/constants/navigation";
import { Button } from "@/components/ui/button";
import { Container } from "./container";
import { OrganicCornerShape } from "@/components/decorations/organic-shapes";

export function Footer() {
  return (
    <footer className="relative mt-auto overflow-hidden bg-deep-green text-cream">
      <OrganicCornerShape className="absolute -left-16 -top-16 text-sage/30" />
      <OrganicCornerShape
        className="absolute -bottom-20 -right-12 rotate-180 text-lilac/20"
        flip
      />

      <Container className="relative z-10">
        <div className="border-b border-cream/15 py-16 md:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-3 font-body text-sm font-semibold uppercase tracking-widest text-sage">
              Stay connected
            </p>
            <h2 className="font-heading text-4xl font-bold leading-tight text-cream sm:text-5xl">
              Join our community newsletter
            </h2>
            <p className="mx-auto mt-4 max-w-md text-base text-cream/75">
              Gentle updates on events, resources, and youth-led wellness — no spam, just care.
            </p>
            <form
              className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
              action="#"
              aria-label="Newsletter signup"
            >
              <input
                type="email"
                placeholder="Your email"
                className="h-12 flex-1 rounded-2xl border border-cream/20 bg-cream/10 px-5 font-body text-cream placeholder:text-cream/50 focus:outline-none focus:ring-2 focus:ring-sage"
                aria-label="Email address"
              />
              <Button
                type="submit"
                variant="primary"
                className="shrink-0 bg-coral text-ink hover:bg-coral/90"
              >
                Subscribe
                <ArrowRight className="size-4" />
              </Button>
            </form>
          </div>
        </div>

        <div className="grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <p className="font-heading text-2xl font-bold text-cream">
              {siteConfig.name}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-cream/70">
              {siteConfig.tagline}
            </p>
          </div>

          {footerLinkGroups.map((group) => (
            <div key={group.title}>
              <h3 className="mb-4 font-body text-sm font-semibold uppercase tracking-wider text-sage">
                {group.title}
              </h3>
              <ul className="flex flex-col gap-2.5">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-cream/80 transition-colors hover:text-cream"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-cream/15 py-8 text-sm text-cream/60 sm:flex-row">
          <p>© {new Date().getFullYear()} Mind Matters Network. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-cream">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-cream">
              Terms
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
