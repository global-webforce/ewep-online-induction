import { z } from "zod";

export const rowSchema = z.object({
  id: z.uuid(),
  created_at: z.coerce.date(),
  title: z.string().trim().min(1),
  description: z.string(),
  validity_days: z.preprocess(Number, z.number().int().nonnegative()),
  status: z.enum(["draft", "published"]).default("draft").optional(),
  //
  session_status: z.enum(["passed", "failed"]).nullable(),
  valid_until: z.iso.date().nullable(),
  can_renew: z.boolean(),
});

export type RowSchema = z.infer<typeof rowSchema>;
