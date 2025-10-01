import { z } from "zod";

export const quizSchema = z.object({
  question: z.string(),
  options: z.array(z.object({ value: z.string() })),
  correctAnswer: z.string(),
  answer: z.string().optional(),
});

export const quizSchemaStrict = z
  .object({
    question: z.string().min(1, "Question is required"),
    options: z
      .array(z.object({ value: z.string().min(1, "Option required") }))
      .min(2, "At least 2 options required"),
    correctAnswer: z.string().min(1, "Correct answer required"),
    answer: z.string().optional(),
  })
  .refine(
    (data) => data.options.every((opt) => opt.value !== data.correctAnswer),
    {
      message: "Don't include correct answer in options",
      path: ["options"],
    }
  );

export const slideSchema = z.object({
  id: z.string().optional(),
  localId: z.string().min(1),
  title: z.string().nullable(),
  content: z.string().nullable(),
  quiz: quizSchema.nullable(),
  enableQuiz: z.boolean().nullable(),
  quizCache: quizSchema.nullable(),
});

export const slidesSchema = z.array(slideSchema).optional();

export const tableSchema = z.object({
  id: z.string(),
  induction_id: z.uuidv4(),
  order: z.number(),
  title: z.string().nullable(),
  content: z.string().nullable(),
  quiz: quizSchema.nullable(),
});

/* export const tableSchema = z.object({
  id: z.string(),
  induction_id: z.uuidv4(),
  localId: z.string().min(2).optional(),
  order: z.number().optional(),
  title: z.string().optional(),
  content: z.string().optional(),
  quiz: quizSchema.nullable(),
  enableQuiz: z.boolean().default(false).optional(),
  quizCache: quizSchema.nullable().optional(),
}); */

export type QuizFormSchema = z.infer<typeof quizSchema>;
export type SlideSchema = z.infer<typeof slideSchema>;
export type TableSchema = z.infer<typeof tableSchema>;
