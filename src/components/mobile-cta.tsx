import { Link } from "@tanstack/react-router";
import { Phone } from "lucide-react";

import { contact } from "@/content/site";

/**
 * Persistent mobile call-to-action bar so the free consultation booking
 * is always one tap away on phones.
 */
export function MobileCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-[minmax(0,1fr)_auto] gap-2 border-t border-border bg-background/95 p-3 backdrop-blur md:hidden">
      <Link
        to="/consultation"
        className="flex h-11 items-center justify-center rounded-md bg-primary px-4 text-center text-sm font-semibold uppercase tracking-wider text-primary-foreground shadow-cta"
      >
        Book Free Consultation
      </Link>
      <a
        href={contact.phoneHref}
        aria-label={`Call ${contact.phoneDisplay}`}
        className="flex h-11 w-11 items-center justify-center rounded-md border border-border text-foreground"
      >
        <Phone className="size-4" aria-hidden="true" />
      </a>
    </div>
  );
}
