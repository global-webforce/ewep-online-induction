import { z } from "zod";

export const rowSchema = z.object({
  id: z.number(),
  induction_id: z.uuid(),
  question: z.string(),
  options: z.array(z.object({ value: z.string() })),
  correct_answer: z.string(),
  answer: z.string().optional(),
  created_at: z.iso.datetime({ offset: true }),
});
export type RowSchema = z.infer<typeof rowSchema>;
