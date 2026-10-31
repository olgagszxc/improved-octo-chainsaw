import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, MapPin, Phone } from "lucide-react";

import { contact, images, navLinks, site } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div className="flex flex-col items-start gap-4">
          <Link to="/" aria-label={`${site.name} home`}>
            <img
              src={images.logo}
              alt={`${site.name} logo`}
              className="h-16 w-auto"
              width={800}
              height={573}
            />
          </Link>
          <p className="max-w-xs text-sm text-muted-foreground">
            {site.tagline} A strength-training community in Paniqui, Tarlac.
          </p>
        </div>

        <nav aria-label="Footer navigation">
          <h2 className="headline mb-4 text-sm tracking-[0.2em] text-foreground">
            Explore
          </h2>
          <ul className="space-y-2.5">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="headline mb-4 text-sm tracking-[0.2em] text-foreground">
            Contact
          </h2>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <MapPin
                className="mt-0.5 size-4 shrink-0 text-primary"
                aria-hidden="true"
              />
              <a
                href={contact.directionsUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="transition-colors hover:text-primary"
              >
                {contact.address}
              </a>
            </li>
            <li>
              <a
                href={contact.phoneHref}
                className="flex items-center gap-2 transition-colors hover:text-primary"
              >
                <Phone
                  className="size-4 shrink-0 text-primary"
                  aria-hidden="true"
                />
                {contact.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={contact.facebookUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="flex items-center gap-2 transition-colors hover:text-primary"
              >
                <Facebook
                  className="size-4 shrink-0 text-primary"
                  aria-hidden="true"
                />
                <span>{contact.facebookName}</span>
              </a>
            </li>
            <li>
              <a
                href={contact.instagramUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="flex items-center gap-2 transition-colors hover:text-primary"
              >
                <Instagram
                  className="size-4 shrink-0 text-primary"
                  aria-hidden="true"
                />
                <span>{contact.instagramHandle}</span>
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="headline mb-4 text-sm tracking-[0.2em] text-foreground">
            Hours
          </h2>
          <p className="text-sm text-muted-foreground">
            {contact.hours}
            <br />
            {contact.hoursClosed}
          </p>
          <div className="mt-6 flex flex-col gap-2 text-sm">
            <Link
              to="/privacy"
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              Terms and Conditions
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-center text-xs text-muted-foreground sm:flex-row sm:px-6 lg:px-8">
          <span>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </span>
          <span className="headline text-balance text-center tracking-widest text-foreground/70">
            CONTINUOUS IMPROVEMENT. EVERY SINGLE DAY.
          </span>
        </div>
      </div>
    </footer>
  );
}
