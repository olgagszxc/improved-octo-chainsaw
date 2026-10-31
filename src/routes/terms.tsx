import { createFileRoute, Link } from "@tanstack/react-router";

import { LegalPage } from "@/components/legal-page";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms and Conditions | Kaizen Fitness" },
      {
        name: "description",
        content:
          "The terms for using the Kaizen Fitness website, booking a free consultation and our listed prices and promos.",
      },
      {
        property: "og:title",
        content: "Terms and Conditions | Kaizen Fitness",
      },
      {
        property: "og:description",
        content: "The terms for using the Kaizen Fitness website.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Terms,
});

function Terms() {
  return (
    <LegalPage
      title="Terms and Conditions"
      updated="October 31, 2026"
      intro={
        <p>
          These terms cover your use of the Kaizen Fitness website. By using the
          site or sending us a form, you agree to them. Rules for training at
          the gym itself are explained by our front desk when you sign up.
        </p>
      }
      sections={[
        {
          title: "Free consultations",
          body: (
            <p>
              Booking a consultation is free and does not commit you to
              anything. The date and time you choose is a request. We will
              contact you to confirm or suggest another slot.
            </p>
          ),
        },
        {
          title: "Prices and promos",
          body: (
            <p>
              We keep prices, schedules and promos on this site up to date, but
              they can change. The rates confirmed at the front desk are the
              ones that apply. Promos such as the{" "}
              <Link to="/referral-program">referral program</Link> follow their
              own mechanics and validity.
            </p>
          ),
        },
        {
          title: "Your health and safety",
          body: (
            <p>
              The information on this site is general and is not medical advice.
              If you have an injury, a health condition or are pregnant, please
              check with your doctor before starting a new training program, and
              let our coaches know so they can adjust your sessions.
            </p>
          ),
        },
        {
          title: "Using this website",
          body: (
            <ul>
              <li>Please send us honest, accurate details in our forms.</li>
              <li>
                Do not misuse the forms, for example by sending spam or someone
                else's details without their permission.
              </li>
              <li>
                The Kaizen Fitness name, logo and photos belong to Kaizen
                Fitness. Please ask before reusing them.
              </li>
            </ul>
          ),
        },
        {
          title: "Your privacy",
          body: (
            <p>
              How we handle the details you send us is covered in our{" "}
              <Link to="/privacy">Privacy Policy</Link>.
            </p>
          ),
        },
        {
          title: "Changes to these terms",
          body: (
            <p>
              We may update these terms from time to time. The date at the top
              shows when they last changed.
            </p>
          ),
        },
      ]}
    />
  );
}
