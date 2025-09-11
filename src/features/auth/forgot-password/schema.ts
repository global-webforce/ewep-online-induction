import z from "zod";

export const emailInputSchema = z.object({
  email: z.email(),
});
export type EmailInput = z.infer<typeof emailInputSchema>;
