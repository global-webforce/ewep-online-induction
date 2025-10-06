import { z } from "zod";

export const formSchema = z.object({
  title: z.string().trim().min(1),
  description: z.string(),
  validity_days: z.preprocess(Number, z.number().int().nonnegative()),
  status: z.enum(["draft", "published"]).default("draft").optional(),
});

export type FormSchema = z.infer<typeof formSchema>;
