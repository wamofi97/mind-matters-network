import { cn } from "@/lib/utils";
import { Navbar } from "./navbar";
import { Footer } from "./footer";

type PageShellProps = {
  children: React.ReactNode;
  className?: string;
};

/**
 * Foundational page wrapper: navbar + main + footer.
 * Use on all future pages for consistent layout rhythm.
 */
export function PageShell({ children, className }: PageShellProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className={cn("relative flex-1", className)}>{children}</main>
      <Footer />
    </div>
  );
}
