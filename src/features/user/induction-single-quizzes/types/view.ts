import { rowSchema as quizSchema } from "@/features/super-admin/induction-quizzes";
import { rowSchema as inductionSchema } from "@/features/user/inductions/";
import z from "zod";

export const viewSchema = inductionSchema.extend({
  induction_quizzes: z.array(quizSchema),
});

export type ViewSchema = z.infer<typeof viewSchema>;
