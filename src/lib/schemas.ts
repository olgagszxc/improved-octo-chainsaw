import { z } from "zod";

/**
 * Form validation schemas — shared between client-side inline validation
 * and server-side input validation so the rules can never drift apart.
 */

const optionalText = (max: number, message: string) =>
  z.string().trim().max(max, message).optional().or(z.literal(""));

/** How the visitor found the gym — the answer to "How did you hear about us?". */
const heardFromDetail = optionalText(
  100,
  "Please keep this under 100 characters.",
);

/**
 * Tracking details captured silently from the visitor's first page view
 * (see src/lib/attribution.ts). All optional. Over-long values are cut short
 * rather than rejected, so tracking can never block a real booking.
 */
const tag = (max: number) =>
  z
    .string()
    .transform((v) => v.trim().slice(0, max))
    .optional();

export const attributionSchema = z
  .object({
    ref: tag(120),
    utmSource: tag(120),
    utmMedium: tag(120),
    utmCampaign: tag(120),
    landingPage: tag(200),
    referrer: tag(120),
  })
  .optional();

export const consultationSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(1, "Please enter your full name.")
    .max(100, "Name must be 100 characters or fewer."),
  email: z
    .string()
    .trim()
    .min(1, "Please enter your email address.")
    .email("Please enter a valid email address.")
    .max(255, "Email must be 255 characters or fewer."),
  phone: z
    .string()
    .trim()
    .max(30, "Phone number must be 30 characters or fewer.")
    .optional()
    .or(z.literal("")),
  fitnessGoal: z
    .string()
    .min(1, "Please choose your main fitness goal."),
  fitnessExperience: z
    .string()
    .min(1, "Please choose your fitness experience level."),
  preferredDate: z
    .string()
    .min(1, "Please choose your preferred consultation date.")
    .refine((v) => !Number.isNaN(Date.parse(v)), "Please enter a valid date."),
  preferredTime: z
    .string()
    .min(1, "Please choose your preferred time."),
  heardFrom: z
    .string()
    .min(1, "Please tell us how you heard about us.")
    .max(50),
  heardFromDetail,
  message: z
    .string()
    .trim()
    .max(1000, "Please keep your message under 1,000 characters.")
    .optional()
    .or(z.literal("")),
  consent: z
    .boolean()
    .refine((v) => v === true, "Please agree to be contacted so we can confirm your consultation."),
  attribution: attributionSchema,
});

export type Attribution = NonNullable<z.infer<typeof attributionSchema>>;

export type ConsultationInput = z.infer<typeof consultationSchema>;

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Please enter your name.")
    .max(100, "Name must be 100 characters or fewer."),
  email: z
    .string()
    .trim()
    .min(1, "Please enter your email address.")
    .email("Please enter a valid email address.")
    .max(255, "Email must be 255 characters or fewer."),
  subject: z
    .string()
    .trim()
    .min(1, "Please enter a subject.")
    .max(150, "Subject must be 150 characters or fewer."),
  message: z
    .string()
    .trim()
    .min(1, "Please enter a message.")
    .max(2000, "Message must be 2,000 characters or fewer."),
  heardFrom: z.string().max(50).optional().or(z.literal("")),
  heardFromDetail,
  attribution: attributionSchema,
});

export type ContactInput = z.infer<typeof contactSchema>;
