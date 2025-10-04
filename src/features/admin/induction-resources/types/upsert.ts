import z from "zod";
import { quizSchema } from "./quiz";

export const upsertSchema = z.object({
  id: z.number().optional(),
  induction_id: z.uuidv4(),
  order: z.number(),
  title: z.string().nullable(),
  content: z.string().nullable(),
  quiz: quizSchema.nullable(),
});

export type UpsertSchema = z.infer<typeof upsertSchema>;
