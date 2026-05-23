import Link from "next/link";
import { Instagram, Linkedin, Twitter } from "lucide-react";
import {
  footerExploreLinks,
  footerSupportLinks,
  siteConfig,
} from "@/constants/navigation";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/shared/logo";
import { Container } from "./container";
import { OrganicCornerShape } from "@/components/decorations/organic-shapes";

const socialLinks = [
  { label: "Instagram", href: "https://instagram.com", icon: Instagram },
  { label: "Twitter", href: "https://twitter.com", icon: Twitter },
  { label: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
];

export function Footer() {
  return (
    <footer className="relative mt-auto overflow-hidden rounded-t-[48px] bg-deep-green text-cream md:rounded-t-[56px]">
      <OrganicCornerShape className="absolute -left-20 -top-10 text-warm-taupe/20" />
      <OrganicCornerShape
        className="absolute -bottom-24 -right-16 text-sage/25"
        flip
      />

      <Container className="relative z-10 py-16 md:py-20 lg:py-24">
        <div className="grid gap-14 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
          <div className="max-w-md">
            <h2 className="font-heading text-3xl font-bold leading-tight text-cream sm:text-4xl lg:text-[2.5rem]">
              Get a little goodness in your box.
            </h2>
            <form
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
              action="#"
              aria-label="Newsletter signup"
            >
              <input
                type="email"
                placeholder="Your email"
                className="h-12 min-w-0 flex-1 rounded-2xl border border-cream/20 bg-cream/10 px-5 font-body text-cream placeholder:text-cream/50 focus:outline-none focus:ring-2 focus:ring-sage"
                aria-label="Email address"
              />
              <Button
                type="submit"
                variant="primary"
                className="shrink-0 bg-coral text-ink hover:bg-coral/90"
              >
                Subscribe
              </Button>
            </form>
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            <div>
              <h3 className="font-body text-sm font-semibold uppercase tracking-wider text-sage">
                Explore
              </h3>
              <ul className="mt-4 flex flex-col gap-2.5">
                {footerExploreLinks.map((link) => (
                  <li key={link.href}>
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

            <div>
              <h3 className="font-body text-sm font-semibold uppercase tracking-wider text-sage">
                Support
              </h3>
              <ul className="mt-4 flex flex-col gap-2.5">
                {footerSupportLinks.map((link) => (
                  <li key={link.href}>
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

            <div>
              <h3 className="font-body text-sm font-semibold uppercase tracking-wider text-sage">
                Follow
              </h3>
              <div className="mt-4 flex gap-3">
                {socialLinks.map(({ label, href, icon: Icon }) => (
                  <Link
                    key={label}
                    href={href}
                    className="flex size-10 items-center justify-center rounded-full border border-cream/25 text-cream transition-colors hover:bg-cream/10"
                    aria-label={label}
                  >
                    <Icon className="size-4" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-6 border-t border-cream/15 pt-8 sm:flex-row sm:items-center">
          <Logo variant="light" />
          <p className="font-body text-sm text-cream/60">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
