import { z } from "zod";

const AppUserSchema = z.object({
  id: z.string(),
  email: z.email(),
  firstName: z.string().nullable().optional(),
  lastName: z.string().nullable().optional(),
});

export type AppUser = z.infer<typeof AppUserSchema>;
