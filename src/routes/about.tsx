import { createFileRoute } from "@tanstack/react-router";

import { Hero } from "@/components/hero";
import { SectionHeading, Reveal } from "@/components/section-heading";
import { CtaBand } from "@/components/cta-band";
import { coaches, images } from "@/content/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About | Kaizen Fitness Paniqui" },
      {
        name: "description",
        content:
          "Kaizen Fitness is a strength-training gym in Paniqui, Tarlac built on discipline, continuous improvement and community.",
      },
      { property: "og:title", content: "About Kaizen Fitness" },
      {
        property: "og:description",
        content:
          "Discipline, continuous improvement and community — the Kaizen way to train.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

const values = [
  {
    title: "Discipline",
    text: "Progress comes from showing up — on good days and hard ones.",
  },
  {
    title: "Continuous Improvement",
    text: "Kaizen means getting a little better every session. Small steps add up.",
  },
  {
    title: "Community",
    text: "Our members and coaching team push each other to keep going.",
  },
  {
    title: "Strength",
    text: "Strength training is at the heart of everything we do.",
  },
];

function About() {
  return (
    <>
      <Hero
        size="compact"
        imageSrc={images.storefront}
        imageAlt="The Kaizen Fitness storefront with the coaching team"
        title="WHAT KAIZEN MEANS"
        primaryCta={{
          label: "Book Your Free Consultation",
          to: "/consultation",
        }}
      >
        Kaizen is the Japanese philosophy of continuous improvement. At our gym
        in Paniqui, it's how we approach every rep, every session and every
        member.
      </Hero>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Our values" title="WHAT WE STAND FOR" />
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {values.map((v, i) => (
            <Reveal
              key={v.title}
              delay={i * 80}
              className="rounded-lg border-l-4 border-primary bg-card p-6"
            >
              <h3 className="headline text-2xl text-foreground">{v.title}</h3>
              <p className="mt-2 text-muted-foreground">{v.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-card">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8">
          <SectionHeading
            align="left"
            eyebrow="Our team"
            title="THE TEAM BEHIND THE GRIND"
            description="Good energy, real people, and a team that's always ready to welcome you in. Whether it's your first day or your hundredth session, we've got you."
          />
          <Reveal>
            <img
              src={images.team}
              alt="A Kaizen Fitness coach and two front desk team members in the gym"
              loading="lazy"
              className="aspect-[4/3] w-full rounded-lg object-cover"
            />
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Coaching" title="MEET THE COACHES" />
        <div className="mx-auto mt-12 grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {coaches.map((c, i) => (
            <Reveal
              key={c.name}
              delay={i * 80}
              className="overflow-hidden rounded-lg border-b-4 border-primary bg-card"
            >
              <div className="relative aspect-[4/5] bg-gradient-to-br from-secondary to-background">
                {c.photo ? (
                  <img
                    src={c.photo}
                    alt={`${c.name}, ${c.role} at Kaizen Fitness`}
                    className="size-full object-cover object-top"
                    loading="lazy"
                  />
                ) : (
                  <div className="flex size-full items-center justify-center">
                    <img
                      src={images.logo}
                      alt=""
                      aria-hidden="true"
                      className="w-1/2 opacity-20"
                    />
                  </div>
                )}
              </div>
              <div className="p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-primary">
                  {c.role}
                </p>
                <h3 className="headline mt-1 text-2xl text-foreground">
                  {c.name}
                </h3>
                <p className="mt-2 text-muted-foreground">{c.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
