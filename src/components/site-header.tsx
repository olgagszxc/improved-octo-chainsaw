import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X, Phone } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { contact, images, navLinks, site } from "@/content/site";

function Logo({ className }: { className?: string }) {
  return (
    <Link
      to="/"
      aria-label={`${site.name} home`}
      className="flex shrink-0 items-center"
    >
      <img
        src={images.logo}
        alt={`${site.name} logo`}
        className={className ?? "h-10 w-auto"}
        width={800}
        height={573}
      />
    </Link>
  );
}

export function SiteHeader() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-20 lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <Logo className="h-10 w-auto lg:h-12" />
        </div>

        <nav aria-label="Main navigation" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {navLinks.map((link) => {
              const active =
                link.to === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.to);
              return (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className={
                      "headline text-sm font-medium tracking-widest transition-colors hover:text-primary " +
                      (active ? "text-primary" : "text-foreground/85")
                    }
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <a
            href={contact.phoneHref}
            className="hidden items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold text-foreground/85 transition-colors hover:text-primary xl:flex"
            aria-label={`Call ${site.name} at ${contact.phoneDisplay}`}
          >
            <Phone className="size-4" aria-hidden="true" />
            {contact.phoneDisplay}
          </a>
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link to="/consultation">Book Free Consultation</Link>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="lg:hidden"
                aria-label="Open menu"
              >
                {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="flex w-full max-w-xs flex-col border-border bg-card p-6"
            >
              <SheetHeader className="p-0">
                <SheetTitle className="sr-only">Menu</SheetTitle>
              </SheetHeader>
              <Logo className="h-10 w-auto self-start" />
              <nav aria-label="Mobile navigation" className="mt-8">
                <ul className="flex flex-col gap-1">
                  {navLinks.map((link) => {
                    const active =
                      link.to === "/"
                        ? pathname === "/"
                        : pathname.startsWith(link.to);
                    return (
                      <li key={link.to}>
                        <Link
                          to={link.to}
                          onClick={() => setOpen(false)}
                          className={
                            "block rounded-md px-3 py-3 headline text-lg font-medium tracking-widest transition-colors hover:bg-accent hover:text-primary " +
                            (active ? "text-primary" : "text-foreground")
                          }
                        >
                          {link.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
              <div className="mt-auto flex flex-col gap-3 pt-6">
                <Button asChild size="lg" onClick={() => setOpen(false)}>
                  <Link to="/consultation">Book Free Consultation</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  onClick={() => setOpen(false)}
                >
                  <a href={contact.phoneHref}>
                    <Phone aria-hidden="true" />
                    Call {contact.phoneDisplay}
                  </a>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
