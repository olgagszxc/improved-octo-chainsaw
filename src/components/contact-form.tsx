import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useServerFn } from "@tanstack/react-start";
import { CheckCircle2, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { contact } from "@/content/site";
import { submitContactMessage } from "@/lib/inquiries.functions";
import { submitErrorRef } from "@/lib/utils";
import { contactSchema, type ContactInput } from "@/lib/schemas";

const emptyValues: ContactInput = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export function ContactForm() {
  const submit = useServerFn(submitContactMessage);
  const [serverError, setServerError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const form = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: emptyValues,
  });

  async function onSubmit(values: ContactInput) {
    setServerError(null);
    try {
      const result = await submit({ data: values });
      if (result.ok) {
        setSent(true);
        form.reset(emptyValues);
      } else {
        setServerError(result.error);
      }
    } catch (err) {
      console.error("Form submission failed:", err);
      setServerError(
        `Something went wrong sending your message. Please try again, or call us on ${contact.phoneDisplay}. (ref: C1 ${submitErrorRef(err)})`,
      );
    }
  }

  if (sent) {
    return (
      <div
        role="status"
        className="flex flex-col items-start gap-4 rounded-lg border border-primary/40 bg-card p-8"
      >
        <CheckCircle2 aria-hidden="true" className="size-10 text-primary" />
        <h2 className="headline text-3xl text-foreground">Message sent</h2>
        <p className="text-muted-foreground">
          Thanks for reaching out. We'll reply to the email you gave us as soon
          as we can.
        </p>
        <Button variant="outline" onClick={() => setSent(false)}>
          Send another message
        </Button>
      </div>
    );
  }

  const submitting = form.formState.isSubmitting;

  return (
    <Form {...form}>
      <form
        noValidate
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid gap-5 rounded-lg bg-card p-6 sm:grid-cols-2 sm:p-8"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input autoComplete="name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" autoComplete="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem className="sm:col-span-2">
              <FormLabel>Subject</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem className="sm:col-span-2">
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea rows={6} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {serverError ? (
          <p role="alert" className="text-sm text-destructive sm:col-span-2">
            {serverError}
          </p>
        ) : null}

        <Button
          type="submit"
          size="lg"
          disabled={submitting}
          className="sm:col-span-2"
        >
          {submitting ? (
            <Loader2 aria-hidden="true" className="animate-spin" />
          ) : null}
          {submitting ? "Sending…" : "Send Message"}
        </Button>
      </form>
    </Form>
  );
}
