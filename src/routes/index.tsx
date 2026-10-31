import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Dumbbell,
  MessageCircle,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";

import { Hero } from "@/components/hero";
import { SectionHeading, Reveal } from "@/components/section-heading";
import { FaqSection } from "@/components/faq-section";
import { CtaBand } from "@/components/cta-band";
import { LocationSection } from "@/components/location-section";
import { Button } from "@/components/ui/button";
import { images, referralPromoData } from "@/content/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kaizen Fitness Paniqui | Strength Training Gym in Tarlac" },
      {
        name: "description",
        content:
          "Kaizen Fitness is a strength-training gym in Estacion, Paniqui, Tarlac. Book your free consultation and start making progress.",
      },
      {
        property: "og:title",
        content: "Kaizen Fitness Paniqui | Strength Training Gym",
      },
      {
        property: "og:description",
        content:
          "Built by discipline. Defined by progress. Book your free consultation today.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const pillars = [
  {
    icon: Dumbbell,
    title: "Strength First",
    text: "Racks, barbells, plates and dumbbells for real strength work.",
  },
  {
    icon: TrendingUp,
    title: "Continuous Improvement",
    text: "Kaizen means small, steady progress — every session counts.",
  },
  {
    icon: Users,
    title: "Real Community",
    text: "Train beside people who show up, push hard, and lift each other up.",
  },
  {
    icon: Target,
    title: "Every Level Welcome",
    text: "Beginner or experienced, we help you find your starting point.",
  },
];

const steps = [
  {
    n: "01",
    title: "Book",
    text: "Pick a date and time for your free consultation online.",
  },
  {
    n: "02",
    title: "Talk",
    text: "Share your goals and ask anything about training at Kaizen.",
  },
  {
    n: "03",
    title: "Choose",
    text: "Learn the membership options and pick what fits you.",
  },
  {
    n: "04",
    title: "Train",
    text: "Start your journey — one session, one improvement at a time.",
  },
];

function Index() {
  return (
    <>
      <Hero
        imageSrc={images.gymFloor}
        imageAlt="Members training with dumbbells on the Kaizen Fitness gym floor"
        title="BUILT BY DISCIPLINE. DEFINED BY PROGRESS."
        primaryCta={{
          label: "Book Your Free Consultation",
          to: "/consultation",
        }}
        secondaryCta={{ label: "Explore the Gym", to: "/facilities" }}
      >
        Kaizen Fitness is a strength-training gym in Estacion, Paniqui, Tarlac —
        for anyone ready to get stronger, one step at a time.
      </Hero>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Why Kaizen"
          title="TRAIN WITH PURPOSE"
          description="Kaizen is the Japanese idea of continuous improvement. It's how we train — and how we help you train."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p, i) => (
            <Reveal
              key={p.title}
              delay={i * 80}
              className="rounded-lg border border-border bg-card p-6"
            >
              <p.icon aria-hidden="true" className="size-8 text-primary" />
              <h3 className="headline mt-4 text-xl text-foreground">
                {p.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-card">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8">
          <Reveal>
            <img
              src={images.racks}
              alt="Squat racks loaded with Kaizen bumper plates"
              loading="lazy"
              className="aspect-[4/3] w-full rounded-lg object-cover"
            />
          </Reveal>
          <div className="flex flex-col gap-6">
            <SectionHeading
              align="left"
              eyebrow="The gym"
              title="A FLOOR BUILT FOR WORK"
              description="Squat racks, free weights and a focused training atmosphere. See the space before you visit."
            />
            <div>
              <Button asChild variant="outline" size="lg">
                <Link to="/facilities">
                  View Facilities <ArrowRight aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="How it works"
          title="FROM FIRST VISIT TO MEMBER"
          description="The free consultation is a conversation — no workout, no pressure, no obligation."
        />
        <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 80}>
              <li className="h-full rounded-lg border border-border p-6">
                <span className="headline text-4xl text-primary">{s.n}</span>
                <h3 className="headline mt-3 text-xl text-foreground">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
              </li>
            </Reveal>
          ))}
        </ol>
        <div className="mt-10 flex justify-center">
          <Button asChild size="lg">
            <Link to="/consultation">Book Your Free Consultation</Link>
          </Button>
        </div>
      </section>

      {referralPromoData.active ? (
        <section className="bg-card">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8">
            <div className="flex flex-col gap-6">
              <SectionHeading
                align="left"
                eyebrow={
                  referralPromoData.endDate
                    ? `Members only · Until ${referralPromoData.endDate}`
                    : "Members only"
                }
                title={referralPromoData.headline}
                description={referralPromoData.eligibility}
              />
              <ul className="grid grid-cols-3 gap-3">
                {referralPromoData.rewards.map((r) => (
                  <li
                    key={r.referrals}
                    className="rounded-lg border border-border bg-background p-4 text-center"
                  >
                    <p className="headline text-2xl text-primary">{r.reward}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {r.label}
                    </p>
                  </li>
                ))}
              </ul>
              <div>
                <Button asChild variant="outline" size="lg">
                  <Link to="/referral-program">
                    Referral Details <ArrowRight aria-hidden="true" />
                  </Link>
                </Button>
              </div>
            </div>
            <Reveal>
              <img
                src={images.gymFloor}
                alt="Kaizen Fitness members training together on the gym floor"
                loading="lazy"
                className="mx-auto w-full max-w-md rounded-lg"
              />
            </Reveal>
          </div>
        </section>
      ) : null}

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6 rounded-lg border border-border p-8 text-center sm:p-12">
          <MessageCircle aria-hidden="true" className="size-10 text-primary" />
          <h2 className="headline text-2xl text-foreground sm:text-3xl">
            QUESTIONS ABOUT MEMBERSHIP?
          </h2>
          <p className="max-w-xl text-muted-foreground">
            Monthly gym access is ₱1,400, with 1-on-1 and group coaching
            available on top. See every rate, or ask us anything.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="outline">
              <Link to="/memberships">Memberships</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>

      <FaqSection />
      <LocationSection />
      <CtaBand />
    </>
  );
}
