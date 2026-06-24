import Link from "next/link";
import { type SiteSettings } from "@/lib/content/site";
import { getSocialIcon } from "@/lib/content/icons";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/shared/logo";
import { Container } from "./container";
import { OrganicCornerShape } from "@/components/decorations/organic-shapes";

type FooterProps = {
  settings: SiteSettings;
};

export function Footer({ settings }: FooterProps) {
  const exploreLinks = settings.footerExploreLinks;
  const supportLinks = settings.footerSupportLinks;
  const socialLinks = settings.socials;

  return (
    <footer className="relative mt-auto overflow-hidden rounded-t-[48px] bg-deep-green text-cream md:rounded-t-[56px]">
      <OrganicCornerShape className="absolute -left-20 -top-10 text-tag-butter/15" />
      <OrganicCornerShape
        className="absolute -bottom-24 -right-16 text-warm-taupe/40"
        flip
      />

      <Container className="relative z-10 py-12 ">
        <div className="grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-0">
          <div className="max-w-md">
            <h2 className="font-heading text-3xl font-bold leading-[1.1] text-cream sm:text-4xl lg:text-[2.75rem]">
              {settings.newsletterHeadingLead}{" "}
              <span className="italic text-butter">
                {settings.newsletterHeadingEmphasis}
              </span>
            </h2>
            <p className="mt-4 font-body text-sm text-cream/70 sm:text-base">
              {settings.newsletterText}
            </p>
            <form
              className="mt-7 flex max-w-md items-center gap-3"
              action="#"
              aria-label="Newsletter signup"
            >
              <input
                type="email"
                placeholder={settings.newsletterPlaceholder}
                className="h-12 min-w-0 flex-1 rounded-full border border-cream/20 bg-cream/10 px-5 font-body text-sm text-cream placeholder:text-cream/50 focus:outline-none focus:ring-2 focus:ring-sage"
                aria-label="Email address"
              />
              <Button
                variant="unstyled"
                size="none"
                type="submit"
                className="h-12 shrink-0 rounded-full bg-sage px-7 font-body text-sm font-semibold text-cream transition-colors hover:bg-sage/90"
              >
                {settings.newsletterButtonLabel}
              </Button>
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
              <div className="mt-4 flex justify-between">
                {socialLinks.map((social) => {
                  const Icon = getSocialIcon(social.icon);
                  return (
                    <Link
                      key={social.label}
                      href={social.href}
                      className="flex size-10 items-center justify-center rounded-full bg-sage text-cream transition-colors hover:bg-sage/80"
                      aria-label={social.label}
                    >
                      <Icon className="size-4" />
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-6 border-t border-cream/15 sm:flex-row sm:items-end">
          <div className="flex flex-col items-start mt-4">
            <Logo variant="light" />
            <p className="font-body text-sm text-cream/70">{settings.tagline}</p>
          </div>
          <p className="font-body text-sm text-cream/60">
            © {new Date().getFullYear()} {settings.title}. Made with care.
          </p>
        </div>
      </Container>
    </footer>
  );
}
