import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionHeading, Reveal } from "@/components/section-heading";
import { faqItems } from "@/content/site";

export function FaqSection({
  title = "FREQUENTLY ASKED QUESTIONS",
  eyebrow = "Good to know",
  items = faqItems,
}: {
  title?: string;
  eyebrow?: string;
  items?: readonly { question: string; answer: string }[];
}) {
  return (
    <section className="bg-background py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow={eyebrow} title={title} />
        <Reveal className="mt-10">
          <Accordion type="single" collapsible className="w-full">
            {items.map((item, index) => (
              <AccordionItem key={item.question} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
