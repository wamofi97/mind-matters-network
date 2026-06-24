import { cn } from "@/lib/utils";
import { getSiteSettings } from "@/lib/content/site";
import { Navbar } from "./navbar";
import { Footer } from "./footer";

type PageShellProps = {
  children: React.ReactNode;
  className?: string;
};

/**
 * Foundational page wrapper: navbar + main + footer.
 * Use on all future pages for consistent layout rhythm.
 *
 * Fetches site settings (nav, footer, social links) from the CMS so the chrome
 * stays editable; falls back to bundled defaults when Sanity isn't configured.
 */
export async function PageShell({ children, className }: PageShellProps) {
  const settings = await getSiteSettings();

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar navLinks={settings.mainNavLinks} joinHref={settings.joinHref} />
      <main className={cn("relative flex-1", className)}>{children}</main>
      <Footer settings={settings} />
    </div>
  );
}
