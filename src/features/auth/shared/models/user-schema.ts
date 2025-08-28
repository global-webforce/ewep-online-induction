import { z } from "zod";

export const ProfileSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  avatarUrl: z.url().nullable(),
});

// User schema
export const UserSchema = z.object({
  id: z.uuid(),
  email: z.email(),
  emailConfirmedAt: z.iso.datetime().optional(),
  profile: ProfileSchema.optional(),
  roles: z.array(z.string()).default(["admin"]),
});

export type Profile = z.infer<typeof ProfileSchema>;
export type User = z.infer<typeof UserSchema>;
