import z from "zod";
import { quizSchema } from "./quiz";

export const formSchema = z.object({
  id: z.number().optional(),
  localId: z.string().min(1),
  title: z.string().nullable(),
  content: z.string().nullable(),
  quiz: quizSchema.nullable(),
  enableQuiz: z.boolean().nullable(),
  quizCache: quizSchema.nullable(),
});

export type FormSchema = z.infer<typeof formSchema>;
