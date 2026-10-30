import { z } from "zod";

/**
 * Form validation schemas — shared between client-side inline validation
 * and server-side input validation so the rules can never drift apart.
 */

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
  message: z
    .string()
    .trim()
    .max(1000, "Please keep your message under 1,000 characters.")
    .optional()
    .or(z.literal("")),
  consent: z
    .boolean()
    .refine((v) => v === true, "Please agree to be contacted so we can confirm your consultation."),
});

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
});

export type ContactInput = z.infer<typeof contactSchema>;
