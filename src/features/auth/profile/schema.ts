import z from "zod";

export const profileInputSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
});

export type ProfileInput = z.infer<typeof profileInputSchema>;
