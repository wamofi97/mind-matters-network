import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-body text-sm font-semibold transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "rounded-full bg-primary px-7 py-3 text-primary-foreground shadow-soft hover:scale-[1.02] hover:shadow-card active:scale-[0.98]",
        secondary:
          "rounded-full border-2 border-ink bg-transparent px-7 py-3 text-ink hover:bg-ink/5 active:scale-[0.98]",
        ghost:
          "rounded-full px-5 py-2.5 text-ink hover:bg-sage-soft/60",
        donate:
          "rounded-full bg-deep-green px-6 py-2.5 text-cream shadow-soft hover:scale-[1.02] hover:bg-deep-green/90",
        link: "text-ink underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-7",
        sm: "h-9 px-5 text-xs",
        lg: "h-12 px-9 text-base",
        icon: "size-11 rounded-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
