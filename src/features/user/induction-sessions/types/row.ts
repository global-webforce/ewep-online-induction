import { z } from "zod";

export const rowSchema = z.object({
  id: z.uuid(),
  created_at: z.string(),
  user_id: z.uuid(),
  valid_until: z.string().nullable(),
  induction_id: z.uuid(),
  user_email: z.email(),
  induction_title: z.string(),
});

export type RowSchema = z.infer<typeof rowSchema>;
