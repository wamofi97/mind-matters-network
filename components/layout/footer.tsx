import Link from "next/link";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { siteConfig } from "@/constants/navigation";
import { Logo } from "@/components/shared/logo";
import { Container } from "./container";
import { OrganicCornerShape } from "@/components/decorations/organic-shapes";

const exploreLinks = [
  { label: "About", href: "/about" },
  { label: "Events", href: "/events" },
  { label: "Resources", href: "/resources" },
  { label: "Get Involved", href: "/get-involved" },
];

const supportLinks = [
  { label: "Contact", href: "/contact" },
  { label: "Crisis lines", href: "/crisis-help" },
  { label: "FAQ", href: "/faq" },
  { label: "Privacy", href: "/privacy" },
];

const socialLinks = [
  { label: "Instagram", href: siteConfig.instagramUrl, icon: Instagram },
  { label: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
  { label: "Facebook", href: "https://facebook.com", icon: Facebook },
  { label: "Twitter", href: "https://twitter.com", icon: Twitter },
];

export function Footer() {
  return (
    <footer className="relative mt-auto overflow-hidden rounded-t-[48px] bg-deep-green text-cream md:rounded-t-[56px]">
      <OrganicCornerShape className="absolute -left-20 -top-10 text-tag-butter/15" />
      <OrganicCornerShape
        className="absolute -bottom-24 -right-16 text-warm-taupe/40"
        flip
      />

      <Container className="relative z-10 py-16 ">
        <div className="grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-0 mb-14">
          <div className="max-w-md">
            <h2 className="font-heading text-3xl font-bold leading-[1.1] text-cream sm:text-4xl lg:text-[2.75rem]">
              Get a little goodness{" "}
              <span className="italic text-butter">in your box.</span>
            </h2>
            <p className="mt-4 font-body text-sm text-cream/70 sm:text-base">
              Monthly stories, free toolkits, gentle reminders that you&apos;re
              not alone.
            </p>
            <form
              className="mt-7 flex max-w-md items-center gap-3"
              action="#"
              aria-label="Newsletter signup"
            >
              <input
                type="email"
                placeholder="you@kind.email"
                className="h-12 min-w-0 flex-1 rounded-full border border-cream/20 bg-cream/10 px-5 font-body text-sm text-cream placeholder:text-cream/50 focus:outline-none focus:ring-2 focus:ring-sage"
                aria-label="Email address"
              />
              <button
                type="submit"
                className="h-12 shrink-0 rounded-full bg-sage px-7 font-body text-sm font-semibold text-cream transition-colors hover:bg-sage/90"
              >
                Subscribe
              </button>
            </form>
          </div>

          <div className="grid gap-10 sm:grid-cols-3 lg:gap-0">
            <div>
              <h3 className="font-body text-sm font-semibold text-tag-butter">
                Explore
              </h3>
              <ul className="mt-4 flex flex-col gap-3">
                {exploreLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="font-body text-sm text-cream/80 transition-colors hover:text-cream"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-body text-sm font-semibold text-tag-butter">
                Support
              </h3>
              <ul className="mt-4 flex flex-col gap-3">
                {supportLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="font-body text-sm text-cream/80 transition-colors hover:text-cream"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-body text-sm font-semibold text-tag-butter">
                Follow
              </h3>
              <div className="mt-4 flex flex-wrap gap-3">
                {socialLinks.map(({ label, href, icon: Icon }) => (
                  <Link
                    key={label}
                    href={href}
                    className="flex size-10 items-center justify-center rounded-full bg-sage text-cream transition-colors hover:bg-sage/80"
                    aria-label={label}
                  >
                    <Icon className="size-4" />
                  </Link>
                ))}
              </div>
              <p className="mt-5 font-body text-xs leading-relaxed text-cream/60">
                If you&apos;re in crisis, please call your local helpline. You
                matter.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-6 border-t border-cream/15 pt-8 sm:flex-row sm:items-center">
          <p className="font-body text-sm text-cream/60">
            © {new Date().getFullYear()} {siteConfig.name}. Made with care.
          </p>
          <div className="flex flex-col items-start gap-3 sm:items-end">
            <Logo variant="light" />
            <p className="font-body text-sm text-cream/70">
              A youth-led mental health movement 🌱
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
