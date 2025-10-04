import z from "zod";

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

export const formSchema = z.object({
  id: z.number().optional(),
  localId: z.string().min(1),
  title: z.string().nullable(),
  content: z.string().nullable(),
  quiz: quizSchema.nullable(),
  enableQuiz: z.boolean().nullable(),
  quizCache: quizSchema.nullable(),
});

export type QuizFormSchema = z.infer<typeof quizSchema>;
export type FormSchema = z.infer<typeof formSchema>;
