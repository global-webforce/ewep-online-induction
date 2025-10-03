import { z } from "zod";

export const resetPasswordInputSchema = z
  .object({
    password: z.string().min(8, { message: "Must have at least 8 characters" }),
    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type ResetPasswordInput = z.infer<typeof resetPasswordInputSchema>;
