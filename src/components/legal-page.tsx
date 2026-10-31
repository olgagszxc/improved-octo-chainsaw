import type { ReactNode } from "react";

import { contact } from "@/content/site";

type LegalSection = { title: string; body: ReactNode };

/** Plain, readable layout shared by the Privacy and Terms pages. */
export function LegalPage({
  title,
  updated,
  intro,
  sections,
}: {
  title: string;
  updated: string;
  intro: ReactNode;
  sections: LegalSection[];
}) {
  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
      <h1 className="headline text-4xl text-foreground sm:text-5xl">{title}</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        Last updated {updated}
      </p>
      <div className="mt-8 text-base leading-relaxed text-muted-foreground">
        {intro}
      </div>
      <div className="mt-10 space-y-10">
        {sections.map((s, i) => (
          <section key={s.title}>
            <h2 className="headline text-2xl text-foreground">
              {i + 1}. {s.title}
            </h2>
            <div className="mt-3 space-y-3 leading-relaxed text-muted-foreground [&_a]:text-primary [&_a]:underline-offset-4 hover:[&_a]:underline [&_li]:ml-5 [&_li]:list-disc [&_ul]:space-y-1.5">
              {s.body}
            </div>
          </section>
        ))}
        <section className="rounded-lg border border-border bg-card p-6">
          <h2 className="headline text-2xl text-foreground">Questions?</h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            Call or text{" "}
            <a
              className="text-primary hover:underline"
              href={contact.phoneHref}
            >
              {contact.phoneDisplay}
            </a>
            , message{" "}
            <a
              className="text-primary hover:underline"
              href={contact.facebookUrl}
              target="_blank"
              rel="noreferrer"
            >
              {contact.facebookName}
            </a>{" "}
            on Facebook, or visit us at the front desk on Bugallon Street,
            Estacion Paniqui, Tarlac.
          </p>
        </section>
      </div>
    </article>
  );
}
