import { z } from "zod";

export const resetPasswordInputSchema = z
  .object({
    password: z.string().min(8, { message: "Must have at least 8 characters" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type ResetPasswordInput = z.infer<typeof resetPasswordInputSchema>;
