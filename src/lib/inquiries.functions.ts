import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { consultationSchema, contactSchema } from "./schemas";
import type { Database } from "@/integrations/supabase/types";

/**
 * Server-side submission handlers for the public website forms.
 *
 * Each function re-validates the payload with the shared zod schema, then
 * inserts through a publishable (anon) client. The database only accepts
 * INSERTs from anonymous callers — submitted rows can never be read back
 * through the public API.
 */

function getPublicClient() {
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
  return createClient<Database>(process.env["SUPABASE_URL"]!, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    // Opaque sb_ keys are not JWTs — send only apikey, never a bearer header.
    global: {
      fetch: (input, init) => {
        const headers = new Headers(init?.headers);
        if (
          key.startsWith("sb_") &&
          headers.get("Authorization") === `Bearer ${key}`
        ) {
          headers.delete("Authorization");
        }
        headers.set("apikey", key);
        return fetch(input, { ...init, headers });
      },
    },
  });
}

export const submitConsultation = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => consultationSchema.parse(data))
  .handler(async ({ data }) => {
    const supabase = getPublicClient();
    const { error } = await supabase.from("consultation_requests").insert({
      full_name: data.fullName,
      email: data.email,
      phone: data.phone ? data.phone : null,
      fitness_goal: data.fitnessGoal,
      fitness_experience: data.fitnessExperience,
      preferred_date: data.preferredDate,
      preferred_time: data.preferredTime,
      message: data.message ? data.message : null,
      consent: data.consent,
    });
    if (error) {
      console.error("Consultation request failed to save:", error.message);
      return {
        ok: false as const,
        error:
          "We could not save your request right now. Please try again, or reach us at 0960 523 6510 or on Facebook (Kaizen Fitness Paniqui).",
      };
    }
    return { ok: true as const };
  });

export const submitContactMessage = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => contactSchema.parse(data))
  .handler(async ({ data }) => {
    const supabase = getPublicClient();
    const { error } = await supabase.from("contact_messages").insert({
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
    });
    if (error) {
      console.error("Contact message failed to save:", error.message);
      return {
        ok: false as const,
        error:
          "We could not send your message right now. Please try again, or reach us at 0960 523 6510 or on Facebook (Kaizen Fitness Paniqui).",
      };
    }
    return { ok: true as const };
  });
