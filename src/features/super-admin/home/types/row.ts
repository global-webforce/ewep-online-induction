import z from "zod";

export const rowSchema = z.object({
  total_inductions: z.number(),
  total_published_inductions: z.number(),
  total_draft_inductions: z.number(),
  total_default_users: z.number(),
});

export type RowSchema = z.infer<typeof rowSchema>;
