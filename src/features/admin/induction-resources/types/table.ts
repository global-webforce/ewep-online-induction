import z from "zod";

export const quizSchema = z.object({
  question: z.string(),
  options: z.array(z.object({ value: z.string() })),
  correctAnswer: z.string(),
  answer: z.string().optional(),
});

export const tableSchema = z.object({
  id: z.number(),
  induction_id: z.uuidv4(),
  order: z.number(),
  title: z.string().nullable(),
  content: z.string().nullable(),
  quiz: quizSchema.nullable(),
});

export type TableSchema = z.infer<typeof tableSchema>;
