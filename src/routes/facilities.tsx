import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { Hero } from "@/components/hero";
import { SectionHeading, Reveal } from "@/components/section-heading";
import { CtaBand } from "@/components/cta-band";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { facilitiesCategories, images } from "@/content/site";

export const Route = createFileRoute("/facilities")({
  head: () => ({
    meta: [
      { title: "Facilities | Kaizen Fitness Paniqui" },
      {
        name: "description",
        content:
          "See the Kaizen Fitness training floor in Paniqui, Tarlac — squat racks, free weights, dumbbells and a focused strength-training space.",
      },
      { property: "og:title", content: "Facilities | Kaizen Fitness" },
      {
        property: "og:description",
        content: "Squat racks, free weights and a floor built for strength.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Facilities,
});

function Facilities() {
  const [open, setOpen] = useState<{ src: string; alt: string } | null>(null);
  return (
    <>
      <Hero
        size="compact"
        imageSrc={images.treadmills}
        imageAlt="Curved treadmills and spin bikes in the cardio area"
        title="EXPLORE THE GYM"
        primaryCta={{
          label: "Book Your Free Consultation",
          to: "/consultation",
        }}
      >
        Everything you need to train for strength — see the space before your
        first visit.
      </Hero>

      {facilitiesCategories.map((cat, idx) => (
        <section key={cat.name} className={idx % 2 ? "bg-card" : ""}>
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
            <SectionHeading
              align="left"
              title={cat.name.toUpperCase()}
              description={cat.description}
            />
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {cat.images.map((img) => (
                <Reveal key={img.alt}>
                  <button
                    type="button"
                    onClick={() => setOpen({ src: img.src, alt: img.alt })}
                    className="group block w-full overflow-hidden rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    aria-label={`View larger: ${img.alt}`}
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      loading="lazy"
                      className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </button>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ))}

      <Dialog open={!!open} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogContent className="max-w-4xl border-border bg-background p-2">
          <DialogTitle className="sr-only">
            {open?.alt ?? "Gym photo"}
          </DialogTitle>
          {open ? (
            <img
              src={open.src}
              alt={open.alt}
              className="max-h-[80vh] w-full rounded object-contain"
            />
          ) : null}
        </DialogContent>
      </Dialog>

      <CtaBand title="SEE IT IN PERSON" />
    </>
  );
}
