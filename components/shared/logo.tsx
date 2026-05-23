import Link from "next/link";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  variant?: "default" | "light";
};

export function Logo({ className, variant = "default" }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn("flex items-center gap-2.5", className)}
      aria-label="Mind Matters Network home"
    >
      <span
        className={cn(
          "flex size-9 shrink-0 items-center justify-center rounded-full",
          variant === "light" ? "bg-sage/30" : "bg-sage"
        )}
      >
        <svg
          viewBox="0 0 24 24"
          className="size-5 text-cream"
          fill="currentColor"
          aria-hidden
        >
          <path d="M12 2C8.5 2 6 4.5 6 8c0 2.2 1.2 4.1 3 5.2V20h6v-6.8c1.8-1.1 3-3 3-5.2 0-3.5-2.5-6-6-6zm0 2c2.2 0 4 1.8 4 4s-1.8 4-4 4-4-1.8-4-4 1.8-4 4-4z" />
        </svg>
      </span>
      <span
        className={cn(
          "font-heading text-base font-bold leading-tight tracking-tight sm:text-lg",
          variant === "light" ? "text-cream" : "text-ink"
        )}
      >
        Mind Matters
        <span className="block text-xs font-body font-medium opacity-80 sm:text-sm">
          Network
        </span>
      </span>
    </Link>
  );
}
