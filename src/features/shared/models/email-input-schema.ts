import { z } from "zod";

export const emailInputSchema = z.email();
export type EmailInput = z.infer<typeof emailInputSchema>;
