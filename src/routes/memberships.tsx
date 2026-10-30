import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Phone } from "lucide-react";

import { Hero } from "@/components/hero";
import { SectionHeading, Reveal } from "@/components/section-heading";
import { FaqSection } from "@/components/faq-section";
import { CtaBand } from "@/components/cta-band";
import { Button } from "@/components/ui/button";
import {
  coachingNote,
  coachingRates,
  contact,
  gymRates,
  images,
} from "@/content/site";

export const Route = createFileRoute("/memberships")({
  head: () => ({
    meta: [
      { title: "Memberships | Kaizen Fitness Paniqui" },
      {
        name: "description",
        content:
          "Kaizen Fitness rates: monthly gym access ₱1,400, 1-on-1 coaching from ₱500 a session, and group coaching packages. Book a free consultation.",
      },
      { property: "og:title", content: "Memberships | Kaizen Fitness" },
      {
        property: "og:description",
        content: "Find the membership that fits your goals and schedule.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Memberships,
});

const included = [
  "Access to the strength training floor",
  "Squat racks, barbells, plates and dumbbells",
  "Treadmills, spin bikes, rowers, a SkiErg and leg machines",
  "A coaching team on the floor to answer questions",
  "Free HIIT group sessions with Coach Mond for monthly members",
  "A community that shows up and trains hard",
];

function PriceList({
  title,
  rates,
}: {
  title: string;
  rates: readonly { name: string; price: string; detail: string }[];
}) {
  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-primary">
        {title}
      </h3>
      <dl className="mt-2 divide-y divide-border">
        {rates.map((r) => (
          <div
            key={r.name}
            className="flex items-baseline justify-between gap-4 py-3"
          >
            <dt>
              <span className="block text-foreground">{r.name}</span>
              <span className="block text-sm text-muted-foreground">
                {r.detail}
              </span>
            </dt>
            <dd className="headline shrink-0 text-2xl text-foreground">
              {r.price}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function Memberships() {
  return (
    <>
      <Hero
        size="compact"
        imageSrc={images.legMachine}
        imageAlt="Machines on the Kaizen Fitness training floor"
        title="FIND YOUR MEMBERSHIP"
        primaryCta={{
          label: "Book Your Free Consultation",
          to: "/consultation",
        }}
      >
        Train solo with monthly gym access, or add a coach. Not sure what fits?
        We'll walk you through every option in a free, no-obligation
        consultation.
      </Hero>

      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <SectionHeading
            align="left"
            eyebrow="Training at Kaizen"
            title="WHAT YOU GET"
          />
          <ul className="mt-8 flex flex-col gap-4">
            {included.map((item) => (
              <li key={item} className="flex gap-3 text-foreground">
                <Check
                  aria-hidden="true"
                  className="mt-0.5 size-5 shrink-0 text-primary"
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <Reveal className="flex flex-col gap-5 rounded-lg border border-primary bg-card p-8">
          <h2 className="headline text-2xl text-foreground">RATES</h2>
          <PriceList title="Gym access" rates={gymRates} />
          <PriceList title="Coaching" rates={coachingRates} />
          <p className="text-sm text-muted-foreground">
            {coachingNote} Ask us about current promos.
          </p>
          <Button asChild size="lg">
            <Link to="/consultation">Book Your Free Consultation</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <a href={contact.phoneHref}>
              <Phone aria-hidden="true" /> Call {contact.phoneDisplay}
            </a>
          </Button>
        </Reveal>
      </section>

      <FaqSection />
      <CtaBand />
    </>
  );
}
