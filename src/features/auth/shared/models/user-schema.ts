// src/domain/models/User.ts
import { z } from "zod";

// Profile schema (expandable without breaking User)
export const ProfileSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  avatarUrl: z.string().url().nullable(),
});

// User schema
export const UserSchema = z.object({
  id: z.uuid(), // You control this type
  email: z.email(),
  profile: ProfileSchema.optional(),
  roles: z.array(z.string()).default([]), // e.g., ["admin", "trainer"]
});

export type Profile = z.infer<typeof ProfileSchema>;
export type User = z.infer<typeof UserSchema>;
