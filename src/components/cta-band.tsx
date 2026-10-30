import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/section-heading";
import { images } from "@/content/site";

export function CtaBand({
  title = "YOUR PROGRESS STARTS WITH ONE CONVERSATION",
  description = "Book a free, no-obligation consultation. Tell us your goals, ask your questions, and find the membership that fits you.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden">
      <img
        src={images.dumbbellFloor}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="absolute inset-0 -z-10 size-full object-cover"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-background/85" />
      <Reveal className="mx-auto flex max-w-4xl flex-col items-center gap-6 px-4 py-20 text-center sm:px-6 lg:py-28">
        <span aria-hidden="true" className="red-rule" />
        <h2 className="headline text-3xl text-foreground sm:text-5xl">{title}</h2>
        <p className="max-w-2xl text-base text-muted-foreground sm:text-lg">{description}</p>
        <Button asChild size="lg">
          <Link to="/consultation">
            Book Your Free Consultation
            <ArrowRight aria-hidden="true" />
          </Link>
        </Button>
      </Reveal>
    </section>
  );
}
