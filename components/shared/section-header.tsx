import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  label: string;
  className?: string;
  align?: "left" | "center";
  children: React.ReactNode;
};

export function SectionLabel({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <p
      className={cn(
        "rounded-full bg-card px-4 py-1 border w-fit border-border font-body text-sm font-semibold  tracking-wider text-ink",
        className
      )}
    >
      {children}
    </p>
  );
}

export function SectionHeader({
  label,
  className,
  align = "left",
  children,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        align === "center" && "text-center",
        className
      )}
    >
      <SectionLabel className={align === "center" ? "mx-auto" : undefined}>
        {label}
      </SectionLabel>
      <div className="mt-4">{children}</div>
    </div>
  );
}

export function CoralEmphasis({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <em className={cn("font-heading text-coral not-italic", className)}>
      {children}
    </em>
  );
}
