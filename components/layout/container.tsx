import { cn } from "@/lib/utils";

type ContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  as?: "div" | "section" | "article" | "main";
  narrow?: boolean;
};

export function Container({
  className,
  as: Component = "div",
  narrow = false,
  children,
  ...props
}: ContainerProps) {
  return (
    <Component
      className={cn(
        "mx-auto w-full px-5 sm:px-6 lg:px-8",
        narrow ? "max-w-4xl" : "max-w-7xl",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
