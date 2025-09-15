import { profileInputSchema } from "@/features/auth/profile/schema";
import { z } from "zod";

export const UserSchema = z.object({
  id: z.uuid(),
  email: z.email(),
  emailConfirmedAt: z.iso.datetime().optional(),
  app_role: z.enum(["super_admin", "admin", "default"]).default("admin"),
  profile: profileInputSchema.optional(),
});

export type User = z.infer<typeof UserSchema>;
