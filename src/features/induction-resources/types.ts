import { z } from "zod";

const optionSchema = z.object({
  value: z.string().min(1, "Option cannot be empty"),
});
export type QuizOptions = z.infer<typeof optionSchema>[];
export const quizSchema = z
  .object({
    question: z.string().min(1, "Question is required"),
    options: z
      .array(z.object({ value: z.string().min(1, "Option cannot be empty") }))
      .min(2, "At least 2 options required"),
    correctAnswer: z.string().min(1, "Option cannot be empty"),
    answer: z.string().optional(),
  })
  .refine(
    (data) => data.options.some((opt) => opt.value === data.correctAnswer),
    {
      message: "Correct answer must be one of the options",
      path: ["options"], // 👈 apply error on options instead of correctAnswer
    }
  );

/*   export const quizSchemaFree = z.object({
  question: z.string().optional(),
  options: z
    .array(
      z.object({
        value: z.string().optional(),
      })
    )
    .optional(),
  correctAnswer: z.string().optional(),
  answer: z.string().optional(),
}); */

export const slideSchema = z.object({
  id: z.string().optional(),
  localId: z.string().min(1),
  order: z.number().int().optional(),
  title: z.string().optional(),
  content: z.string().optional(),
  quiz: quizSchema.nullable(),
  enableQuiz: z.boolean().default(false).optional(),
  quizCache: quizSchema.nullable().optional(),
});

export const slidesSchema = z.array(slideSchema).optional();

export const tableSchema = z.object({
  id: z.string(),
  induction_id: z.uuidv4(),
  localId: z.string().min(2).optional(),
  order: z.number().optional(),
  title: z.string().optional(),
  content: z.string().optional(),
  quiz: quizSchema.nullable(),
  enableQuiz: z.boolean().default(false).optional(),
  quizCache: quizSchema.nullable().optional(),
});

export type QuizFormSchema = z.infer<typeof quizSchema>;
export type SlideSchema = z.infer<typeof slideSchema>;
export type TableSchema = z.infer<typeof tableSchema>;
