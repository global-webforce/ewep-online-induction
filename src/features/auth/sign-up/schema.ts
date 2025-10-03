import { z } from "zod";

const requiredMessage = {
  message: "Required",
};

export const signUpInputSchema = z
  .object({
    email: z.email(),
    first_name: z.string(requiredMessage).trim().min(1, requiredMessage),
    last_name: z.string(requiredMessage).trim().min(1, requiredMessage),
    password: z.string().min(8, { message: "Must have at least 8 characters" }),
    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SignUpInput = z.infer<typeof signUpInputSchema>;
