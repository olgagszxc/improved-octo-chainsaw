import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Hero({
  imageSrc,
  imageAlt,
  title,
  children,
  primaryCta,
  secondaryCta,
  size = "tall",
  align = "left",
}: {
  imageSrc: string;
  imageAlt: string;
  title: string;
  children?: ReactNode;
  primaryCta?: { label: string; to: string };
  secondaryCta?: { label: string; to: string };
  size?: "tall" | "compact";
  align?: "left" | "center";
}) {
  return (
    <section
      className={cn(
        "relative isolate flex items-end overflow-hidden",
        size === "tall" ? "min-h-[85svh]" : "min-h-[55svh]"
      )}
    >
      <img
        src={imageSrc}
        alt={imageAlt}
        className="absolute inset-0 -z-10 size-full object-cover"
        loading="eager"
        decoding="async"
      />
      {/* Dark overlay for readability */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-background via-background/75 to-background/40"
      />
      <div
        aria-hidden="true"
        className="absolute inset-y-0 left-0 -z-10 hidden w-1/2 bg-gradient-to-r from-background/80 to-transparent lg:block"
      />

      <div
        className={cn(
          "mx-auto w-full max-w-6xl px-4 pb-16 pt-24 sm:px-6 lg:px-8",
          size === "tall" ? "pb-20 pt-32" : "pb-14",
          align === "center" && "text-center"
        )}
      >
        <div className={cn("flex max-w-3xl flex-col gap-6", align === "center" && "items-center")}>
          <span aria-hidden="true" className="red-rule" />
          <h1 className="headline text-4xl text-foreground sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          {children ? (
            <div className="max-w-2xl text-base text-muted-foreground sm:text-lg">
              {children}
            </div>
          ) : null}
          {primaryCta || secondaryCta ? (
            <div
              className={cn(
                "mt-2 flex flex-col gap-3 sm:flex-row sm:flex-wrap",
                align === "center" && "justify-center"
              )}
            >
              {primaryCta ? (
                <Button asChild size="lg">
                  <Link to={primaryCta.to}>{primaryCta.label}</Link>
                </Button>
              ) : null}
              {secondaryCta ? (
                <Button asChild variant="outline" size="lg">
                  <Link to={secondaryCta.to}>{secondaryCta.label}</Link>
                </Button>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
