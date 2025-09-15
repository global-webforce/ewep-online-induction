import z from "zod";

export const profileInputSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
});

export type ProfileInput = z.infer<typeof profileInputSchema>;
