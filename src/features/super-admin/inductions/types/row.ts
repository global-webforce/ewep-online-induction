import { z } from "zod";

export const rowSchema = z.object({
  id: z.uuid(),
  created_at: z.iso.datetime({ offset: true }),
  title: z.string().trim().min(1),
  description: z.string(),
  validity_days: z.number().int().nonnegative().nullable(),
  status: z.enum(["draft", "published"]),
});
export type RowSchema = z.infer<typeof rowSchema>;
