import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const pillTagVariants = cva(
  "inline-flex items-center rounded-full px-4 py-1.5 font-body text-sm font-medium text-ink transition-all duration-300 hover:scale-[1.03]",
  {
    variants: {
      tone: {
        butter: "bg-tag-butter",
        coral: "bg-tag-coral text-cream",
        mint: "bg-tag-mint",
        lilac: "bg-tag-lilac",
      },
      size: {
        default: "text-sm",
        sm: "px-3 py-1 text-xs",
        lg: "px-5 py-2 text-base",
      },
    },
    defaultVariants: {
      tone: "butter",
      size: "default",
    },
  }
);

export type PillTagProps = React.HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof pillTagVariants>;

export function PillTag({ className, tone, size, ...props }: PillTagProps) {
  return (
    <span className={cn(pillTagVariants({ tone, size, className }))} {...props} />
  );
}

export { pillTagVariants };
