import z from "zod";

export const upsertSchema = z.object({
  id: z.number().optional(),
  induction_id: z.uuidv4(),
  order: z.number(),
  title: z.string().nullable(),
  content: z.string().nullable(),
});

export type UpsertSchema = z.infer<typeof upsertSchema>;
