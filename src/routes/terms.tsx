import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms and Conditions | Kaizen Fitness" },
      {
        name: "description",
        content: "Terms and conditions for the Kaizen Fitness website.",
      },
      {
        property: "og:title",
        content: "Terms and Conditions | Kaizen Fitness",
      },
      {
        property: "og:description",
        content: "Terms and conditions for the Kaizen Fitness website.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <div className="mx-auto max-w-3xl px-4 py-24 sm:px-6">
      <h1 className="font-display text-4xl font-bold tracking-tight">
        Terms and Conditions
      </h1>
      <p className="mt-4 text-muted-foreground">
        These terms are being written. Questions in the meantime? Call us at
        0960 523 6510.
      </p>
    </div>
  ),
});
