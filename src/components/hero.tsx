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
  imageLayout = "cover",
}: {
  imageSrc: string;
  imageAlt: string;
  title: string;
  children?: ReactNode;
  primaryCta?: { label: string; to: string };
  secondaryCta?: { label: string; to: string };
  size?: "tall" | "compact";
  align?: "left" | "center";
  /** "side" keeps a square image (like the logo photo) whole: on top on
   * phones, on the right on desktop, so the headline never covers it. */
  imageLayout?: "cover" | "side";
}) {
  const side = imageLayout === "side";
  return (
    <section
      className={cn(
        "relative isolate flex overflow-hidden",
        side
          ? "flex-col lg:min-h-[85svh] lg:flex-row lg:items-center"
          : "items-end",
        !side && (size === "tall" ? "min-h-[85svh]" : "min-h-[55svh]"),
      )}
    >
      {side ? (
        // Phones and tablets: the photo sits above the text so the logo stays
        // visible. Desktop: it fills the right side and fades into the dark.
        <div className="relative -z-10 w-full lg:absolute lg:inset-y-0 lg:right-0 lg:w-[60%]">
          <img
            src={imageSrc}
            alt={imageAlt}
            className="aspect-[5/4] w-full object-cover object-[50%_40%] sm:aspect-[16/9] lg:aspect-auto lg:h-full"
            loading="eager"
            decoding="async"
          />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-background to-transparent lg:h-1/4"
          />
          <div
            aria-hidden="true"
            className="absolute inset-y-0 left-0 hidden w-2/5 bg-gradient-to-r from-background to-transparent lg:block"
          />
        </div>
      ) : (
        <>
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
        </>
      )}

      <div
        className={cn(
          "mx-auto w-full max-w-6xl px-4 pb-16 pt-24 sm:px-6 lg:px-8",
          side
            ? "-mt-10 pb-16 sm:-mt-16 lg:mt-0 lg:py-24"
            : size === "tall"
              ? "pb-20 pt-32"
              : "pb-14",
          align === "center" && "text-center",
        )}
      >
        <div
          className={cn(
            "flex max-w-3xl flex-col gap-6",
            side && "lg:max-w-xl",
            align === "center" && "items-center",
          )}
        >
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
                align === "center" && "justify-center",
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
