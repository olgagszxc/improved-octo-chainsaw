import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-normal text-center sm:whitespace-nowrap rounded-md text-sm font-semibold transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground uppercase font-display font-semibold tracking-wider shadow-cta hover:bg-primary/85 active:scale-[0.98]",
        secondary:
          "bg-secondary text-secondary-foreground uppercase font-display tracking-wider hover:bg-secondary/80",
        outline:
          "border border-foreground/30 bg-transparent text-foreground uppercase font-display tracking-wider hover:border-foreground/60 hover:bg-foreground/10",
        ghost: "text-foreground hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline normal-case font-sans font-medium",
      },
      size: {
        default: "min-h-10 px-5 py-2",
        sm: "h-9 rounded-md px-3 text-xs",
        lg: "min-h-12 rounded-md px-5 py-3 text-base sm:px-7",
        icon: "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
