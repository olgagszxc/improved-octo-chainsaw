import { Clock, MapPin, Navigation } from "lucide-react";

import { Reveal } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { contact } from "@/content/site";

/** Google map of the gym with the address, hours and a directions button. */
export function LocationSection() {
  return (
    <section className="bg-card">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_2fr] lg:px-8">
        <Reveal className="flex flex-col items-start gap-4">
          <MapPin aria-hidden="true" className="size-8 text-primary" />
          <h2 className="headline text-3xl text-foreground">Visit the gym</h2>
          <p className="text-muted-foreground">{contact.address}</p>
          <p className="flex items-start gap-2 text-sm text-muted-foreground">
            <Clock
              aria-hidden="true"
              className="mt-0.5 size-4 shrink-0 text-primary"
            />
            <span>
              {contact.hours}
              <br />
              {contact.hoursClosed}
            </span>
          </p>
          <Button asChild size="lg">
            <a
              href={contact.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Navigation aria-hidden="true" /> Get Directions
            </a>
          </Button>
        </Reveal>
        <Reveal delay={100}>
          <iframe
            title="Google map showing Kaizen Fitness on Bugallon Street, Paniqui"
            src={contact.mapEmbedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="aspect-[4/3] w-full rounded-lg border-0 sm:aspect-[16/9]"
          />
        </Reveal>
      </div>
    </section>
  );
}
