import { createFileRoute } from "@tanstack/react-router";

import { LegalPage } from "@/components/legal-page";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | Kaizen Fitness" },
      {
        name: "description",
        content:
          "What Kaizen Fitness collects through this website, why, and how to ask us to change or delete it.",
      },
      { property: "og:title", content: "Privacy Policy | Kaizen Fitness" },
      {
        property: "og:description",
        content: "How Kaizen Fitness handles the details you send us.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Privacy,
});

function Privacy() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="October 31, 2026"
      intro={
        <p>
          Kaizen Fitness respects your privacy and follows the Philippine Data
          Privacy Act of 2012 (Republic Act No. 10173). This page explains, in
          plain words, what we collect through this website and what we do with
          it.
        </p>
      }
      sections={[
        {
          title: "What we collect",
          body: (
            <>
              <p>We only collect what you type into our forms:</p>
              <ul>
                <li>
                  <strong className="text-foreground">
                    Free consultation form:
                  </strong>{" "}
                  your name, email, phone number (optional), fitness goal,
                  experience level, preferred date and time, and any message you
                  add.
                </li>
                <li>
                  <strong className="text-foreground">Contact form:</strong>{" "}
                  your name, email, subject and message.
                </li>
              </ul>
              <p>
                We do not ask for payment details on this website, and we do not
                use advertising or tracking cookies.
              </p>
            </>
          ),
        },
        {
          title: "Why we collect it",
          body: (
            <ul>
              <li>To confirm your consultation and reply to your message.</li>
              <li>
                To answer questions about memberships, coaching and classes.
              </li>
            </ul>
          ),
        },
        {
          title: "Who can see it",
          body: (
            <>
              <p>
                Only the Kaizen Fitness team. Your details are stored in a
                secure online database (Supabase), and a copy of each request is
                emailed to the gym so we can respond quickly. These services
                only store and deliver the information for us.
              </p>
              <p>We never sell or share your details with anyone else.</p>
            </>
          ),
        },
        {
          title: "Maps",
          body: (
            <p>
              Our home and contact pages show a Google map. Google may collect
              data when the map loads, as described in Google's own{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noreferrer"
              >
                privacy policy
              </a>
              .
            </p>
          ),
        },
        {
          title: "How long we keep it",
          body: (
            <p>
              We keep your details only as long as we need them to follow up
              with you, then delete them. You can ask us to delete them sooner
              at any time.
            </p>
          ),
        },
        {
          title: "Your rights",
          body: (
            <p>
              You can ask to see the details we hold about you, correct them, or
              have them deleted. Just contact us using the details below and we
              will take care of it.
            </p>
          ),
        },
      ]}
    />
  );
}
