import { createFileRoute } from "@tanstack/react-router";

import { CalendarCheck, MessageCircle, Phone, Sparkles } from "lucide-react";

import { ConsultationForm } from "@/components/consultation-form";
import { FaqSection } from "@/components/faq-section";
import { Reveal } from "@/components/section-heading";
import { contact } from "@/content/site";

export const Route = createFileRoute("/consultation")({
  head: () => ({
    meta: [
      { title: "Book Your Free Consultation | Kaizen Fitness" },
      {
        name: "description",
        content:
          "Book a free, no-obligation fitness consultation at Kaizen Fitness, Paniqui — talk about your goals and find the right membership.",
      },
      {
        property: "og:title",
        content: "Book Your Free Consultation | Kaizen Fitness",
      },
      {
        property: "og:description",
        content:
          "A free, no-obligation conversation about your fitness goals at Kaizen Fitness, Paniqui.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Consultation,
});

const steps = [
  {
    icon: CalendarCheck,
    title: "Pick a time",
    text: "Choose a day and time of day that suits you. We'll confirm the exact slot with you.",
  },
  {
    icon: MessageCircle,
    title: "Talk it through",
    text: "Sit down with our team to talk about your goals, experience and any questions.",
  },
  {
    icon: Sparkles,
    title: "Find your fit",
    text: "Learn which membership options suit you. No workout, no pressure, no commitment.",
  },
];

function Consultation() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-4 py-16 sm:py-20 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr]">
          <Reveal className="flex flex-col gap-6">
            <span aria-hidden="true" className="red-rule" />
            <h1 className="headline text-4xl text-foreground sm:text-5xl">
              Book your free consultation
            </h1>
            <p className="text-base text-muted-foreground sm:text-lg">
              A free, no-obligation conversation about your goals and your
              options. Fill in the form and our team will get back to you to
              confirm.
            </p>
            <ol className="mt-2 flex flex-col gap-5">
              {steps.map((step, i) => (
                <li key={step.title} className="flex gap-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-md bg-primary/15 text-primary">
                    <step.icon aria-hidden="true" className="size-5" />
                  </span>
                  <div>
                    <h2 className="headline text-xl text-foreground">
                      {i + 1}. {step.title}
                    </h2>
                    <p className="text-sm text-muted-foreground">{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="flex items-center gap-2 text-sm text-muted-foreground">
              <Phone aria-hidden="true" className="size-4 text-primary" />
              Prefer to call?{" "}
              <a
                href={contact.phoneHref}
                className="font-medium text-foreground underline-offset-4 hover:underline"
              >
                {contact.phoneDisplay}
              </a>
            </p>
          </Reveal>
          <Reveal delay={100}>
            <ConsultationForm />
          </Reveal>
        </div>
      </section>
      <FaqSection />
    </>
  );
}
