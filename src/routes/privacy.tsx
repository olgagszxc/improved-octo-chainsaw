import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | Kaizen Fitness" },
      {
        name: "description",
        content: "Privacy policy for the Kaizen Fitness website.",
      },
      { property: "og:title", content: "Privacy Policy | Kaizen Fitness" },
      {
        property: "og:description",
        content: "Privacy policy for the Kaizen Fitness website.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <div className="mx-auto max-w-3xl px-4 py-24 sm:px-6">
      <h1 className="font-display text-4xl font-bold tracking-tight">
        Privacy Policy
      </h1>
      <p className="mt-4 text-muted-foreground">
        This policy is being written. Questions in the meantime? Call us at 0960
        523 6510.
      </p>
    </div>
  ),
});
