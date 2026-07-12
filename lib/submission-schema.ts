import { z } from "zod";

export const TRACK_VALUES = [
  "Power & Machines",
  "Smart Grids & Renewables",
  "Robotics & Automation",
  "AI, Vision & Signal Processing",
  "Civil Engineering & Materials",
  "Process Eng. & Sustainability",
] as const;

export const MAX_PDF_BYTES = 15 * 1024 * 1024; // 15 MB

// Fields validated on both the browser (react-hook-form) and the server
// (API route) so a submission can never bypass validation by calling the
// API directly.
export const submissionSchema = z.object({
  title: z
    .string()
    .trim()
    .min(8, "Paper title must be at least 8 characters.")
    .max(300, "Paper title must be under 300 characters."),
  abstract: z
    .string()
    .trim()
    .min(100, "Abstract must be at least 100 characters.")
    .max(3000, "Abstract must be under 3000 characters."),
  keywords: z
    .string()
    .trim()
    .min(3, "Provide at least one keyword.")
    .max(300, "Keywords must be under 300 characters."),
  authors: z
    .string()
    .trim()
    .min(3, "List all authors.")
    .max(500, "Author list must be under 500 characters."),
  correspondingAuthor: z
    .string()
    .trim()
    .min(2, "Corresponding author name is required.")
    .max(150, "Name must be under 150 characters."),
  correspondingEmail: z
    .string()
    .trim()
    .email("Enter a valid email address.")
    .max(200),
  affiliations: z
    .string()
    .trim()
    .min(3, "Provide at least one affiliation.")
    .max(500, "Affiliations must be under 500 characters."),
  track: z.enum(TRACK_VALUES, {
    errorMap: () => ({ message: "Select a topic or track." }),
  }),
  // Honeypot: must stay empty. Real users never see or fill this field.
  company: z.string().max(0).optional().or(z.literal("")),
  // Timestamp (ms) the form was rendered, used for a bot-speed check.
  formRenderedAt: z.coerce.number().optional(),
});

export type SubmissionInput = z.infer<typeof submissionSchema>;

export const PDF_FIELD_NAME = "paper";
