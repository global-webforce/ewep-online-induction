import { z } from "zod";

export const InductionSchema = z.object({
  id: z.uuid(),
  created_at: z.iso.date(),
  title: z.string().trim().min(1),
  description: z.string(),
  validity_days: z.number().int().nonnegative().nullable(),
});

export const InductionInsertSchema = z.object({
  title: z.string().trim().min(1),
  description: z.string(),
  validity_days: z.number().int().nonnegative(),
});

export type InductionRow = z.infer<typeof InductionSchema>;
export type InductionInsert = z.infer<typeof InductionInsertSchema>;

export const InductionUpdateSchema = InductionInsertSchema.partial();

export type InductionUpdate = z.infer<typeof InductionUpdateSchema>;
