import { z } from "zod";

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
});

// Inferred type
export type LoginSchema = z.infer<typeof loginSchema>;

// Runtime validation
// const data = UserSchema.parse(JSON.parse(apiResponse))
