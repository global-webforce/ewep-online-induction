import z from "zod";
import { quizSchema } from "./quiz";

export const formSchema = z.object({
  id: z.number(),
  title: z.string().nullable(),
  content: z.string().nullable(),
  quiz: quizSchema.nullable(),
});

export type FormSchema = z.infer<typeof formSchema>;
