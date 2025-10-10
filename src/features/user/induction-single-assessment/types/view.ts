import { rowSchema } from "@/features/super-admin/induction-quizzes";
import { rowSchema as inductionSchema } from "@/features/user/inductions/";
import z from "zod";

export const inductionWithQuizzesSchema = inductionSchema.extend({
  induction_quizzes: z.array(rowSchema),
});

export type InductionWithResourcesSchema = z.infer<
  typeof inductionWithQuizzesSchema
>;
