import { rowSchema as inductionQuizSchema } from "@/features/super-admin/induction-quizzes";
import { rowSchema } from "@/features/super-admin/inductions/";
import z from "zod";

export const inductionWithQuizzesSchema = rowSchema.extend({
  induction_quiz: z.array(inductionQuizSchema),
});

export type InductionWithQuizzesSchema = z.infer<
  typeof inductionWithQuizzesSchema
>;
