import { cn } from "@/lib/utils";

type BlobProps = React.SVGAttributes<SVGSVGElement> & {
  color?: "sage" | "lilac" | "coral" | "butter" | "mint";
  size?: "sm" | "md" | "lg";
};

const colorMap = {
  sage: "fill-sage/25",
  lilac: "fill-lilac/20",
  coral: "fill-coral/20",
  butter: "fill-butter/40",
  mint: "fill-sage-soft/60",
};

const sizeMap = {
  sm: "w-24 h-24",
  md: "w-40 h-40",
  lg: "w-64 h-64",
};

/** Soft organic blob — moodboard-style background accent */
export function BlobShape({
  className,
  color = "sage",
  size = "md",
  ...props
}: BlobProps) {
  return (
    <svg
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("pointer-events-none", sizeMap[size], colorMap[color], className)}
      aria-hidden
      {...props}
    >
      <path d="M44.7,-58.2C56.5,-46.8,64.2,-31.2,66.8,-14.8C69.4,1.6,66.9,19.8,58.4,34.8C49.9,49.8,35.4,61.6,18.8,66.8C2.2,72,-16.6,70.6,-33.1,63.2C-49.6,55.8,-63.8,42.4,-69.8,26.2C-75.8,10,-74.6,-9,-67.4,-25.4C-60.2,-41.8,-47,-56.6,-31.2,-64.4C-15.4,-72.2,2.9,-73,19.8,-68.5C36.7,-64,44.7,-58.2,44.7,-58.2Z" transform="translate(100 100)" />
    </svg>
  );
}

/** Floating circle accent */
export function FloatingCircle({
  className,
  color = "lilac",
  size = "sm",
}: BlobProps) {
  const sizes = { sm: "size-8", md: "size-14", lg: "size-20" };
  const fills = {
    sage: "bg-sage/30",
    lilac: "bg-lilac/25",
    coral: "bg-coral/25",
    butter: "bg-butter/50",
    mint: "bg-sage-soft",
  };

  return (
    <span
      className={cn(
        "pointer-events-none inline-block rounded-full",
        sizes[size],
        fills[color],
        className
      )}
      aria-hidden
    />
  );
}

/** Corner decoration for footer / sections */
export function OrganicCornerShape({
  className,
  flip = false,
}: {
  className?: string;
  flip?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 240 240"
      className={cn(
        "pointer-events-none size-48 md:size-64",
        flip && "scale-x-[-1]",
        className
      )}
      aria-hidden
    >
      <path
        fill="currentColor"
        d="M44.7,-58.2C56.5,-46.8,64.2,-31.2,66.8,-14.8C69.4,1.6,66.9,19.8,58.4,34.8C49.9,49.8,35.4,61.6,18.8,66.8C2.2,72,-16.6,70.6,-33.1,63.2C-49.6,55.8,-63.8,42.4,-69.8,26.2C-75.8,10,-74.6,-9,-67.4,-25.4C-60.2,-41.8,-47,-56.6,-31.2,-64.4C-15.4,-72.2,2.9,-73,19.8,-68.5C36.7,-64,44.7,-58.2,44.7,-58.2Z"
        transform="translate(120 120) scale(1.6)"
      />
    </svg>
  );
}

/** Hand-drawn style doodle line */
export function SoftDoodle({
  className,
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 120 24"
      className={cn("pointer-events-none h-6 w-28 text-coral", className)}
      aria-hidden
    >
      <path
        d="M4,14 Q30,4 60,12 T116,10"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}
