import { createFileRoute } from "@tanstack/react-router";

import { Clock, Facebook, Instagram, Phone } from "lucide-react";

import { ContactForm } from "@/components/contact-form";
import { LocationSection } from "@/components/location-section";
import { Reveal } from "@/components/section-heading";
import { contact } from "@/content/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact | Kaizen Fitness" },
      {
        name: "description",
        content:
          "Contact Kaizen Fitness in Paniqui, Tarlac — call 0960 523 6510, message us on Facebook or Instagram, or visit the gym on Bugallon Street.",
      },
      { property: "og:title", content: "Contact | Kaizen Fitness" },
      {
        property: "og:description",
        content:
          "Call, message or visit Kaizen Fitness on Bugallon Street, Estacion, Paniqui, Tarlac.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contact,
});

const channels = [
  {
    icon: Phone,
    label: "Call or text",
    value: contact.phoneDisplay,
    href: contact.phoneHref,
  },
  {
    icon: Instagram,
    label: "Instagram",
    value: contact.instagramHandle,
    href: contact.instagramUrl,
  },
  {
    icon: Facebook,
    label: "Facebook",
    value: contact.facebookName,
    href: contact.facebookUrl,
  },
  {
    icon: Clock,
    label: "Opening hours",
    value: `${contact.hours}. ${contact.hoursClosed}.`,
  },
];

function Contact() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-4 py-16 sm:py-20 sm:px-6 lg:px-8">
        <Reveal className="flex max-w-2xl flex-col gap-6">
          <span aria-hidden="true" className="red-rule" />
          <h1 className="headline text-4xl text-foreground sm:text-5xl">
            Contact us
          </h1>
          <p className="text-base text-muted-foreground sm:text-lg">
            Questions about memberships, training or the referral promo? Call,
            message or drop by the gym, or send us a message below.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.3fr]">
          <Reveal className="flex flex-col gap-4">
            {channels.map((c) => {
              const body = (
                <>
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-md bg-primary/15 text-primary">
                    <c.icon aria-hidden="true" className="size-5" />
                  </span>
                  <span className="flex flex-col">
                    <span className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                      {c.label}
                    </span>
                    <span className="text-foreground">{c.value}</span>
                  </span>
                </>
              );
              return c.href ? (
                <a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    c.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="flex items-center gap-4 rounded-lg bg-card p-5 transition-colors hover:bg-card/70 focus-visible:outline-2 focus-visible:outline-primary"
                >
                  {body}
                </a>
              ) : (
                <div
                  key={c.label}
                  className="flex items-center gap-4 rounded-lg bg-card p-5"
                >
                  {body}
                </div>
              );
            })}
          </Reveal>
          <Reveal delay={100}>
            <ContactForm />
          </Reveal>
        </div>
      </section>

      <LocationSection />
    </>
  );
}
