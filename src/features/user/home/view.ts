import z from "zod";

export const viewSchema = z.object({
  total_inductions: z.number(),
  total_published_inductions: z.number(),
  total_draft_inductions: z.number(),
  total_default_users: z.number(),
});

export type ViewSchema = z.infer<typeof viewSchema>;
