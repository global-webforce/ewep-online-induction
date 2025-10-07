import { z } from "zod";

export const tableSchema = z.object({
  id: z.uuid(),
  created_at: z.iso.date(),
  user_id: z.uuid(),
  valid_until: z.coerce.date().nullable(),
  induction_id: z.uuid(),
  //
  user_email: z.email(),
  induction_title: z.string(),
});

export type TableSchema = z.infer<typeof tableSchema>;
