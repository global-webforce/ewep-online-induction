import { z } from "zod";

export const signUpInputSchema = z
  .object({
    email: z.email(),
    password: z.string().min(8, { message: "Must have at least 8 characters" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SignUpInput = z.infer<typeof signUpInputSchema>;
