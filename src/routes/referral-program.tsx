import { createFileRoute, Link } from "@tanstack/react-router";

import { SectionHeading, Reveal } from "@/components/section-heading";
import { CtaBand } from "@/components/cta-band";
import { Button } from "@/components/ui/button";
import { contact, images, referralPromoData } from "@/content/site";

export const Route = createFileRoute("/referral-program")({
  head: () => ({
    meta: [
      { title: "Referral Program | Kaizen Fitness Paniqui" },
      {
        name: "description",
        content:
          "Active Kaizen Fitness members: refer friends and save on your next monthly renewal — 20% off, 50% off, or free.",
      },
      {
        property: "og:title",
        content: "Refer. Save. Repeat. | Kaizen Fitness",
      },
      {
        property: "og:description",
        content:
          "Refer 1 for 20% off, 2 for 50% off, 3 for a free next monthly renewal.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Referral,
});

function Referral() {
  const p = referralPromoData;
  return (
    <>
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-16 pt-32 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="flex flex-col gap-6">
          <SectionHeading
            align="left"
            eyebrow={
              p.active
                ? `Members only · Until ${p.endDate}`
                : "Referral program"
            }
            title={p.headline}
            description={
              p.active
                ? p.eligibility
                : "This referral promo has ended. Follow us on Facebook or Instagram for the next one."
            }
          />
        </div>
        <Reveal>
          <img
            src={images.gymFloor}
            alt="Kaizen Fitness members training together on the gym floor"
            className="mx-auto w-full max-w-md rounded-lg"
          />
        </Reveal>
      </section>

      {p.active ? (
        <section className="bg-card">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
            <SectionHeading title="YOUR REWARDS" />
            <ul className="mt-10 grid gap-5 sm:grid-cols-3">
              {p.rewards.map((r, i) => (
                <Reveal key={r.referrals} delay={i * 80}>
                  <li className="h-full rounded-lg border border-border bg-background p-8 text-center">
                    <p className="text-sm uppercase tracking-widest text-muted-foreground">
                      {r.label}
                    </p>
                    <p className="headline mt-3 text-5xl text-primary">
                      {r.reward}
                    </p>
                    <p className="mt-2 text-muted-foreground">{r.detail}</p>
                  </li>
                </Reveal>
              ))}
            </ul>
            <div className="mx-auto mt-12 max-w-2xl rounded-lg border border-border p-6">
              <h2 className="headline text-xl text-foreground">TERMS</h2>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                {p.terms.map((t) => (
                  <li key={t}>{t}</li>
                ))}
                <li>Promo runs until {p.endDate}.</li>
              </ul>
              <p className="mt-4 text-sm text-muted-foreground">
                To refer someone, message {contact.facebookName} on Facebook, DM{" "}
                {contact.instagramHandle} on Instagram, or call{" "}
                {contact.phoneDisplay}.
              </p>
              <Button asChild variant="outline" className="mt-5">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </section>
      ) : null}

      <CtaBand
        title="NOT A MEMBER YET?"
        description="Start with a free, no-obligation consultation and find the membership that fits you."
      />
    </>
  );
}
