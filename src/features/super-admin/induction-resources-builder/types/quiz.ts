import z from "zod";

export const quizSchema = z.object({
  question: z.string(),
  options: z.array(z.object({ value: z.string() })),
  correctAnswer: z.string(),
  answer: z.string().optional(),
});
export type QuizFormSchema = z.infer<typeof quizSchema>;
