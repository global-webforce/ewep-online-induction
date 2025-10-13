import { z } from "zod";

export const viewSchema = z.object({
  id: z.uuid(),
  created_at: z.string(),
  user_id: z.uuid(),
  induction_id: z.uuid(),
  user_email: z.email(),
  induction_title: z.string(),
  status: z.enum(["passed", "failed"]),
  valid_until: z.iso.date(),
});

export type RowSchema = z.infer<typeof viewSchema>;
