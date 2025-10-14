import { z } from "zod";

export const viewSchema = z.object({
  id: z.uuid(),
  created_at: z.iso.datetime({ offset: true }),
  user_id: z.uuid(),
  induction_id: z.uuid(),
  user_email: z.email(),
  induction_title: z.string(),
  status: z.enum(["passed", "failed"]),
  valid_until: z.iso.date().nullable(),
});

export type RowSchema = z.infer<typeof viewSchema>;
