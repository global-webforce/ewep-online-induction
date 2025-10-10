import { z } from "zod";

export const formSchema = z
  .object({
    induction_id: z.uuid(),
    question: z.string().min(1, "Question is required"),
    options: z
      .array(z.object({ value: z.string().min(1, "Option required") }))
      .min(1, "At least 2 options required"),
    correct_answer: z.string().min(1, "Correct answer required"),
  })
  .refine(
    (data) => data.options.every((opt) => opt.value !== data.correct_answer),
    {
      message: "Don't include correct answer in options",
      path: ["options"],
    }
  );
export type FormSchema = z.infer<typeof formSchema>;
