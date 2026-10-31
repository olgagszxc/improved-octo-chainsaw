import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { consultationSchema, contactSchema, type Attribution } from "./schemas";
import type { Database } from "@/integrations/supabase/types";
import { sendAlert } from "./email-alert";

/**
 * Server-side submission handlers for the public website forms.
 *
 * Each function re-validates the payload with the shared zod schema, then
 * inserts through a publishable (anon) client. The database only accepts
 * INSERTs from anonymous callers — submitted rows can never be read back
 * through the public API.
 *
 * Failures return a short reference code in the message so a visitor's
 * screenshot shows which step failed:
 *   S1  SUPABASE_URL / SUPABASE_PUBLISHABLE_KEY are not set on the host
 *   S2  the database could not be reached
 *   S3  the database rejected the row (code from Postgres/PostgREST follows)
 */

const FALLBACK =
  "Please try again, or reach us at 0960 523 6510 or on Facebook (Kaizen Fitness Paniqui).";

function getPublicClient() {
  const url = process.env["SUPABASE_URL"]
    ?.trim()
    .replace(/\/rest\/v1\/?$/, "")
    .replace(/\/+$/, "");
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"]?.trim();
  if (!url || !key) return null;
  return createClient<Database>(url, key, {
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

type InsertResult = { ok: true } | { ok: false; error: string };

/** The "How did you hear about us?" columns, shared by both tables. */
function sourceColumns(
  heardFrom: string | undefined,
  heardFromDetail: string | undefined,
  attribution: Attribution | undefined,
): Record<string, string | null> {
  const a = attribution ?? {};
  return {
    heard_from: heardFrom || null,
    heard_from_detail: heardFromDetail || null,
    ref: a.ref || null,
    utm_source: a.utmSource || null,
    utm_medium: a.utmMedium || null,
    utm_campaign: a.utmCampaign || null,
    landing_page: a.landingPage || null,
    referrer_site: a.referrer || null,
  };
}

function sourceSummary(
  heardFrom: string | undefined,
  heardFromDetail: string | undefined,
): string | undefined {
  if (!heardFrom) return undefined;
  return heardFromDetail ? `${heardFrom} (${heardFromDetail})` : heardFrom;
}

async function insertRow(
  table: "consultation_requests" | "contact_messages",
  row: Record<string, unknown>,
  failureLead: string,
  sourceCols: Record<string, unknown> = {},
): Promise<InsertResult> {
  const supabase = getPublicClient();
  if (!supabase) {
    console.error(
      "Form submission: SUPABASE_URL or SUPABASE_PUBLISHABLE_KEY is not set.",
    );
    return { ok: false, error: `${failureLead} ${FALLBACK} (ref: S1)` };
  }
  try {
    // The row shape is checked by the zod schema before it reaches here.
    let { error } = await supabase
      .from(table)
      .insert({ ...row, ...sourceCols } as never);
    if (error?.code === "PGRST204" && Object.keys(sourceCols).length > 0) {
      // The "heard from" columns have not been added in Supabase yet
      // (setup/supabase-forms-setup.sql). Save the booking without them
      // rather than losing it.
      console.warn(
        `Form submission to ${table}: source columns missing, saved without them. Run setup/supabase-forms-setup.sql.`,
      );
      ({ error } = await supabase.from(table).insert(row as never));
    }
    if (error && !error.code) {
      // supabase-js reports network failures as an error without a code.
      console.error(
        `Form submission to ${table} could not reach the database:`,
        error.message,
      );
      return { ok: false, error: `${failureLead} ${FALLBACK} (ref: S2)` };
    }
    if (error) {
      console.error(
        `Form submission to ${table} rejected:`,
        error.code,
        error.message,
      );
      return {
        ok: false,
        error: `${failureLead} ${FALLBACK} (ref: S3-${error.code || "?"})`,
      };
    }
    return { ok: true };
  } catch (err) {
    console.error(
      `Form submission to ${table} could not reach the database:`,
      err,
    );
    return { ok: false, error: `${failureLead} ${FALLBACK} (ref: S2)` };
  }
}

export const submitConsultation = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => consultationSchema.parse(data))
  .handler(async ({ data }) => {
    const result = await insertRow(
      "consultation_requests",
      {
        full_name: data.fullName,
        email: data.email,
        phone: data.phone ? data.phone : null,
        fitness_goal: data.fitnessGoal,
        fitness_experience: data.fitnessExperience,
        preferred_date: data.preferredDate,
        preferred_time: data.preferredTime,
        message: data.message ? data.message : null,
        consent: data.consent,
      },
      "We could not save your request right now.",
      sourceColumns(data.heardFrom, data.heardFromDetail, data.attribution),
    );
    if (result.ok) {
      await sendAlert(
        `New consultation booking: ${data.fullName}`,
        [
          ["Name", data.fullName],
          ["Email", data.email],
          ["Mobile", data.phone],
          ["Goal", data.fitnessGoal],
          ["Experience", data.fitnessExperience],
          ["Preferred date", data.preferredDate],
          ["Preferred time", data.preferredTime],
          [
            "Heard about us",
            sourceSummary(data.heardFrom, data.heardFromDetail),
          ],
          ["Link tag", data.attribution?.ref || data.attribution?.utmSource],
          ["Message", data.message],
        ],
        data.email,
      );
    }
    return result;
  });

export const submitContactMessage = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => contactSchema.parse(data))
  .handler(async ({ data }) => {
    const result = await insertRow(
      "contact_messages",
      {
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
      },
      "We could not send your message right now.",
      sourceColumns(data.heardFrom, data.heardFromDetail, data.attribution),
    );
    if (result.ok) {
      await sendAlert(
        `New website message: ${data.subject}`,
        [
          ["Name", data.name],
          ["Email", data.email],
          ["Subject", data.subject],
          [
            "Heard about us",
            sourceSummary(data.heardFrom, data.heardFromDetail),
          ],
          ["Message", data.message],
        ],
        data.email,
      );
    }
    return result;
  });
