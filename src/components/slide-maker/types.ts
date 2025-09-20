import { z } from "zod";

export const QuestionSchema = z.object({
  question: z.string().min(1, "Question is required"),
  options: z
    .array(
      z.object({
        value: z.string().min(1, "Option cannot be empty"),
      })
    )
    .min(2, "At least 2 options required"),
  correctAnswer: z.number().int().optional(),
  answer: z.number().int().optional(),
});

export const SlideSchema = z.object({
  id: z.string().optional(),
  localId: z.string().optional(),
  selected: z.boolean().default(false).optional(),
  order: z.number().int().default(0).optional(),
  title: z.string().optional(),
  content: z.string().optional(),
  quiz: QuestionSchema.optional(),
});

export type QuestionForm = z.infer<typeof QuestionSchema>;
export type Slide = z.infer<typeof SlideSchema>;
