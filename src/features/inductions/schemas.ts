import { z } from "zod";

export const rowSchema = z.object({
  id: z.uuid(),
  created_at: z.iso.date(),
  title: z.string().trim().min(1),
  description: z.string(),
  validity_days: z.preprocess(Number, z.number().int().nonnegative()),
});

export const createSchema = z.object({
  title: z.string().trim().min(1),
  description: z.string(),
  validity_days: z.preprocess(Number, z.number().int().nonnegative()),
});

export const updateSchema = createSchema.partial();

export type RowRecord = z.infer<typeof rowSchema>;
export type CreateRecord = z.infer<typeof createSchema>;
export type UpdateRecord = z.infer<typeof updateSchema>;
