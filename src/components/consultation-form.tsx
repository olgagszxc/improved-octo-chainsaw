import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useServerFn } from "@tanstack/react-start";
import { CheckCircle2, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  contact,
  fitnessExperiences,
  fitnessGoals,
  heardFromNeedsDetail,
  timePreferences,
} from "@/content/site";
import { submitConsultation } from "@/lib/inquiries.functions";
import { submitErrorRef } from "@/lib/utils";
import { getAttribution } from "@/lib/attribution";
import { HeardFromFields } from "@/components/heard-from-fields";
import { consultationSchema, type ConsultationInput } from "@/lib/schemas";

const emptyValues: ConsultationInput = {
  fullName: "",
  email: "",
  phone: "",
  fitnessGoal: "",
  fitnessExperience: "",
  preferredDate: "",
  preferredTime: "",
  heardFrom: "",
  heardFromDetail: "",
  message: "",
  consent: false,
};

/** Today's date as YYYY-MM-DD in the visitor's local time, for the date picker minimum. */
function todayIso() {
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  return now.toISOString().slice(0, 10);
}

function ChoiceSelect({
  value,
  onChange,
  options,
  placeholder,
}: {
  value: string;
  onChange: (value: string) => void;
  options: readonly string[];
  placeholder: string;
}) {
  return (
    <Select value={value} onValueChange={onChange}>
      <FormControl>
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option} value={option}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export function ConsultationForm() {
  const submit = useServerFn(submitConsultation);
  const [serverError, setServerError] = useState<string | null>(null);
  const [submittedName, setSubmittedName] = useState<string | null>(null);

  const form = useForm<ConsultationInput>({
    resolver: zodResolver(consultationSchema),
    defaultValues: emptyValues,
  });

  async function onSubmit(values: ConsultationInput) {
    setServerError(null);
    try {
      const result = await submit({
        data: {
          ...values,
          // Only keep the follow-up answer if its box was showing.
          heardFromDetail: heardFromNeedsDetail.includes(values.heardFrom ?? "")
            ? values.heardFromDetail
            : "",
          attribution: getAttribution(),
        },
      });
      if (result.ok) {
        setSubmittedName(values.fullName.split(" ")[0] ?? values.fullName);
        form.reset(emptyValues);
      } else {
        setServerError(result.error);
      }
    } catch (err) {
      console.error("Form submission failed:", err);
      setServerError(
        `Something went wrong sending your request. Please try again, or call us on ${contact.phoneDisplay}. (ref: C1 ${submitErrorRef(err)})`,
      );
    }
  }

  if (submittedName) {
    return (
      <div
        role="status"
        className="flex flex-col items-start gap-4 rounded-lg border border-primary/40 bg-card p-8"
      >
        <CheckCircle2 aria-hidden="true" className="size-10 text-primary" />
        <h2 className="headline text-3xl text-foreground">Request received</h2>
        <p className="text-muted-foreground">
          Thanks, {submittedName}. Our team will be in touch to confirm your
          consultation time. If you need us sooner, call or text{" "}
          {contact.phoneDisplay}.
        </p>
        <Button variant="outline" onClick={() => setSubmittedName(null)}>
          Book another consultation
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
          name="fullName"
          render={({ field }) => (
            <FormItem className="sm:col-span-2">
              <FormLabel>Full name</FormLabel>
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
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Mobile number{" "}
                <span className="text-muted-foreground">(optional)</span>
              </FormLabel>
              <FormControl>
                <Input
                  type="tel"
                  autoComplete="tel"
                  placeholder="09XX XXX XXXX"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="fitnessGoal"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Main fitness goal</FormLabel>
              <ChoiceSelect
                value={field.value}
                onChange={field.onChange}
                options={fitnessGoals}
                placeholder="Choose a goal"
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="fitnessExperience"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Experience level</FormLabel>
              <ChoiceSelect
                value={field.value}
                onChange={field.onChange}
                options={fitnessExperiences}
                placeholder="Choose a level"
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="preferredDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Preferred date</FormLabel>
              <FormControl>
                <Input type="date" min={todayIso()} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="preferredTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Preferred time</FormLabel>
              <ChoiceSelect
                value={field.value}
                onChange={field.onChange}
                options={timePreferences}
                placeholder="Choose a time of day"
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <HeardFromFields />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem className="sm:col-span-2">
              <FormLabel>
                Anything we should know?{" "}
                <span className="text-muted-foreground">(optional)</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  rows={4}
                  placeholder="Injuries, questions, schedule…"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="consent"
          render={({ field }) => (
            <FormItem className="sm:col-span-2">
              <div className="flex items-start gap-3">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={(checked) =>
                      field.onChange(checked === true)
                    }
                    className="mt-0.5"
                  />
                </FormControl>
                <FormLabel className="font-normal leading-snug text-muted-foreground">
                  I agree to Kaizen Fitness contacting me by phone or email to
                  confirm my consultation.
                </FormLabel>
              </div>
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
          {submitting ? "Sending…" : "Book My Free Consultation"}
        </Button>
      </form>
    </Form>
  );
}
