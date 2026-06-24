import Image from "next/image";
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
      className={cn("flex items-center", className)}
      aria-label="Mind Matters Network home"
    >
      <Image
        src={variant === "light" ? "/brand/logo-full-light.png" : "/brand/logo-full.png"}
        alt="Mind Matters Network"
        width={4500}
        height={2134}
        priority
        className="h-16 w-auto"
      />
    </Link>
  );
}
