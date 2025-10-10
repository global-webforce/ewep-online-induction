import z from "zod";

export const rowSchema = z.object({
  id: z.number(),
  induction_id: z.uuidv4(),
  order: z.number(),
  title: z.string().nullable(),
  content: z.string().nullable(),
});

export type RowSchema = z.infer<typeof rowSchema>;
