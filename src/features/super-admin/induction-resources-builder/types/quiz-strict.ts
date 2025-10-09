import z from "zod";

export const quizStrictSchema = z
  .object({
    question: z.string().min(1, "Question is required"),
    options: z
      .array(z.object({ value: z.string().min(1, "Option required") }))
      .min(1, "At least 2 options required"),
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
export type QuizStrictSchema = z.infer<typeof quizStrictSchema>;
