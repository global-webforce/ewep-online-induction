import { z } from "zod";

export const ProfileSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  avatarUrl: z.url().nullable(),
});

export const UserSchema = z.object({
  id: z.uuid(),
  email: z.email(),
  emailConfirmedAt: z.iso.datetime().optional(),
  app_role: z.enum(["super_admin", "admin", "default"]).default("admin"),
  profile: ProfileSchema.optional(),
});

export type Profile = z.infer<typeof ProfileSchema>;
export type User = z.infer<typeof UserSchema>;
