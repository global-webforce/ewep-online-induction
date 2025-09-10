import { z } from "zod";

// For forms that only require an email input
export const emailInputSchema = z.object({
  email: z.email(),
});
export type EmailInput = z.infer<typeof emailInputSchema>;

// For non-form usages that only require an email string
export const emailSchema = z.email();
export type Email = z.infer<typeof emailSchema>;
