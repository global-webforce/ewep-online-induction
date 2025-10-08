import { profileInputSchema } from "@/features/auth/profile/schema";
import { z } from "zod";

export const userSchema = z.object({
  id: z.uuid(),
  email: z.email(),
  confirmed_at: z.string().nullable(),
  app_role: z.enum(["super_admin", "admin", "user"]),
  profile: profileInputSchema.optional(),
});

export type User = z.infer<typeof userSchema>;
