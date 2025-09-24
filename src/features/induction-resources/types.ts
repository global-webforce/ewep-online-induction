import { z } from "zod";

export const questionSchema = z.object({
  question: z.string().min(1, "Question is required"),
  options: z
    .array(
      z.object({
        value: z.string().min(1, "Option cannot be empty"),
      })
    )
    .min(2, "At least 2 options required"),
  correctAnswer: z.number().int(),
  answer: z.number().int().optional(),
});

export const slideSchema = z.object({
  id: z.string().optional(),
  localId: z.string().optional(),
  order: z.number().int().default(0).optional(),
  title: z.string().optional(),
  content: z.string().optional(),
  quiz: questionSchema.optional(),
});
export const slidesSchema = z.array(slideSchema).optional();
export const tableSchema = z.object({
  id: z.string().optional(),
  order: z.number().int().default(0).optional(),
  title: z.string().optional(),
  content: z.string().optional(),
  quiz: questionSchema.optional(),
});

export type QuestionFormSchema = z.infer<typeof questionSchema>;
export type SlideSchema = z.infer<typeof slideSchema>;
export type TableSchema = z.infer<typeof tableSchema>;
